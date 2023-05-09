const GET_ALL = "currentSong/GET_ALL"

const getAllSong = (data) => {
    return {
        type: GET_ALL,
        payload: data
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
        case GET_ALL:
            newState = Object.assign({}, state.currentSong)
            action.payload.forEach(song => {newState[song.id] = song})
            return newState
        default:
            return state;
    }
}
export default currentSongReducer
