# Web Scraping with Selenium, TypeScript and OpenAI

This project is scraping a given url of restaruant website to extract menu items(name and price)

## How to run

1. **Clone the repository**
    ```bash
    git clone https://github.com/entorno0802/ts-scraping-menu-items.git

2. **Install Node modules**
    ```bash
    npm install

3. **Install ```ts-node``` to run ts file directly from the command line.**
    ```bash
    npm install -g ts-node

4. **Run scrape.ts file to extract menu items**
    ```bash
    ts-node scrape.ts <OPENAI_API_KEY> <URL>

## Limitation
1. **Can't scrape menu items protected by captcha.**
2. **Can't extract menu items in the image or pdf format**