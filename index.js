const pokeCardId = document.querySelector("#placeholder");
const pokeName = document.querySelector(".pokename");
const pokeSprite = document.querySelector(".pokesprite");
const pokeId = document.querySelector(".pokeid");
const previousEvolution = document.querySelector(".previous-evolution");

//Function to fetch a pokemon's Name, Type, Sprite & ID based on a random number between 1-151
async function Pokemon() {
	//Random number 1-151
	const randomNumber = Math.floor(Math.random() * 151 + 1);

	//Fetches JSON file with pokemon information
	const fetchNew = await fetch("pokemon.dpo");
	const newData = await fetchNew.json();

	console.log(newData.sheets[0].lines[randomNumber]);

	//Finds pokemon's name
	const findPokeName = newData.sheets[0].lines[randomNumber].info.name;
	//Finds pokemon's type
	const findSubType1 = newData.sheets[0].lines[randomNumber].info.type_1;
	const findSubType2 = newData.sheets[0].lines[randomNumber].info.type_2;

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
		if (newData.sheets[0].lines[randomNumber].info.stage === "1") {
			return "_basic";
		} else if (newData.sheets[0].lines[randomNumber].info.stage === "2") {
			return "_stage_1";
		} else {
			return "_stage_2";
		}
	}
	evolve();

	function renderPreviousEvolution() {
		if (newData.sheets[0].lines[randomNumber].info.stage > 1) {
			previousEvolution.innerHTML =
				"<img src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
				(randomNumber - 1) +
				".png>";
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
	pokeSprite.innerHTML =
		"<img src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
		randomNumber +
		".png>";
	//Render pokemon's id
	pokeId.textContent = "#" + newData.sheets[0].lines[randomNumber].id;

	console.log("Sub Type 1: " + findSubType1);
	console.log("Sub Type 2: " + findSubType2);
	console.log("Main Type: " + changeToMainType());
}

Pokemon();
