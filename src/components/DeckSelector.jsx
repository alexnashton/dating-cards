import { deckInfo } from '../data/deckInfo';

function DeckSelector({ onSelectDeck, onViewFavorites, favoritesCount }) {
  const decks = Object.values(deckInfo);

  return (
    <div className="deck-selector">
      <header className="app-header">
        <h1>Couples Connection Cards</h1>
        <p className="subtitle">Choose a deck to strengthen your bond</p>
      </header>

      <div className="deck-grid">
        {decks.map(deck => (
          <button
            key={deck.id}
            className="deck-card"
            onClick={() => onSelectDeck(deck.id)}
            style={{ '--deck-color': deck.color }}
          >
            <div className="deck-card-inner">
              <h2 className="deck-name">{deck.name}</h2>
              <p className="deck-tagline">{deck.tagline}</p>
              <p className="deck-description">{deck.description}</p>
            </div>
          </button>
        ))}

        <button
          className="deck-card favorites-card"
          onClick={onViewFavorites}
        >
          <div className="deck-card-inner">
            <h2 className="deck-name">❤️ Favorites</h2>
            <p className="deck-tagline">Your saved cards</p>
            <p className="deck-description">
              {favoritesCount > 0
                ? `You have ${favoritesCount} saved card${favoritesCount !== 1 ? 's' : ''}`
                : 'Save cards from any deck to find them here'}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default DeckSelector;
