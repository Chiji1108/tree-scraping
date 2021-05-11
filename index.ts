import fs from "fs/promises";
import { chromium } from "playwright";

const trees = [
  {
    name: "コナラ",
    latin: "Quercus serrata",
  },
  {
    name: "アラカシ",
    latin: "Quercus glauca",
  },
  {
    name: "シラカシ",
    latin: "Quercus myrsinifolia",
  },
  {
    name: "ケヤキ",
    latin: "Zelkova serrata",
  },
  {
    name: "スダジイ",
    latin: "Castanopsis sieboldii",
  },
  {
    name: "ハリギリ",
    latin: "Kalopanax septemlobus",
  },
  {
    name: "ホタルブクロ",
    latin: "Campanula punctata",
  },
  {
    name: "キヅタ",
    latin: "Hedera rhombea",
  },
  {
    name: "キンラン",
    latin: "Cephalanthera falcata",
  },
  {
    name: "ギンラン",
    latin: "Cephalanthera erecta",
  },
];

const browser = await chromium.launch();
const responses = await Promise.all(
  trees.map(async ({ name, latin }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(
      "http://www.chiba-museum.jp/jyumoku2014/kensaku/namae.html"
    );
    if (await page.$(`text=${name}`)) {
      const [popup] = await Promise.all([
        page.waitForEvent("popup"),
        page.click(`text=${name}`),
      ]);
      await popup.waitForLoadState();
      await page.close();
      const url = popup.url();
      const frame = popup.frame("f1");
      const images = await frame?.$$eval("img", (imgs) =>
        imgs.map((img) => img.src.replace("s.jpg", ".jpg"))
      );
      await popup.close();

      return {
        name,
        latin,
        url,
        images,
      };
    } else {
      await page.goto("http://plants.minibird.jp/");
      const menu = page.frame("menu")!;
      await menu.click("text='全掲載種50音順検索'");
      await menu.waitForLoadState();
      const cont = page.frame("cont")!;
      await cont.click(`text=${name}`);
      await cont.waitForLoadState();
      const images = await cont.$$eval("img", (imgs) =>
        imgs.map((img) => img.src).filter((src) => !src.includes("spacer.gif"))
      );
      await page.close();
      return {
        name,
        latin,
        url: "http://plants.minibird.jp/",
        images,
      };
    }
  })
);

await browser.close();

await fs.writeFile("./out/tree.json", JSON.stringify(responses));
