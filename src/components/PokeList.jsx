import { useState, useEffect  } from "react";
import axios from 'axios';
import { CLIENT_URL } from "../services/constants";
import Pokemon from "./Pokemon";

function PokeList() {
    //  Save API call to state
    const [pokemons, setPokemons] = useState([]) // each pokemon is an object so we need to use an empty array in our useState to take in multiple objects 

    // useEffect(): takes 2 arguments, a callback function and a depandency.
    // the callback is argument is mandatory the dependancy is optional.
        // SideNote: if you want to use an API call in ReactJS you HAVE TO use useEffect.
        // in order for our fetchdata function to work we have to wrap it around our useEffect.
        // NEVER use 'async' inside useEffect as an argument/parameter, it has to be inside the body of the function.
    useEffect(() => {
            // create a function to handle our data using asynchronous code (will shoot data when it's loaded)
    const fetchData = async () => {
        // try to get the endpoint from the api
        try {
            // create function to handle response
            const response = await axios.get(CLIENT_URL);
            // destructore the data from the response
            const { results } = response.data;
            // set our state to the results (saving our API call to state)
            setPokemons(results);
        // catch any error in the response and log that
        } catch (error) { 
            console.log(error);
        }
    }
    fetchData();
    // setting our dependancy argument.
    // you can either set it to a dependancy that gets affected by the callback function or an empty array.
    // in our case we need to use an empty array inside our useEffect as our second argument.
    // the empty array causes the useEffect to run once, preventing it from running multiple times (or hit.ting infinite loop)
    }, [])


    return(
        <ul className="container collection with-header" style={{marginTop: 25}}>
            {/* map through the original state holding the data */}
            {(pokemons || []).map((pokemon, index) => {
                // deconstruct the name and url key from the pokemon argument for each pockemon object
                const { name, url } = pokemon;
                return <Pokemon name={name} url={url} key={index} />
            })}
        </ul>
    )
}

export default PokeList;