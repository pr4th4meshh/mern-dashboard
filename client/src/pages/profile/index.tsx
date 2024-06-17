import { Button, message } from "antd"
import { useDispatch } from "react-redux"
import { useSignoutMutation } from "../../redux/slices/authSlice"
import { clearUser } from "../../redux/slices/userSlice"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signout, {isLoading}] = useSignoutMutation()

    const handleSignout = async () => {
        try {
            await signout(null)
            dispatch(clearUser())
            navigate("/login")
            message.info("Logged out user")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button disabled={isLoading} onClick={handleSignout} className="bg-red-500 text-white">
    Logout user
    </Button>
  )
}

export default Profile