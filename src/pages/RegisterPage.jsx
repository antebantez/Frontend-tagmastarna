import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../mongoDb/features/authSlice";
import { useNavigate } from "react-router";
import Card from 'react-bootstrap/Card'
import {Col, Row} from "react-bootstrap";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(user));
  };

  return (
    <Card>
      <Row className="text-center">
        <Col className="mt-3">
        <h1 style={{fontWeight: "bolder"}}>Registrering</h1>
        </Col>
      </Row>
    <form className="loginForm" onSubmit={handleSubmit}>
      <section>
        <input
            placeholder="Namn"
            style={{borderRadius: "5px",
              padding: "5px"}}
          type="text"
          inputProps={{style: {fontFamily: "Arial", backgroundColor: "white",}}}
          onChange={(e) => setUser({...user, name: e.target.value})}
        />

        <input
          style={{
              marginTop: "4%",
            borderRadius: "5px",
              padding: "5px"
          }}
          placeholder="Mail"
          type="text"
          inputProps={{style: {fontFamily: "Arial", backgroundColor: "white"}}}
          onChange={(e) => setUser({...user, email: e.target.value})}
        />

        <input
          style={{
              marginTop: "4%",
            borderRadius: "5px",
              padding: "5px"
          }}
          placeholder="Lösenord"
          type="password"
          inputProps={{style: {fontFamily: "Arial", backgroundColor: "white"}}}
          onChange={(e) => setUser({...user, password: e.target.value})}
        />

        <input
          style={{
              marginTop: "4%",
              borderRadius: "5px",
              padding: "5px"
          }}
          placeholder="Bekräfta lösenord"
          type="password"
          inputProps={{style: {fontFamily: "Arial", backgroundColor: "white"}}}
          onChange={(e) => setUser({...user, repeat_password: e.target.value})}
        />
      </section>

      <button
        id="registerButton"
        className="border-0 mt-5 bg-warning"
        type="submit"
        variant="contained"
      >
        {auth.registerStatus === "pending" ? "Submiting" : "Registrera dig"}
      </button>

      {auth.registerStatus === "rejected" ? (
        <div id="registerError"> {auth.registerError} </div>
      ) : null}

      <p id="loginDiv">
        Genom att registrera dig godkänner du våra villkor. Lär dig hur vi
        samlar in, använder och dela dina uppgifter i vår datapolicy och hur vi
        använder cookies och liknande teknik i vår policy för cookies
      </p>
      <div id="loginH2"> Har du redan ett konto?</div>
      <button
        id="loginButton"
        className="border-0 mt-4 bg-warning"
        type="submit"
        variant="contained"
        onClick={() => navigate("/login")}
      >
        Logga in
      </button>
      </form>
      </Card>
  );
};

export default RegisterPage;
