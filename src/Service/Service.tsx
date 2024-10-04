import { useHttp } from "../hooks/http.hook";

type Url = {
    regular?: string;
    full?: string;
    raw?: string;
    small?: string;
    thumb?: string;
}
type Photo = {
    urls: Url,
    id: string
}

function useService() {
    const { request, loading } = useHttp();


    const _apiKey = 'client_id=goQFvl7qmxAC36T5IxbIPau-Jj6u4wOF_iT_yfpft2M';
    const _apiBase = 'https://api.unsplash.com/';

    const getRandomPhoto = async () => {
        const res = await request(`${_apiBase}photos/random?count=1&${_apiKey}`);
        return _transformRandomPhoto(res[0])
    };
    const getPhotos = async (query: string = 'top', page: number = 1) => {
        const res = await request(`${_apiBase}search/photos?page=${page}&query=${query}&${_apiKey}`);
        return res.results.map(_transformPhotos)
    };
    
    const _transformRandomPhoto = (res: Photo) => {
        return {
            url: res.urls.regular,
            id: res.id
        }
    }
    const _transformPhotos = (res: Photo) => {
        return {
            url: res.urls.regular,
            id: res.id
        }
    }


    return {getRandomPhoto, getPhotos, loading}

}

export default useService