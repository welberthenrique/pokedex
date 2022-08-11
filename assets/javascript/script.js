const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

pokemonImage.src =
  "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif";
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 0;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNumber.innerHTML = ":)";
  pokemonName.innerHTML = "Carregando";
  pokemonImage.src =
    "https://cdn.discordapp.com/attachments/733022670278492172/1007305076756467753/oie_1117929TlpDHY7r.gif";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    searchPokemon = data.id;
    console.log(searchPokemon);
    pokemonImage.src = await data["sprites"]["versions"]["generation-v"][
      "black-white"
    ]["animated"]["front_default"];

    input.value = "";
  } else {
    pokemonNumber.innerHTML = "404";
    pokemonName.innerHTML = "Not Found!";
    pokemonImage.src = "https://static.thenounproject.com/png/1527904-200.png";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value);
});

btnNext.addEventListener("click", () => {
  renderPokemon((searchPokemon += 1));
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    renderPokemon((searchPokemon -= 1));
  }
});
