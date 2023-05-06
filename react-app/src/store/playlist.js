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
        const data = res.json()

        dispatch(GetAllPlaylistAction(data))
    }

}

const initialState = { allPlaylists:{}, singlePlaylist:{} }

const playlistReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_ALL_PLAYLIST: {
            const newState = { ...state, allPlaylists: {} }
            action.playlist.Playlist.forEach(playlist => newState.allPlaylists[playlist.id] = playlist)
            return newState
        }
    }
}

export default playlistReducer
