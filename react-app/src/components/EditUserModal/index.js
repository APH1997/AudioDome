import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUserThunk } from "../../store/session"
import { useModal } from '../../context/Modal'
import DeleteAccount from "../UserPage/DeleteAccountModal"
import OpenModalButton from "../OpenModalButton"
import './usermodal.css'

const UserProileModal = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bio, setBio] = useState('')
    const [imgFile, setImageFile] = useState(null)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [error, setError] = useState(null)


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
        if (user.id === 4){
            closeModal()
            alert("Sign Up for an account to unlock profile feature!")
            return
        }
        if (!username) {
            setError('Username is required')
            return
        }
        if (username.length > 100) {
            setError('Length of username must be at most 100 characters')
            return
        }
        if (firstName === null) {
            setError('first name is required')
            return
        }
        if (firstName.length > 100) {
            setError('Length of first name must be at most 100 characters')
            return
        }
        if (lastName === null) {
            setError('last name is required')
            return
        }
        if (lastName.length > 100) {
            setError('Length of last name must be at most 100 characters')
            return
        }
        if (bio === null) {
            setError('Bio is required')
            return
        }
        const formData = new FormData()
        if (user.username !== username) {
            formData.append('username', username)
        } else {
            formData.append('username', 'giraffenostrilwidenderplusULTRA')
        }
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('bio', bio)
        if (imgFile) {
            formData.append('profile_image', imgFile)
        }

        dispatch(updateUserThunk(formData, user.id))
        closeModal()
    }



    return (
        <div className="user-modal">
            <div>
                <h1>UPDATE USER ACCOUNT</h1>
            </div>
            <form onSubmit={handelSubmit}>
                {error &&
                    <div className="error">
                        {error}
                    </div>}
                <label>
                    UserName
                    <input
                        type="text"
                        placeholder={username || 'username'}
                        // value={''}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    First Name
                    <input
                        type="text"
                        placeholder={firstName || 'first name'}
                        // value={''}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        // value={''}
                        placeholder={lastName || 'last name'}
                        onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    Bio
                    <input
                        type="text"
                        placeholder={bio || 'bio'}
                        // value={''}
                        onChange={e => setBio(e.target.value)}
                    />
                </label>
                <div className="profilePictureupload">
                    <input
                        id="hideprofilepicture1"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="hideprofilepicture"
                    />
                    <label htmlFor="hideprofilepicture1" className="upload-button">
                        <i className="fas fa-cloud-upload-alt"></i>
                        {imgFile ? "Picture Ready to Upload" : "Upload Picture"}
                    </label>
                </div>
                <div>

                </div>
                <div className="seperatingDeleteandUpdate">
                    <div>
                        <button className="submit" type="submit">
                            Update
                        </button>
                    </div>
                    <div>
                        <OpenModalButton
                            buttonText="Delete Account"
                            modalComponent={<DeleteAccount user={user} />}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserProileModal
