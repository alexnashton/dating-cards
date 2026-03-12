import { useState, useRef } from 'react';
import Card from './Card';
import PromoCard from './PromoCard';
import { deckInfo } from '../data/deckInfo';

const PROMO_CARDS = [
  {
    id: 'masterclass',
    tag: 'FREE TRAINING',
    title: 'Want to become a relationship coach?',
    body: 'There has never been a better time in history to help people with their relationships — while enjoying a meaningful and abundant career.',
    feature: 'The <em>3 Keys</em> to Being a Successful <em>Relationship Coach</em> and Improving Your Own <em>Love Life</em>',
    cta: 'Sign Up for Free Instant Access →',
    url: 'https://eartheart.samcart.com/referral/webinarpartner/iFpAPsyWJmI54LDb',
  },
  {
    id: 'certification',
    tag: 'CERTIFICATION PROGRAM',
    title: 'Become a certified relationship coach',
    body: 'Join our comprehensive training program and build a thriving career helping couples create the love life they deserve.',
    feature: '<em>Relationship Coach</em> Certification Program',
    cta: 'Learn More →',
    url: 'https://eartheart.samcart.com/referral/certificationpartner/iFpAPsyWJmI54LDb',
  },
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
  const [currentPromo, setCurrentPromo] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const cardPositionRef = useRef(0);
  const deck = deckInfo[deckId];

  const availableCards = cards.filter((_, index) => !usedCards.includes(index));
  const allUsed = availableCards.length === 0;

  const handleTap = () => {
    if (allUsed) return;

    cardPositionRef.current += 1;
    const pos = cardPositionRef.current;

    if (pos % 5 === 0) {
      const promoIndex = (Math.floor(pos / 5) - 1) % PROMO_CARDS.length;
      setCurrentPromo(PROMO_CARDS[promoIndex]);
      setCurrentCard(null);
    } else {
      const availableIndices = cards
        .map((_, index) => index)
        .filter(index => !usedCards.includes(index));
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setCurrentCard({ text: cards[randomIndex], index: randomIndex });
      setCurrentPromo(null);
      onMarkUsed(randomIndex);
    }

    setIsRevealed(true);
  };

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
          <div className="card-placeholder" onClick={handleTap}>
            <div className="card-back-preview">
              <div className="mandala" />
            </div>
            <p>Tap to draw a card</p>
          </div>
        ) : currentPromo ? (
          <div className="revealed-card">
            <div className="card-tap-area" onClick={handleTap}>
              <PromoCard promo={currentPromo} />
              {!allUsed && <p className="tap-hint">Tap card to continue</p>}
            </div>
          </div>
        ) : currentCard ? (
          <div className="revealed-card">
            <div className={`card-tap-area ${allUsed ? 'disabled' : ''}`} onClick={allUsed ? undefined : handleTap}>
              <Card
                text={currentCard.text}
                color={deck.color}
              />
              {!allUsed && <p className="tap-hint">Tap card for next question</p>}
            </div>
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
