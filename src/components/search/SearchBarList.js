// import { React, useState, useEffect } from 'react'
// import { getLocations } from './SearchManager'



// export const SearchBarList = () => {

//     const [locations, setLocations] = useState([])

//     useEffect(() => {
//         getLocations().then(data => setLocations(data))
//     }, [])


//     return (
        
//         <div className="searchbarlist__card" key={location.id}>
//         <ul className="searchbarlist__listitem">
//             {locations.map((location) => (
//                 <li key={location.id}>{location.locationName}</li>
//             ))}
//         </ul>
//         </div>

//     )
// }