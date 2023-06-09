
import {useModal} from '../../context/Modal'
import { useDispatch } from "react-redux"
import { deleteCommentThunk } from '../../store/playlist'

function DeleteCommentModal({comment}) {
    console.log(comment, "HERE IS THE COMMENT")
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteCommentThunk(comment.id))
        closeModal()
    }
    return (
        <div className='deletevideoModal'>
            <div>
                <h3>{`ARE YOU SURE YOU WANT TO Delete This Comment?`}</h3>
            </div>
            <div className='deleteandcancelBtn'>
                <div className='deletevidobtn'>
                    <button className="modalbtn" onClick={handleDelete}>Delete Comment</button>
                </div>
                <div className='cancelbtndelte'>
                     <button className="modalbtn" onClick={() => closeModal()}>Cancel</button>
                </div>
            </div>

        </div>
    )
}
export default DeleteCommentModal
