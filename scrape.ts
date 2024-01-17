import OpenAI from 'openai';
import { promises as fsPromises } from 'fs';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const scrapeWebsite = async (api_key: string, url: string) => {

    // initialize chromedriver
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build();

    try {
        const outputFileName = "scraped.html";

        await driver.get(url);
        let bodyHtml = await driver.findElement(By.css('body')).getAttribute('innerHTML');

        // Remove specified tags using regular expressions to reduce body content's length
        const tagsToRemove = ['script', 'img', 'style', 'link', 'path', 'svg'];
        tagsToRemove.forEach(tag => {
            const regExp = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gis');
            bodyHtml = bodyHtml.replace(regExp, '');
        });

        // Write to file using async/await
        await fsPromises.writeFile(outputFileName, bodyHtml);
        console.log(`Saved scraped HTML to ${outputFileName}`);
        
        console.log(`Extracting Menu Items ...`);
        const openai = new OpenAI({
            apiKey: api_key,
        });

        // call openai api for gpt-4-1106-preview model
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: bodyHtml}],
            model: 'gpt-4-1106-preview',
            function_call: { name: "extract_menus"},
            functions: [
                {
                    name: "extract_menus",
                    description: "Extract all of menu items from html body of restaurant website. Identify menu items by their html content, not by tags because menus are wrapped in normal tags. Fetch all of the prices available for each item.",
                    parameters: {
                        type: "object",
                        properties: {
                            menus: {
                                type: "array",
                                description: "Menu array",
                                items: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                            description: "Menu item name"
                                        },
                                        price: {
                                            type: "string",
                                            description: "Menu item price"
                                        }
                                    }
                                }
                            }  
                        }, 
                    }
                }
            ],
            max_tokens: 2000
        });

        console.log(JSON.parse(chatCompletion.choices[0].message.function_call?.arguments || "{}"));

    } finally {
        await driver.quit();
    }
};

const main = () => {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log('Usage: ts-node script.ts <OpenAI_API_Key> <URL_to_scrape>');
        process.exit(1);
    }
    const openAIKey = args[0];
    const urlToScrape = args[1];
    scrapeWebsite(openAIKey, urlToScrape );
};

main();