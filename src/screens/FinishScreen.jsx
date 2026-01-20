export default function FinishScreen({ recommendation, onDone, onNewDecision }) {
  return (
    <div className="screen">
      <section className="card finish-card">
        <div className="finish-icon">🧭</div>

        <h2 className="finish-title">Decision Confirmed</h2>
        <p className="finish-subtitle">
          Based on what matters most to you, this is the strongest choice.
        </p>

        <div className="recommendation-card finish-recommendation">
          <div className="card-header">
            <div className="card-title-row">
              <span className="rank-badge">✓</span>
              <h3>{recommendation.title}</h3>
            </div>
          </div>

          <p className="card-description">
            {recommendation.description}
          </p>
        </div>

        <div className="finish-actions">
          <button
            type="button"
            className="primary-button"
            onClick={onDone}
          >
            Back to Results
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={onNewDecision}
          >
            Start a New Decision
          </button>
        </div>
      </section>
    </div>
  );
}
