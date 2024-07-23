/* eslint-disable no-console */
import puppeteer from 'puppeteer';

const generatePdf = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { url } = req.body;

  if (!url) {
    res.status(400).send({ message: 'URL is required' });
    return;
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Optionally set the viewport size to capture the entire content
    await page.setViewport({ width: 1280, height: 2000 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      scale: 1,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
    });

    await browser.close();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=page.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to generate PDF' });
  }
};

export default generatePdf;
