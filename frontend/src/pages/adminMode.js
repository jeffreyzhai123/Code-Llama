import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import my_logo from '../components/CodeLlama.png'
import Plot from 'react-plotly.js'

const AdminMode = () => {

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    };
    const backButton = () => {
        navigate("/adminMode");
        setUsertableVisible(true);
        setdetailedVisible(false);
    }

    const [userArray, setUserArray] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [usertableVisible, setUsertableVisible] = useState(true);
    const [detailedVisible, setdetailedVisible] = useState(false);

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

    function handleRowClick(user) {
        setSelectedUser(user);
        setUsertableVisible(false);
        setdetailedVisible(true);
    }
    

    return (
        <div className='homeContainer'>
            <div className='smalllogoContainer'>
                <img src= {my_logo} alt='icon' className='smalllogo'></img>
            </div>
            <div className='codeLlama'>
                <h2>CodeLlamaAcademy</h2>
            </div>
            
            <div className='usertable'>
                {usertableVisible &&
                    <div className='backtoMain2'>
                        <button className="btn btn-success" onClick={mainButton}>Go back to Main</button>
                    </div>
                }
                {usertableVisible && 
                    <table>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>User ID</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userArray.map((user, index) => (
                                <tr key={index} className='users'onClick={() => handleRowClick(user)}>
                                    <td>{user.username}</td>
                                    <td>{user.userid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {detailedVisible && selectedUser && (
                    <div className = 'userResults'>
                        <div className='backtoMain2'>
                            <button className="btn btn-success" onClick={backButton}>Go back to Admin Page</button>
                        </div>

                        <div className='plot'>
                            <Plot 
                                data = {[
                                    {
                                    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                    y: [0, 0, 0, 0, 50, 50, 60, 80, 100, 100],
                                    mode: "lines",
                                    type: "scatter",
                                    marker: {color: 'blue'},
                                    },
                                
                                ]}

                                layout = { 
                                    {width: 600, height: 500, title: "Quiz Result"}
                                }
                            />
                        </div>

                    </div>
                )}

            </div>
        </div>
    )

} 

export default AdminMode