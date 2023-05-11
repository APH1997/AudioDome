import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {useModal} from '../../context/Modal'
import { deleteUserThunk } from "../../store/session"
import {useHistory} from 'react-router-dom'
import { logout } from "../../store/session"

function DeleteAccount({user}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()
    function handleDelete(){
        dispatch(deleteUserThunk(user))
        dispatch(logout())
        closeModal()
        history.push('/')
    }

    return (
        <>
        <h3>{`ARE YOU SURE YOU WANT TO REMOVE YOUR ACCOUNT?`}</h3>
        <p>All playlist and song data will be removed</p>
            <button onClick={handleDelete}>Delete Account</button>
            <button onClick={() => closeModal()}>Cancel</button>
        </>
    )
}

export default DeleteAccount
