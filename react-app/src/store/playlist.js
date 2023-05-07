const GET_ALL_PLAYLIST = 'playlists/GetAllPlaylist';
const GET_ONE_PLAYLIST = 'playlists/GetOnePlaylist';

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
        default:
            return state
    }
}

export default playlistReducer
