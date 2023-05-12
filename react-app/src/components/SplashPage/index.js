import SignupFormModal from "../SignupFormModal"
import SignupFormPage from "../SignupFormPage"
import LoginFormModal from "../LoginFormPage"
import OpenModalButton from "../OpenModalButton"
import { useDispatch } from "react-redux"
import { login } from "../../store/session";



function SplashPage() {
    const dispatch = useDispatch()
    const handleOnClick = async () => {
        const email = "demoo@aa.io"
        const password = "password"
        const data = await dispatch(login(email, password));
    }
    return (
        <>
            <h1>Please Sign in to venture into the AudioDome!!!!</h1>
            <div className="splashScreenButtons">
                <OpenModalButton
                    buttonText="Login"
                    modalComponent={<LoginFormModal />} />
                <OpenModalButton
                    buttonText="Signup"
                    modalComponent={<SignupFormModal />} />
                <button onClick={handleOnClick}>Demo User</button>
            </div>
        </>
    )
}

export default SplashPage
