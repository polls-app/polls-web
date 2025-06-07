import React from "react";
import { PollCardProps } from "./PollCard";
import "./PollCard.css";

const PollCard: React.FC<PollCardProps> = ({ poll }) => {
  return (
    <div className="stack row">
        <div className="main-box" style={{ backgroundColor: poll.card.color }}>
          <div className="card-header">
            <div className="user-info">
              <img className="avatar" src={poll.user.avatar}></img>
              <span className="username">{poll.user.name}</span>
            </div>
            <span className="time">{poll.timeAgo}</span>
          </div>
          <div className="poll-quetion">
            {poll.question}
          </div>
          <div className="poll-options" style={{ flexDirection: poll.card.orientation }}>
            {poll.options.map((option) => (
            <div key={option.id} className="poll-option">
              <button className="comment-btn">{option.text}</button>
            </div>))}
          </div>
        </div>
        <div className="stack column">
            <div className="side-box" style={{ backgroundColor: poll.card.color }}>
            </div>
            <div className="bottom-box" style={{ backgroundColor: poll.card.color }}>
                <div className="inner-box">
                    <div className="share-container">
                      <svg className="share-icon" viewBox="0 0 24 24" fill="none" stroke="#737675" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      <span className="share-count">{poll.shares}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PollCard;
