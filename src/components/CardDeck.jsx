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
  const [cardFaceUp, setCardFaceUp] = useState(false);
  const cardPositionRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const deck = deckInfo[deckId];

  const availableCards = cards.filter((_, index) => !usedCards.includes(index));
  const allUsed = availableCards.length === 0;

  const drawNextQuestion = () => {
    const availableIndices = cards
      .map((_, index) => index)
      .filter(index => !usedCards.includes(index));
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setCurrentCard({ text: cards[randomIndex], index: randomIndex });
    setCurrentPromo(null);
    setCardFaceUp(false); // new card starts face-down
    onMarkUsed(randomIndex);
    setIsRevealed(true);
  };

  const advance = () => {
    cardPositionRef.current += 1;
    const pos = cardPositionRef.current;
    if (pos % 5 === 0) {
      const promoIndex = (Math.floor(pos / 5) - 1) % PROMO_CARDS.length;
      setCurrentPromo(PROMO_CARDS[promoIndex]);
      setCurrentCard(null);
      setCardFaceUp(false);
      setIsRevealed(true);
    } else {
      drawNextQuestion();
    }
  };

  const handleCardAreaTap = () => {
    if (allUsed && !currentPromo) return;
    if (isAnimatingRef.current) return;
    if (!cardFaceUp) {
      setCardFaceUp(true); // tap to flip and reveal
    } else {
      // Tap to unflip — animate back to face-down, then advance
      isAnimatingRef.current = true;
      setCardFaceUp(false);
      setTimeout(() => {
        isAnimatingRef.current = false;
        advance();
      }, 600); // matches CSS transition duration
    }
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
          <div className="card-placeholder" onClick={drawNextQuestion}>
            <div className="card-back-preview">
              <div className="mandala" />
            </div>
            <p>Tap to draw a card</p>
          </div>
        ) : (
          <div className="revealed-card">
            <div
              className={`card-tap-area ${allUsed && !currentPromo ? 'disabled' : ''}`}
              onClick={allUsed && !currentPromo ? undefined : handleCardAreaTap}
            >
              {currentPromo ? (
                <PromoCard promo={currentPromo} flipped={!cardFaceUp} />
              ) : (
                <Card
                  text={currentCard.text}
                  color={deck.color}
                  flipped={!cardFaceUp}
                />
              )}
              {!allUsed && (
                <p className="tap-hint">
                  {currentPromo ? 'Tap to continue' : cardFaceUp ? 'Tap card for next question' : 'Tap to reveal'}
                </p>
              )}
            </div>
          </div>
        )}
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
