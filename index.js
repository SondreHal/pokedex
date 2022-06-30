const pokeCardId = document.querySelector("#placeholder");
const pokeName = document.querySelector(".pokename");
const pokeSprite = document.querySelector(".pokesprite");
const pokeId = document.querySelector(".pokeid");
const previousEvolution = document.querySelector(".previous-evolution");

//Function to fetch a pokemon's Name, Type, Sprite & ID based on a random number between 1-151
async function Pokemon() {
	//Random number 1-151
	const randomNumber = Math.floor(Math.random() * 251 + 1);

	//Fetches JSON file with pokemon information
	const fetchData = await fetch("pokemon.dpo");
	const jsonInfo = await fetchData.json();
	const pokemonInfo = jsonInfo.sheets[0].lines[randomNumber].info;
	console.log(pokemonInfo);

	//Finds pokemon's name
	const findPokeName = pokemonInfo.name;
	//Finds pokemon's type
	const findSubType1 = pokemonInfo.type_1;
	const findSubType2 = pokemonInfo.type_2;

	//Function that changes the sub type of the pokemon to the main type (Trading Card Game)
	function changeToMainType() {
		if (findSubType1 === "normal" || findSubType1 === "flying") {
			return "colorless";
		} else if (findSubType1 === "dark" || findSubType1 === "poison") {
			return "darkness";
		} else if (findSubType1 === "rock" || findSubType1 === "ground") {
			return "fighting";
		} else if (findSubType1 === "bug") {
			return "grass";
		} else if (findSubType1 === "electric") {
			return "lightning";
		} else if (findSubType1 === "steel") {
			return "metal";
		} else if (findSubType1 === "ghost" || findSubType1 === "fairy") {
			return "psychic";
		} else if (findSubType1 === "ice") {
			return "water";
		} else {
			return findSubType1;
		}
	}
	changeToMainType();

	//Function to figure out a pokemon's stage in an evolution if it has any, and returns it
	function evolve() {
		if (pokemonInfo.stage === "1" || pokemonInfo.stage === "0") {
			return "_basic";
		} else if (pokemonInfo.stage === "2") {
			return "_stage_1";
		} else {
			return "_stage_2";
		}
	}
	evolve();

	function background() {
		if (pokemonInfo.stage === "1" || pokemonInfo.stage === "0") {
			return (previousEvolution.style.backgroundColor = "rgba(0,0,0,0)");
		} else if (pokemonInfo.stage === "2") {
			return (previousEvolution.style.backgroundColor = "rgba(0,0,0,0.50)");
		} else {
			return (previousEvolution.style.backgroundColor = "rgba(0,0,0,0.50)");
		}
	}

	background();

	function renderPreviousEvolution() {
		if (pokemonInfo.stage > 1) {
			previousEvolution.innerHTML =
				"<img src=official-artwork/" + pokemonInfo.evolved_from_id + ".png>";
			previousEvolution.id = changeToMainType();
		} else {
			previousEvolution.innerHTML = "";
		}
	}
	renderPreviousEvolution();

	//Changes the id of the div containing the pokemon types
	pokeCardId.id = changeToMainType() + evolve();

	//Render pokemon's name
	pokeName.textContent = findPokeName;
	//Render pokemon's sprite
	pokeSprite.innerHTML = "<img src=official-artwork/" + randomNumber + ".png>";
	//Render pokemon's id
	pokeId.textContent = "#" + jsonInfo.sheets[0].lines[randomNumber].id;
}

Pokemon();
