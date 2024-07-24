import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import my_logo from '../components/CodeLlama.png'

const AdminMode = () => {

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    };

    const [score, setScore] = useState([]);
    const [count, setCount] = useState(0);

    const fetchResults = async () => {
        try {
            const response = await fetch(`http:///localhost:3080/results`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.status}`;
                throw new Error(message);
            }

            const data = await response.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.log("Error: ", error);
        }
        
    }; 

    fetchResults();

    return (
        <div className='homeContainer'>
            <div className='smalllogoContainer'>
                <img src= {my_logo} alt='icon' className='smalllogo'></img>
            </div>
            <div className='codeLlama'>
                <h2>CodeLlamaAcademy</h2>
            </div>

            <div className='backtoMain2'>
                <button className="btn btn-success" onClick={mainButton}>Go back to Main</button>
            </div>
        </div>
    )

} 

export default AdminMode