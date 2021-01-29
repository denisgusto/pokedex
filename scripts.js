const POKEMON_COUNT = 12;
const API_URL = 'https://pokeapi.co/api/v2';

/* Types dos Pokemons */
const types = [
    'fire',
    'grass',
    'electric',
    'water',
    'ground',
    'rock',
    'fairy',
    'poison',
    'bug',
    'dragon',
    'psychic',
    'flying',
    'fighting',
    'normal'
];

const cardHTML = `
    <div class="card" id="card-{id}">
        <div class="card-title">
            <h2>{name}</h2>
            <small># {id}</small>
        </div>
        <div class="card-img bg-{type}">
            <img src="https://pokeres.bastionbot.org/images/pokemon/{id}.png" alt="">
        </div>
        <div class="card-type {type}">
            <p>{type}</p>
        </div>
        <button class="card-favorite" data-id="{id}">
            <div class="heart">

            </div>
        </button>
    </div>
`;

const cards = document.querySelector('.cards');

/* Função para pegar o primeiro 'type' do Pokemon */
function getTypes(data) {
    const type = data.map((type) => type.type.name);
    return type[0];
}

/* Função para realizar uma consulta na API utilizando o ID do Pokemon */
async function fetchPokemon(number) {
    const url = `${API_URL}/pokemon/${number}`;

    const response = await fetch(url)
        .then((response) => response.json());

    const { id, name, types } = response;
    const type = getTypes(types);

    return { id, name, type }
}

/* Função que ajusta a string para aplicar os atributos do Pokemon no HTML */
function replacer(text, source, destination) {
    const regex = new RegExp(source, 'gi');
    return text.replace(regex, destination);
}

/* Função para renderizar os cards de Pokemons */
function renderCard(pokemon) {
    const { id, name, type } = pokemon;

    let newCard = replacer(cardHTML, `\{id\}`, id);
    newCard = replacer(newCard, `\{name\}`, name);
    newCard = replacer(newCard, `\{type\}`, type);
    
    cards.innerHTML += newCard;
}

/* Função para realizar uma consulta de todos os Pokemons com limitação da variável de ambiente POKEMON_COUNT */
async function fetchPokemons() {
    for (let i = 1; i <= POKEMON_COUNT; i++) {
        const pokemon = await fetchPokemon(i);
        console.log(pokemon)
        renderCard(pokemon);
    }
}

fetchPokemons();