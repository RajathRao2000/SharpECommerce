import React from "react";
import { Form, Button } from "react-bootstrap";
import "./ContactUs.css";

function ContactUs() {

  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
    const obj = {
      Name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };
    // console.log(obj);

    try{let response = await fetch(
      "https://react-http-a588f-default-rtdb.firebaseio.com/contactus.json",
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "Application/JSON",
        },
      }
    );
    let data = await response.json();
    console.log("data", data);}
    catch(err){
        console.log(err)
    }
  };

  return (
    <section className="contact-section">
      <Form className="contact-form" onSubmit={handleSubmit}>
        <h2>CONTACT FORM</h2>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Phone" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
}

export default ContactUs;
