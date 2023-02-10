import React, { useState, useEffect} from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createRoadPost, getRoadTypes, getRoadPostById, getLocations, updateRoadPost } from "./RoadManager"


export const RoadEditForm = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] =  useState(true);
    const {roadPostId} =  useParams();
    
    const [locations, setLocations] = useState([])
    const [road_types, setRoad_Types] = useState([])

    const loadLocations = () => {
        return getLocations().then(data => {
            setLocations(data)
        })
    }

    const loadRoadTypes = () => {
        return getRoadTypes().then(data => {
            setRoad_Types(data)
        })
    }

    useEffect(() => {
        loadLocations()
    }, [])


    useEffect(() => {
        loadRoadTypes()
    }, [])

    const [current_road_post, set_current_road_post] = useState({
        road_name: "",
        description: "",
        locationImg: "",
        locationId: 0,
        road_type: 0,
        driver: 0,
    });

    const loadRoadPost = () => {
        if (roadPostId) {
            getRoadPostById(roadPostId)
                .then(data => {
                    set_current_road_post({
                        id: roadPostId,
                        road_name: data.road_name,
                        description: data.description,
                        locationImg: data.locationImg,
                        locationId: data.locationId.id,
                        road_type: data.road_type.id,
                        driver: data.driver
                    })
                })
        }
    }

    useEffect(() => {
        loadRoadPost()
    }, [])


    useEffect(() => {
    }, [current_road_post])

    const handleFieldChange = (domEvent) => {
        const editedRoadPost = {...current_road_post}
        let selectedVal = domEvent.target.value
        editedRoadPost[domEvent.target.name] = selectedVal
        set_current_road_post(editedRoadPost)
    }



    return (
         <form className="gameForm">
            <h2 className="gameForm__title">Edit Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Road Name: </label>
                    <input type="text" name="road" required autoFocus className="form-control"
                        value={current_road_post.road_name}
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={current_road_post.description}
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="locationImg">Location Image </label>
                    <input type="text" name="locationImg" required autoFocus className="form-control"
                        value={current_road_post.locationImg}
                        onChange={handleFieldChange}
                    />
                </div>
                {/* change to be locationId selection from dropdown  */}
                <div className="form-group">
                    <label htmlFor="locationId">Location State: </label>
                    <select name="locationId" required className="form-control"
                        value={current_road_post.locationId}
                        onChange={handleFieldChange}>
                        {
                            locations.map(location => <option key={location.id} value={location.id}>
                                {location.locationName}
                            </option>)
                        }

                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="locationTypeId">Road Type:</label>
                    <select name="road_type" required className="form-control"
                        value={current_road_post.road_type}
                        onChange={handleFieldChange}>
                        {
                            road_types.map(road_type => <option key={road_type.id} value={road_type.id}>
                                {road_type.road_type}
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
                        road_name: current_road_post.road_name,
                        description: current_road_post.description,
                        locationImg: current_road_post.locationImg,
                        locationId: current_road_post.locationId,
                        road_type: current_road_post.road_type,
                        approved: 1
                    }

                    updateRoadPost(updatedPost, roadPostId)
                    .then(() => history.push('/roads'))
                }}
                className="formBtn"
                id="postForm__formBtn">
                    confirm changes
                </button>
        </form>
    )


}