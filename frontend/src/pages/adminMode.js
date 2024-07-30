import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import my_logo from '../components/CodeLlama.png'
import { calculateScore, calculateAllAvg, calculateAvgScore, calculateAllScaledAvg, calculateAvgScaledScore, calcultateScore } from '../helpers/calculate.js';
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

    useEffect( () => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`http:///localhost:3080/results`);
                if (!response.ok) {
                    const message = `An error has occurred: ${response.status}`;
                    throw new Error(message);
                }

                const data = await response.json();
                setUserArray(data);
            }
            catch (error) {
                console.log("Error: ", error);
            }
            
        }; 

        fetchResults();
        
    }, [])

    function handleRowClick(user) {
        setSelectedUser(user);
        setUsertableVisible(false);
        setdetailedVisible(true);
    }

    function getXDataPoints(user) {
        let datapoint_x = [];
        userArray.forEach((array) => {
            if(array.userid === user) {
                let max_x = array.results.length;
                for (let i = 1; i <= max_x; i++) {
                    datapoint_x.push(i);
                }
            }
            return datapoint_x;
        })
    }

    function getYDataPoints(user) {
        let datapoint_y = [];
        userArray.forEach((array) => {
            if(array.userid === user) {
                array.results.forEach((quiz) => {
                    let y = calculateScore(quiz) * 100;
                    datapoint_y.push(y);
                })
            }
        })
        return datapoint_y;
    }

    return (
        <div className='homeContainer'>
            <header className='siteHeader'>
                <div className='headerLeft'>
                    <div className='smalllogoContainer'>
                        <img src= {my_logo} alt='icon' className='smalllogo'></img>
                        <span className = "codeLlama">CodeLlamaAcademy</span>
                    </div>
                </div>
                <div className='headerRight'>
                    {usertableVisible && (
                        <div className='mainBtnContainer'>
                            <button className="btn btn-success" onClick={mainButton}>Go back to Main</button>
                        </div>
                    )}

                    {detailedVisible && selectedUser && (
                        <div className='mainBtnContainer'>
                            <button className="btn btn-success" onClick={backButton}>Go back to Admin Page</button>
                        </div>
                    )}
                </div>
            </header>

            <div className='userTable'>
                <span className = "userResultsTitle">User Performance Results</span>
                {usertableVisible && 
                    <div>
                        <table id="resultsTable">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>User ID</th>
                                    <th>Average Score</th>
                                    <th>Average Scaled Score</th>
                                    <th>Quiz Completed</th>
                                </tr>
                            </thead>

                            <tbody>
                                {userArray.map((user, index) => (
                                    <tr key={index} className='users'onClick={() => handleRowClick(user)}>
                                        <td>{user.username}</td>
                                        <td>{user.userid}</td>
                                        <td>{calculateAvgScore(user.results).toFixed(2) + "%"}</td>
                                        <td>{calculateAvgScaledScore(user.results).toFixed(2) + "%"}</td>
                                        <td>{user.results.length}</td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>

                        <table id="resultsTable">
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
                }
                {detailedVisible && selectedUser && (
                    <div className = 'userResults'>
                        <div className='plot'>
                            <Plot 
                                data = {[
                                    {
                                    x: getXDataPoints(selectedUser.userid),
                                    y: getYDataPoints(selectedUser.userid),
                                    type: "bar",
                                    marker: {color: 'blue'},
                                    },
                                ]}
                                layout = { 
                                    {width: 800, height: 700, 
                                        title: "Quiz Result", 
                                        xaxis: {
                                            title: 'Quiz Number',
                                            tickmode: 'linear',
                                            tick0: 1,
                                            dtick: 1,
                                            range: [0, selectedUser.results.length]
                                        },
                                        yaxis: {
                                            title: 'Score in Percentage',
                                            tickmode: 'linear',
                                            tick0: 0,
                                            dtick: 10,
                                            range: [0, 100]
                                        }
                                    }
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