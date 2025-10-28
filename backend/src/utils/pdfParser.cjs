// src/utils/pdfParser.cjs
let pdfModule = require("pdf-parse");

// Some versions of pdf-parse export { default: fn }, others export fn directly.
const pdf =
  typeof pdfModule === "function"
    ? pdfModule
    : pdfModule.default ||
      Object.values(pdfModule).find((v) => typeof v === "function");

if (typeof pdf !== "function") {
  console.error("❌ pdf-parse module content:", pdfModule);
  throw new Error(
    "pdf-parse did not export a function. Check your installed version."
  );
}

async function extractTextFromPDF(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (err) {
    console.error("❌ PDF parse error (CJS):", err);
    throw err;
  }
}

module.exports = { extractTextFromPDF };
