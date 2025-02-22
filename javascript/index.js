 // 
//  fetch = Function used for making HTTP requests to fetch resources
//      (JSON style data, images, files)
//      Simplifies asynchronous data fetching in Javascript and 
//      used for interacting with API's to retrieve and send
//      data asynchronously over the web. 
//      fetch(url, {method: "options"}) 
// 

// Key Points of await

// Used Inside async Functions:
// The await keyword can only be used inside functions marked with the async keyword.
// Trying to use await outside of an async function will result in a syntax error.

// Pauses Execution:
// When the await keyword is encountered, the function execution is paused until the promise resolves.
// The value of the resolved promise is returned.

// Handles Promises:
// await can be used with any expression that returns a promise.
// It simplifies the handling of promises and eliminates the need for .then() and .catch() chaining.

// Asynchronous function to fetch data from the PokéAPI
async function fetchData() {
    try {
        // Set variable for the Pokémon name entered by the user, 
        // Retrieve the element based on ID set in HTML
        // Convert it to lowercase for case-insensitive search
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // Check if the response is not OK (status code other than 200)
        if (!response.ok) {
            // Throw an error if the resource could not be fetched
            throw new Error("Invalid Pokémon name. Please try again.");
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Extract the Pokémon's name and sprite
        const pokemonTitle = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const pokemonSprite = data.sprites.front_default;

        // Get the image and name elements from the HTML document where the Pokémon sprite and name will be displayed
        const imgElement = document.getElementById("pokemonSprite");
        const titleElement = document.getElementById("pokemon-name");

        // Set the source of the image element to the fetched Pokémon sprite URL
        imgElement.src = pokemonSprite;

        // Set the text content of the title element to the fetched Pokémon name, with the first letter capitalized
        titleElement.textContent = pokemonTitle;

        // Ensure the image element is displayed (in case it was previously hidden)
        imgElement.style.display = "block";

    } catch (error) {
        // Alert the user if there's an error (e.g., invalid Pokémon name)
        alert(error.message);
        
        // Optionally display the error message on the webpage
        const titleElement = document.getElementById("pokemon-name");
        titleElement.textContent = error.message;

        // Hide the image element if there's an error
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.style.display = "none";
    }
}

// Function to search for a Pokémon when the button is clicked
function searchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value;
    if (pokemonName) {
        fetchData(pokemonName);
    } else {
        alert('Please enter a Pokémon name');
    }
}