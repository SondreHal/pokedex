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

	console.log(pokeData);

	pokeCardId.id = findPokeType;
	pokeName.textContent = findPokeName; //Render pokemon's name
	pokeType.innerHTML = "<img src='type_images/" + findPokeType + ".png'>"; //Render pokemon's type
	pokeSprite.innerHTML = "<img src=" + pokeData.sprites.front_default + ">"; //Render pokemon's sprite
	pokeId.textContent = pokeData.id; //Render pokemon's id
}

Pokemon();
