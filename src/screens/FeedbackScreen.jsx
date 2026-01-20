import { useState } from "react";

export default function FeedbackScreen({ recommendation, onBack, onSubmit }) {
  const [rating, setRating] = useState(null);
  const [text, setText] = useState("");

  return (
    <div className="screen">
      <section className="card">
        <h2>Feedback</h2>
        <p className="subtitle">
          You selected: <strong>{recommendation.title ?? "Recommendation"}</strong>
        </p>

        <div className="chip-row">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={rating === n ? "active" : ""}
              onClick={() => setRating(n)}
            >
              {n}
            </button>
          ))}
        </div>

        <textarea
          placeholder="What did you like/dislike? Was this helpful?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
        />

        <div className="nav-buttons" style={{ marginTop: 16 }}>
          <button type="button" className="secondary-button" onClick={onBack}>
            Back
          </button>
          <button
            type="button"
            className="primary-button"
            disabled={!rating}
            onClick={() => onSubmit({ rating, text: text.trim(), recommendation })}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
}
