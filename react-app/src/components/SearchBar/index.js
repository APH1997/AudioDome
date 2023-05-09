import { useState } from "react"

const SearchBar = () => {

    const [search, setSearch] = useState('')

    const searchHandleer = () => {
        console.log("I HAVE NO IDEA WHAT LOGIC GOES HERE I AM SORRY TEAM");
      };
    return (
        <div>
            <input
                placeholder="Search For Songs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchHandleer}>Search</button>
        </div>

    )
}


export default SearchBar
