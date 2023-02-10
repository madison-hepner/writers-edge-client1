import React, { useState, useEffect} from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createEventPost, getAllEventPosts, getLocationTypes, getEventPostById, getLocations, updateEventPost } from "./EventManager"
import DateTimePicker from 'react-datetime-picker';


export const EventEditForm = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] =  useState(true);
    const {eventPostId} =  useParams();
    const [date, setDate] = useState(new Date());
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

    const [current_event_post, set_current_event_post] = useState({
        event_name: "",
        description: "",
        locationId: 0,
        location_type: 0,
        driver: 0,
        date: new Date()
    });

    const loadEventPost = () => {
        if (eventPostId) {
            getEventPostById(eventPostId)
                .then(data => {
                    set_current_event_post({
                        id: eventPostId,
                        event_name: data.event_name,
                        description: data.description,
                        locationId: data.locationId.id,
                        location_type: data.location_type.id,
                        driver: data.driver,
                        date: data.date
                    })
                })
        }
    }

    useEffect(() => {
        loadEventPost()
    }, [])


    useEffect(() => {
    }, [current_event_post])

    const handleFieldChange = (domEvent) => {
        const editedEventPost = {...current_event_post}
        let selectedVal = domEvent.target.value
        editedEventPost[domEvent.target.name] = selectedVal
        set_current_event_post(editedEventPost)
    }




    return (
         <form className="gameForm">
            <h2 className="gameForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="event_name" required autoFocus className="form-control"
                        value={current_event_post.event_name}
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={current_event_post.description}
                        onChange={handleFieldChange}
                    />
                </div>
                {/* change to be locationId selection from dropdown  */}
                <div className="form-group">
                    <label htmlFor="locationId">Location State: </label>
                    <select name="locationId" required className="form-control"
                        value={current_event_post.locationId}
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
                        value={current_event_post.location_type}
                        onChange={handleFieldChange}>
                        {
                            location_types.map(location_type => <option key={location_type.id} value={location_type.id}>
                                {location_type.location_type}
                            </option>)
                        }

                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Time and Date:</label>
                    <div>
                    <DateTimePicker onChange={date => setDate(date)} name="date" value={date}/>
                    </div>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const updatedPost = {
                        event_name: current_event_post.event_name,
                        description: current_event_post.description,
                        locationImg: current_event_post.locationImg,
                        locationId: current_event_post.locationId,
                        location_type: current_event_post.location_type,
                        date: current_event_post.date,
                        approved: 1
                    }

                    updateEventPost(updatedPost, eventPostId)
                    .then(() => history.push('/events'))
                }}
                className="formBtn"
                id="postForm__formBtn">
                    confirm changes
                </button>
        </form>
    )


}