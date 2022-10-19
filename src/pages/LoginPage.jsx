import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {loginUser} from "../mongoDb/features/authSlice";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import {Col, Row} from "react-bootstrap";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(user));
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <section>
        <input
          style={{
            marginTop: "4vh",
          }}
          placeholder="Namn"
          type="text"
          variant="outlined"
          inputProps={{style: {fontFamily: "Arial", backgroundColor: "white"}}}
          onChange={(e) => setUser({...user, name: e.target.value})}
        />

        <input
          style={{marginTop: "4vh"}}
          placeholder="Lösenord"
          type="password"
          variant="outlined"
          inputProps={{style: {fontFamily: "Arial", backgroundColor: "white"}}}
          onChange={(e) => setUser({...user, password: e.target.value})}
        />
      </section>

      <button
        id="loginButton"
        className="border-0 mt-5"
        type="submit"
        variant="contained"
        onClick={() => navigate("/login")}
      >
        {auth.loginStatus === "pending" ? "Submiting" : "Logga in"}
      </button>

      <div id="registerError">
        {" "}
        {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
      </div>

      <div id="loginDiv"> Inget konto?</div>
      <button
        id="loginButton"
        className="border-0 mt-4"
        type="submit"
        variant="contained"
        onClick={() => navigate("/register")}
      >
        Registrera dig
      </button>
    </form>
  );
};

export default LoginPage;
