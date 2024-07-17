import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react'
import ConsentForm from '../components/consent_form'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

//the code in this file is taken from: https://clerk.com/blog/building-a-react-login-page-template
const Home = (props) => {

    //use useUser hook to get details about the logged in user
    const { user } = useUser();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const onCheckboxChange = (checked) => {
      setIsChecked(checked);
    }

    const codeQuestionButton = () => {
      navigate("/codeQuestion");
    }

    const performanceReview = () => {
      navigate("/performanceReview");
    }

    const adminMode = () => {
      const response = prompt("Please enter the admin password:");
      if (response == "codeLlama") {
        navigate("/adminMode");
      } else {
        alert("Wrong password. Please try again.");
      }
    }

    return (
        <div className="mainContainer">

          <div className={'titleContainer'}>
            <div>Welcome!</div>
          </div>

          <div>This is the home page.</div>
           
          {/* The children of the SignedOut component are rendered only when the user is signed out from the app. In this case, the app will render a SignInButton */}
            <SignedOut>
              <ConsentForm checked={isChecked} onCheckboxChange={onCheckboxChange} />
              {isChecked &&
              <SignInButton>
                <input className={'inputButton'} type="button" value={'Log in'} />
              </SignInButton>
              }
            </SignedOut>

          {/* The children of the SignedIn component are rendered only when the user is signed in. In this case, the app will render the SignOutButton */}
          <SignedIn>
            <div className={'buttonContainer'}>
              <input
                className={'inputButton'}
                type="button"
                onClick={codeQuestionButton}
                value={"Exercise"}
              />
            </div>

            <div className={'buttonContainer'}>
              <input
                className={'inputButton'}
                type="button"
                onClick={performanceReview}
                value={"Results Review"}
              />
            </div>

            <div className={'buttonContainer'}>
              <input
                className={'inputButton'}
                type="button"
                onClick={adminMode}
                value={"Admin Mode"}
              />
            </div>

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

