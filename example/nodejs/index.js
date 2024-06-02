import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Capture console logs
  page.on("console", async (msg) => console.log(msg.args().length));

  await page.goto(
    "https://coding-activity.vercel.app/coding-activity/664f459d76836c32a2957137"
  );
  page.viewport({ width: 1920, height: 1080 });
  await browser.close();
})();
