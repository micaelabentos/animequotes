async function start() {
  const response = await fetch("https://animechan.vercel.app/api/available/anime");
  const data = await response.json();
  createAnimeList(data);
}

start();

function createAnimeList(animeList) {

  document.getElementById("anime").innerHTML = `
    <select class="btn" onchange="loadByAnime(this.value)">

    <option>Select your favourite anime</option>
    ${animeList.map( function (anime) {
     return `<option>${anime}</option>`
    })}
 
  </select>
    `;
}

async function loadByAnime(anime){
    if (anime != "Select your favourite anime") {
        const response = await fetch(`https://animechan.vercel.app/api/quotes/anime?title=${anime}`);
        const data = await response.json();
        console.log(data)
        showQuotes(data);
    }
}

function showQuotes(quotes) {
  quotes.splice(0, 1);
  document.getElementById("quotes").innerHTML = 
  quotes.map( function(quotes)  {
    return   `<p><span class="text-name">${quotes.character}: </span>
    <span class="text-quote">"${quotes.quote}"</span>
    </p>` 
  }).join(" ")
 
}