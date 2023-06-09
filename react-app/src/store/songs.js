const GET_SONGS = "songs/GET_SONGS"
const UPDATE_SONGS = "songs/UPDATE_SONGS"
const DELETE_SONGS = "songs/DELETE_SONGS"
const SOLO_SONG = "songs/SOLO_SONG"
const CREATE_SONG = "songs/CREATE_SONG"
const LIKE_SONG = "songs/LIKE_SONG"
const UNLIKE_SONG = "songs/UNLIKE_SONG"

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
const likeSongs = (data) => {
    return {
        type: LIKE_SONG,
        payload: data
    }
};
const unlikeSong = (songId) => {
    return {
        type: UNLIKE_SONG,
        payload: songId
    }
}
const soloSong = (data) => {
    return {
        type: SOLO_SONG,
        payload: data
    }
}

const createSong = (data) => {
    return {
        type: CREATE_SONG,
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
export const editSongThunk = (song, id) => async (dispatch) => {
    const response = await fetch(`/songs/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(song)
    })
    if (response.ok) {
        const data = response.json()
        // await dispatch(getSongs())
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
    const response = await fetch('/songs/new', {
        method: 'POST',
        body: song,
    });
    if (response.ok) {
        const newSong = await response.json();
        await dispatch(createSong(newSong))
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

export const likeSongThunk = (songId, userId) => async (dispatch) => {
    const response = await fetch(`/songs/${songId}/likes/users/${userId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({songId, userId})
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(likeSongs(data))
        return response
    } else {
        return {"message": "like song thunk machine broke"}
    }
}

export const unlikeSongThunk = (songId, userId) => async (dispatch) => {
    const response = await fetch(`/songs/${songId}/likes/users/${userId}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({songId, userId})
    })
    if (response.ok) {
        const data = await response.json()
        return response
    } else {
        return {"message": "unlike song thunk machine broke"}
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
            newState = Object.assign({}, state)
            delete newState[action.payload]
            return newState
        case SOLO_SONG:
            newState = Object.assign({}, state.singleSong)
            newState[action.payload.id] = action.payload
            return newState
        case CREATE_SONG:
            newState = Object.assign({}, state.songs)
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}
export default songReducer
