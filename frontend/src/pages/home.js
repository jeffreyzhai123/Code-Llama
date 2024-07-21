import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react'
import ConsentForm from '../components/consent_form'
import my_logo from '../components/CodeLlama_Academy.GIF'
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

    return (
        <div className="mainContainer">

           
          {/* The children of the SignedOut component are rendered only when the user is signed out from the app. In this case, the app will render a SignInButton */}
            <SignedOut>
              <div className={'titleContainer'}>
                <div>Welcome!</div>
              </div>

              <div className='logoContainer'>
                <img src= {my_logo} alt='icon' className='logo'></img>
              </div>

              <div className={'introduction'}>
                <p className='emphasize'>CodeLlama Academy is</p> 
                <p>
                an application that allow students to practice their skills in code comprehension and
                allow researchers to use the results to study the students' performance. In this application, users will
                be presented with a code piece and be asked to provide a description of the code using plain English.
                The application uses Ollama to generate code based on users' description and eventually evaluate whether users' descriptions
                can generate a code piece that is functionally equivalent as the given code piece in the question. 
                </p>
              </div>
              <ConsentForm checked={isChecked} onCheckboxChange={onCheckboxChange} />
              {isChecked &&
              <SignInButton>
                <input className={'inputButton'} type="button" value={'Log in'} />
              </SignInButton>
              }
              {/* You can also check if a user is logged in or not using the 'user' object from the useUser hook. In this case, a non-undefined user object will render the user's email on the page */}
          {user ? <div>Your email address is {user.primaryEmailAddress.emailAddress}</div> : null}
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