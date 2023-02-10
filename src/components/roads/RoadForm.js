import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createRoadPost, getRoadTypes, getRoadPostById, getLocations } from "./RoadManager"


export const RoadPostForm = () => {
    const history = useHistory()
    const [road_types, setRoad_Types] = useState([])
    const [locations, setLocations] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentRoadPost, setCurrentRoadPost] = useState({
        road_name: "",
        description: "",
        locationImg: "",
        locationId: 0,
        road_type: 0,
        driver: 0,

    })

    useEffect(() => {
        getRoadTypes()
            .then(setRoad_Types)
    }, [])

    useEffect(() => {
        getLocations()
            .then(setLocations)
    }, [])


    // useEffect(() => {
    //     getLocationTypes()
    //     if (locationId) {
    //         getLocationPostById(parseInt(locationId))
    //             .then(editLocationPost => {
    //                 setCurrentLocationPost({
    //                     location_type: editLocationPost.location_type,
    //                     description: editLocationPost.description,
    //                     title: editLocationPost.title,
    //                     driver: editLocationPost.driver,
    //                     locationId: editLocationPost.locationId.id
    //                 })
    //             })
    //     }
    // }, [])

    const handleInputChange = e => {
        const newRoadPostState = { ...currentRoadPost }
        newRoadPostState[e.target.name] = e.target.value
        if (e.target.name.includes("Id")) newRoadPostState[e.target.name] = parseInt(e.target.value)
        setCurrentRoadPost(newRoadPostState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Make New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Road Name: </label>
                    <input type="text" name="road_name" required autoFocus className="form-control"
                        value={currentRoadPost.road_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentRoadPost.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="locationImg">Location Image </label>
                    <input type="text" name="locationImg" required autoFocus className="form-control"
                        value={currentRoadPost.locationImg}
                        onChange={handleInputChange}
                    />
                </div>
                {/* change to be locationId selection from dropdown  */}
                <div className="form-group">
                    <label htmlFor="locationId">Location State: </label>
                    <select name="locationId" required className="form-control"
                        value={currentRoadPost.locationId}
                        onChange={handleInputChange}>
                        <option value="0">Select Location State</option>
                        {
                            locations.map(location => <option key={location.id} value={location.id}>
                                {location.locationName}
                            </option>)
                        }

                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="roadTypeId">Road Type:</label>
                    <select name="road_type" required className="form-control"
                        value={currentRoadPost.road_type}
                        onChange={handleInputChange}>
                        <option value="0">Select Road Type</option>
                        {
                            road_types.map(road_type => <option key={road_type.id} value={road_type.id}>
                                {road_type.road_type}
                            </option>)
                        }

                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const road_post = {
                        road_name: currentRoadPost.road_name,
                        description: currentRoadPost.description,
                        locationImg: currentRoadPost.locationImg,
                        locationId: parseInt(currentRoadPost.locationId),
                        road_type: parseInt(currentRoadPost.road_type)
                    }

                    // Send POST request to your API
                    // if (locationId) {
                    //     updateLocationPost(locationId, location_post)
                    //         .then(() => history.push("/location_posts"))
                    // } else {

                    createRoadPost(road_post)
                        .then(() => history.push("/roads"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}