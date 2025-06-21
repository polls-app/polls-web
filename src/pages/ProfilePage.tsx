import { useState, useEffect } from 'react';
import Header from "../components/Header/Header";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { ProfileHeaderProps } from "../components/Profile/ProfileHeaderTypes";
import Footer from "../components/Footer/Footer";
import PollList from "../components/PollList/PollList.tsx";
import { Poll } from "../components/PollCard/PollCard.ts";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileHeaderProps | null>(null);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchCompletedPolls = async () => {
      const token = localStorage.getItem("token");
      const url = "http://127.0.0.1:8000/api/v1/polls/completed";

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });

        const result = await res.json();

        const dataArray = Array.isArray(result) ? result : result.data;
        const newPolls: Poll[] = dataArray.map((poll: any) => ({
          id: poll.id,
          user: {
            name: poll.author_full_name,
            avatar: "https://i.pravatar.cc/50",
          },
          card: {
            color: "#62B890", // Adjust if needed
            orientation: "column",
          },
          timeAgo: new Date(poll.created_at).toLocaleString(), // or your custom time formatter
          question: poll.title,
          options: poll.options.map((opt: any) => ({
            id: opt.id,
            text: opt.content,
          })),
          shares: poll.number_of_shares,
        }));

        setPolls(newPolls);
      } catch (error) {
        console.error("Failed to fetch completed polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedPolls();
  }, []);

  if (!profile || loading) {
    return <div className="auth-container"><p style={{ color: 'white' }}>Loading...</p></div>;
  }

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
