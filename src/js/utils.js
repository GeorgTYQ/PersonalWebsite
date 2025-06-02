// utils.js
export async function getDominantColor(imgSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // for CORS
    img.src = imgSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const colorCount = {};
      let maxCount = 0;
      let dominantColor = "";

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 128) continue;

        // Skip white or near-white pixels (e.g. RGB all above 240)
        if (r > 240 && g > 240 && b > 240) continue;

        const key = `${Math.round(r / 16) * 16},${Math.round(g / 16) * 16},${
          Math.round(b / 16) * 16
        }`;

        colorCount[key] = (colorCount[key] || 0) + 1;

        if (colorCount[key] > maxCount) {
          maxCount = colorCount[key];
          dominantColor = key;
        }
      }

      resolve(`rgb(${dominantColor})`);
    };

    img.onerror = () => reject("Image load error");
  });
}

export function rgbToRgba(rgb, alpha = 0.5) {
  // rgb is expected in format "rgb(r, g, b)"
  const parts = rgb.match(/\d+/g); // extract numbers
  if (!parts || parts.length < 3) return rgb; // fallback

  const [r, g, b] = parts;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
