import { deckInfo } from '../data/deckInfo';

const LEARN_MORE_LINKS = [
  { label: 'Free: How to Become a Successful Relationship Coach & Improve your own Love Life', url: 'https://eartheart.samcart.com/referral/webinarpartner/iFpAPsyWJmI54LDb' },
  { label: 'Relationship Coach Certification Program', url: 'https://eartheart.samcart.com/referral/certificationpartner/iFpAPsyWJmI54LDb' },
  { label: 'Thrive in Love Online Course', url: 'https://eartheart.samcart.com/referral/2XJTNmiZ/iFpAPsyWJmI54LDb' },
  { label: 'Thriving Sex Online Course', url: 'https://eartheart.samcart.com/referral/R8nOlND4/iFpAPsyWJmI54LDb' },
  { label: 'Couples Retreat Weekend', url: 'https://eartheart.samcart.com/referral/retreat/iFpAPsyWJmI54LDb' },
];

function DeckSelector({ onSelectDeck }) {
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
      </div>

      <div className="learn-more-section">
        <h2 className="learn-more-title">Learn More</h2>
        <p className="learn-more-subtitle">The Center for Thriving Relationships</p>
        <div className="learn-more-links">
          {LEARN_MORE_LINKS.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeckSelector;
