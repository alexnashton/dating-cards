import { useState, useEffect } from 'react';
import LandingScreen from './components/LandingScreen';
import DeckSelector from './components/DeckSelector';
import Instructions from './components/Instructions';
import CardDeck from './components/CardDeck';
import EmpathyDeck from './components/EmpathyDeck';
import { dateNightCards } from './data/dateNightCards';
import { friendsFirstCards } from './data/friendsFirstCards';
import './App.css';

// localStorage keys
const STORAGE_KEYS = {
  usedCards: 'couplesCards_usedCards',
  empathySelections: 'couplesCards_empathySelections'
};

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [view, setView] = useState('home'); // home, instructions, deck, empathy
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Load state from localStorage
  const [usedCards, setUsedCards] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.usedCards);
    return saved ? JSON.parse(saved) : { dateNight: [], friendsFirst: [] };
  });

  const [empathySelections, setEmpathySelections] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.empathySelections);
    return saved ? JSON.parse(saved) : { feelingsMet: [], feelingsUnmet: [], needs: [] };
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.usedCards, JSON.stringify(usedCards));
  }, [usedCards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.empathySelections, JSON.stringify(empathySelections));
  }, [empathySelections]);

  const handleSelectDeck = (deckId) => {
    setSelectedDeck(deckId);
    setView('instructions');
  };

  const handleStartDeck = () => {
    if (selectedDeck === 'empathy') {
      setView('empathy');
    } else {
      setView('deck');
    }
  };

  const handleBack = () => {
    setView('home');
    setSelectedDeck(null);
  };

  const handleMarkUsed = (deckId, cardIndex) => {
    setUsedCards(prev => ({
      ...prev,
      [deckId]: [...prev[deckId], cardIndex]
    }));
  };

  const handleResetDeck = (deckId) => {
    setUsedCards(prev => ({
      ...prev,
      [deckId]: []
    }));
  };

  const handleToggleEmpathyCard = (tabId, card) => {
    setEmpathySelections(prev => {
      const current = prev[tabId] || [];
      if (current.includes(card)) {
        return { ...prev, [tabId]: current.filter(c => c !== card) };
      }
      return { ...prev, [tabId]: [...current, card] };
    });
  };

  const handleClearEmpathySelections = () => {
    setEmpathySelections({ feelingsMet: [], feelingsUnmet: [], needs: [] });
  };

  const getCardsForDeck = (deckId) => {
    switch (deckId) {
      case 'dateNight':
        return dateNightCards;
      case 'friendsFirst':
        return friendsFirstCards;
      default:
        return [];
    }
  };

  if (showLanding) {
    return <LandingScreen onContinue={() => setShowLanding(false)} />;
  }

  return (
    <div className="app">
      {view === 'home' && (
        <DeckSelector
          onSelectDeck={handleSelectDeck}
        />
      )}

      {view === 'instructions' && selectedDeck && (
        <Instructions
          deckId={selectedDeck}
          onStart={handleStartDeck}
          onBack={handleBack}
        />
      )}

      {view === 'deck' && selectedDeck && (
        <CardDeck
          deckId={selectedDeck}
          cards={getCardsForDeck(selectedDeck)}
          usedCards={usedCards[selectedDeck] || []}
          onMarkUsed={(index) => handleMarkUsed(selectedDeck, index)}
          onReset={() => handleResetDeck(selectedDeck)}
          onBack={handleBack}
        />
      )}

      {view === 'empathy' && (
        <EmpathyDeck
          selectedCards={empathySelections}
          onToggleCard={handleToggleEmpathyCard}
          onClearSelections={handleClearEmpathySelections}
          onBack={handleBack}
        />
      )}


    </div>
  );
}

export default App;
