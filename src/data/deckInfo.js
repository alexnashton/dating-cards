// Deck information including instructions and guidance text

export const deckInfo = {
  dateNight: {
    id: 'dateNight',
    name: 'Date Night Discovery',
    tagline: 'Want to learn something new about each other?',
    description: 'Open-ended questions designed to spark meaningful conversations and deepen your connection.',
    color: '#5D2E5A',
    instructions: [
      'Take turns reading the question aloud, then both of you answer it',
      'Listen fully before responding — don\'t plan your answer while they\'re talking',
      'Ask follow-up questions with genuine curiosity: "Tell me more about that..."',
      'Resist the urge to fix, advise, or challenge — just receive what they share',
      'It\'s okay to sit in silence; some answers need time to form',
      'Put phones away and make eye contact',
      'There are no wrong answers — even "I don\'t know" can start a conversation'
    ],
    howToPlay: 'Tap the deck to draw a card. Read the question aloud, then take turns answering. When you\'re ready for the next question, tap the card again.'
  },
  empathy: {
    id: 'empathy',
    name: 'Empathy Cards',
    tagline: 'Need to feel heard and understood?',
    description: 'Feeling and need cards to help you understand and express emotions together.',
    color: '#2E5D4A',
    instructions: [
      'Partner 1 speaks for 3-10 minutes without interruption',
      'Partner 2 listens and selects feeling/need cards that match',
      'Pleasant feelings = needs being met',
      'Unpleasant feelings = needs not being met',
      'Share using: "I imagine you were feeling..."',
      'And: "Because you value/are longing for..."'
    ],
    howToPlay: 'One partner shares while the other listens and selects cards that reflect what they hear. Then discuss.'
  },
  friendsFirst: {
    id: 'friendsFirst',
    name: 'Friends First',
    tagline: 'Think you know your partner? Test it!',
    description: 'Fun guessing game to discover how well you really know each other.',
    color: '#C9A227',
    instructions: [
      'One person draws a card and reads it silently — it asks about your partner',
      'Without showing the card, guess what your partner\'s answer would be',
      'Your partner then reveals their real answer',
      'Celebrate correct guesses! For wrong ones, say "good guess!" and share the truth',
      'This isn\'t a test — wrong answers are chances to learn something new',
      'Take turns being the guesser, or keep the same roles for a few rounds',
      'Ask "why?" to turn any answer into a deeper conversation'
    ],
    howToPlay: 'Tap to draw a card. Read it to yourself, then guess your partner\'s answer out loud. Let them reveal if you were right! Tap the card again when you\'re ready for the next one.'
  }
};

export default deckInfo;
