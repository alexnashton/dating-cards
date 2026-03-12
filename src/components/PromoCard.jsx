function PromoCard({ promo, flipped }) {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} style={{ '--card-color': '#5D2E5A' }}>
      <div className="card-inner">
        <div className="card-front promo-card">
          <div className="card-ornament top-left" />
          <div className="card-ornament top-right" />
          <div className="promo-card-content">
            <p className="promo-card-tag">{promo.tag}</p>
            <h2 className="promo-card-title">{promo.title}</h2>
            <p className="promo-card-body">{promo.body}</p>
            <p className="promo-card-feature" dangerouslySetInnerHTML={{ __html: promo.feature }} />
            <a
              href={promo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="promo-card-cta"
              onClick={e => e.stopPropagation()}
            >
              {promo.cta}
            </a>
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
    </div>
  );
}

export default PromoCard;
