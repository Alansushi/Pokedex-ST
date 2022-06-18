const onGetRequest = (pokemon) => {
  //Generamos un número aleatorio//
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let numberValue = randomNumber(0, 300);

  //Comenzamos petición GET//

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.response);

        let pokemon = response;

        // for (let property in response) {
        //   console.log([property]);
        //   response[property];

        //   pokemon.push(response[property]);
        // }

        renderNewPokemon(pokemon);
      }
    }
  });

  const URL_API = `https://pokeapi.co/api/v2/pokemon/${numberValue}`;

  xhr.open("GET", URL_API);
  xhr.send();
};
onGetRequest();

//Comienza función para asignar valores de porpiedad a etiquetas//
const renderNewPokemon = (pokemon) => {
  let pkmnCard = document.querySelector("#pokemonCard");
  pkmnCard.classList.add("row");
  let pkmnImg = document.querySelector("#pokemonImg");
  pkmnImg.classList.add("col");
  pkmnImg.classList.add("col-lg-3");

  let pkmnInfo = document.querySelector("#pokemonInfo");
  pkmnInfo.classList.add("col");
  pkmnInfo.classList.add("col-lg-4");
  pkmnInfo.classList.add("row");

  //Hace falta div de imagen//
  let defaultImg = pokemon.sprites.other.dream_world.front_default;

  let img = document.createElement("img");
  img.setAttribute("src", defaultImg);
  img.setAttribute("id", "imgPokemon");

  let pkmnNumber = document.createElement("div");
  pkmnNumber.setAttribute("id", "pokemonNumber");
  let pkmnName = document.createElement("div");
  pkmnName.setAttribute("id", "pokemonName");
  let allpkmnTypes;
  pokemon.types.forEach((slot) => {
    allpkmnTypes = slot.type.name;
  });

  let pkmnType = document.createElement("div");
  pkmnType.setAttribute("id", "pokemonType");
  let pkmnHeight = document.createElement("div");
  pkmnHeight.setAttribute("id", "pokemonHeigth");
  let pkmnWeight = document.createElement("div");
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
};
