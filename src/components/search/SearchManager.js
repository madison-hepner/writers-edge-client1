export const getLocations = (locationId) => {
    return fetch(`http://localhost:8000/locations`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const searchLocations = (searchTerm) => {
    return fetch(`http://localhost:8000/locations?q=${searchTerm}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}   

export const getLocationPostByLocation = (locationId) => {
    return fetch(`http://localhost:8000/location_posts/${locationId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())


}