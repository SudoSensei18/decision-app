import Button from "../components/Button";

function Welcome({onStart}) {
  const handleClick = () => {
    console.log("Button clicked!");
    console.log("onStart is:", onStart);
    onStart(); // Call the function
  };
  return (
    
    <div className="welcome-screen">
      <div className="welcome-icon">🎯</div>
      <h2>Welcome to NextStep</h2>
      <p className="welcome-description">
        Make better decisions, faster
      </p>
      <div className="feature-list">
        <div className="feature-item">
          <span>📋</span>
          <span>Choose your decision category</span>
        </div>
        <div className="feature-item">
           <span>⚖️</span>
           <span>Select factors that matter to you</span>
        </div>
        <div className="feature-item">
          <span>💡</span>
          <span>Get AI-powered Recommendations</span>
      </div>

    </div>
    <button className="primary-button" onClick={onStart}>Begin</button>
    </div>
  );
}
export default Welcome;