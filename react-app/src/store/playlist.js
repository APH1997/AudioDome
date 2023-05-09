const GET_ALL_PLAYLIST = 'playlists/GetAllPlaylist';
const GET_ONE_PLAYLIST = 'playlists/GetOnePlaylist';
const CREATE_PLAYLIST = 'playlists/CreatePlaylist'

export const GetAllPlaylistAction = (playlist) => {
    return {
        type: GET_ALL_PLAYLIST,
        playlist
    }
}

export const GetOnePlaylistAction = (playlist) => {
    return {
        type: GET_ONE_PLAYLIST,
        playlist
    }
}

export const CreatePlaylistAction = (playlist) => {
    return {
        type: CREATE_PLAYLIST,
        playlist
    }
}

export const getOnePlaylistThunk = (id) => async dispatch => {

    const res = await fetch (`/playlists/${id}`)

    if (res.ok) {

        const data = await res.json()

        dispatch(GetOnePlaylistAction(data))
    }
}

export const getAllPlaylistThunk = () => async dispatch => {

    const res = await fetch ('/playlists/')

    if (res.ok) {
        const data = await res.json()

        dispatch(GetAllPlaylistAction(data))
    }

}

export const createPlaylistThunk = (playlist) => async dispatch => {

    const res = await fetch ('/playlists/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playlist)
    })

    if (res.ok) {
        const data = await res.json()

        dispatch(CreatePlaylistAction(data))
    }
}

const initialState = { allPlaylists:{}, singlePlaylist:{} }

const playlistReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_ALL_PLAYLIST: {
            const newState = { ...state, allPlaylists: {...state.allPlaylists} }
            // console.log(action,'this is the action');
            // console.log(newState, 'this is the state');
            action.playlist.forEach(playlist => newState.allPlaylists[playlist.id] = playlist)
            return newState
        }
        case GET_ONE_PLAYLIST: {
            const newState  = { ...state, singlePlaylist: {...state.singlePlaylist}}
            newState.singlePlaylist = action.playlist
            return newState
        }
        case CREATE_PLAYLIST: {
            const newState = {...state, allPlaylists: {...state.allPlaylists}}
            newState.allPlaylists[action.playlist.id] = action.playlist
            return newState
        }
        default:
            return state
    }
}

export default playlistReducer
