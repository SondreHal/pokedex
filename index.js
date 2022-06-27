const pokeCardId = document.querySelector("#placeholder");
const pokeName = document.querySelector(".pokename");
const pokeType = document.querySelector(".type");
const pokeSprite = document.querySelector(".pokesprite");
const pokeId = document.querySelector(".pokeid");

//Function to fetch a pokemon's Name, Type, Sprite & ID based on a random number between 1-905
async function Pokemon() {
	const randomNumber = Math.floor(Math.random() * 905 + 1); //Random number 1-905
	const fetchPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber); //Fetch PokeAPI
	const pokeData = await fetchPokemon.json(); //Stringify PokeAPI

	const findPokeName =
		pokeData.name.charAt(0).toUpperCase() + pokeData.name.substring(1); //Finds pokemon's name and makes first letter uppercase
	const findSubType = pokeData.types[0].type.name; //Finds pokemon's type

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

	pokeCardId.id = changeToMainType(); //Changes the id of the div containing the pokemon types
	pokeName.textContent = findPokeName; //Render pokemon's name
	pokeType.innerHTML = "<img src='main_types_images/" + changeToMainType() + ".png'>"; //Render pokemon's type
	pokeSprite.innerHTML =
		"<img src=" + pokeData.sprites.other["official-artwork"].front_default + ">"; //Render pokemon's sprite
	pokeId.textContent = "#" + pokeData.id; //Render pokemon's id

	console.log(pokeData);

	console.log("Sub Type: " + findSubType);
	console.log("Main Type: " + changeToMainType());
}

Pokemon();
