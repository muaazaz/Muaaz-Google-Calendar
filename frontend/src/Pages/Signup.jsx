import { useEffect, useState } from "react";
import PasswordChecklist from "react-password-checklist"
import Input from '../Components/Shared_Components/Input'
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../Redux/user/userAction";
import { useHistory } from "react-router-dom";

const Signup = () => {

    const dispatch = useDispatch(),
        history = useHistory(),
        data = useSelector((state) => state.userValidation),
        [formData, setFormData] = useState({
            email: "",
            password: "",
            passwordAgain: "",
            birthdate: "",
            firstName: "",
            lastName: "",
            userName: ""
        }),
        [error, setError] = useState(''),
        current = new Date().toISOString().split("T")[0]

        useEffect(()=>{
            if(data.token){
                history.push('/')
            }else{
                setError(data.error)
            }
        },[data])
    //handeling form submition for signUp
    const handleSubmit = async () => {
        if (formData.firstName === formData.lastName) {
            setError('First-name and Last-name cannot be same')
        } else {
            dispatch(signUp(formData))
        }
    }

    //seting birthday state
    const handleChange = (e) => {
        setFormData({
            ...formData,
            birthdate: e.target.value
        })
    }

    return (
        <div className="create">
            <h1>Sign Up</h1>
            <form
                autoComplete="on"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                <Input
                    label={'First Name'}
                    value={formData.firstName}
                    maxLength={15}
                    placeholder={'please enter your first name'}
                    onChange={(e) => {
                        setError('')
                        setFormData({
                            ...formData,
                            firstName: e.target.value
                        })
                    }}
                />
                <Input
                    label={'Last Name'}
                    value={formData.lastName}
                    maxLength={15}
                    placeholder={'please enter your last name'}
                    onChange={(e) => {
                        setError('')
                        setFormData({
                            ...formData,
                            lastName: e.target.value
                        })
                    }}
                />
                <Input
                    label={'User Name'}
                    value={formData.userName}
                    maxLength={15}
                    placeholder={'please enter a unique User name not more than 15 characters'}
                    onChange={(e) => {
                        setError('')
                        setFormData({
                            ...formData,
                            userName: e.target.value
                        })
                    }}
                />
                <Input
                    type={'date'}
                    label={'Date Of Birth'}
                    value={formData.birthdate}
                    onChange={handleChange}
                    max={current}
                />
                <Input
                    label={'Email'}
                    value={formData.email}
                    maxLength={30}
                    placeholder={'please enter an email that is unique'}
                    onChange={(e) => {
                        setError('')
                        setFormData({
                            ...formData,
                            email: e.target.value
                        })
                    }}
                />
                <Input
                    label={'Password'}
                    value={formData.password}
                    type={'password'}
                    minLength={8}
                    placeholder={'please enter a password'}
                    onChange={(e) => {
                        setError('')
                        setFormData({
                            ...formData,
                            password: e.target.value
                        })
                    }}

                />
                <Input
                    label={'Confirm Password'}
                    type="password"
                    onChange={e => setFormData({
                        ...formData,
                        passwordAgain: e.target.value
                    })}
                    placeholder='please confirm your password'
                />
                <PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital", "match"]}
                    minLength={8}
                    value={formData.password}
                    valueAgain={formData.passwordAgain}
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