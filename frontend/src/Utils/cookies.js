import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const getCookiesData = () => {
    const token = Cookies.get('jwt'),
        email = Cookies.get('email')

    if (token) {
        const decodedToken = jwtDecode(token),
            id = decodedToken.id
        return { id, email, token}
    }

    return {}
}
export const removeCookiesData = () => {
    Cookies.remove('jwt')
    Cookies.remove('email')
    Cookies.set('loggedIn', false)
    return {}
}