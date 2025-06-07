import React from "react";
import { useState } from 'react';
import "./ProfileHeader.css";
import { ProfileHeaderProps } from "./ProfileHeaderTypes";

export default function ProfileHeader({
  avatarPath,
  firstname,
  lastname,
  username,
  description,
  followerCount,
  followingCount,
  postCount,
  contributionCount,
}: ProfileHeaderProps) {
    const [copied, setCopied] = useState(false);

    const formatUsername = (username: string): string => {
        const suffix = username.split("-")[1];
        if (!suffix || suffix.length < 8) return username;
        return `user-${suffix.slice(0, 5)}.....${suffix.slice(-5)}`;
      };

  return (
    <div className="profile-header">
      <div className="profile-info">
        <div className="profile-info-left">
            <img src={avatarPath} alt="avatar" className="profile-avatar" />
        </div>

        <div className="profile-info-right">
        <h2 className="profile-name">{firstname} {lastname}</h2>
            <div style={{ position: 'relative' }}>
                {copied && (<div className="copy-tooltip">Copied</div>)}
                <p  className="profile-username username-copy"
                    title="Click to copy"
                    onClick={() => {
                    navigator.clipboard.writeText(username);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 500);
                    }}>
                    @{formatUsername(username)}
                </p>
            </div>
            {description && (
                <p className="profile-description">{description}</p>
            )}
            <div className="profile-stats-row">
                <span className="profile-stat">
                    <strong>{followerCount}</strong> Followers
                </span>
                <span className="profile-stat">
                    <strong>{followingCount}</strong> Following
                </span>
            </div>
        </div>
      </div>

      <div className="profile-buttons-row">
        <div className="profile-pill">
          <strong>Post</strong> {postCount}
        </div>
        <div className="profile-pill">
          <strong>Contributions</strong> {contributionCount}
        </div>
      </div>
    </div>
  );
}
