import React, { useContext, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { googleApiKey } from "../../../keys";
import { useHistory } from "react-router-dom";
import { Variables } from "../../store/Variables";

function Login() {
  const enteredEmail = useRef();
  const enteredPassword = useRef();
//   console.log(enteredEmail.current.value,enteredPassword)
  const history = useHistory();
  const {setToken,apiToken}=useContext(Variables)

    useEffect(()=>{
        if(apiToken){
            history.replace("/product")
        }
    },[apiToken])

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${googleApiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail.current.value,
          password: enteredPassword.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      //   setIsLoading(false);
      if (res.ok) {
        res.json().then((res) => {
            // console.log("idtoken",res.idToken)
            setToken(res.idToken,enteredEmail.current.value);
          });


      } else {
        return res.json().then((data) => {
          //show an error modal
          alert(data.error.message);
          console.log(data);
        });
      }
    });
  };

  return (
    <section className="login">
      {apiToken?"You are already logged in":<Form className="login-form" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={enteredEmail}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={enteredPassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>}
    </section>
  );
}

export default Login;
