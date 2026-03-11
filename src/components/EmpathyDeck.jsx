import { useState, useEffect } from 'react';
import Card from './Card';
import { feelingsMet, feelingsUnmet, needs } from '../data/empathyCards';
import { deckInfo } from '../data/deckInfo';

function EmpathyDeck({
  selectedCards,
  onToggleCard,
  onClearSelections,
  onBack
}) {
  const [activeTab, setActiveTab] = useState('feelingsMet');
  const deck = deckInfo.empathy;

  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    if (!timerRunning || timerSecondsLeft === null) return;
    if (timerSecondsLeft <= 0) {
      setTimerRunning(false);
      setTimerFinished(true);
      return;
    }
    const interval = setInterval(() => {
      setTimerSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timerSecondsLeft]);

  const handleStartTimer = () => {
    setTimerSecondsLeft(timerMinutes * 60);
    setTimerRunning(true);
    setTimerFinished(false);
  };

  const handlePauseTimer = () => setTimerRunning(false);
  const handleResumeTimer = () => setTimerRunning(true);

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerSecondsLeft(null);
    setTimerFinished(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const timerStarted = timerSecondsLeft !== null;

  const tabs = [
    { id: 'feelingsMet', label: 'Pleasant Feelings', cards: feelingsMet, category: 'Feeling (needs met)' },
    { id: 'feelingsUnmet', label: 'Unpleasant Feelings', cards: feelingsUnmet, category: 'Feeling (needs unmet)' },
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

  const selectedFeelings = [
    ...(selectedCards['feelingsMet'] || []),
    ...(selectedCards['feelingsUnmet'] || []),
  ];
  const selectedNeeds = selectedCards['needs'] || [];

  if (timerFinished) {
    return (
      <div className="empathy-deck" style={{ '--deck-color': deck.color }}>
        <div className="empathy-summary-page">
          <header className="deck-header">
            <button className="back-button" onClick={handleResetTimer}>
              ← Back to Deck
            </button>
            <h1>Empathy Summary</h1>
          </header>

          <div className="empathy-summary-content">
            <section className="empathy-summary-section">
              <h2 className="empathy-summary-heading">I imagine you were/are feeling...</h2>
              {selectedFeelings.length > 0 ? (
                <div className="empathy-summary-pills">
                  {selectedFeelings.map((feeling, i) => (
                    <span key={i} className="empathy-summary-pill">{feeling}</span>
                  ))}
                </div>
              ) : (
                <p className="empathy-summary-empty">No feelings selected.</p>
              )}
            </section>

            <section className="empathy-summary-section">
              <div className="empathy-summary-because-list">
                <p>Because you feel fulfilled by...</p>
                <p>Because you are longing for more...</p>
                <p>Because you have unmet needs for...</p>
                <p>Because you value...</p>
              </div>
              {selectedNeeds.length > 0 ? (
                <div className="empathy-summary-pills">
                  {selectedNeeds.map((need, i) => (
                    <span key={i} className="empathy-summary-pill empathy-summary-pill--needs">{need}</span>
                  ))}
                </div>
              ) : (
                <p className="empathy-summary-empty">No needs selected.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="empathy-timer">
        {!timerStarted ? (
          <div className="timer-setup">
            <span className="timer-label">Set timer:</span>
            <div className="timer-options">
              {[3, 4, 5, 6, 7, 8, 9, 10].map(min => (
                <button
                  key={min}
                  className={`timer-option ${timerMinutes === min ? 'active' : ''}`}
                  onClick={() => setTimerMinutes(min)}
                >
                  {min}m
                </button>
              ))}
            </div>
            <button className="timer-start-btn" onClick={handleStartTimer}>
              Start Timer
            </button>
          </div>
        ) : (
          <div className="timer-running">
            <span className={`timer-display ${timerSecondsLeft <= 30 ? 'timer-urgent' : ''}`}>
              {formatTime(timerSecondsLeft)}
            </span>
            <div className="timer-controls">
              {timerRunning ? (
                <button className="timer-ctrl-btn" onClick={handlePauseTimer}>Pause</button>
              ) : (
                <button className="timer-ctrl-btn" onClick={handleResumeTimer}>Resume</button>
              )}
              <button className="timer-ctrl-btn timer-ctrl-reset" onClick={handleResetTimer}>Reset</button>
            </div>
          </div>
        )}
      </div>

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
