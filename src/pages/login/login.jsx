import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = ({ handleToken }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <main>
      <div className="container">
        <h1>Se connecter</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const response = await axios.post(
                "http://localhost:3000/login",
                // `https://site--backend-react-keanu--zwjdy7r2ycpp.code.run/login`,

                // probleme le serveur ne marche pas

                {
                  email: email,
                  password: password,
                },
              );

              if (response.data.token) {
                setErrorMessage("");
                handleToken(response.data.token);

                if (location.state?.from) {
                  navigate(location.state.from);
                } else {
                  navigate("/");
                }
              }
            } catch (error) {
              if (error.response) {
                setErrorMessage(error.response.data.message);
              } else {
                setErrorMessage("Une erreur est survenue.");
                console.log(error);
              }
            }
          }}
        >
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Se connecter</button>
        </form>

        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </main>
  );
};

export default Login;
