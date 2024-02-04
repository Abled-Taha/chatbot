import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "reactstrap";
import Chat from "../assets/images/chat.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="welcome">
      <div className="container-fluid welcome-section p-0">
        <Row>
          <Col lg="6" md="6" sm="12" xs="12" className="image-col">
            <div className="d-flex flex-column">
              <div className="img-box">
                <img src={Chat} alt="img" />
              </div>
              <p>
                <b>“Simplify Teaching”</b> <br /> Your Educational Companion in
                the Digital Era!
              </p>
            </div>
          </Col>

          <Col lg="6" md="6" sm="12" xs="12" className="role">
            <div className="w-100 text-center">
          <h2>Welcome to AI Assistant</h2>
        <h2>Login</h2>
        <form className="login-form " onSubmit={() => navigate("/dashboard")}>
          <label htmlFor="Email">Email</label>
          <input
            style={{ color: "black",border: "1px solid black"  }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            required
          />
          <label htmlFor="Password">Password</label>
          <input
            style={{ color: "black",border: "1px solid black"  }}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            required
          />
          <div className="d-flex align-items-center justify-content-center mt-3">
          <button type="submit" className="login-btn">
            Log In
          </button>
          </div>
        </form>
        {/* <Link to='/register'>
          <button className='link-btn'>
            Don't have an account? Register here.
          </button>
        </Link> */}
      </div>
          </Col>
        </Row>
      </div>
    </div>
    
  );
};

export default SignUp;
