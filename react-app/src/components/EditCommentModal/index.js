import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useModal } from '../../context/Modal'
import { updateCommentThunk } from "../../store/playlist";

const EditCommentModal = ({comment}) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [comments, setComment] = useState('')
    const [error, setError] = useState(null);
    useEffect(()=>{
        setComment(comment.content)
    },[dispatch])

    const handleCommentChange = (e) => {
        const text = e.target.value;
        if (text.length <= 250) {
            setComment(text);
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();


        if (!comments) {
            setError('comment is required');
            return;
        }

        await dispatch(updateCommentThunk(comment.id, comments));
        closeModal();
    };
    if (!comment) return null
    return (
        <div>
            <div className="editVideoModalTitle">
                <h1 className="editTitle">Edit Your Comment</h1>
            </div>
            <div>
                <form method="PUT" onSubmit={onSubmit}>
                    <label>
                        <div>Comment (Max 250 characters)</div>
                        <div className="textareaAndCounter">
                            <textarea id="about-video" value={comments} placeholder='Comment' onChange={handleCommentChange} style={{ height: '100px', width: '300px' }}></textarea>
                            <div className='character-counter'>{comments?.length}/250</div>
                        </div>

                    </label>
            <div className="divforbuttons">
                <div>
                    <button className="Updatebutton" type="submit">Update Comment</button>
                </div>
                <div>
                    <button className="CancelUpdateButton" onClick={() => closeModal()}>Cancel</button>
                </div>
            </div>
                </form>
            </div>
        </div>
    )


}

export default EditCommentModal
