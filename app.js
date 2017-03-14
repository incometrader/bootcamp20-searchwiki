const XMLHttpRequest = require('xhr2').XMLHttpRequest;
const readline = require('readline');
const chalk = require('chalk');

const error = chalk.bold.red;

function searchWiki(url) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function change() {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const title = data[1];
      const intro = data[2];
      const link = data[3];
      const results = {};
      for (let i = 0; i < title.length; i += 1) {
        results[i + 1] = { Title: title[i], Intro: intro[i], Link: link[i] };
      }

      if (Object.keys(results).length === 0) {
        console.log(error('No results found for your search. Try searching a different word below'));
      } else {
        console.log(results);
        console.log(`${chalk.green('Didn\'t find what you are looking for? ') + chalk.green.bold('Search Again')}`);
      }
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`${chalk.yellow.bgBlue.bold('Welcome to Wikipedia Search') + error('\nPress Ctrl/Cmd ^ C At Anytime To Exit')}\nMake A New Search: `, (search) => {
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&profile=strict&format=json`;
  searchWiki(url);
});

rl.on('line', (search) => {
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&profile=strict&format=json`;
  searchWiki(url);
});

rl.on('close', () => {
  console.log(`${chalk.green.bold('Thank You For Visiting. Have A Nice Day!')}`);
  process.exit(0);
});
