import { useEffect, useState } from 'react';

function LandingScreen({ onContinue }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showAndroidModal, setShowAndroidModal] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleIPhone = () => {
    setShowIOSModal(true);
  };

  const handleAndroid = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      setShowAndroidModal(true);
    }
  };

  return (
    <div className="landing-screen">
      <div className="landing-logo">
        <img src="/icon-192.png" alt="Couples Connection Cards" className="landing-icon" />
        <h1 className="landing-title">Couples Connection Cards</h1>
        <p className="landing-subtitle">The Center for Thriving Relationships</p>
      </div>

      <div className="landing-cards">
        <button className="landing-card-btn" onClick={handleIPhone}>
          <div className="mini-card-back" style={{ background: 'linear-gradient(135deg, #E8C5E5 0%, #B87DB4 40%, #7A4278 100%)' }}>
            <div className="mandala" />
          </div>
          <span className="landing-card-label">Download to iPhone</span>
        </button>

        <button className="landing-card-btn" onClick={handleAndroid}>
          <div className="mini-card-back" style={{ background: 'linear-gradient(135deg, #C9A227 0%, #3D1E3A 100%)' }}>
            <div className="mandala" />
          </div>
          <span className="landing-card-label">Download to Android</span>
        </button>
      </div>

      <button className="landing-continue-btn" onClick={onContinue}>
        Continue to web app →
      </button>

      {showIOSModal && (
        <div className="install-modal-overlay" onClick={() => setShowIOSModal(false)}>
          <div className="install-modal" onClick={e => e.stopPropagation()}>
            <h2>Add to iPhone Home Screen</h2>
            <p>Open this page in <strong>Safari</strong>, then:</p>
            <ol>
              <li>Tap the <strong>Share</strong> button <span className="install-icon">⎙</span> at the bottom of the screen</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
              <li>Tap <strong>"Add"</strong> to confirm</li>
            </ol>
            <button className="install-modal-close" onClick={() => setShowIOSModal(false)}>Got it</button>
          </div>
        </div>
      )}

      {showAndroidModal && (
        <div className="install-modal-overlay" onClick={() => setShowAndroidModal(false)}>
          <div className="install-modal" onClick={e => e.stopPropagation()}>
            <h2>Add to Android Home Screen</h2>
            <p>Open this page in <strong>Chrome</strong>, then:</p>
            <ol>
              <li>Tap the <strong>menu</strong> button <span className="install-icon">⋮</span> in the top right</li>
              <li>Tap <strong>"Add to Home screen"</strong></li>
              <li>Tap <strong>"Add"</strong> to confirm</li>
            </ol>
            <button className="install-modal-close" onClick={() => setShowAndroidModal(false)}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingScreen;
