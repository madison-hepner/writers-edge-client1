import React, { useState, useEffect} from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createLocationPost, getLocationTypes, getLocationPostById, getLocations, updateLocationPost } from "./LocationManager"


export const LocationEditForm = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] =  useState(true);
    const {locationPostId} =  useParams();
    
    const [locations, setLocations] = useState([])
    const [location_types, setLocation_Types] = useState([])

    const loadLocations = () => {
        return getLocations().then(data => {
            setLocations(data)
        })
    }

    const loadLocationTypes = () => {
        return getLocationTypes().then(data => {
            setLocation_Types(data)
        })
    }

    useEffect(() => {
        loadLocations()
    }, [])


    useEffect(() => {
        loadLocationTypes()
    }, [])

    const [current_location_post, set_current_location_post] = useState({
        title: "",
        description: "",
        locationImg: "",
        locationId: 0,
        location_type: 0,
        driver: 0,
    });

    const loadLocationPost = () => {
        if (locationPostId) {
            getLocationPostById(locationPostId)
                .then(data => {
                    set_current_location_post({
                        id: locationPostId,
                        title: data.title,
                        description: data.description,
                        locationImg: data.locationImg,
                        locationId: data.locationId.id,
                        location_type: data.location_type.id,
                        driver: data.driver
                    })
                })
        }
    }

    useEffect(() => {
        loadLocationPost()
    }, [])


    useEffect(() => {
    }, [current_location_post])

    const handleFieldChange = (domEvent) => {
        const editedLocationPost = {...current_location_post}
        let selectedVal = domEvent.target.value
        editedLocationPost[domEvent.target.name] = selectedVal
        set_current_location_post(editedLocationPost)
    }



    return (
         <form className="gameForm">
            <h2 className="gameForm__title">Edit Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={current_location_post.title}
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={current_location_post.description}
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="locationImg">Location Image </label>
                    <input type="text" name="locationImg" required autoFocus className="form-control"
                        value={current_location_post.locationImg}
                        onChange={handleFieldChange}
                    />
                </div>
                {/* change to be locationId selection from dropdown  */}
                <div className="form-group">
                    <label htmlFor="locationId">Location State: </label>
                    <select name="locationId" required className="form-control"
                        value={current_location_post.locationId}
                        onChange={handleFieldChange}>
                        {
                            locations.map(location => <option key={location.id} value={location.id}>
                                {location.locationName}
                            </option>)
                        }

                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="locationTypeId">Location Type:</label>
                    <select name="location_type" required className="form-control"
                        value={current_location_post.location_type}
                        onChange={handleFieldChange}>
                        {
                            location_types.map(location_type => <option key={location_type.id} value={location_type.id}>
                                {location_type.location_type}
                            </option>)
                        }

                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const updatedPost = {
                        title: current_location_post.title,
                        description: current_location_post.description,
                        locationImg: current_location_post.locationImg,
                        locationId: current_location_post.locationId,
                        location_type: current_location_post.location_type,
                        approved: 1
                    }

                    updateLocationPost(updatedPost, locationPostId)
                    .then(() => history.push('/photos'))
                }}
                className="formBtn"
                id="postForm__formBtn">
                    confirm changes
                </button>
        </form>
    )


}


