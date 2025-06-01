import React from "react";
import PollCard from "../PollCard/PollCard.tsx";
import { PollListProps } from "./PollList";
import "./PollList.css";

const PollList: React.FC<PollListProps> = ({ polls }) => {
  return (
    <div className="polls-container">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollList;