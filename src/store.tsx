import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
export type RandomPhotoAction = {
    type: 'randomPhoto',
    payload: {
        url: string
    }
}
export type InputSearchAction = {
    type: 'search',
    payload: string
}
export type GalleryAction = {
    type: 'gallery',
    payload: Photo[]
}
export type GalleryPageAction = {
    type: 'galleryNextPage' | 'galleryPreviousPage',
    payload: number;
}
export type ActivePhotoAction = {
    type: 'activePhoto',
    payload: Photo
}


export type State = {
    randomPhoto: string;
    search: string;
    gallery: Photo[];
    galleryPage: number;
    activePhoto: Photo
}

export type Photo = {
    url: string;
    id: string
}

const initialState: State = {
    randomPhoto: '',
    search: '',
    gallery: [],
    galleryPage: 1,
    activePhoto: {
        url: '',
        id: ''
    }
}

type Action = RandomPhotoAction | InputSearchAction | GalleryAction | GalleryPageAction | ActivePhotoAction
const reducer = (state = initialState, action: Action): State => {

    switch (action.type) {
        case 'randomPhoto':
            return {
                ...state,
                randomPhoto: action.payload.url
            }
        case 'search':
            return {
                ...state,
                search: action.payload
            }
        case 'gallery':
            return{
                ...state,
                gallery: action.payload
            }
        case 'galleryNextPage':
            return {
                ...state,
                galleryPage: state.galleryPage + 1
            }
        case 'galleryPreviousPage':
            return {
                ...state,
                galleryPage: state.galleryPage - 1
            }
        case 'activePhoto':
            return {
                ...state,
                activePhoto: action.payload
            }
        
        default:
            return state
    }
}

export const store = configureStore({
    reducer: reducer
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()