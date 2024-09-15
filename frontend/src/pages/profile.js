import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import my_logo from '../components/CodeLlama_Academy.GIF'
import defaultPic from '../assets/default-pfp.png'
import { useUser } from '@clerk/clerk-react'
import { useDropzone } from 'react-dropzone'

const Profile = () => {

    const [username, setUsername] = useState("");
    const [userExistence, setUserExistence] = useState(false);
    const [userMap, setUserMap] = useState({});
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currName, setCurrName] = useState("");
    const [profilePicture, setProfilePicture] = useState(defaultPic);
    const [currProfilePictureID, setCurrProfilePictureID] = useState("66e66edfdbc53c84e91332ec");

    const defaultPictureID = "66e66edfdbc53c84e91332ec";

    const handleUpload = async (file) => {
        try {
            const response = await fetch(`http://localhost:3080/profile/picture/${user_id}`, {
                method: 'POST',
                body: file,
            });
            if (response.ok) {
                const result = await response.json();
                console.log("just uploaded new pfp, old pfp id is", currProfilePictureID);
                return result.message;
            } else {
                console.error('Failed upload');
            }
        } catch (error) {
            console.error('Server side error:', error);
        }
    }; 

    //debugging components
    useEffect(() => {
        console.log("Updated currProfilePictureID:", currProfilePictureID);
    }, [currProfilePictureID]);

    useEffect(() => {
        console.log("Component mounted");
        return () => {
            console.log("Component unmounted");
        };
    }, []);
    

    //something about deleting current 
    const handleDelete = async (toBeDeletedID) => {
        console.log("called ", toBeDeletedID);
        
        if (toBeDeletedID === defaultPictureID) {
            console.log("Cannot delete default profile picture.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3080/profile/picture/${toBeDeletedID}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                console.log("Profile picture deleted successfully");
            } else {
                console.error("Failed to delete profile picture, Status:", response.status);
            }
        } catch (error) {
            console.error("Error occurred during profile picture deletion:", error);
        }
    };
    

    const onDrop = useCallback(async (acceptedFiles) => {
        //allows for multiple field stuff
        if (acceptedFiles.length === 0) {
            //display something to user
            console.log("Error, imagine upload failed");
            //setProfilePicture();
        } else {
            const formData = new FormData();
            setProfilePicture(URL.createObjectURL(acceptedFiles[0]));
            formData.append('profile', acceptedFiles[0]);

            const newProfilePictureID = await handleUpload(formData);

            if (newProfilePictureID) {
                await updateUserProfilePic(newProfilePictureID);
                setCurrProfilePictureID(prevID => {
                    // Ensure the ID for deletion is set based on the previous ID
                    handleDelete(prevID); 
                    return newProfilePictureID;
                });
            }
        }
    }, []);

    const updateUserProfilePic = async (profileID) => {
        try {
            const response = await fetch(`http://localhost:3080/profile/picture/${user_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pfpID: profileID, // Make sure profileID is correctly passed
                }),
            });
    
            if (response.ok) {
                console.log("Profile picture updated successfully");
            } else {
                console.error("Failed to update profile picture, Status:", response.status);
            }
        } catch (error) {
            console.error("Error occurred during profile picture update:", error);
        }
    };
    

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
        },
        maxSize: 2 * 1024 * 1024,
        multiple: false,
    });

    // only accept the first file
    // const selectedFile = acceptedFiles[0]
    // console.log(selectedFile);

    const {user} = useUser();
    const user_id = user.id;

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    };

    useEffect(  () => {
        // fetch current user's username and pfp
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3080/profile/${user_id}`)
                if (response.ok) {
                    let data = await response.json();
                    setUserExistence(true);
                    setCurrName(data.username);

                    //possible area of bug
                    console.log("fetchUser: pfpID", data.pfpID);

                    if (!currProfilePictureID || currProfilePictureID !== data.pfpID) {
                        console.log("fetchUser: pfpID", data.pfpID);
                        setCurrProfilePictureID(data.pfpID);
                    }

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

        const fetchProfilePicture = async() => {
            try {
                const response = await fetch(`http://localhost:3080/profile/picture/${user_id}`)
                if (response.ok) {
                    const imageData = await response.blob();
                    const imageUrl = URL.createObjectURL(imageData);
                    setProfilePicture(imageUrl);
                    console.log("pfp updated");
                }
            } catch (error) {
                console.log("something is wrong obviously")
            }
        };

        fetchUser();
        fetchAllUsers();
        fetchProfilePicture();
    }, [user_id]);

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

            <div className='profileContainer'>
                <img src={profilePicture} alt="Profile" className='profilePicture' />
                <p className='usernameParagraph'>Current username is: {currName}</p>
            </div>

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
            <div className='dropzone' {...getRootProps()}>
                <input {...getInputProps()}></input>
                <p className='profileMessage'>Drag and drop files here or click to select files</p>
            </div>
            <aside>
                <ul className='fileInfo'>
                    {acceptedFiles.map(file => (
                        <li key={file.path}>
                            {file.path} - {file.size} bytes
                        </li>
                    ))}
                </ul>
            </aside>
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

