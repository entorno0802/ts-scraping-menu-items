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

## Output Example

```
{
  menus: [
    { name: 'TOM YUM CHICKEN BOX', price: '11.90' },
    { name: '5 SPICE BEEF BOX', price: '11.90' },
    { name: 'MISO SALMON BOX', price: '14.90' },
    { name: 'LEMON CHICKEN BOX', price: '11.90' },
    { name: 'MUSHROOM BOX', price: '11.90' },
    { name: 'NORI CAESAR', price: '13.9' },
    {
      name: 'THE O.G. (SALMON SASHIMI or POACHED CHICKEN)',
      price: '15.90'
    },
    { name: 'SPRING CHICKEN', price: '13.90' },
    { name: 'COCONUT CHICKEN', price: '14.90' },
    { name: 'CRISPY CHICKEN', price: '13.90' },
    { name: 'TOFU BOYS', price: '12.90' },
    { name: 'MISO SALMON (Bowl)', price: '17.90' },
    { name: 'BEEF BRISKET (Bowl)', price: '17.90' },
    { name: 'SPICY SALMON (Bowl)', price: '17.90' },
    { name: 'SHROOMAMI', price: '15.90' },
    { name: 'MISO EGGPLANT', price: '16.9' },
    { name: '5 SPICE BEEF (Bowl)', price: '14.90' }
  ]
}
```

## Limitation
1. **Can't scrape menu items protected by captcha.**
2. **Can't extract menu items in the image or pdf format**