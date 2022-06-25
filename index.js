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
	const findPokeType = pokeData.types[0].type.name; //Finds pokemon's type

	//Function that changes the sub type of the pokemon to the main type (Trading Card Game)
	function changeToMainTypes() {
		if (findPokeType === "normal" || findPokeType === "flying") {
			return "colorless";
		} else if (findPokeType === "dark" || findPokeType === "poison") {
			return "darkness";
		} else if (findPokeType === "rock" || findPokeType === "ground") {
			return "fighting";
		} else if (findPokeType === "bug") {
			return "grass";
		} else if (findPokeType === "electric") {
			return "lightning";
		} else if (findPokeType === "steel") {
			return "metal";
		} else if (findPokeType === "ghost" || findPokeType === "fairy") {
			return "psychic";
		} else if (findPokeType === "ice") {
			return "water";
		} else {
			return findPokeType;
		}
	}
	changeToMainTypes();

	pokeCardId.id = changeToMainTypes(); //Changes the id of the div containing the pokemon types
	pokeName.textContent = findPokeName; //Render pokemon's name
	pokeType.innerHTML = "<img src='main_types_images/" + changeToMainTypes() + ".png'>"; //Render pokemon's type
	pokeSprite.innerHTML =
		"<img src=" + pokeData.sprites.other["official-artwork"].front_default + ">"; //Render pokemon's sprite
	pokeId.textContent = "#" + pokeData.id; //Render pokemon's id

	console.log(pokeData);

	console.log("Sub Type: " + findPokeType);
	console.log("Main Type: " + changeToMainTypes());
}

Pokemon();
