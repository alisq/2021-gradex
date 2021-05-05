var url="http://2021.ocadu.gd/feed/json/";

fetch(url)
.then(response => response.json())
  .then(p => {
      console.log(p)
  });
