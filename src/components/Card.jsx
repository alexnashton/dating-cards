import { useState } from 'react';

function Card({ text, category, isSelected, onSelect, showSelectButton = false, color = '#5D2E5A', flipped }) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isControlled = flipped !== undefined;
  const isFlipped = isControlled ? flipped : internalFlipped;

  const handleClick = () => {
    if (isControlled) return; // parent controls flip
    if (showSelectButton && onSelect) {
      onSelect();
    } else {
      setInternalFlipped(!internalFlipped);
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
