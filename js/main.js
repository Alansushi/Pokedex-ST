//Generamos la petición GET a la API//
const onGetRequest = (pokemones) => {
  //Generamos un número aleatorio//
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let numberValue = randomNumber(0, 248);

  //Comenzamos petición GET//

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.response);

        let pokemon = response;

        renderNewPokemon(pokemon);

        let saveButton = document.querySelector("#saveButton");
        saveButton.addEventListener("click", function () {
          onSave(pokemon);
        });
      }
    }
  });

  const URL_API = `https://pokeapi.co/api/v2/pokemon/${numberValue}`;

  xhr.open("GET", URL_API);
  xhr.send();
};
onGetRequest();

//Creamos la petición para postear a la BD el pokemon //
const onSave = (pokemon) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        xhr.response;
      }
    }
  });
  const URL_DB =
    "https://pokedex-5c815-default-rtdb.firebaseio.com/savedPokemons.json";

  xhr.open("POST", URL_DB);
  xhr.send(JSON.stringify(pokemon));
};
//Generamos la función que haga un GET cada 30 segundos//
const repeatGetFunction = () => {
  locationreload();
  onGetRequest();
};

setInterval(repeatGetFunction, 30000);

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
};

//Generamos el listener del click del botón de mostrar nuevo pokemon//

let newElement = document.querySelector("#searchButton");
function locationreload() {
  location.reload();
}

newElement.addEventListener("click", function () {
  locationreload();

  onGetRequest();
});

const alertDiv = document.getElementById("alertDiv");

const alert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div  id="alert" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertDiv.append(wrapper);
};

const alertTrigger = document.getElementById("saveButton");
if (alertTrigger) {
  alertTrigger.addEventListener("click", () => {
    alert("¡Guardaste este pokemon en la base de datos!", "dark");
  });
}
