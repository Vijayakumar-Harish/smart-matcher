// src/utils/pdfParser.js
import PDFParser from "pdf2json";

export async function extractTextFromPDF(buffer) {
  try {
    const pdfParser = new PDFParser();

    const text = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        try {
          const fullText = pdfData.Pages.map((page) =>
            page.Texts.map((t) =>
              t.R.map((r) => {
                try {
                  // Some characters may be malformed, so decode safely
                  return decodeURIComponent(r.T);
                } catch {
                  // Gracefully skip malformed text instead of crashing
                  return r.T;
                }
              }).join(" ")
            ).join(" ")
          ).join("\n");

          resolve(fullText);
        } catch (parseErr) {
          reject(parseErr);
        }
      });

      pdfParser.parseBuffer(buffer);
    });

    console.log("✅ Extracted text length:", text.length);
    return text;
  } catch (err) {
    console.error("❌ Error parsing PDF:", err);
    throw new Error("Failed to extract text from PDF");
  }
}
