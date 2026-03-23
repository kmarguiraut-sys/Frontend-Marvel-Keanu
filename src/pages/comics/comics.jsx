import "./comics.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const Comics = ({ favoriteComics, toggleComicFavorite }) => {
  const location = useLocation();
  const characterComicsFromState = location.state?.characterComics || null;
  const { characterId } = useParams();

  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (characterId && characterComicsFromState) {
          const comicsResponses = await Promise.all(
            characterComicsFromState.map((comicId) =>
              // how can i use my nortflank server to link with my backend?
              // site--backend-react-keanu--zwjdy7r2ycpp.code.run
              axios.get(
                // "http://localhost:3000/comic/" + comicId,
                `https://site--backend-react-keanu--zwjdy7r2ycpp.code.run/comic/${comicId}`,
              ),
            ),
          );

          setComics(comicsResponses.map((response) => response.data));
          setTotalPages(1);
        } else if (characterId) {
          const response = await axios.get(
            "https://site--backend-react-keanu--zwjdy7r2ycpp.code.run/comics?characterId=" +
              characterId,
            // "http://localhost:3000/comics/" + characterId,
          );

          setComics(response.data.results || []);
          setTotalPages(1);
        } else {
          const response = await axios.get(
            `https://site--backend-react-keanu--zwjdy7r2ycpp.code.run/comics?title=${searchQuery}&page=${currentPage}&limit=${limit}`,
            // `http://localhost:3000/comics?title=${searchQuery}&page=${currentPage}&limit=${limit}`,
          );

          setComics(response.data.results);
          setTotalPages(Math.max(1, Math.ceil(response.data.count / limit)));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchQuery, characterId, characterComicsFromState]);

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
  };

  return (
    <main className="comics-home">
      <div className="comics-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {!characterId && (
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Rechercher un comic"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button>Rechercher</button>
              </form>
            )}

            <div className="comics-list">
              {comics.map((comic) => (
                <div className="comic-card" key={comic._id}>
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt={comic.title}
                  />
                  <h2>{comic.title}</h2>
                  <p>{comic.description || "Pas de description disponible"}</p>
                  <button
                    type="button"
                    className="favorite-toggle-btn"
                    onClick={() => toggleComicFavorite(comic)}
                  >
                    {favoriteComics.some(
                      (favoriteComic) =>
                        (favoriteComic._id || favoriteComic.id) ===
                        (comic._id || comic.id),
                    )
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"}
                  </button>
                </div>
              ))}
            </div>

            {!characterId && (
              <div className="pagination-wrapper">
                <button onClick={handlePrevious} disabled={currentPage === 1}>
                  Previous
                </button>

                <div className="pages-list">
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      className={page === currentPage ? "active" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Comics;
