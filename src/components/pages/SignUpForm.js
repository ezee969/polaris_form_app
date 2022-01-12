import React, { useCallback, useState } from "react";
import { Button, Form, FormLayout, InlineError, TextField } from "@shopify/polaris";
import ReCAPTCHA from "react-google-recaptcha"; 
import {useLocalStorage} from '../../hooks/useLocalStorage';
import { useNavigate } from "react-router-dom";

export  function SignUpForm() {
  // states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [recaptcha, setRecaptcha] = useState(false);
  const [users, setUsers] = useLocalStorage('users', []);
  const history = useNavigate();

  // validation function
  const inputValidation = useCallback(() => {
    let isValid = true;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

    if (email === "" || !emailRegex.test(email))  {
      document.getElementById("error-mail").classList.add("error-show");
      isValid = false;
    } else {
      document.getElementById("error-mail").classList.remove("error-show");
    }
    if (phone === "" || isNaN(phone))  {
      document.getElementById("error-phone").classList.add("error-show");
      isValid = false;
    } else {
      document.getElementById("error-phone").classList.remove("error-show");
    }
    if (name === "") {
      document.getElementById("error-name").classList.add("error-show");
      isValid = false;
    } else {
      document.getElementById("error-name").classList.remove("error-show");
    }
    if (address === "" || !addressRegex.test(address))  {
      document.getElementById("error-address").classList.add("error-show");
      isValid = false;
    } else {
      document.getElementById("error-address").classList.remove("error-show");
    }
    if (recaptcha === false) {
      document.getElementById("error-recaptcha").classList.add("error-show");
      isValid = false;
    }else {
      document.getElementById("error-recaptcha").classList.remove("error-show");
    }

    return isValid;
  }, [email, phone, name, address,recaptcha]);

  // handlers
  const handleEmailChange = useCallback(
    (value) => {
      setEmail(value);
    },
    [setEmail]
  );  
  const handleNameChange = useCallback(
    (value) => {
      setName(value);
    },
    [setName]
  );
  const handleAddressChange = useCallback(
    (value) => {
      setAddress(value);
    },
    [setAddress]
  );
  const handlePhoneChange = useCallback(
    (value) => {
      setPhone(value);
    },
    [setPhone]
  );
  const handleRecaptchaChange = useCallback(
    () => {
      setRecaptcha(true);
    },
    [setRecaptcha]
  );
  const handleSubmit = useCallback((_event) => {
    if (inputValidation() === false) {
      _event.preventDefault();
    }
    else {
      setUsers([ ...users, {email:email, name:name, address:address, phone:phone}]);
      history('/users');
    }

  }, [email, name, address, phone,inputValidation,setUsers, users,history]);

  return (
    <div className="main-cont">
      <div className="form-cont">
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              maxLength={30}
              value={email}
              onChange={handleEmailChange }
              label="Email"
              autoComplete="email"
              id="email"
            />
            <div className="error" id ="error-mail">
              <InlineError message="Invalid email" fieldID="email" />
            </div>
            <TextField
              maxLength={30}
              value={name}
              onChange={handleNameChange}
              label="Name"
              autoComplete="off"
              id="name"
            />
            <div className="error" id="error-name">
              <InlineError message="Invalid name" fieldID="name" />
            </div>
            <TextField
                maxLength={30}
                value={address}
                onChange={handleAddressChange}
                label="Address"
                autoComplete="off"
                id="address"
            />
            <div className="error" id="error-address">
              <InlineError message="Invalid address" fieldID="address" />
            </div>
            <TextField
                maxLength={30}
                value={phone}
                onChange={handlePhoneChange}
                label="Phone"
                autoComplete="off"
                id="phone"
            />
            <div className="error" id="error-phone">
              <InlineError message="Invalid phone" fieldID="phone" />
            </div>
            <ReCAPTCHA
              sitekey="6LeSbwgeAAAAAFds5Hc-qjrqc586vowFWbipRcAu"
              onChange={handleRecaptchaChange}
            />,
            <div className="error" id="error-recaptcha">
              <InlineError message="Recaptcha error" />
            </div>
            <Button primary id="but" onClick={handleSubmit} >Submit</Button>
          </FormLayout>
        </Form>
      </div>
    </div>
  );
}
