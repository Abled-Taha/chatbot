import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import Chat from "../assets/images/chat.png";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  useEffect(() => {
    localStorage.removeItem("thread_id");
  }, []);
  const navigate = useNavigate();
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
            <div className="w-100">
              <div>
                <label className="text-center">Select your role</label>
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    className="student-button"
                    onClick={() => navigate("/student-chat")}
                  >
                    PMBOK Guider
                  </button>
                  <button
                    className="teacher-button"
                    onClick={() => navigate("/teacher-chat")}
                  >
                    PMBOK Quiz
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Welcome;
