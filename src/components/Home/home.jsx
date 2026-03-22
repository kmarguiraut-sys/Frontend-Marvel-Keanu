import "./home.css";
import { useEffect } from "react";
import Milesmorales from "../../assets/miles-morales.jpg";

const Home = () => {
  useEffect(() => {
    document.documentElement.classList.add("home-page");

    return () => {
      document.documentElement.classList.remove("home-page");
    };
  }, []);

  return (
    <main className="home-hero">
      <img
        src={Milesmorales}
        alt="Marvel highlight"
        className="home-hero-image"
      />

      <div className="home-hero-overlay" />
    </main>
  );
};

export default Home;
