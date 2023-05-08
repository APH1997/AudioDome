const GET_SONGS = "songs/GET_SONGS"
const UPDATE_SONGS = "songs/UPDATE_SONGS"
const DELETE_SONGS = "songs/DELETE_SONGS"
const SOLO_SONG = "songs/SOLO_SONG"

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
const soloSong = (data) => {
    return {
        type: SOLO_SONG,
        payload: data
    }
}
export const soloSongThunk = (songId) => async (dispatch) =>{
    const response = await fetch(`/songs/${songId}`)
    if (response.ok){
        const data = await response.json()
        await dispatch(soloSong(data))
        return data
    }
}
export const editSongThunk = (song) => async (dispatch) => {
    console.log("INSIDE THE EDIT THUNK", song)
    const response = await fetch(`/songs/${song.id}`, {
        method: 'PUT',
        body: song
    })
    if (response.ok) {
        const data = response.json()
        return song
    }
}
export const removeSongThunk = (songId) => async (dispatch) => {
    const response = await fetch(`/songs/${songId}`, { method: 'DELETE' })
    if (response.ok) {
        const data = await response.json()
        await dispatch(deleteSong(songId))
        return data
    }
}
export const createSongThunk = (song) => async (dispatch) => {
    console.log("HERE IS THE CONSOLE.LOG", song)
    const response = await fetch('/songs/new', {
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
const initialState = { songs: null , singleSong: null};
const songReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SONGS:
            newState = Object.assign({}, state.songs)
            action.payload.forEach(song => { newState[song.id] = song })
            return newState
        case DELETE_SONGS:
            newState = Object.assign({}, state.songs)
            delete newState.songs[action.payload]
            return newState
        case SOLO_SONG:
            newState = Object.assign({}, state.singleSong)
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}
export default songReducer
