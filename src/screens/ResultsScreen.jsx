function ResultsScreen({ 
  payload, 
  results, 
  isLoading, 
  error, 
  onRestart, 
  onRefine, 
  onSelectRecommendation,
  onRetry 
}) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} onBack={onRefine} />;
  }

  if (!results) {
    return <ErrorState error="No results available" onRetry={onRetry} onBack={onRefine} />;
  }

  return (
    <div className="results-screen">
      <div className="results-header">
        <div className="results-title">
          <span className="sparkle-icon">✨</span>
          <h2>Your Recommendations</h2>
        </div>
        <p className="results-subtitle">Based on your priorities and context</p>
      </div>

      <div className="recommendations-list">
        {results.recommendations.map((rec, index) => (
          <RecommendationCard 
            key={rec.id} 
            recommendation={rec} 
            rank={index + 1}
            onSelect={() => onSelectRecommendation(rec)}
          />
        ))}
      </div>

      {results.insights && results.insights.length > 0 && (
        <div className="insights-card">
          <h3>💡 Key Insights</h3>
          <ul className="insights-list">
            {results.insights.map((insight, i) => (
              <li key={i}>{insight}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="results-actions">
        <button className="secondary-button" onClick={onRefine}>
          ← Refine Decision
        </button>
        <button className="primary-button" onClick={onRestart}>
          New Decision
        </button>
      </div>
    </div>
  );
}

// Loading State Component
function LoadingState() {
  return (
    <div className="loading-state">
      <div className="spinner"></div>
      <h3>Analyzing your decision...</h3>
      <p>Our AI is evaluating your factors and generating personalized recommendations</p>
      <p className="loading-tip">💡 This usually takes 5-10 seconds</p>
    </div>
  );
}

// Error State Component
function ErrorState({ error, onRetry, onBack }) {
  return (
    <div className="error-state">
      <div className="error-icon">⚠️</div>
      <h3>Oops! Something went wrong</h3>
      <p className="error-message">{error}</p>
      <div className="error-actions">
        <button className="secondary-button" onClick={onBack}>
          ← Go Back
        </button>
        <button className="primary-button" onClick={onRetry}>
          Try Again
        </button>
      </div>
    </div>
  );
}

// Recommendation Card Component - UPDATED with select button
function RecommendationCard({ recommendation, rank, onSelect }) {
  const { title, description, score, pros, cons } = recommendation;

  const getBadgeClass = () => {
    if (score >= 85) return 'badge-excellent';
    if (score >= 70) return 'badge-good';
    return 'badge-fair';
  };

  return (
    <div className="recommendation-card">
      <div className="card-header">
        <div className="card-title-row">
          <span className="rank-badge">#{rank}</span>
          <h3>{title}</h3>
        </div>
        <div className={`score-badge ${getBadgeClass()}`}>
          {score}%
        </div>
      </div>

      <p className="card-description">{description}</p>

      <div className="pros-cons-grid">
        <div className="pros-section">
          <div className="section-header">
            <span className="check-icon">✓</span>
            <h4>Pros</h4>
          </div>
          <ul>
            {pros.map((pro, i) => (
              <li key={i}>{pro}</li>
            ))}
          </ul>
        </div>

        <div className="cons-section">
          <div className="section-header">
            <span className="x-icon">✕</span>
            <h4>Cons</h4>
          </div>
          <ul>
            {cons.map((con, i) => (
              <li key={i}>{con}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ADD SELECT BUTTON */}
      <button 
        className="primary-button" 
        onClick={onSelect}
        style={{ marginTop: '16px', width: '100%' }}
      >
        Select This Option →
      </button>
    </div>
  );
}

export default ResultsScreen;