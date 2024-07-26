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

    const adminMode = () => {
      const response = prompt("Please enter the admin password:");
      if (response == "codeLlama") {
        navigate("/adminMode");
      } else {
        alert("Wrong password. Please try again.");
      }
    }

    const profilePage = () => {
      navigate("/profilePage");
    }

    return (
        <div className="homeContainer">

           
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
              <div className='login'>
              <ConsentForm checked={isChecked} onCheckboxChange={onCheckboxChange} />
              {isChecked &&
              <SignInButton>
                  <input type="button" value="Log in" className='btn btn-warning' />
              </SignInButton>
              }
              </div>
              {/* You can also check if a user is logged in or not using the 'user' object from the useUser hook. In this case, a non-undefined user object will render the user's email on the page */}
          {user ? <div>Your email address is {user.primaryEmailAddress.emailAddress}</div> : null}
            </SignedOut>

          {/* The children of the SignedIn component are rendered only when the user is signed in. In this case, the app will render the SignOutButton */}
          <SignedIn>
            <header className="siteHeader">
              <div className='headerLeft'>
                <div className='smalllogoContainer'>
                  <img src= {my_logo} alt='icon' className='smalllogo'></img>
                  <span className = "codeLlama">CodeLlamaAcademy</span>
                </div>
              </div>

              <div className='headerRight'>
                <div className="mainBtnContainer">
                  <input type="button" onClick={codeQuestionButton} value="Exercise" className='btn btn-info' />
                  <input type="button" onClick={performanceReview} value="Performance Review" className='btn btn-success' />
                  <input type="button" onClick={adminMode} value="Admin Mode" className='btn btn-primary' />
                  <input type="button" onClick={profilePage} value="Profile Page" className='btn btn-primary' />

                  <SignOutButton>
                    <input type="button" value="Log out" className="btn btn-warning" />
                  </SignOutButton>
                </div>
              </div>
            </header>
              {/* You can also check if a user is logged in or not using the 'user' object from the useUser hook. In this case, a non-undefined user object will render the user's email on the page
              {user ? <div>Your email address is {user.primaryEmailAddress.emailAddress}</div> : null} */}
              <section className = "codeLlamaDescription">
                <div className={'descriptionColumn'}>
                  <p className='emphasizeDescription'>In Exercise</p> 
                  <li>There are eight questions in total per exercise.</li>
                  <li>User must complete all of them to save the results.</li>
                  <li>User cannot go back to the previous questions.</li>
                  <li>User gets two chances to pass each question.</li>
                  <li>User can skip the question which will be considered as failed question.</li>
                </div>

                <div className={'descriptionColumn'}>
                  <p className='emphasizeDescription'>In Performance Review</p> 
                  <li>All user's completed quiz attemps are listed.</li>
                  <li>User can click on each quiz to view detailed performance review.</li>
                  <li>User can click on each question to view further details.</li>
                </div>
              </section>
            
          </SignedIn>
        </div>
    )
}

    
export default Home