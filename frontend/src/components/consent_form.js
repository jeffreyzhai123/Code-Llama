//ripped from https://react-bootstrap.netlify.app/docs/components/modal

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CheckBox from './checkbox';

import { SignInButton } from '@clerk/clerk-react'

function ConsentForm({checked, onCheckboxChange}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" className="termButton" onClick={handleShow}>
        Terms of Service
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Consent Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Introduction: <br/>
        Welcome to CodeLlamaAcademy! We appreciate your interest in participating in our research. Before you proceed, please take a moment to read and understand how we handle your data. <br/>
        <br/> 
        Data Collection and Usage: <br/>
        By clicking "Agree" below, you consent to CodeLlamaAcademy collecting your login information and user data for research purposes. This includes but is not limited to: <br/>

        Your login credentials such as your email address. <br/>
        Usage patterns and interactions within CodeLlamaAcademy. <br/>

        <br/>
        Purpose of Data Collection: <br/>
        The data collected will be used solely for research purposes, including but not limited to analyzing user behavior, improving our services, and conducting academic or scientific research. <br/>

        <br/>
        Confidentiality and Security: <br/>
        We prioritize the confidentiality and security of your data. All information collected will be anonymized and aggregated wherever possible. Your personal information will not be shared with third parties without your explicit consent unless required by law. <br/>

        <br/>
        Right to Withdraw Consent: <br/>
        You have the right to withdraw your consent at any time by contacting us at CodeLlamaAcademy.com. Withdrawal of consent will not affect the legality of data processing based on consent before its withdrawal. <br/>

        <br/>
        Agreement: <br/>
        By clicking "Agree," you acknowledge that you have read and understood the terms of this consent form, and you consent to the collection and use of your data as described above. <br/>
        </Modal.Body>
        <Modal.Footer>
          <CheckBox checked={checked} onCheckboxChange={onCheckboxChange}/>
          {checked && 
            <SignInButton className="loginBtn">
              <input type="button" value="Log in"  />
            </SignInButton>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConsentForm;