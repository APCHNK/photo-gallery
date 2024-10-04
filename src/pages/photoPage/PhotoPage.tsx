import { Link, useParams } from 'react-router-dom';
import './photoPage.css'
import { useEffect } from 'react';
import { State, useAppSelector } from '../../store';

function PhotoPage() {
    const { id } = useParams()
    useEffect(() => {
        
    }, [])
    const imageUrl = useAppSelector((state: State)=> state.activePhoto.url)
    return(
        <div className="photo-page">
            <Link to='/' className="back-button">Назад</Link>
            <div className="photo-container">
                <img src={imageUrl}  className="photo" />
            </div>
            <a href={`https://unsplash.com/photos/${id}/download?force=true`} download="proposed_file_name.jpeg">Download</a>

        </div>
    )
}

export default PhotoPage;