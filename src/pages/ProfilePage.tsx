import { useState, useEffect } from 'react';
import Header from "../components/Header/Header";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { ProfileHeaderProps } from "../components/Profile/ProfileHeaderTypes";
import Footer from "../components/Footer/Footer";
import PollList from "../components/PollList/PollList.tsx";
import { Poll } from "../components/PollCard/PollCard.ts";

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

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileHeaderProps | null>(null);

    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('https://localhost:7277/api/v1/profiles', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      };
      fetchProfile();
    }, []);
  
    if (!profile) return <div className="auth-container"><p style={{ color: 'white' }}>Loading...</p></div>;

  return (
    <div id="app" style={{ backgroundColor: "black", minHeight: "100vh", color: "white" }}>
      <Header name="Account" />
      <ProfileHeader
        avatarPath={profile.avatarPath}
        firstname={profile.firstname}
        lastname={profile.lastname}
        username={profile.username}
        description={profile.description}
        followerCount={profile.followerCount}
        followingCount={profile.followingCount}
        postCount={profile.postCount}
        contributionCount={profile.contributionCount}
      />
      <PollList polls={polls} />
      <Footer />
    </div>
  );
}