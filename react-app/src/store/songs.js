const CREATE_SONGS = "songs/CREATE_SONGS"
const GET_SONGS = "songs/GET_SONGS"
const UPDATE_SONGS = "songs/UPDATE_SONGS"
const DELETE_SONGS = "songs/DELETE_SONGS"

const getSongs = (data) => ({
    type: GET_SONGS,
    payload: data
});

export const getSongsThunk = () => async (dispatch) => {
    const response = await fetch("/songs/")
    if (response.ok){
        const data = await response.json()
        await dispatch(getSongs(data))
        return data
    }
}
const initialState = { songs: null};
const songReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_SONGS:
            newState = Object.assign({}, state.songs)
            action.payload.Songs.forEach(song=> {newState[song.id] = song})
            return newState
        default:
            return state;
    }
}
export default SongReducer
