var PageNumber = 0;

function any() {
  var SearchTerm = document.getElementById("searchinput").value;
  let url = ``;
  if (SearchTerm === "") {
    url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d8eb6e8f3a54495396f7db53263f216e&page=${PageNumber}`;
  } else {
    url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d8eb6e8f3a54495396f7db53263f216e&page=${PageNumber}&q=${SearchTerm}`;
  }
  console.log(url);
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(text) {
      console.log(text.response.docs[1].web_url);
      let output = '<div class="card-columns">';

      for (var i = 0; i < 10; i++) {
        output += `
              <div class="card">
              <h5><center>${text.response.docs[i].headline.main}</center></h5>

              <div class="card-body">

                <a href="${text.response.docs[i].web_url}" target="_blank" >${
                text.response.docs[i].snippet
                }</a>
                
                </div>
                <h7><center>Type: ${
                  text.response.docs[i].section_name
                }</center></h7>

            </div><br/>`;
      }
      output += "</div>";
      document.getElementById("results").innerHTML = output;
    })
    .catch(err => console.log(err));
}

function nextpage() {
  PageNumber++;
  console.log(PageNumber);
  any();
}

function previouspage(e) {
  if (PageNumber > 0) {
    PageNumber--;
  } else {
    return false;
  }
  any();
}
