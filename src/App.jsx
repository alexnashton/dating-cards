import { useState, useEffect } from 'react';
import DeckSelector from './components/DeckSelector';
import Instructions from './components/Instructions';
import CardDeck from './components/CardDeck';
import EmpathyDeck from './components/EmpathyDeck';
import Favorites from './components/Favorites';
import { dateNightCards } from './data/dateNightCards';
import { friendsFirstCards } from './data/friendsFirstCards';
import './App.css';

// localStorage keys
const STORAGE_KEYS = {
  usedCards: 'couplesCards_usedCards',
  favorites: 'couplesCards_favorites',
  empathySelections: 'couplesCards_empathySelections'
};

function App() {
  const [view, setView] = useState('home'); // home, instructions, deck, empathy, favorites
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Load state from localStorage
  const [usedCards, setUsedCards] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.usedCards);
    return saved ? JSON.parse(saved) : { dateNight: [], friendsFirst: [] };
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.favorites);
    return saved ? JSON.parse(saved) : [];
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
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

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

  const handleToggleFavorite = (card) => {
    setFavorites(prev => {
      const exists = prev.some(
        f => f.deckId === card.deckId && f.text === card.text
      );
      if (exists) {
        return prev.filter(
          f => !(f.deckId === card.deckId && f.text === card.text)
        );
      }
      return [...prev, card];
    });
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

  return (
    <div className="app">
      {view === 'home' && (
        <DeckSelector
          onSelectDeck={handleSelectDeck}
          onViewFavorites={() => setView('favorites')}
          favoritesCount={favorites.length}
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
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onReset={() => handleResetDeck(selectedDeck)}
          onBack={handleBack}
        />
      )}

      {view === 'empathy' && (
        <EmpathyDeck
          selectedCards={empathySelections}
          onToggleCard={handleToggleEmpathyCard}
          onClearSelections={handleClearEmpathySelections}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onBack={handleBack}
        />
      )}

      {view === 'favorites' && (
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleToggleFavorite}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
