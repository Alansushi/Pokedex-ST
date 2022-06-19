const onGetSavedPokemons = (pokemones) => {
  //Comenzamos petición GET//
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let allPokemonsArray = [];
        const response = JSON.parse(xhr.response);

        for (let property in response) {
          response[property];
          allPokemonsArray.push(response[property]);
        }

        renderAllPokemons(allPokemonsArray);
      }
    }
  });

  const URL_DB = `https://pokedex-5c815-default-rtdb.firebaseio.com/savedPokemons.json`;

  xhr.open("GET", URL_DB);
  xhr.send();
};
onGetSavedPokemons();

const renderNewPokemon = (pokemon) => {
  let show = document.querySelector("#showPokemons");

  let pkmnCard = document.createElement("div");
  pkmnCard.setAttribute("id", "savedPokemonCard");
  pkmnCard.classList.add("col");
  pkmnCard.classList.add("col-lg-6");
  pkmnCard.classList.add("col-8");
  pkmnCard.classList.add("text-capitalize");
  pkmnCard.classList.add("row");
  let pkmnImg = document.createElement("div");
  pkmnImg.setAttribute("id", "pokemonImg");
  pkmnImg.classList.add("col");
  pkmnImg.classList.add("col-lg-3");

  let pkmnInfo = document.createElement("div");
  pkmnInfo.setAttribute("id", "pokemonInfo");
  pkmnInfo.classList.add("col");
  pkmnInfo.classList.add("col-lg-4");
  pkmnInfo.classList.add("row");

  // Hace falta div de imagen//
  let defaultImg = pokemon.sprites.other.dream_world.front_default;

  let img = document.createElement("img");
  img.setAttribute("src", defaultImg);
  img.setAttribute("id", "imgPokemon");

  let pkmnNumber = document.createElement("span");
  pkmnNumber.setAttribute("id", "pokemonNumber");
  let pkmnName = document.createElement("span");
  pkmnName.setAttribute("id", "pokemonName");
  let allpkmnTypes;
  pokemon.types.forEach((slot) => {
    allpkmnTypes = slot.type.name;
  });

  let pkmnType = document.createElement("span");
  pkmnType.setAttribute("id", "pokemonType");
  let pkmnHeight = document.createElement("span");
  pkmnHeight.setAttribute("id", "pokemonHeigth");
  let pkmnWeight = document.createElement("span");
  pkmnWeight.setAttribute("id", "pokemonWeight");

  pkmnNumber.textContent = `N.º ${pokemon.id}`;
  pkmnName.textContent = `NOMBRE: ${pokemon.name}`;
  pkmnType.textContent = `TIPO: ${allpkmnTypes}`;
  pkmnHeight.textContent = `ALTURA: ${pokemon.height}`;
  pkmnWeight.textContent = `PESO: ${pokemon.weight}`;

  pkmnImg.appendChild(img);
  pkmnInfo.appendChild(pkmnNumber);
  pkmnInfo.appendChild(pkmnName);
  pkmnInfo.appendChild(pkmnType);
  pkmnInfo.appendChild(pkmnHeight);
  pkmnInfo.appendChild(pkmnWeight);

  pkmnCard.appendChild(pkmnImg);
  pkmnCard.appendChild(pkmnInfo);
  show.appendChild(pkmnCard);
};

const renderAllPokemons = (allPokemonsArray) => {
  allPokemonsArray.forEach((pokemon, index) => {
    renderNewPokemon(pokemon, index);
  });
};
