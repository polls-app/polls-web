import React from "react";
import PollCard from "../PollCard/PollCard.tsx";
import { PollListProps } from "./PollList";
import "./PollList.css";

const PollList: React.FC<PollListProps> = ({ polls }) => {
  return (
    <main className="app-container">
      <div className="polls-container">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </main>
  );
};

export default PollList;