import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../Components/Shared_Components/Input"
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../Redux/user/userAction";

const Login = () => {
  const history = useHistory(),
    dispatch = useDispatch(),
    data = useSelector((state) => state.userValidation),
    [formData, setFormData] = useState({
      email: "",
      password: "",
      userName: ""
    }),
    [error, setError] = useState(""),
    [isUserName, setIsUserName] = useState(false),
    [isEmail, setIsEmail] = useState(false),
    [isHidden, setIsHidden] = useState(true)

    useEffect(()=>{
      if(data.token){
          history.push('/')
      }else{
          setError((v)=> data.error)
      }
  },[data])

  const handleSubmit = async () => {
    dispatch(logIn(formData))
  };

  const handleEmail = () => {
    setIsEmail(true);
    setIsHidden(false)
  };

  const handleUsername = () => {
    setIsUserName(true);
    setIsHidden(false)
  };

  useEffect(() => {

  }, [isEmail, isUserName])

  return (
    <div className="create">
      <h1>Log In</h1>
      {
        !isEmail && !isUserName &&
        <>
          <div className="select" onClick={handleEmail}>
            <h2>Log In Using Email Address</h2>
          </div>
          <div className="select1" onClick={handleUsername}>
            <h2>Log In Using Your User Name</h2>
          </div>
        </>
      }

      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
      >
        {
          isEmail &&
          <Input
            label={'Email'}
            maxLength={30}
            value={formData.email}
            placeholder={"please enter your email"}
            onChange={(e) => {
              setError("");
              setFormData({
                ...formData,
                email: e.target.value
              })
            }}
          />
        }
        {
          isUserName &&
          <Input
            label={'User Name'}
            maxLength={30}
            value={formData.userName}
            placeholder={'please enter you user name'}
            onChange={(e) => {
              setError("")
              setFormData({
                ...formData,
                userName: e.target.value
              })
            }}
          />
        }
        {
          (isEmail || isUserName) &&
          <Input
            label={'Password'}
            type="password"
            minLength={8}
            value={formData.password}
            placeholder={"please enter your password"}
            onChange={(e) => {
              if (e.target.value.length < 8) {
                setError("pasword is short");
                setFormData({
                  ...formData,
                  password: e.target.value
                })
              } else {
                setError("");
                setFormData({
                  ...formData,
                  password: e.target.value
                })
              }
            }}
          />
        }
        {error && <h5 className="error">{error}</h5>}
        <button className="create-btn" hidden={isHidden}>Log In</button>
      </form>
      <button className="toggle"
        hidden={isHidden}
        onClick={() => {
          if (isEmail) {
            setIsEmail(false)
            setIsUserName(true)
          } else {
            setIsEmail(true)
            setIsUserName(false)
          }
        }}>Toggle Login Option</button>
    </div>
  );
};

export default Login;