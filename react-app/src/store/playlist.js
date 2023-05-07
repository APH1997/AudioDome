const GET_ALL_PLAYLIST = 'playlists/GetAllPlaylist';

export const GetAllPlaylistAction = (playlist) => {
    return {
        type: GET_ALL_PLAYLIST,
        playlist
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
        default:
            return state
    }
}

export default playlistReducer
