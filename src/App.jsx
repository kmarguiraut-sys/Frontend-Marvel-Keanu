import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Header from "../src/components/header/header";
import Home from "../src/components/Home/home";
import Footer from "../src/components/footer/footer";
import Personnages from "./pages/personnages/personnagess";
import Comics from "./pages/comics/comics";
import Favorites from "./pages/favorites/favorites";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

const getInitialFavorites = () => {
  const favoritesCookie = Cookies.get("favorites");

  if (!favoritesCookie) {
    return { characters: [], comics: [] };
  }

  try {
    const parsedFavorites = JSON.parse(favoritesCookie);

    return {
      characters: Array.isArray(parsedFavorites.characters)
        ? parsedFavorites.characters
        : [],
      comics: Array.isArray(parsedFavorites.comics)
        ? parsedFavorites.comics
        : [],
    };
  } catch {
    return { characters: [], comics: [] };
  }
};

function App() {
  const [isConnected, setIsConnected] = useState(
    Cookies.get("userToken") || null,
  );
  const [favorites, setFavorites] = useState(getInitialFavorites);

  useEffect(() => {
    Cookies.set("favorites", JSON.stringify(favorites), { expires: 7 });
  }, [favorites]);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setIsConnected(token);
    } else {
      Cookies.remove("userToken");
      setIsConnected(null);
    }
  };

  const toggleCharacterFavorite = (character) => {
    setFavorites((previousFavorites) => {
      const alreadyFavorite = previousFavorites.characters.some(
        (favoriteCharacter) => favoriteCharacter._id === character._id,
      );

      const nextCharacters = alreadyFavorite
        ? previousFavorites.characters.filter(
            (favoriteCharacter) => favoriteCharacter._id !== character._id,
          )
        : [...previousFavorites.characters, character];

      return {
        ...previousFavorites,
        characters: nextCharacters,
      };
    });
  };

  const toggleComicFavorite = (comic) => {
    const comicId = comic._id || comic.id;

    if (!comicId) {
      return;
    }

    setFavorites((previousFavorites) => {
      const alreadyFavorite = previousFavorites.comics.some(
        (favoriteComic) => (favoriteComic._id || favoriteComic.id) === comicId,
      );

      const nextComics = alreadyFavorite
        ? previousFavorites.comics.filter(
            (favoriteComic) =>
              (favoriteComic._id || favoriteComic.id) !== comicId,
          )
        : [...previousFavorites.comics, comic];

      return {
        ...previousFavorites,
        comics: nextComics,
      };
    });
  };

  return (
    <Router>
      <Header isConnected={isConnected} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/personnages"
          element={
            <Personnages
              favoriteCharacters={favorites.characters}
              toggleCharacterFavorite={toggleCharacterFavorite}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              favoriteComics={favorites.comics}
              toggleComicFavorite={toggleComicFavorite}
            />
          }
        />
        <Route
          path="/comics/:characterId"
          element={
            <Comics
              favoriteComics={favorites.comics}
              toggleComicFavorite={toggleComicFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favoriteCharacters={favorites.characters}
              favoriteComics={favorites.comics}
              toggleCharacterFavorite={toggleCharacterFavorite}
              toggleComicFavorite={toggleComicFavorite}
            />
          }
        />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route
          path="/signup"
          element={<Signup setIsConnected={setIsConnected} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
