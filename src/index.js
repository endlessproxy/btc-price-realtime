import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";

const scrapePrice = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://coinmarketcap.com/currencies/bitcoin/");

    let price = (await page.$eval('span[data-test="text-cdp-price-display"]', (el) => el.innerHTML)).replace("$", "");

    await browser.close();

    return price;
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const price = await scrapePrice();
    res.json({ price });
});

app.listen(8080);