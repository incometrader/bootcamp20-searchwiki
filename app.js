const XMLHttpRequest = require('xhr2').XMLHttpRequest;

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
        console.log('No results found for your search. Try searching a different word.');
      } else {
        console.log(results);
      }
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
}
