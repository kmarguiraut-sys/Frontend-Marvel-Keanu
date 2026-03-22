import "./header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Marvel-Studios-Logo-2002.png";

const Header = ({ isConnected, handleToken }) => {
  return (
    <section>
      <div className="connexion">
        {isConnected ? (
          <button
            onClick={() => {
              handleToken(null);
            }}
          >
            LOGOUT
          </button>
        ) : (
          <>
            <Link to="/login">
              <h3 className="login-btn">LOGIN</h3>
            </Link>

            <h3 className="separator">|</h3>

            <Link to="/signup">
              <h3 className="signup-btn">SIGN UP</h3>
            </Link>
          </>
        )}
      </div>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo marvel" style={{ width: "200px" }} />
        </Link>
      </div>

      <div className="menu">
        <Link to="/personnages">
          <h3>PERSONNAGES</h3>
        </Link>
        <Link to="/comics">
          <h3>COMICS</h3>
        </Link>
        <Link to="/favorites">
          <h3>FAVORIS</h3>
        </Link>
      </div>
    </section>
  );
};

export default Header;
