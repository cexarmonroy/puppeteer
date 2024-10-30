const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); 
  const page = await browser.newPage();

  // Navegar a la página de Google
  await page.goto('https://autoconsulta.nuestrosparques.cl/ResultadosObituarios');

 
  await page.waitForSelector('#obiHoy');
  await page.click('#obiHoy');

  await new Promise(resolve => setTimeout(resolve, 3000));

  await page.evaluate(() => {
    document.querySelector('#fallecidos').scrollIntoView();
  });

  await page.waitForSelector('#fallecidos tbody tr');
  const rows = await page.$$eval('#fallecidos tbody tr', rows => rows.length - 1);

  if (rows > 0) {
    console.log(`${rows} filas`);
  } else {
    console.log("sin datos");
  }
  await page.screenshot({ path: 'parque.png' });
  await browser.close();
})();
