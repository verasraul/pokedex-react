import { useState, useEffect  } from "react";
import axios from 'axios';
import { CLIENT_URL } from "../services/constants";
import Pokemon from "./Pokemon";

function PokeList() {
    //  Each pokemon is an object so we need to use an empty array in our useState to take in multiple objects 
    //  Save API call to state
    const [pokemons, setPokemons] = useState([]); // Holds the list of Pokemon
    const [selectedPokemonInfo, setSelectedPokemonInfo] = useState(null); // Holds the detailed data for selected Pokemon

// Create a function to handle our data using asynchronous code (will shoot data when it's loaded)
// Functiont to hanlde fetching pokemon list
const fetchData = async () => {
    // try to get the endpoint from the api
    try {
        // create function to handle response
        const response = await axios.get(CLIENT_URL);
        // destructore the data from the response
        const { results } = response.data;
        // set our state to the results (saving our API call to state)
        setPokemons(results); // Save the fetched Pokémon list to state
    // catch any error in the response and log that
    } catch (error) { 
        console.log(error);
    }
}

// Function to handle fetching Pokemon detials when clicked
const fetchPokemonInfo = async (name) => {
    console.log(name)
    try { 
        const response = await axios.get(`${CLIENT_URL}/${name}`); // Fetch Pokémon details from the provided URL
        const data = response.data;
        setSelectedPokemonInfo(data); // Save the fetched data to state

    } catch (error) {
        console.log(error);
    }
}

// useEffect(): takes 2 arguments, a callback function and a depandency
// The callback is argument is mandatory the dependancy is optional
// SideNote: if you want to use an API call in ReactJS you HAVE TO use useEffect
useEffect(() => {
    // In order for our fetchdata function to work we have to wrap it around our useEffect
    // NEVER use 'async' inside useEffect as an argument/parameter, it has to be inside the body of the function
    fetchData(); // fetch pokemon list
    //Ssetting our dependancy argument
    // Youu can either set it to a dependancy that gets affected by the callback function or an empty array.
    // In our case we need to use an empty array inside our useEffect as our second argument.
    // The empty array causes the useEffect to run once, preventing it from running multiple times (or hit.ting infinite loop)
}, [])

    return(
        <>
            <ul className="container collection with-header" style={{ marginTop: 25 }}>
                {/* Map through the original state holding the Pokemon list */}
                {(pokemons || []).map((pokemon, index) => {
                    // deconstruct the name and url key from the pokemon argument for each pockemon object
                    const { name, url } = pokemon;
                    return (
                    <Pokemon name={name} key={index} onClick={fetchPokemonInfo} />
                    )}
                )}
            </ul>

            {/* Render the selected Pokemon's detailed data if available */}
            {selectedPokemonInfo && (
                <div className="pokemon details" style={{marginTop: 25}}>
                    <h2>Selected Pokemon Details</h2>
                    <p><strong>Name:</strong> {selectedPokemonInfo.name}</p>
                    <p><strong>Height:</strong> {selectedPokemonInfo.height}</p>
                    <p><strong>Weight:</strong> {selectedPokemonInfo.weight}</p>
                    <p><strong>Base Experience:</strong> {selectedPokemonInfo.base_experience}</p>
                    <p><strong>Poke Cry:</strong></p>
                        <audio controls src={selectedPokemonInfo.cries.latest}></audio>
                        <a href={selectedPokemonInfo.cries.latest}>Download Audio</a>
                    
                    <h2>Top Moves:</h2>
                    <ul>
                        {selectedPokemonInfo.moves.map((moveobj, index) => (
                            <li key={index}>{moveobj.move.name} </li>
                        ))}
                    </ul>
                </div>
            )}

        </>
    )
}

export default PokeList;