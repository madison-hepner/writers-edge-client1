import { React, useState, useEffect, useRef } from "react";
import "./SearchBar.css"
import { SearchBarList } from "./SearchBarList";
import { getLocations, searchLocations, getLocationPostByLocation } from "./SearchManager";


export const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("");
    const [locations, setLocations] = useState([])
    const [ location_posts, setLocation_Posts] = useState([])
    const [filteredLocations, setFilteredLocations] = useState([])
    const [filteredLocationPosts, setFilteredLocationPosts] = useState([])
    const [ reset, setReset ] = useState(false)
    
    useEffect(() => {
        getLocations().then((data) => {
            setLocations(data)
            setFilteredLocations(data)
        })
    }, [])

    // useEffect(() => {
    //     getAllLocations().then((data) => {
    //         setLocation_Posts(data)
    //         setFilteredLocationPosts(data)
    //     })
    // }, [])

    // const getFilteredPosts = () = {
    //     return getLocationPostByLocationType(+locationId).then()
    // }
    
    const handleInput = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }


    const handleChange = (e) => {

    if (searchInput.length > 0) {
        const x = locations.filter((location) => {
            if (location.locationName === searchInput) {
                return true
            }
            return false


    });
        setFilteredLocations(x)
    }}

    

    useEffect(() => {
        getLocations(setLocations);
      }, []);


    return (
        <div>
              <input
                    type="text"
                    id="search"
                    placeholder="Search Location"
                    autoComplete="off"
                    onChange={handleInput}>
                    </input>
                <button 
                        type="button"
                        onClick={() => {handleChange()}}>
                                Search
                    </button>

            <div className="searchbarlist__card" key={location.id}>
                <ul className="searchbarlist__listitem">
                    {filteredLocations.map((location) => (
                        <li key={location.id}>{location.locationName}</li>
                    ))}
                </ul>
                </div>
        </div>
    );
  }
  
