const fs = require('fs').promises;

(async () => {
  const targetFile = __dirname + "/../../dist/index.html";
  let data = await fs.readFile(targetFile, "utf-8");
  data = data.split('href=/favicon')
    .join('href=./favicon')
    .split('href=/css/')
    .join('href=./css/')
    .split('href=/js/')
    .join('href=./js/')
    .split('src=/js/')
    .join('src=./js/');
  await fs.writeFile(targetFile, data);
  // await fs.writeFile(filename, Date.now());
  // const message = await fs.readFile(filename, 'utf-8');
})()

