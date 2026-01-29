import { useState } from 'react';
import Card from './Card';
import { feelingsMet, feelingsUnmet, needs } from '../data/empathyCards';
import { deckInfo } from '../data/deckInfo';

function EmpathyDeck({
  selectedCards,
  onToggleCard,
  onClearSelections,
  favorites,
  onToggleFavorite,
  onBack
}) {
  const [activeTab, setActiveTab] = useState('feelingsMet');
  const deck = deckInfo.empathy;

  const tabs = [
    { id: 'feelingsMet', label: 'Feelings (Met)', cards: feelingsMet, category: 'Feeling (needs met)' },
    { id: 'feelingsUnmet', label: 'Feelings (Unmet)', cards: feelingsUnmet, category: 'Feeling (needs unmet)' },
    { id: 'needs', label: 'Needs', cards: needs, category: 'Need' }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);
  const selectedCount = Object.values(selectedCards).flat().length;

  const isCardSelected = (tabId, card) => {
    return selectedCards[tabId]?.includes(card) || false;
  };

  const handleCardToggle = (tabId, card) => {
    onToggleCard(tabId, card);
  };

  const isFavorite = (card, category) => {
    return favorites.some(f => f.deckId === 'empathy' && f.text === card);
  };

  const handleToggleFavorite = (card, category) => {
    onToggleFavorite({
      deckId: 'empathy',
      text: card,
      category: category,
      deckName: deck.name
    });
  };

  return (
    <div className="empathy-deck" style={{ '--deck-color': deck.color }}>
      <header className="deck-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1>{deck.name}</h1>
        {selectedCount > 0 && (
          <div className="selection-info">
            <span>{selectedCount} selected</span>
            <button className="clear-button" onClick={onClearSelections}>
              Clear
            </button>
          </div>
        )}
      </header>

      <div className="empathy-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {selectedCards[tab.id]?.length > 0 && (
              <span className="tab-count">{selectedCards[tab.id].length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="empathy-cards-grid">
        {currentTab.cards.map((card, index) => (
          <div key={index} className="empathy-card-wrapper">
            <button
              className={`empathy-card ${isCardSelected(activeTab, card) ? 'selected' : ''}`}
              onClick={() => handleCardToggle(activeTab, card)}
            >
              <span className="empathy-card-text">{card}</span>
              {isCardSelected(activeTab, card) && <span className="check-mark">✓</span>}
            </button>
            <button
              className={`mini-favorite ${isFavorite(card, currentTab.category) ? 'is-favorite' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(card, currentTab.category);
              }}
            >
              {isFavorite(card, currentTab.category) ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>

      {selectedCount > 0 && (
        <div className="selected-summary">
          <h3>Selected Cards</h3>
          <div className="selected-list">
            {tabs.map(tab => (
              selectedCards[tab.id]?.length > 0 && (
                <div key={tab.id} className="selected-category">
                  <h4>{tab.label}</h4>
                  <div className="selected-tags">
                    {selectedCards[tab.id].map((card, i) => (
                      <span key={i} className="selected-tag">
                        {card}
                        <button
                          className="remove-tag"
                          onClick={() => handleCardToggle(tab.id, card)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmpathyDeck;
