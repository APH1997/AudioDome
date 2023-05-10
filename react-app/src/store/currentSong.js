const GET_ALL = "currentSong/GET_ALL";
const GET_PLAYLIST_SONG = 'currentSong/GET_PLAYLIST_SONG';

const getAllSong = (data) => {
    return {
        type: GET_ALL,
        payload: data
    }
}

const getPlaylistSongAction = (data) => {
    return {
        type: GET_PLAYLIST_SONG,
        payload: data
    }
}

export const getPlaylistSongsThunk = (id) => async dispatch => {

    const res = await fetch (`/playlists/${id}`)

    if(res.ok){
        const data = await res.json()

        dispatch(getPlaylistSongAction(data))
        return data
    }
}

export const getAllSongsThunk = () => async (dispatch) =>{
    const response = await fetch("/songs/")
    if (response.ok) {
        const data = await response.json()
        await dispatch(getAllSong(data))
        return data
    }
}
const initialState = {currentSong: null}
const currentSongReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL: {
            newState = Object.assign({}, state.currentSong)
            action.payload.forEach(song => {newState[song.id] = song})
            return newState
        }
        case GET_PLAYLIST_SONG: {
            newState = Object.assign({}, state.currentSong)
            action.payload.songs.forEach(song => {newState[song.id] = song})
            return newState
        }
        default:
            return state;
    }
}
export default currentSongReducer
