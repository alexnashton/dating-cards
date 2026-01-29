import Card from './Card';

function Favorites({ favorites, onRemoveFavorite, onBack }) {
  const groupedFavorites = favorites.reduce((acc, fav) => {
    if (!acc[fav.deckName]) {
      acc[fav.deckName] = [];
    }
    acc[fav.deckName].push(fav);
    return acc;
  }, {});

  return (
    <div className="favorites-view">
      <header className="deck-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1>❤️ Favorites</h1>
      </header>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>No favorites yet!</p>
          <p className="empty-hint">Save cards from any deck by tapping the heart icon.</p>
        </div>
      ) : (
        <div className="favorites-content">
          {Object.entries(groupedFavorites).map(([deckName, deckFavorites]) => (
            <div key={deckName} className="favorites-section">
              <h2 className="favorites-deck-name">{deckName}</h2>
              <div className="favorites-grid">
                {deckFavorites.map((fav, index) => (
                  <div key={index} className="favorite-card-wrapper">
                    <div className="favorite-card">
                      {fav.category && <span className="favorite-category">{fav.category}</span>}
                      <p className="favorite-text">{fav.text}</p>
                    </div>
                    <button
                      className="remove-favorite"
                      onClick={() => onRemoveFavorite(fav)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
