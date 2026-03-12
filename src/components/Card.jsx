import { useState } from 'react';

function Card({ text, category, isSelected, onSelect, showSelectButton = false, color = '#5D2E5A', promoLink = null }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (showSelectButton && onSelect) {
      onSelect();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''} ${isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
      style={{ '--card-color': color }}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-ornament top-left" />
          <div className="card-ornament top-right" />
          <div className="card-content">
            {category && <span className="card-category">{category}</span>}
            <p className="card-text">{text}</p>
            {promoLink && (
              <a
                href={promoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-promo-link"
                onClick={e => e.stopPropagation()}
              >
                {promoLink.label}
              </a>
            )}
          </div>
          <div className="card-ornament bottom-left" />
          <div className="card-ornament bottom-right" />
        </div>
        <div className="card-back">
          <div className="card-back-design">
            <div className="mandala" />
          </div>
        </div>
      </div>
      {isSelected && <div className="selected-check">✓</div>}
    </div>
  );
}

export default Card;
