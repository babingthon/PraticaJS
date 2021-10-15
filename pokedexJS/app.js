const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const liModal = document.querySelector('.pokedex').addEventListener('click', event => {
      console.log(event.target);
})

const generatePokemonPromises = () =>
  Array(151)
    .fill()
    .map((_, index) =>
      fetch(getPokemonURL(index + 1)).then((response) => response.json())
    );

const openModal = (event) => {
  document.getElementById('modal').classList.add('active');

}

const closeModal = () => document.getElementById('modal').classList.remove('active');

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types, abilities }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);
    const elementAbilities = abilities.map((abilitiesTypes) =>abilitiesTypes.ability.name);
    console.log(elementAbilities);

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
