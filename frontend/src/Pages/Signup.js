import { useState } from "react";
import { useHistory } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"
import { fetchCall } from "../Utils/fetchCall";
import { getCookiesData, setCookies } from "../Utils/cookies";
import Input from '../Components/Shared_Components/Input'

const Signup = () => {
    const history = useHistory(),
        [email, setEmail] = useState(''),
        [password, setPass] = useState(""),
        [passwordAgain, setPasswordAgain] = useState(""),
        [error, setError] = useState(''),
        [birthdate, setBirth] = useState(''),
        [firstName, setFname] = useState(''),
        [lastName, setLname] = useState(''),
        [userName, setUserName] = useState(''),
        current = new Date().toISOString().split("T")[0]

    const handleSubmit = async () => {
        if (firstName === lastName) {
            setError((v) => ('First-name and Last-name cannot be same'))
        } else {
            const data = await fetchCall('/signup', 'POST', { firstName, lastName, userName, birthdate, email, password })
            if (data.user) {
                const { id } = getCookiesData()
                if (id === data.user._id) {
                    history.push('/')
                    window.location.reload()
                } else {
                    setError((v) => ('user not found'))
                }
            }
        }
    }
    const handleChange = (e) => {
        setBirth((b) => (e.target.value))
    }
    return (
        <div className="create">
            <h1>Sign Up</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <Input
                    label={'First Name'}
                    value={firstName}
                    maxLength={15}
                    placeholder={'please enter your first name'}
                    onChange={(e) => {
                        setError((v) => (''))
                        setFname(e.target.value)
                    }}
                />
                <Input
                    label={'Last Name'}
                    value={lastName}
                    maxLength={15}
                    placeholder={'please enter your last name'}
                    onChange={(e) => {
                        setError((v) => (''))
                        setLname(e.target.value)
                    }}
                />
                <Input
                    label={'User Name'}
                    value={userName}
                    maxLength={15}
                    placeholder={'please enter a unique User name not more than 15 characters'}
                    onChange={(e) => {
                        setError((v) => (''))
                        setUserName(e.target.value)
                    }}
                />
                <Input
                    type={'date'}
                    label={'Date Of Birth'}
                    value={birthdate}
                    onChange={handleChange}
                    max={current}
                />
                <Input
                    label={'Email'}
                    value={email}
                    maxLength={30}
                    placeholder={'please enter an email that is unique'}
                    onChange={(e) => {
                        setError((v) => (''))
                        setEmail(e.target.value)
                    }}
                />
                <Input
                    label={'Password'}
                    value={password}
                    type={'password'}
                    minLength={8}
                    placeholder={'please enter a password'}
                    onChange={(e) => {
                        setError((v) => (''))
                        setPass(e.target.value)
                    }}

                />
                <Input
                    label={'Confirm Password'}
                    type="password"
                    onChange={e => setPasswordAgain(e.target.value)}
                    placeholder='please confirm your password'
                />
                <PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital", "match"]}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                    onChange={(isValid) => {
                        const btn = document.querySelector('.sign')
                        if (isValid) {
                            btn.disabled = false
                        } else {
                            btn.disabled = true
                        }
                    }}
                />
                {error && <h5 className="error">{error}</h5>}
                <button disabled className="create-btn sign">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;