
// because the information coming in is an object, we will use JSX within the arguments of the function
function Pokemon({name, url, onClick}) {
    return(
        // because our information is coming from an <ul> tag component 
        // we'll need to use the <li> tag to render data in this component, lists are nested under unordered lists in HTML
        <li className="collection-item">
            {/* we are going to create an anchor tag to make sure it toggles the data of pokemon */}
            {/* Anchor tag to display the Pokemon name and trigger the click event */}
            <a href="#!" onClick={() => onClick(name)}>
                {name}
            </a>
        </li>
    )
}

export default Pokemon;