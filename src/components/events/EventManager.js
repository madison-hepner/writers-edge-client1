export const getAllEventPosts = () => {
    return fetch("http://localhost:8000/event_posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const getEventPostById = (eventPostId) => {
    return fetch(`http://localhost:8000/event_posts/${eventPostId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getLocations = (locationId) => {
    return fetch(`http://localhost:8000/locations`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteEventPost = (id) => {
    return fetch(`http://localhost:8000/event_posts/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
    })
        .then(response => response.json())
}

export const createEventPost = event_post => {
    return fetch("http://localhost:8000/event_posts", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event_post)
    })
        .then(res => res.json())
}

export const getLocationTypes = () => {
    return fetch("http://localhost:8000/location_types", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const updateEventPost = (editedEventPost, id) => {
    return fetch(`http://localhost:8000/event_posts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedEventPost)
    })
}