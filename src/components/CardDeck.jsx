import { useState, useEffect } from 'react';
import Card from './Card';
import { deckInfo } from '../data/deckInfo';

const PROMO_LINKS = [
  { label: 'Free: How to Become a Successful Relationship Coach & Improve your own Love Life', url: 'https://eartheart.samcart.com/referral/webinarpartner/iFpAPsyWJmI54LDb' },
  { label: 'Relationship Coach Certification Program', url: 'https://eartheart.samcart.com/referral/certificationpartner/iFpAPsyWJmI54LDb' },
];

function CardDeck({
  deckId,
  cards,
  usedCards,
  onMarkUsed,
  onReset,
  onBack
}) {
  const [currentCard, setCurrentCard] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [cardsDrawnCount, setCardsDrawnCount] = useState(0);
  const deck = deckInfo[deckId];

  const availableCards = cards.filter((_, index) => !usedCards.includes(index));
  const allUsed = availableCards.length === 0;

  const drawCard = () => {
    if (allUsed) return;

    const availableIndices = cards
      .map((_, index) => index)
      .filter(index => !usedCards.includes(index));

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const nextCount = cardsDrawnCount + 1;
    setCurrentCard({ text: cards[randomIndex], index: randomIndex });
    setIsRevealed(true);
    setCardsDrawnCount(nextCount);
    onMarkUsed(randomIndex);
  };

  const showPromo = cardsDrawnCount > 0 && cardsDrawnCount % 5 === 0;
  const promoLink = PROMO_LINKS[Math.floor(cardsDrawnCount / 5 - 1) % PROMO_LINKS.length];

  return (
    <div className="card-deck" style={{ '--deck-color': deck.color }}>
      <header className="deck-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1>{deck.name}</h1>
        <div className="deck-progress">
          {cards.length - availableCards.length} / {cards.length} cards used
        </div>
      </header>

      <div className="card-area">
        {!isRevealed ? (
          <div className="card-placeholder" onClick={drawCard}>
            <div className="card-back-preview">
              <div className="mandala" />
            </div>
            <p>Tap to draw a card</p>
          </div>
        ) : currentCard ? (
          <div className="revealed-card">
            <div className={`card-tap-area ${allUsed ? 'disabled' : ''}`} onClick={allUsed ? undefined : drawCard}>
              <Card
                text={currentCard.text}
                color={deck.color}
              />
              {!allUsed && <p className="tap-hint">Tap card for next question</p>}
            </div>
            {showPromo && (
              <a
                href={promoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-promo-link"
              >
                {promoLink.label}
              </a>
            )}
          </div>
        ) : null}
      </div>

      {allUsed && (
        <div className="deck-actions">
          <div className="all-used">
            <p>You've been through all the cards!</p>
            <button className="reset-button" onClick={onReset}>
              Reset Deck
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardDeck;
