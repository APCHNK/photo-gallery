import { Link } from "react-router-dom";
import useService from "../Service/Service";
import { State, useAppDispatch, useAppSelector } from "../store";

function Gallery () {

    const { getPhotos, loading } = useService()
    const dispatch = useAppDispatch()

    const query = useAppSelector((state: State) => state.search)
    const galleryPage = useAppSelector((state: State) => state.galleryPage) + 1

    const getPhotosByclick = () => {
        if (query.length > 0) {
            getPhotos(query, galleryPage).then((res) => {
                dispatch({type: 'gallery', payload: res})
            })
        }
    }

    const changePage = (type: 'galleryNextPage' | 'galleryPreviousPage') => {
        if (galleryPage >= 1 && query) {
            getPhotos(query, galleryPage).then((res) => {
                dispatch({type: type})
                dispatch({type: 'gallery', payload: res})
            })
        }
    }


    const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.target instanceof HTMLInputElement && event.target.value) {
            console.log(event.target.value)
            dispatch({type: 'search', payload: event.target.value})
        }
    }

    const gallery = useAppSelector((state: State) => state.gallery).map((item) => <Link onClick={() => (dispatch({type: 'activePhoto', payload: item}))} to={`/photo/${item.id}`} key={item.id}><img src={item.url} alt=""/></Link>);
    const result = gallery.length > 0 && !loading ? gallery : <h2>No results</h2>


    return (
       <>
        <form onSubmit={(event) => event.preventDefault()} className="search-bar">
            <input onInput={(event) => onInputChange(event)} required type="text" id="searchInput" placeholder="Search for images..."/>
            <button onClick={() => getPhotosByclick()} id="searchButton">Search</button>
        </form>
        <div className="gallery" id="galleryContainer">
            {result}
        </div>
        <div className="button-container">
            <button onClick={() => changePage('galleryPreviousPage')} id="prevButton" className="nav-button">Back</button>
            <button onClick={() => changePage('galleryNextPage')} id="nextButton" className="nav-button">Next</button>
        </div>

        </>
    )
}
export default Gallery;