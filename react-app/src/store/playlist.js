const GET_ALL_PLAYLIST = 'playlists/GetAllPlaylist';
const GET_ONE_PLAYLIST = 'playlists/GetOnePlaylist';
const CREATE_PLAYLIST = 'playlists/CreatePlaylist';
const DELETE_PLAYLIST = 'playlists/DeletePlaylist';
const DELETE_SONG_FROM_PLAYLIST = 'playlists/DeleteSongFromPlaylist';
const CREATE_COMMENT = 'playlist/CreateComment';
const UPDATE_COMMENT = 'playlist/UpdateComment';
const DELETE_COMMENT = 'playlist/DeleteComment';

export const DeletePlaylistAction = (playlistId) => {
    return {
        type: DELETE_PLAYLIST,
        playlistId
    }
}

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
    const res = await fetch(`/playlists/${playlistId}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    })
    if (res.ok){
        await dispatch(DeletePlaylistAction(playlistId))
    } else {
        return false
    }
}

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
export const deleteSongFromPlaylistAction = (playlistId, songId) => {
    return{
        type: DELETE_SONG_FROM_PLAYLIST,
        payload: {playlistId, songId}
    }
}


export const deleteSongFromPlaylistThunk = (playlist_id, song_id) => async dispatch => {
    const res = await fetch(`/playlists/${playlist_id}/delete/${song_id}`,{
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(playlist_id, song_id)
    })

    if (res.ok){
        const newRes = await res.json()
        dispatch(deleteSongFromPlaylistAction(playlist_id, song_id))
        return newRes
    } else {
        return false
    }
}
export const getAllPlaylistThunk = () => async dispatch => {
    const res = await fetch ('/playlists/')

    if (res.ok) {
        const data = await res.json()
        dispatch(GetAllPlaylistAction(data))
    }

}

export const createPlaylistThunk = (formData) => async dispatch => {
    const res = await fetch ('/playlists/new', {
        method: 'POST',
        body: formData
    })

    if (res.ok) {
        const data = await res.json()

        dispatch(CreatePlaylistAction(data))
    } else {
        return false
    }
}

export const updatePlaylistThunk = (formData, playlistId) => async dispatch => {
    const res = await fetch (`/playlists/${playlistId}`, {
        method: 'PUT',
        body: formData
    })

    if (res.ok){
        return {"message": "playlist updated"}
    } else {
        return {"message": "playlist failed to update"}
    }
}

export const addSongToPlaylistThunk = (playlist_ids, song_id) => async(dispatch) => {
    const res = await fetch (`/playlists/add`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({playlist_ids, song_id})
    })
    if (res.ok){
        return {"message": "song added to playlist"}
    } else {
        return {"message": "song failed to be added to playlist"}
    }
}

const commentAction = (playlist) => {
    return {
        type: CREATE_COMMENT,
        payload: playlist
    }
}


export const createCommentThunk = (playlistId, userId, content) => async (dispatch) => {
    const res = await fetch(`/playlists/${playlistId}/user/${userId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content})
    })
    //res should be the playlist who's comment was edited
    const data = await res.json()
    if (res.ok){
        dispatch(commentAction(data))
    } else {
        return data
    }
}

export const updateCommentThunk = (commentId, content) => async (dispatch) => {
    const res = await fetch(`/playlists/comments/${commentId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content})
    })
    //res should be the playlist who's comment was edited
    const data = await res.json()
    if (res.ok){
        dispatch(commentAction(data))
    } else {
        return data
    }
}
export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/playlists/comments/${commentId}`, {
        method: 'DELETE',
    })
    //res should be the playlist who's comment was edited
    const data = await res.json()
    if (res.ok){
        dispatch(commentAction(data))
    } else {
        return data
    }
}

const initialState = { allPlaylists:{}, singlePlaylist:{}, singleSong:{} }

const playlistReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_ALL_PLAYLIST: {
            const newState = { allPlaylists: {}, singlePlaylist: {} }
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
        case DELETE_PLAYLIST: {
            const newState = {...state, allPlaylists: {...state.allPlaylists}}
            delete newState.allPlaylists[action.playlistId]
            return newState
        }
        case DELETE_SONG_FROM_PLAYLIST: {
            const newState = {...state, singlePlaylist: {...state.singlePlaylist}}
            for(let i = 0; i< newState.singlePlaylist.songs.length; i++){
                let song = newState.singlePlaylist.songs[i]
                if(song.id === action.payload.songId){
                    newState.singlePlaylist.songs.splice(i,1)
                }
            }
            return newState
        }
        case CREATE_COMMENT: {
            const newState = {allPlaylists: {...state.allPlaylists}, singlePlaylist: {...state.singlePlaylist}, singleSong: {...state.singleSong}}
            newState.allPlaylists[action.payload.id] = action.payload
            newState.singlePlaylist = action.payload

            return newState
        }
        default:
            return state
    }
}

export default playlistReducer
