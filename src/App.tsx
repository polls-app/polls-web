import NavBar from "./components/NavBar/NavBar";
import PollList from "./components/PollList/PollList.tsx";
import { Poll } from "./components/PollCard/PollCard.ts";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Header from "./components/Header/Header";

const polls: Poll[] = [
  {
    id: 1,
    user: { name: "Selena Parkins", avatar: "https://i.pravatar.cc/50" },
    card: { color: "#62B890", orientation: "column" },
    timeAgo: "1 Hour Ago",
    question: "Which is the best recipe for potato salad?",
    options: [{ id: 1, text: "Write Comment" }],
    shares: 22,
  },
  {
    id: 2,
    user: { name: "Faza Dzikrulloh", avatar: "https://i.pravatar.cc/50" },
    card: { color: "#D06C51", orientation: "row" },
    timeAgo: "30 Minutes Ago",
    question: "Which OS you prefer the most?",
    options: [
      { id: 1, text: "Windows" },
      { id: 2, text: "MacOS" },
      { id: 3, text: "Linux" },
      { id: 4, text: "Kolibri" },
    ],
    shares: 17,
  },
  {
    id: 3,
    user: { name: "Maddy Vivien", avatar: "https://i.pravatar.cc/50" },
    card: { color: "#CDD04F", orientation: "column" },
    timeAgo: "5 Minutes Ago",
    question: "Are you dog or cat person?",
    options: [
      { id: 1, text: "Dog" },
      { id: 2, text: "Cat" },
    ],
    shares: 43,
  },
];

const App = () => {
  return (
    <div id="app">
      <Header />
      <NavBar />
      <main className="app-container">
        <PollList polls={polls} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
