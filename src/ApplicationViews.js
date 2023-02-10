
import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { LocationList } from "./components/locations/LocationList"
import { LocationPostForm } from "./components/locations/LocationForm"
import { RoadList } from "./components/roads/RoadList"
import { RoadPostForm } from "./components/roads/RoadForm"
import { EventList } from "./components/events/EventList"
import { EventPostForm } from "./components/events/EventForm"
import { EventEditForm } from "./components/events/EventEditForm"
import { LocationEditForm } from "./components/locations/LocationEditForm"
import { RoadEditForm } from "./components/roads/RoadEditForm"




export const ApplicationViews = (props) => {
    
    return <>
        <main style={{
            margin: "1rem 2rem",
            backgroundColor: "#dddddd",

            borderRadius: "1em"
        }}>

        <Route exact path="/">
            <Home />
        </Route>
        
        <Route exact path="/photos">
            <LocationList />
        </Route>

        <Route exact path="/roads">
            <RoadList />
        </Route>

        <Route exact path="/events">
            <EventList />
        </Route>

        <Route exact path="/location_posts/new">
            <LocationPostForm />
        </Route>

        <Route exact path="/road_posts/new">
            <RoadPostForm />
        </Route>

        <Route exact path="/event_posts/new">
            <EventPostForm />
        </Route>

        <Route exact path="/event_posts/:eventPostId/edit">
            <EventEditForm />
        </Route>
            
        <Route exact path="/location_posts/:locationPostId/edit">
            <LocationEditForm />
        </Route>

        <Route exact path="/road_posts/:roadPostId/edit">
            <RoadEditForm />
        </Route>


        </main>
    </>
}