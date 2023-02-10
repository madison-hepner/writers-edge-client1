import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createLocationPost, getLocationTypes, getLocationPostById, getLocations } from "./LocationManager"
import "./LocationForm.css"


export const LocationPostForm = () => {
    const history = useHistory()
    const [location_types, setLocation_Types] = useState([])
    const [locations, setLocations] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentLocationPost, setCurrentLocationPost] = useState({
        title: "",
        description: "",
        locationImg: "",
        locationId: 0,
        location_type: 0,
        driver: 0,

    })

    useEffect(() => {
        getLocationTypes()
            .then(setLocation_Types)
    }, [])

    useEffect(() => {
        getLocations()
            .then(setLocations)
    }, [])



    const handleInputChange = e => {
        const newLocationPostState = { ...currentLocationPost }
        newLocationPostState[e.target.name] = e.target.value
        if (e.target.name.includes("Id")) newLocationPostState[e.target.name] = parseInt(e.target.value)
        setCurrentLocationPost(newLocationPostState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Make A New Post</h2>
            <fieldset className="form__items">
                <div className="form-group">
                <fieldset className="location_title">
                    <label className="location"htmlFor="title">Make a title...</label>
                    <input type="text" name="title" required autoFocus className="location__title"
                        value={currentLocationPost.title}
                        onChange={handleInputChange}
                    />
                    </fieldset>
                </div>
                <div className="form-group">
                <fieldset className="location_description">
                    <label className="description" htmlFor="description">Make a description...</label>
                    <input type="text" name="description" required autoFocus className="location__description"
                        value={currentLocationPost.description}
                        onChange={handleInputChange}
                    />
                    </fieldset>
                </div>
                <div className="form-group">
                <fieldset className="location_img">
                    <label className="locationImg" htmlFor="locationImg">Upload image url...</label>
                    <input type="text" name="locationImg" required autoFocus className="location__img"
                        value={currentLocationPost.locationImg}
                        onChange={handleInputChange}
                    />
                    </fieldset>
                </div>
                {/* change to be locationId selection from dropdown  */}
                <div className="form-group">
                <fieldset className="location_id">
                    <label className="location_name" htmlFor="locationId">Add location state...</label>
                    <select name="locationId" required className="location_select"
                        value={currentLocationPost.locationId}
                        onChange={handleInputChange}>
                        <option value="0">Select Location State</option>
                        {
                            locations.map(location => <option key={location.id} value={location.id}>
                                {location.locationName}
                            </option>)
                        }

                    </select>
                </fieldset>
                </div>
                <div className="form-group">
                    <fieldset className="location_type">
                    <label className="location_type_label" htmlFor="locationTypeId">Add location type...</label>
                    <select name="location_type" required className="location_select"
                        value={currentLocationPost.location_type}
                        onChange={handleInputChange}>
                        <option value="0">Select Location Type</option>
                        {
                            location_types.map(location_type => <option key={location_type.id} value={location_type.id}>
                                {location_type.location_type}
                            </option>)
                        }

                    </select>
                    </fieldset>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const location_post = {
                        title: currentLocationPost.title,
                        description: currentLocationPost.description,
                        locationImg: currentLocationPost.locationImg,
                        locationId: currentLocationPost.locationId,
                        location_type: parseInt(currentLocationPost.location_type),
                        // driver: parseInt(localStorage.)
                    }

                    // Send POST request to your API
                    // if (locationId) {
                    //     updateLocationPost(locationId, location_post)
                    //         .then(() => history.push("/location_posts"))
                    // } else {

                    createLocationPost(location_post)
                        .then(() => history.push("/photos"))
                }}
                className="btn__create">create post</button>
        </form>
    )
}