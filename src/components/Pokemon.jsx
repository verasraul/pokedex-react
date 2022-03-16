
// because the information coming in is an object, we will use JSX within the arguments of the function
function Pokemon({name, url}) {
    return(
        // because our information is coming from an <ul> tag component 
        // we'll need to use the <li> tag to render data in this component, lists are nested under unordered lists in HTML
        <li className="collection-item">
            {/* we are going to create an anchor tag to make sure it toggles the data of pokemon */}
            <a href={url}>{name}</a>

        </li>
    )
}

export default Pokemon;