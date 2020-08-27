const request = require('request');
const fs = require('fs');

const userInput = process.argv.slice(2);

const pageFetcher = ((userInput) => {
  const url = userInput[0];
  const fileName = userInput[1];

  request(url, (error, response, body) => {
    if (error) {
      console.log(error);
    } else if (response && response.statusCode !== 200) {
      console.log('statusCode:', response && response.statusCode);
    } else {
      fs.access(fileName, () => {
        fs.writeFile(fileName, body, () => {
          const stats = fs.statSync(fileName).size;
          console.log(`Downloaded and saved ${stats} bytes to ${fileName}`);
        });
      });
    }
  });
});

pageFetcher(userInput);