import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deletePlaylistThunk, getOnePlaylistThunk } from "../../store/playlist";
import SongCard from "../SongCard";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { BsThreeDots } from 'react-icons/bs';
import PlaylistMenu from "../PlaylistMenuModal";
import { getPlaylistSongsThunk, playOneSongThunk } from "../../store/currentSong";
import { IoPlay } from 'react-icons/io5';
import EditCommentModal from "../EditCommentModal";
import "../SongCard/songcards.css";
import DeleteCommentModal from "../DeleteCommentModal";
import { createCommentThunk } from "../../store/playlist";
function PlaylistPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const user = useSelector(state => state.session);
    const singlePlaylistObj = useSelector(state => state.playlist.singlePlaylist);
    const singlePlaylistLength = singlePlaylistObj.songs?.length;
    const [comments, setComments] = useState("")
    const maxCharacters = 250

    useEffect(() => {
        dispatch(getOnePlaylistThunk(playlistId));
    }, [dispatch, playlistId]);

    const handleSongPlayer = () => {
        dispatch(getPlaylistSongsThunk(playlistId));
    };

    if (Object.values(singlePlaylistObj).length === 0) {
        return null;
    }

    const handleClick = song => {
        dispatch(playOneSongThunk(song.id));
    };

    const handleCommentChange = (e) => {
        const inputComments = e.target.value;
        if (inputComments.length <= maxCharacters) {
            setComments(inputComments);
        }
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        await dispatch(createCommentThunk(playlistId, user.user.id, comments));
        setComments("");
    };

    const remainingCharacters = maxCharacters - comments.length;
    const getCharacterCountClass = () => {
        if (remainingCharacters >= 175) {
            return 'green';
        } else if (remainingCharacters >= 100) {
            return 'yellow';
        } else if (remainingCharacters >= 50) {
            return 'orange';
        } else {
            return 'red';
        }
    };
    return (
        <div>
            <div className="playlistImage">
                <img src={singlePlaylistObj.playlistImage} alt="Playlist" />
                <div className="commentsSection">
                    {singlePlaylistObj?.comments.map(comment => (
                        <div className="comment">
                            <div>
                                <img
                                    className="userProfileImage"
                                    src={
                                        comment?.author?.profileImage.length === 0
                                            ? "https://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original"
                                            : comment?.author?.profileImage
                                    }
                                    alt="User Profile"
                                />
                            </div>
                            <div>{comment.content}</div>
                            {comment.author.id === user.user.id && (
                                <div className="comment-buttons">
                                    <div>
                                        <OpenModalButton
                                            buttonText="Edit"
                                            modalComponent={<EditCommentModal comment={comment} />}
                                        />
                                    </div>
                                    <div>
                                        <OpenModalButton
                                            buttonText="Delete"
                                            modalComponent={<DeleteCommentModal comment={comment} />}
                                        />
                                    </div>

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="titleplaylistandComment">
                <div className="playlistName">{singlePlaylistObj.name}</div>
                <form className="submitCommentSection" onSubmit={handleCommentSubmit}>
                    <div className="submitComment">
                        <label className="labelcomment">
                            <textarea
                                id="commentArea"
                                type="text"
                                name="Comment"
                                placeholder="Type Comment Here"
                                value={comments}
                                onChange={handleCommentChange}
                                className="VideoUploadbtn"
                                maxLength={maxCharacters}
                            />
                        </label>
                        <div className="characterCounter">
                            <div>
                                Remaining characters:{" "}
                                <span className={getCharacterCountClass()}>{remainingCharacters}</span>
                            </div>
                            <div>
                                <button type="submit" className="commentButton">
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>


            <div className="playlist-play-options">
                <button className="buttons" onClick={handleSongPlayer}>
                    <IoPlay />
                </button>

                {singlePlaylistObj.userId === user.user.id && (
                    <div className="playlist-menu-dots">
                        <OpenModalButton
                            buttonText={<BsThreeDots />}
                            modalComponent={<PlaylistMenu playlistId={playlistId} />}
                        />
                    </div>
                )}
            </div>

            <div className="all-songs-container">
                <table className="all-songs-container-headers">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th colSpan={3}>Uploaded By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {singlePlaylistObj.songs.map((song, index) => (
                            <tr className="number-play" onClick={() => handleClick(song)}>
                                <SongCard
                                    fromPlaylist={true}
                                    song={song}
                                    number={index + 1}
                                    playlistId={playlistId}
                                    creatorId={singlePlaylistObj.userId}
                                />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PlaylistPage;
