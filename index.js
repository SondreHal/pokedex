const pokeCardId = document.querySelector("#placeholder");
const pokeName = document.querySelector(".pokename");
const pokeType = document.querySelector(".type");
const pokeSprite = document.querySelector(".pokesprite");
const pokeId = document.querySelector(".pokeid");

//Function to fetch a pokemon's Name, Type, Sprite & ID based on a random number between 1-905
async function Pokemon() {
	//Random number 1-905
	const randomNumber = Math.floor(Math.random() * 905 + 1);

	//Fetch pokemonAPI
	const fetchPokemonData = await fetch(
		"https://pokeapi.co/api/v2/pokemon/" + randomNumber
	);
	//Stringify pokemonAPI
	const pokeData = await fetchPokemonData.json();

	//Fetch pokemonSpeciesAPI
	const fetchPokeSpecies = await fetch(
		"https://pokeapi.co/api/v2/pokemon-species/" + randomNumber
	);
	//Stringify pokemonSpeciesAPI
	const pokeSpecies = await fetchPokeSpecies.json();

	//Fetch evolutionChainAPI
	const fetchEvoChain = await fetch(pokeSpecies.evolution_chain.url);
	//Stringify evolutionChainAPI
	const evoChain = await fetchEvoChain.json();

	//Finds pokemon's name and makes first letter uppercase
	const findPokeName =
		pokeData.name.charAt(0).toUpperCase() + pokeData.name.substring(1);
	//Finds pokemon's type
	const findSubType = pokeData.types[0].type.name;

	//Function that changes the sub type of the pokemon to the main type (Trading Card Game)
	function changeToMainType() {
		if (findSubType === "normal" || findSubType === "flying") {
			return "colorless";
		} else if (findSubType === "dark" || findSubType === "poison") {
			return "darkness";
		} else if (findSubType === "rock" || findSubType === "ground") {
			return "fighting";
		} else if (findSubType === "bug") {
			return "grass";
		} else if (findSubType === "electric") {
			return "lightning";
		} else if (findSubType === "steel") {
			return "metal";
		} else if (findSubType === "ghost" || findSubType === "fairy") {
			return "psychic";
		} else if (findSubType === "ice") {
			return "water";
		} else {
			return findSubType;
		}
	}
	changeToMainType();

	//Function to figure out a pokemon's stage in an evolution if it has any, and returns it
	function evolve() {
		if (evoChain.chain.species.name === pokeData.name) {
			return "_basic";
		} else if (evoChain.chain.evolves_to[0].species.name === pokeData.name) {
			return "_stage_1";
		} else {
			return "_stage_2";
		}
	}
	evolve();

	//Changes the id of the div containing the pokemon types
	pokeCardId.id = changeToMainType() + evolve();

	//Render pokemon's name
	pokeName.textContent = findPokeName;
	//Render pokemon's sprite
	pokeSprite.innerHTML =
		"<img src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
		randomNumber +
		".png>";
	//Render pokemon's id
	pokeId.textContent = "#" + pokeData.id;

	pokeSprite.innerHTML;

	console.log("Sub Type: " + findSubType);
	console.log("Main Type: " + changeToMainType());
}

Pokemon();
