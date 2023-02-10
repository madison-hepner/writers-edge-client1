export const getAllRoadPosts = () => {
    return fetch("http://localhost:8000/road_posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const getRoadPostById = (roadPostId) => {
    return fetch(`http://localhost:8000/road_posts/${roadPostId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getRoadTypes = () => {
    return fetch("http://localhost:8000/road_types", {
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

export const deleteRoadPost = (id) => {
    return fetch(`http://localhost:8000/road_posts/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
    })
        .then(response => response.json())
}

export const createRoadPost = road_post => {
    return fetch("http://localhost:8000/road_posts", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(road_post)
    })
        .then(res => res.json())
}


export const updateRoadPost = (editedRoadPost, id) => {
    return fetch(`http://localhost:8000/road_posts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedRoadPost)
    })
}