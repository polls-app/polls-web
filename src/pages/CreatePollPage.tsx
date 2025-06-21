import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../styles/create-poll.css";

export default function CreatePollPage() {
  const [type, setType] = useState<"selection" | "comment">("selection");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    if (options.length < 10) setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const updated = [...options];
      updated.splice(index, 1);
      setOptions(updated);
    }
  };

  const handleSubmit = () => {
    const payload = {
      type,
      question,
      options: type === "selection" ? options.filter((o) => o.trim() !== "") : [],
    };
    console.log("POST POLL:", payload);
    // send payload to backend here
  };

  const canPost = question.trim() && options.every(opt => opt.trim());

  return (
    <div id="app">
      <Header name="New poll" />
      
      <div className="poll-content create-poll-container" style={{backgroundColor: '#CD6D54'}}>
        <div className="poll-type-toggle">
          <button
            onClick={() => setType("selection")}
            className={`toggle-btn ${type === "selection" ? "active" : ""}`}
          >
            <div className="checkbox-icon"></div>
            Selection poll
          </button>
          <button
            onClick={() => setType("comment")}
            className={`toggle-btn ${type === "comment" ? "active" : ""}`}
          >
            <div className="comment-icon"></div>
            Comment poll
          </button>
        </div>

        <div className="question-section">
          <textarea
            className="question-input"
            placeholder="Enter your question!"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onInput={(e) => {
              const el = e.target as HTMLTextAreaElement;
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }}
            rows={1}
          />
        </div>

        <div className="action-buttons">
          <button className="action-btn">💬</button>
          <button className="action-btn">🖼️</button>
          <button className="action-btn">⋯</button>
          <button className="action-btn">✏️</button>
        </div>

        <div className="options-section">
          {options.map((option, index) => (
            <div key={index} className="option-item">
              <span className="option-plus">+</span>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="option-input"
              />
              <div className="option-actions">
                <button className="option-action-btn">📋</button>
                <button 
                  onClick={() => handleRemoveOption(index)}
                  className="option-action-btn"
                  disabled={options.length <= 2}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          
          {options.length < 10 && (
            <button onClick={handleAddOption} className="add-option-btn">
              <span className="option-plus">+</span>
              <span>Add option</span>
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canPost}
          className={`post-btn ${canPost ? "enabled" : "disabled"}`}
        >
          <span className="heart-icon">♡</span>
          POST
        </button>
      </div>

      <Footer />
    </div>
  );
}