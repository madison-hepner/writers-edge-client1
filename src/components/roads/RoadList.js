import React, { useEffect, useState} from "react"
import { getAllRoadPosts, getRoadTypes, getLocations, deleteRoadPost } from "./RoadManager.js"
import "./RoadCard.css"
import { useHistory, useParams } from 'react-router-dom'

export const RoadList = (props) => {
    const [ road_posts, setRoadPosts ] = useState([])
    const [road_types, setRoad_Types] = useState([])
    const [locations, setLocation] = useState([])
    const [filteredRoadPosts, setFilteredRoadPosts] = useState([])
    const [searchInput, setSearchInput] = useState("");
    const [ searchCategories, setSearchCategories] = useState("")
    const driverId = parseInt(localStorage.getItem("driverId"))

    const history = useHistory()
    
    useEffect(() => {
        getRoadTypes()
            .then(setRoad_Types)
    }, [])

    useEffect(() => {
        getLocations()
            .then(setLocation)
    }, [])

    useEffect(() => {
        getAllRoadPosts().then((data) => {
            setRoadPosts(data)
            // setLocation_Types(data)
            setFilteredRoadPosts(data)
        })
    }, [])

    const handleInput = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }


    const handleChange = (e) => {

        const locationNameObj = locations.find((l) => {
            if (l.locationName === searchInput) {
                return true
            }
            return false
        })

        if (searchInput.length > 0) {
            const x = road_posts.filter((road_post) => {
                if (road_post.locationId.id === locationNameObj.id) {
                    return true
                }
                return false
    
    
        });
            setFilteredRoadPosts(x)
        }

  

}

const handleCategoryChange = (e) => {

    const roadTypeObj = road_types.find((r_t) => {
        if (r_t.id === parseInt(e.target.value)) {
            return true
        }
        return false
    })

    
        const x = road_posts.filter((road_post) => {
            
            if (road_post.road_type.id === roadTypeObj.id) {
                return true
            }
            return false


    });
        setFilteredRoadPosts(x)

}





    const handleDeleteRoadPost = (id) => {
        deleteRoadPost(id)
        .then(() => getAllRoadPosts().then(setRoadPosts));
    };

    const handleEditButton = e => {
        const roadPostId = parseInt(e.target.id.split("--")[1])
        history.push(`/road_posts/${roadPostId}/edit`)
    }

    return (
        <article className="road_posts_list">
            <fieldset className="search__road__section">
            <div className="search__road__bar">
            <input
                    type="text"
                    id="road__search"
                    placeholder="Search By State"
                    autoComplete="off"
                    onChange={handleInput}>
                    </input>

                <button 
                        type="button"
                        onClick={() => {handleChange()}}>
                                Search
                    </button>
                </div>
        <h4 className="road__divider">OR</h4>
        <div className="road__filter">
        <label htmlFor="roadTypeId" className="road__hamburger">≡</label>
                <select name="road_types_filter" required className="road__form-control"
                        // value={currentLocationPost.location_type}
                        onChange={handleCategoryChange}>
                        <option value="0">Search by Road Type:</option>
                        {
                            road_types.map(road_type => <option key={road_type.id} value={road_type.id}>
                                {road_type.road_type}
                            </option>)
                        }

                </select>
            </div>
            </fieldset>

                <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/road_posts/new" })
                }}
            >Make New Post</button>
            {
                filteredRoadPosts.map(road_post => {
                    return <section key={`location--${road_post.id}`} className="location_card">
                        <fieldset className="card__grow">
                        <div className="border__grow"></div>
                        <div className="img__box">
                        <div className="img__container">
                        <picture className="img__box">
                            <img className="media__img" src={road_post.locationImg} alt="media image" />
                        </picture>
                        </div>
                        <fieldset className="location__title__section">
                            <div className="location__title">{road_post.road_name}</div>
                            <div className="location__description"><small>{road_post.description}</small></div>
                        </fieldset>
                        <fieldset className="location__section">
                                <div className="location__type">{road_post?.road_type.road_type} in </div>
                                <div className="location__name">{road_post.locationId.locationName}</div>
                        </fieldset>
                        <hr></hr>

                        <>
                        { road_post.driver.id === driverId
                            ? 

                        <fieldset className="buttons_section">
                        <div className="media__delete">
                            <div className="media__delete__btns">
                                <button type="button" className="delete__btns__btn" id="delete__btn" onClick={() => handleDeleteRoadPost(road_post.id)} ><small>delete post</small></button>
                            </div>
                        </div>
                        <div className="media__delete__btns">
                            <div className="edit__btns">
                                <button className="edit__btn" id={"edit--" + road_post.id} onClick={handleEditButton}>edit post</button>
                            </div>
                            
                        </div>
                        </fieldset>
                            : ""
                        }
                         </>              
                        </div>

                        
                        </fieldset>
                        <div className="border__grow__bottom"></div>
                    </section>

                
                })
            }
        </article>
    )
}