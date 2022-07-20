const form = document.querySelector('.js-search-form');
form.addEventListener('submit', getQuery);

async function getQuery(event){
  event.preventDefault();
  reset();
  const inputSearch = document.querySelector('.js-search-input').value;
  const searchQuery = inputSearch.trim();
  try {
    const results = await searchWiki(searchQuery);
    displayResults(results);
  } catch(err) {
    console.log(err);
    alert('failed');
  }
}
async function searchWiki(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  const response = await fetch(endpoint);
  if (!response.ok){
    throw Error(response.statusText);
  }
  const json = response.json();
  return json;
}
function displayResults(results){
  const searchResults = document.querySelector('.js-search-results');
  results.query.search.forEach(result => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
    searchResults.insertAdjacentHTML(
      'beforeend',
      `<div class="result-item">
        <h3 class="result-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
        <span class="result-snippet">${result.snippet}</span><br>
      </div>`
    );
  });
}
function reset() {
  document.querySelector('.js-search-results').innerHTML = "";
}
