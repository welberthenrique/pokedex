const nomePokemon = document.querySelector(".pokemon_name");
const numeroPokemon = document.querySelector(".pokemon_number");
const imgPokemon = document.querySelector(".pokemon_image");

imgPokemon.src = "./img/images/init.gif";
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const btnAnterior = document.querySelector(".btn-prev");
const btnProximo = document.querySelector(".btn-next");

let pokemonWrapper = 0;

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
  loading();

  if (isNumber(pokemon)) {
    const data = await fetchPokemon(pokemon);
    isPokemon(data);
  } else {
    const data = await fetchPokemon(pokemon.toLowerCase());
    isPokemon(data);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value);
});

btnProximo.addEventListener("click", () => {
  renderPokemon((pokemonWrapper += 1));
});

btnAnterior.addEventListener("click", () => {
  if (pokemonWrapper > 1) {
    renderPokemon((pokemonWrapper -= 1));
  }
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

async function isPokemon(data) {
  if (data) {
    nomePokemon.innerHTML = data.name;
    numeroPokemon.innerHTML = data.id;
    pokemonWrapper = data.id;
    console.log(pokemonWrapper);
    imgPokemon.src = await data["sprites"]["versions"]["generation-v"][
      "black-white"
    ]["animated"]["front_default"];

    input.value = "";
  } else {
    numeroPokemon.innerHTML = "404";
    nomePokemon.innerHTML = "Not Found!";
    imgPokemon.src = "./img/images/404.png";
  }
}

function loading() {
  numeroPokemon.innerHTML = ":)";
  nomePokemon.innerHTML = "Carregando";
  imgPokemon.src = "./img/images/load.gif";
}
