import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas } from "canvas";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text = "Default Text" } = req.query;

  const imgSize = 315;
  const canvas = createCanvas(imgSize, imgSize);
  const ctx = canvas.getContext("2d");

  // Draw white background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, imgSize, imgSize);

  // Set text properties
  const fontSize = 30;
  ctx.font = `bold ${fontSize}px Arial`; // Make text bold
  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  // Function to wrap text
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    const lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const totalHeight = lines.length * lineHeight;
    const startY = y - totalHeight / 2; // Adjust the starting Y position for vertical centering

    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], x, startY + i * lineHeight);
    }
  }

  // Set max width for text wrapping and line height
  const maxWidth = imgSize - 40; // Adjust as needed
  const lineHeight = fontSize + 10;

  // Calculate starting X and Y position for centering
  const textX = imgSize / 2;
  const textY = imgSize / 2;

  // Wrap and draw text
  wrapText(ctx, text as string, textX, textY, maxWidth, lineHeight);

  // Convert the canvas to a buffer
  const buffer = canvas.toBuffer("image/png");

  // Set the response headers and send the image buffer
  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
}
