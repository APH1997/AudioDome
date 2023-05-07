const GET_SONGS = "songs/GET_SONGS"
const UPDATE_SONGS = "songs/UPDATE_SONGS"
const DELETE_SONGS = "songs/DELETE_SONGS"

const getSongs = (data) => {
    return {
        type: GET_SONGS,
        payload: data
    }
};
const deleteSong = (songId) => {
    return {
        type: DELETE_SONGS,
        payload: songId
    }
}
export const editSongThunk = (song) => async (dispatch) => {
    const response = await fetch(`/${song.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song),
    })
    if (response.ok) {
        const data = response.json()
        return song
    }
}
export const removeSongThunk = (songId) => async (dispatch) => {
    const response = await fetch(`/${songId}`, { method: 'DELETE' })
    if (response.ok) {
        const data = await response.json()
        await dispatch(deleteSong(songId))
        return data
    }
}
export const createSongThunk = (song) => async (dispatch) => {
    console.log("HERE IS THE CONSOLE.LOG", song)
    const response = await fetch('/new', {
        method: 'POST',
        body: song,
    });
    if (response.ok) {
        const newSong = await response.json();
        return newSong
    }
}

export const getSongsThunk = () => async (dispatch) => {
    const response = await fetch("/songs/")
    if (response.ok) {
        const data = await response.json()
        await dispatch(getSongs(data))
        return data
    }
}
const initialState = { songs: null };
const songReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SONGS:
            newState = Object.assign({}, state.songs)
            action.payload.forEach(song => { newState[song.id] = song })
            return newState
        case DELETE_SONGS:
            newState = Object.assign({}, state)
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}
export default songReducer
