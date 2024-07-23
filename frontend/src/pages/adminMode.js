import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMode = () => {

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    };

    return (
        <div className='backtoMain'>
            
        </div>
    )

} 

export default AdminMode