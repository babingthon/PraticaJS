const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const buttonSearch = document.querySelector('button').addEventListener('click', event => {
  event.preventDefault();

  const valueInput = document.querySelector('input').value;

  /*if(valueInput == '') {
    const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
  } else {
    const getPokemonURL = () => `https://pokeapi.co/api/v2/pokemon/nome_do_pokemon`;
  }*/

console.log(valueInput);
 
})

const generatePokemonPromises = () =>
  Array(151)
    .fill()
    .map((_, index) =>
      fetch(getPokemonURL(index + 1)).then((response) => response.json())
    );

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types, abilities }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);
    const elementAbilities = abilities.map((abilitiesTypes) =>abilitiesTypes.ability.name);
    
    accumulator += `
    <li class="card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">Type: ${elementTypes.join(" | ")}</p>
            <p>Abilities: ${elementAbilities.join(" | ")}</p>

        </li>
    `;
    return accumulator;
  }, "");

const insertPokemonIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonIntoPage);
