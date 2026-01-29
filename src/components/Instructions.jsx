import { deckInfo } from '../data/deckInfo';

function Instructions({ deckId, onStart, onBack }) {
  const deck = deckInfo[deckId];

  if (!deck) return null;

  return (
    <div className="instructions" style={{ '--deck-color': deck.color }}>
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="instructions-content">
        <h1 className="instructions-title">{deck.name}</h1>

        <div className="instructions-section">
          <h2>How to Play</h2>
          <p className="how-to-play">{deck.howToPlay}</p>
        </div>

        <div className="instructions-section">
          <h2>Guidelines</h2>
          <ul className="instructions-list">
            {deck.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>

        <button className="start-button" onClick={onStart}>
          Start Playing
        </button>
      </div>
    </div>
  );
}

export default Instructions;
