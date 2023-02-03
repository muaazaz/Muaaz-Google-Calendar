import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory()
    
    const handleClick = ()=>{
        history.push('/dashboard')
        window.location.reload()
    }
    return ( 
        <div className="home">
             <img src="https://media3.giphy.com/avatars/gifcalendar/a5CM8bx5vWk0.gif" alt=""></img>
             <button className="clnd" onClick={handleClick}>View Dashboard</button>
        </div>
     );
}
 
export default Home;