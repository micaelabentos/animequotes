async function start() {
  const response = await fetch(
    "https://animechan.vercel.app/api/available/anime"
  );
  const data = await response.json();
  createAnimeList(data);
}

start();

function createAnimeList(animeList) {
  document.getElementById("anime").innerHTML = `
    <select class="btn" onchange="loadByAnime(this.value)">
    <option>Select your favourite anime</option>
    ${animeList
      .map(function (anime) {
        return `<option>${anime}</option>`;
      })
      .sort()
      .splice(7)}
 
  </select>
    `;
}

function showQuotes(quotes) {
  document.getElementById("quotes").innerHTML = quotes
    .map(function (quotes) {
      return `<p> <span class="text-name">${quotes.character}: </span>
    <span class="text-quote">"${quotes.quote}"</span>
    <a href="https://twitter.com/intent/tweet?text=${quotes.character}%20-%20%22${quotes.quote}%22&url=https://webanimequotes.netlify.app/" target="_blank"> <i class="fa-brands fa-twitter" id="twitter"></i> </a>
             </p>`;
    })
    .join(" ");
}

async function loadByAnime(anime) {
  if (anime != "Select your favourite anime") {
    const response = await fetch(
      `https://animechan.vercel.app/api/quotes/anime?title=${anime}`
    );
    const data = await response.json();
    showQuotes(data);
  }
}
