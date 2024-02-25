const ShowAnimes = document.querySelector(".ShowAnimes");
let PesquisarAnime = document.getElementById("PesquisarAnime");
let btnProcurar = document.getElementById("btnProcurar");
let objInfo = {};

async function Animes() {
  if (PesquisarAnime.value === "") {
    alert("Digite um anime no espaço");
  }
  if (PesquisarAnime.value !== "") {
    const api = `https://kitsu.io/api/edge//anime?filter[text]=${PesquisarAnime.value}&page[limit]=12`;
    await fetch(api)
      .then((response) => response.json())
      .then((response) => {
        objInfo = response;
        if (objInfo.data.length === 0) {
          alert("Nenhum anime encontrado com esse nome.");
          return;
        }
      });
    ImprimirAnime();
  }
  PesquisarAnime.value = "";
}

const ImprimirAnime = () => {
  let nomeAnimes = ``;
  objInfo.data.forEach((anime, index) => {
    nomeAnimes += `
    <li id="listAnime" key = ${anime.id}>
    <img src= ${anime.attributes.posterImage.small} 
    alt= ${anime.attributes.canonicalTitle}
    />
    <p id="nomeAnime">
        ${anime.attributes.canonicalTitle}</p>
   </li>

    `;
  });

  ShowAnimes.innerHTML = nomeAnimes;
};
