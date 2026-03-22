import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Signup.css";

const Signup = ({ setIsConnected }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <main>
      <div className="container">
        <h1>S'inscrire</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const missingField = !username
              ? "le nom d'utilisateur"
              : !email
                ? "l'email"
                : !password
                  ? "le mot de passe"
                  : null;

            if (missingField) {
              setErrorMessage(`Vous avez oublié de remplir ${missingField}.`);
              return;
            }

            try {
              const response = await axios.post(
                // `https://site--backend-react-keanu--zwjdy7r2ycpp.code.run/signup`,
                "http://localhost:3000/signup",

                {
                  username: username,
                  email: email,
                  password: password,
                  newsletter: newsletter,
                },
              );

              if (response.data.token) {
                setErrorMessage("");

                Cookies.set("userToken", response.data.token, {
                  expires: 7,
                });

                setIsConnected(response.data.token);

                navigate("/");
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
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => handleChange(event, setEmail)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => handleChange(event, setPassword)}
          />

          <input
            type="checkbox"
            checked={newsletter}
            onChange={(event) => setNewsletter(event.target.checked)}
          />

          <button type="submit">S'inscrire</button>
        </form>

        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </main>
  );
};

export default Signup;
