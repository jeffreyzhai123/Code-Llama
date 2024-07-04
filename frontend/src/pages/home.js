import React from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react'
import ConsentForm from '../components/consent_form'
import { useState } from 'react';

//the code in this file is taken from: https://clerk.com/blog/building-a-react-login-page-template
const Home = (props) => {

    //use useUser hook to get details about the logged in user
    const { user } = useUser();
    const [isChecked, setIsChecked] = useState(false);

    const onCheckboxChange = (checked) => {
      setIsChecked(checked);
    }

    return (
        <div className="mainContainer">
          <div className={'titleContainer'}>
            <div>Welcome!</div>
          </div>
          <div>This is the home page.</div>

          {/* temporary button to help seeing code exercise pages */}
          {user && 
          <div>
          <Link to ="/codeQuestion">
            <button className='exercise'>Exercise</button>
          </Link>
          </div> 
          }
           
          {/* The children of the SignedOut component are rendered only when the user is signed out from the app. In this case, the app will render a SignInButton */}
          {isChecked &&
            <SignedOut>
              <SignInButton>
                <input className={'inputButton'} type="button" value={'Log in'} />
              </SignInButton>
            </SignedOut>
          }

          {/* displays consentform if user is not signed in */}
          {!user && 
            <ConsentForm checked={isChecked} onCheckboxChange={onCheckboxChange} />
          }

          {/* The children of the SignedIn component are rendered only when the user is signed in. In this case, the app will render the SignOutButton */}
          <SignedIn>
            <SignOutButton>
              <input className={'inputButton'} type="button" value={'Log out'} />
            </SignOutButton>
          </SignedIn>
    
          {/* You can also check if a user is logged in or not using the 'user' object from the useUser hook. In this case, a non-undefined user object will render the user's email on the page */}
          {user ? <div>Your email address is {user.primaryEmailAddress.emailAddress}</div> : null}
        </div>
    )
}
    
export default Home

