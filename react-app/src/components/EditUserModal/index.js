import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const UserProileModal = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bio, setBio] = useState('')
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setBio(user.bio)
        }
    }, [user])

    const handelSubmit = () => {
        return 'something'
    }

    return (
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
            <button type="submit">
                Update
            </button>
        </form>
    )
}

export default UserProileModal