interface PollOption {
    id: number;
    text: string;
}

interface User {
    name: string;
    avatar: string;
}

interface CardStyle {
    color: string;
    orientation: "row" | "column";
}

export interface Poll {
    id: number;
    user: User;
    card: CardStyle;
    timeAgo: string;
    question: string;
    options: PollOption[];
    shares: number;
}

export interface PollCardProps {
    poll: Poll;
}
