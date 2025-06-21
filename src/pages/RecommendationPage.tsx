import NavBar from "../components/NavBar/NavBar";
import PollList from "../components/PollList/PollList.tsx";
import { Poll } from "../components/PollCard/PollCard.ts";
import { useState, useEffect } from 'react';
import Footer from "../components/Footer/Footer";
import "../App.css";
import Header from "../components/Header/Header";

export default function RecommendationPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("hot");

  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url = new URL("http://127.0.0.1:8000/api/v1/polls");
      url.searchParams.append("sort", sort);
    
      try {
        const res = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
    
        const raw = await res.json();
        const items = Array.isArray(raw) ? raw : raw.data;
    
        const newPolls: Poll[] = items.map((poll: any) => ({
          id: poll.id,
          user: {
            name: poll.author_full_name,
            avatar: "https://i.pravatar.cc/50",
          },
          card: {
            color: "#62B890",
            orientation: "column",
          },
          timeAgo: new Date(poll.created_at).toLocaleString(),
          question: poll.title,
          options: poll.options.map((opt: any) => ({
            id: opt.id,
            text: opt.content,
          })),
          shares: poll.number_of_shares,
        }));
    
        setPolls(newPolls);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
      } finally {
        setLoading(false);
      }
    };    

    fetchPolls();
  }, [sort]);

  return (
    <div id="app">
      <Header name="polls" />
      <NavBar selected={sort} onSelect={setSort} />
      {loading ? <p style={{ textAlign: "center" }}>Loading...</p> : <PollList polls={polls} />}
      <Footer />
    </div>
  );
}
  