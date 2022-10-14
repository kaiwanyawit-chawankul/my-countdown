const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = SECOND_IN_MS * 60;
const HOUR_IN_MS = MINUTE_IN_MS * 60;
const DAY_IN_MS = HOUR_IN_MS * 24;
const WIDTH = 320;
const HEIGHT = 240;
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
const GIFEncoder = require("gifencoder");
const { createCanvas } = require("canvas");

function eventGif(fs, endDate, eventName, padString, startDate, bgColor) {
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n += 1) {
      const testLine = `${line + words[n]} `;
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = `${words[n]} `;
        // eslint-disable-next-line no-param-reassign
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  const numberOfSeconds = endDate - startDate;
  const isStarted = numberOfSeconds <= 0;
  const endNumberOfSeconds = numberOfSeconds - 100000;
  //console.log("total seconds"+numberOfSeconds);
  //console.log("total numberOfSecondsEnd"+endNumberOfSeconds);

  const encoder = new GIFEncoder(WIDTH, HEIGHT);
  // stream the results as they are available into myanimated.gif
  encoder.createReadStream().pipe(fs);

  encoder.start();
  encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
  encoder.setDelay(1000); // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.

  // use node-canvas
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  let blink = 0;
  for (
    let distance = numberOfSeconds;
    distance > endNumberOfSeconds;
    distance -= 1000
  ) {
    //console.log("render"+distance);
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / DAY_IN_MS);
    const hours = Math.floor((distance % DAY_IN_MS) / HOUR_IN_MS);
    const minutes = Math.floor((distance % HOUR_IN_MS) / MINUTE_IN_MS);
    const seconds = Math.floor((distance % MINUTE_IN_MS) / SECOND_IN_MS);

    //console.log(`d HH mm ss ${days} ${hours} ${minutes} ${seconds}`);

    // blue rectangle
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Impact";

    wrapText(ctx, eventName, 10, 50, 300, 30);

    if (isStarted) {
      if (blink++ % 2 == 0) ctx.fillText("now", 150, 200);
    } else {
      ctx.fillText(("dd").padStart(2, padString), 50, 170);
      ctx.fillText(("HH").padStart(2, padString), 100, 170);
      ctx.fillText(("mm").padStart(2, padString), 150, 170);
      ctx.fillText(("ss").padStart(2, padString), 220, 170);

      ctx.fillText(`${days}`.padStart(2, padString), 50, 200);
      ctx.fillText(`${hours}`.padStart(2, padString), 100, 200);
      ctx.fillText(`${minutes}`.padStart(2, padString), 150, 200);
      ctx.fillText(`${seconds}`.padStart(2, padString), 220, 200);
    }

    encoder.addFrame(ctx);
  }

  encoder.finish();
}

const padString = "0";
const startDate = new Date().getTime();
const endDate = new Date("Oct 30, 2021 09:00:00").getTime();

module.exports = { eventGif };
