import { useEffect } from "react";
import useService from "../Service/Service";
import { State, useAppDispatch, useAppSelector } from "../store";

function RandomPhoto (){
    const dispatch = useAppDispatch()
    const {getRandomPhoto} = useService() 
    const getPhoto = () => {
        
        getRandomPhoto().then((res) => {
            dispatch({type: 'randomPhoto', payload: res})
        })
        
    }

    useEffect(() => {
        getPhoto()
    }, [])
    const photoUrl = useAppSelector((state: State) => state.randomPhoto)
    return (
        <>
        <div className="random-photo-section">
            <h2>Random Photo</h2>
            <button onClick={getPhoto} id="randomPhotoButton">Get Random Photo</button>
            <div id="randomPhotoContainer">
                <img src={photoUrl} alt="" />
            </div>
        </div>
        </>
    )
}

export default RandomPhoto;