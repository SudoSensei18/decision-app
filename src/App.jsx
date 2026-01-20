import { useState } from "react";
import ContextInput from "./screens/ContextInput.jsx";
import Welcome from "./screens/Welcome.jsx";
import ResultsScreen from "./screens/ResultsScreen.jsx";
import Navigation from "./components/Navigation.jsx";
import FinishScreen from "./screens/FinishScreen.jsx";
import { generateRecommendations } from "./services/api";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("welcome");

  const [payload, setPayload] = useState(null);

  // ✅ store results in App so we don't re-call API when navigating
  const [results, setResults] = useState(null);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [resultsError, setResultsError] = useState(null);

  // ✅ selection for finishing screen
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  function handleNavigation(screenName) {
    if (screenName === "results" && !payload) {
      alert("Please complete the decision form first");
      return;
    }
    setScreen(screenName);
  }

  function handleRestart() {
    setScreen("welcome");
    setPayload(null);
    setResults(null);
    setResultsError(null);
    setResultsLoading(false);
    setSelectedRecommendation(null);
  }

  function handleRefine() {
    setScreen("context");
    // Keep payload + results so they can edit; you can decide to clear results if you prefer
  }

  async function handleContinueFromContext(p) {
    setPayload(p);
    setScreen("results");

    // Only call API if we don't already have results for this payload
    // (simple approach: always call; or you can add hashing if needed)
    setResults(null);
    setResultsError(null);
    setResultsLoading(true);

    try {
      const aiResults = await generateRecommendations(p);
      setResults(aiResults);
    } catch (err) {
      setResultsError(err?.message || "Failed to generate recommendations");
    } finally {
      setResultsLoading(false);
    }
  }

  function handleSelectRecommendation(rec) {
    setSelectedRecommendation(rec);
    setScreen("finish");
  }

  return (
    <div className="app-root">
      <div className="phone-container">
        <div className="screen-content">
          {screen === "welcome" && (
            <div key="welcome" className="screen-wrapper fade-in">
              <Welcome onStart={() => setScreen("context")} />
            </div>
          )}

          {screen === "context" && (
            <div key="context" className="screen-wrapper fade-in">
              <ContextInput onContinue={handleContinueFromContext} />
            </div>
          )}

          {screen === "results" && (
            <div key="results" className="screen-wrapper fade-in">
              <ResultsScreen
                payload={payload}
                results={results}
                isLoading={resultsLoading}
                error={resultsError}
                onRestart={handleRestart}
                onRefine={handleRefine}
                onSelectRecommendation={handleSelectRecommendation}
                onRetry={() => handleContinueFromContext(payload)}
              />
            </div>
          )}

          {screen === "finish" && selectedRecommendation && (
            <div key="finish" className="screen-wrapper fade-in">
              <FinishScreen
                recommendation={selectedRecommendation}
                onDone={() => setScreen("results")}
                onNewDecision={handleRestart}
              />
            </div>
          )}
        </div>

        <Navigation currentScreen={screen} onNavigate={handleNavigation} />
      </div>
    </div>
  );
}

export default App;
