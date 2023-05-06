import { useDispatch, useSelector } from "react-redux"

function GetAllPlaylist() {
    const dispatch = useDispatch()
    const allPlaylistsObj = useSelector(state => state.playlists)
    const allPlaylists = Object.values(allPlaylistsObj)
    console.log(allPlaylists);
    return (
        <div>
            hello
        </div>
    )
}


export default GetAllPlaylist
