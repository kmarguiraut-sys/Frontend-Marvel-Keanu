import "./favorites.css";

const Favorites = ({
  favoriteCharacters,
  favoriteComics,
  toggleCharacterFavorite,
  toggleComicFavorite,
}) => {
  return (
    <main className="favorites-page">
      <div className="favorites-container">
        <h1>Mes favoris</h1>

        <section className="favorites-section">
          <h2>Personnages favoris</h2>

          {favoriteCharacters.length === 0 ? (
            <p>Aucun personnage en favoris.</p>
          ) : (
            <div className="favorites-grid">
              {favoriteCharacters.map((character) => (
                <article className="favorite-card" key={character._id}>
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt={character.name}
                  />
                  <h3>{character.name}</h3>
                  <p>
                    {character.description || "Pas de description disponible"}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      // console.log("toggle character", character);
                      toggleCharacterFavorite(character);
                    }}
                  >
                    Retirer des favoris
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="favorites-section">
          <h2>Comics favoris</h2>

          {favoriteComics.length === 0 ? (
            <p>Aucun comic en favoris.</p>
          ) : (
            <div className="favorites-grid">
              {favoriteComics.map((comic) => (
                <article
                  className="favorite-card"
                  key={comic._id || comic.id || comic.title}
                >
                  {comic.thumbnail?.path && comic.thumbnail?.extension && (
                    <img
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                      alt={comic.title || comic.name}
                    />
                  )}
                  <h3>{comic.title || comic.name}</h3>
                  <p>{comic.description || "Pas de description disponible"}</p>
                  <button
                    type="button"
                    onClick={() => toggleComicFavorite(comic)}
                  >
                    Retirer des favoris
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Favorites;
