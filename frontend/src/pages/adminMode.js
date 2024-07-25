import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import my_logo from '../components/CodeLlama.png'
import { calculateAllAvg, calculateAvgScore, calculateAllScaledAvg, calculateAvgScaledScore } from '../helpers/calculate.js';

const AdminMode = () => {

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    };

    const [userArray, setUserArray] = useState([]);

    const fetchResults = async () => {
        try {
            const response = await fetch(`http:///localhost:3080/results`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.status}`;
                throw new Error(message);
            }

            const data = await response.json();
            return data;
        }
        catch (error) {
            console.log("Error: ", error);
        }
        
    }; 

    fetchResults().then((data) => {
        setUserArray(data);
    })

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

            <div className='usertable'>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Average Score</th>
                            <th>Average Scaled Score</th>
                            <th>Num of Quizzes Done</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userArray.map((user, index) => (
                            <tr key={index} className='users'>
                                <td>{user.username}</td>
                                <td>{calculateAvgScore(user.results).toFixed(2) + "%"}</td>
                                <td>{calculateAvgScaledScore(user.results).toFixed(2) + "%"}</td>
                                <td>{user.results.length}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <div className='data'>
                {/* <label>{calculateAllAvg(userArray)}</label> */}
                <table>
                    <thead>
                        <tr>
                            <th>All Users Average</th>
                            <th>All Users Scaled Average</th>
                            <th>Total Number Of Users with Records</th>
                        </tr>
                    </thead>

                    <tbody>
                      
                        <tr>
                            <td>{calculateAllAvg(userArray).toFixed(2) + "%"}</td>
                            <td>{calculateAllScaledAvg(userArray).toFixed(2) + "%"}</td>
                            <td>{userArray.length}</td>
                           
                        </tr>
                        
                    </tbody>

                </table>
            </div>
        </div>
    )

} 

export default AdminMode