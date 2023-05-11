import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUserThunk } from "../../store/session"
import {useModal} from '../../context/Modal'
import DeleteAccount from "../UserPage/DeleteAccountModal"
import OpenModalButton from "../OpenModalButton"

const UserProileModal = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bio, setBio] = useState('')
    const [imgFile, setImageFile] = useState(null)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setBio(user.bio)
        }
    }, [user])

    const handelSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (user.username !== username){
            formData.append('username', username)
        }
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('bio',bio)
        if (imgFile){
            formData.append('profile_image', imgFile)
        }
        console.log(formData)

        dispatch(updateUserThunk(formData,user.id))
        closeModal()
    }



    return (
        <>
            <form onSubmit={handelSubmit}>
                <label>
                    UserName
                    <input
                    type="text"
                    value={username || 'username'}
                    onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    First Name
                    <input
                    type="text"
                    value={firstName || 'first name'}
                    onChange={e => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    Last Name
                    <input
                    type="text"
                    value={lastName || 'last name'}
                    onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    Bio
                    <input
                    type="text"
                    value={bio || 'bio'}
                    onChange={e => setBio(e.target.value)}
                    />
                </label>
                <label>
                    Profile Picture
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </label>
                <button type="submit">
                    Update
                </button>
            </form>
            <OpenModalButton
            buttonText="Delete Account"
            modalComponent={<DeleteAccount user={user}/>}
            />
        </>
    )
}

export default UserProileModal
