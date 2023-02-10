import React, { useEffect, useState} from "react"
import { getAllEventPosts, getLocationTypes, getLocations, deleteEventPost } from "./EventManager.js"
import "./EventList.css"
import { useHistory, useParams } from 'react-router-dom'

export const EventList = (props) => {
    const [ event_posts, setEventPosts ] = useState([])
    const [location_types, setLocation_Types] = useState([])
    const [locations, setLocation] = useState([])
    const history = useHistory()
    const driverId = parseInt(localStorage.getItem("driverId"))

    //not sure

    useEffect(() => {
        getAllEventPosts().then(data => setEventPosts(data))
    }, [])
    
    useEffect(() => {
        getLocationTypes()
            .then(setLocation_Types)
    }, [])

    useEffect(() => {
        getLocations()
            .then(setLocation)
    }, [])


    const handleDeleteEventPost = (id) => {
        deleteEventPost(id)
        .then(() => getAllEventPosts().then(setEventPosts));
    };

    const handleEditButton = e => {
        const eventPostId = parseInt(e.target.id.split("--")[1])
        history.push(`/event_posts/${eventPostId}/edit`)
    }

    return (
        <>

    <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/event_posts/new" })
                }}
            >Make New Post</button>

        <article className="event_posts_list">

            {
                event_posts.map(event_post => {
                    return <section key={`event--${event_post.id}`} className="event_card">
                        <fieldset className="event__card__grow">
                        <div className="border__grow"></div>
                        <div className="img__event__box">
    
                        <div className="event__title">{event_post.event_name}</div>
                        <hr></hr>
                        <div className="event__description">{event_post.description}</div>
                        <fieldset className="event__location__section">
                            <div className="location__types">{event_post.location_type.location_type} event in {event_post.locationId.locationName}</div>
                            {/* <div className="location__types">{event_post.locationId.locationName}</div> */}
                        </fieldset>
                            <div className="event"><small>Happening on:{event_post.date}</small></div>
                            <>
                        { event_post.driver.id === driverId
                            ? 
                        
                        <fieldset className="buttons_section">
                        <div className="media__delete">
                            <div className="media__delete__btns">
                                <button type="button" className="delete__btns__btn" id="delete__btn" onClick={() => handleDeleteEventPost(event_post.id)} ><small>delete post</small></button>
                            </div>
                        </div>
                        <div className="media__delete__btns">
                            <div className="edit__btns">
                                <button className="edit__btn" id={"edit--" + event_post.id} onClick={handleEditButton}>edit post</button>
                            </div>
                        </div>
                        </fieldset>
                        : ""
                        }
                        </>
                        </div>

                        
                        </fieldset>
                    </section>
                })
            }
        </article>
        </>
    )
}