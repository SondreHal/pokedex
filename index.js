const pokeName = document.querySelector(".pokename");
const pokeId = document.querySelector(".pokeid");
const pokeSprite = document.querySelector(".pokesprite");

async function Pokemon() {
	const fetchPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
	const pokeData = await fetchPokemon.json();
	const pokeDataName =
		pokeData.name.charAt(0).toUpperCase() + pokeData.name.substring(1);

	console.log(pokeData);

	pokeName.textContent = pokeDataName;
	pokeId.textContent = pokeData.id;
	pokeSprite.innerHTML = "<img src=" + pokeData.sprites.front_default + ">";
}

Pokemon();
