import { useNavigate } from "react-router-dom"

export const Userepel = () => {
    const nav = useNavigate()
    function repel(user, location) {
        if (!user.isRegistered) {
            nav('/not-registered')
        }
        else {
            nav(location)
        }
    }
    return{repel}
}