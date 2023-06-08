import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useModal } from '../../context/Modal'
import { deleteUserThunk } from "../../store/session"
import { useHistory } from 'react-router-dom'
import { logout } from "../../store/session"

function DeleteAccount({ user }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const handleDelete = async () => {
        if (user.id !== 4) {
            await dispatch(deleteUserThunk(user))
            await dispatch(logout())
            closeModal()
            history.push('/')
        } else {
            closeModal()
            alert("Cannot Delete the Demo User")
        }
    }

    return (
        <>
            <div className="deleteUserModal">
                <h3>{`ARE YOU SURE YOU WANT TO REMOVE YOUR ACCOUNT?`}</h3>
                <p>All playlist and song data will be removed</p>
                <div className="deleteUserModalButtons">
                    <button className="modalbtn" onClick={handleDelete}>Delete Account</button>
                    <button className="modalbtn" onClick={() => closeModal()}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default DeleteAccount
