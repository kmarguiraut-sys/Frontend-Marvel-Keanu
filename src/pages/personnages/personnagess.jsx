import "./personnages.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";

const Personnages = ({ favoriteCharacters, toggleCharacterFavorite }) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-react-keanu--zwjdy7r2ycpp.code.run/characters?name=${searchQuery}&page=${currentPage}&limit=${limit}`,
        );

        console.log(response.data);

        setCharacters(response.data.results);
        setTotalPages(Math.max(1, Math.round(response.data.count / limit)));

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setSearchQuery(searchInput.trim());
    // console.log(searchInput.trim());
  };

  return (
    <main className="home">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Rechercher un personnage"
                className="search-input"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
              <button className="search-button">Rechercher</button>
            </form>

            <input
              type="text"
              placeholder="Votre personnage favoris"
              className="favorites"
            />
            <div className="characters-list">
              {characters.map((character) => (
                <Link
                  // Note: pourrait rajouter une page avec un header du style:
                  // Les comics dans lesquels apparaît ce personnage //

                  // si le charachter n'a pas de comics, on peut faire une page avec un header du style:
                  // Ce personnage n'est lié à aucun comic //

                  to={`/comics/${character._id}`}
                  state={{
                    characterName: character.name,
                    characterComics: character.comics,
                  }}
                  key={character._id}
                  className="character-card"
                >
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt={character.name}
                    className="character-image"
                  />
                  <h2 className="character-name">{character.name}</h2>
                  <p className="character-description">
                    {character.description || "Pas de description disponible"}
                  </p>

                  <button
                    type="button"
                    className="favorite-toggle-btn"
                    onClick={(event) => {
                      event.preventDefault();
                      toggleCharacterFavorite(character);
                    }}
                  >
                    {favoriteCharacters.find(
                      (favoriteCharacter) =>
                        favoriteCharacter._id === character._id,
                    )
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"}
                  </button>
                </Link>
              ))}
            </div>

            <div className="pagination-wrapper">
              <button
                className="previous-btn"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="pages-list">
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={
                      pageNumber === currentPage
                        ? "page-btn active"
                        : "page-btn"
                    }
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              <button
                className="Next"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Personnages;
