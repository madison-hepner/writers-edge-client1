import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEventPost, getLocationTypes, getEventPostById, getLocations } from "./EventManager"
import DateTimePicker from 'react-datetime-picker';
// import "react-datepicker/dist/react-datepicker.css";


export const EventPostForm = () => {
    const history = useHistory()
    const [location_types, setLocation_Types] = useState([])
    const [locations, setLocations] = useState([])
    const [date, setDate] = useState(new Date());


    const [currentEventPost, setCurrentEventPost] = useState({
        event_name: "",
        description: "",
        locationId: 0,
        location_type: 0,
        driver: 0,
        date: new Date()

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
        const newEventPostState = { ...currentEventPost }
        newEventPostState[e.target.name] = e.target.value
        if (e.target.name.includes("Id")) newEventPostState[e.target.name] = parseInt(e.target.value)
        setCurrentEventPost(newEventPostState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Make New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event_name">Event Name: </label>
                    <input type="text" name="event_name" required autoFocus className="form-control"
                        value={currentEventPost.event_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEventPost.description}
                        onChange={handleInputChange}
                    />
                </div>
                {/* change to be locationId selection from dropdown  */}
                <div className="form-group">
                    <label htmlFor="locationId">Location State: </label>
                    <select name="locationId" required className="form-control"
                        value={currentEventPost.locationId}
                        onChange={handleInputChange}>
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
                        value={currentEventPost.location_type}
                        onChange={handleInputChange}>
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


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event_post = {
                        event_name: currentEventPost.event_name,
                        description: currentEventPost.description,
                        locationId: parseInt(currentEventPost.locationId),
                        location_type: parseInt(currentEventPost.location_type),
                        driver: currentEventPost.driver,
                        date: date
                    }

                    // Send POST request to your API
                    // if (locationId) {
                    //     updateLocationPost(locationId, location_post)
                    //         .then(() => history.push("/location_posts"))
                    // } else {

                    createEventPost(event_post)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}