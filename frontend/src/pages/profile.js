import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import my_logo from '../components/CodeLlama_Academy.GIF'
import { useUser } from '@clerk/clerk-react';


const Profile = () => {

    const [username, setUsername] = useState("");
    const [userExistence, setUserExistence] = useState(false);
    const [userMap, setUserMap] = useState({});
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currName, setCurrName] = useState("");
    const {user} = useUser();
    const user_id = user.id;

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    };

    useEffect(  () => {
        // fetch current user's username
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3080/profile/${user_id}`)
                if (response.ok) {
                    let data = await response.json();
                    setUserExistence(true);
                    setCurrName(data.username);
                } else {
                    throw new Error('Failed to fetch userid');
                }
            } catch (error) {
                console.log("user don't exist");
                setUserExistence(false);
            }
        };

        // fetch all usernames
        const fetchAllUsers = async () => {
            try {
                const response = await fetch(`http://localhost:3080/profile`)
                if (response.ok) {
                    const data = await response.json();
                    const users = new Map(data.map(user => [user.username, user.userid]));
                    setUserMap(users);
                    console.log("map is being updated, useEffect triggered");
                }
            } catch (error) {
                console.log("fetched failed")
            }
        };

        fetchUser();
        fetchAllUsers();
    }, [user_id, currName]);
    //only when updateName is called does the currName change
    //when currName change, need to fetch all names from database again to make a new Map
    //because I am unable to update the map due to username being the key and id being the value
    //this is needed for quick look up

    const updateName = async () => {
        try {
            const response = await fetch(`http://localhost:3080/profile/${user_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                }),
            });
            if (response.ok) {
                setSuccess(true);
                setCurrName(username);
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            console.log("update failed");
        }
    }

    const isNameUnique = () => {
        return !userMap.has(username);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (isNameUnique(username)) {
            updateName();
            setWarning(false);
        } else {
            setWarning(true);
            setSuccess(false);
        }
    };

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
                    <div className='mainBtnContainer'>
                        <button className="btn btn-success" onClick={mainButton}>Go back to Main</button>
                    </div>
                </div>
            </header>

            {!userExistence && (
                <div className='profileMessage'>
                    <p>Please complete at least one quiz set to change your username.</p>
                </div>
            )}
            {userExistence && (
            <>
            <p className='profileMessage'>Current username is: {currName}</p>
            <div className="usernameForm">
                <form onSubmit={handleSubmit}>
                    <label className='usernameFormLabel'>
                        Username:
                        <input
                            className='input' 
                            type="text" 
                            name='Username' 
                            placeholder='Type your username here'
                            value = {username} 
                            onChange = {(e) =>
                            {
                                setUsername(e.target.value)
                            }}>  
                        </input>
                    </label>
                    <button className='usernameChangeButton' type = "submit">Submit</button>
                </form>  
            </div>
            </>
            )}

            <div className='confirmationMessage'>
                { userExistence && warning && (
                    <p style={{color:"red"}}>
                        Current username has already been taken. 
                        <br></br> 
                        Please select a new username. 
                    </p>
                    
                )}

                { userExistence && success && (
                    <p style={{color:"green"}}>
                        Username has been updated successfully!
                    </p>
                )}  
            </div>


        </div>
    )
}

export default Profile

