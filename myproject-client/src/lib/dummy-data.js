// Mock user data
export const mockCurrentUser = {
  id: "user-1",
  email: "john@tokensphere.com",
  username: "johndoe",
  display_name: "John Doe",
  avatar_url: "/abstract-profile.png",
  bio: "Software developer and crypto enthusiast. Love building cool stuff!",
  created_at: "2024-01-15T10:00:00Z",
};

export const mockUsers = [
  mockCurrentUser,
  {
    id: "user-2",
    email: "sarah@tokensphere.com",
    username: "sarahsmith",
    display_name: "Sarah Smith",
    avatar_url: "/diverse-woman-portrait.png",
    bio: "Designer & artist. Creating beautiful experiences.",
    created_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "user-3",
    email: "mike@tokensphere.com",
    username: "mikechen",
    display_name: "Mike Chen",
    avatar_url: "/man.jpg",
    bio: "Blockchain developer. Building the future of web3.",
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    id: "user-4",
    email: "emma@tokensphere.com",
    username: "emmawilson",
    display_name: "Emma Wilson",
    avatar_url: "/diverse-group.png",
    bio: "Community manager. Let's build together!",
    created_at: "2024-02-10T10:00:00Z",
  },
];

// Mock posts data
export const mockPosts = [
  {
    id: "post-1",
    type: "post",
    content:
      "Just launched my new project on TokenSphere! Really excited about the possibilities with token integration. 🚀",
    author_id: "user-2",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes_count: 15,
    comments_count: 3,
    profiles: mockUsers[1],
    likes: [{ user_id: "user-1" }, { user_id: "user-3" }],
  },
  {
    id: "post-2",
    type: "poll",
    question: "What feature should we prioritize next?",
    author_id: "user-3",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    ends_at: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(),
    options: [
      { id: "opt-a", text: "Video posts", votes: 23 },
      { id: "opt-b", text: "Live streaming", votes: 45 },
      { id: "opt-c", text: "Group chat", votes: 18 },
      { id: "opt-d", text: "Mobile app", votes: 31 },
    ],
    total_votes: 117,
    user_vote: "opt-b",
    likes_count: 23,
    comments_count: 7,
    profiles: mockUsers[2],
    likes: [
      { user_id: "user-1" },
      { user_id: "user-2" },
      { user_id: "user-4" },
    ],
  },
  {
    id: "post-3",
    type: "post",
    content:
      "Anyone else excited about the new communities feature? Just created one for crypto developers. Join us!",
    author_id: "user-4",
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes_count: 31,
    comments_count: 12,
    profiles: mockUsers[3],
    likes: [],
  },
  {
    id: "post-4",
    type: "event",
    title: "TokenSphere Community Meetup",
    description:
      "Join us for our monthly community meetup! We'll discuss platform updates, future features, and network with fellow members.",
    author_id: "user-1",
    start_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
    ).toISOString(),
    location: "Virtual (Discord)",
    attendees_count: 45,
    is_attending: true,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes_count: 45,
    comments_count: 8,
    profiles: mockUsers[0],
    likes: [{ user_id: "user-2" }, { user_id: "user-3" }],
  },
];

// Mock communities data
export const mockCommunities = [
  {
    id: "comm-1",
    name: "Crypto Developers",
    description:
      "A community for blockchain and cryptocurrency developers to share knowledge and collaborate.",
    creator_id: "user-4",
    created_at: "2024-03-01T10:00:00Z",
    members_count: 245,
    is_member: true,
    min_credits_required: 0,
  },
  {
    id: "comm-2",
    name: "NFT Artists",
    description:
      "Digital artists creating and sharing NFT artwork. Gallery, tips, and collaboration space.",
    creator_id: "user-2",
    created_at: "2024-02-15T10:00:00Z",
    members_count: 189,
    is_member: true,
    min_credits_required: 100,
  },
  {
    id: "comm-3",
    name: "DeFi Enthusiasts",
    description:
      "Discussing decentralized finance, yield farming, and DeFi protocols.",
    creator_id: "user-3",
    created_at: "2024-03-05T10:00:00Z",
    members_count: 312,
    is_member: false,
    min_credits_required: 200,
  },
  {
    id: "comm-4",
    name: "Web3 Startups",
    description:
      "Entrepreneurs building the next generation of web3 companies and products.",
    creator_id: "user-1",
    created_at: "2024-03-10T10:00:00Z",
    members_count: 156,
    is_member: true,
    min_credits_required: 50,
  },
];

// Mock messages data
export const mockConversations = [
  {
    id: "user-2",
    username: "sarahsmith",
    display_name: "Sarah Smith",
    avatar_url: "/diverse-woman-portrait.png",
    last_message: "Thanks for the tip!",
    last_message_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
    unread_count: 2,
  },
  {
    id: "user-3",
    username: "mikechen",
    display_name: "Mike Chen",
    avatar_url: "/man.jpg",
    last_message: "Let's collaborate on that project",
    last_message_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    unread_count: 0,
  },
  {
    id: "user-4",
    username: "emmawilson",
    display_name: "Emma Wilson",
    avatar_url: "/diverse-group.png",
    last_message: "See you at the meetup!",
    last_message_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    unread_count: 0,
  },
];

export const mockMessages = {
  "user-2": [
    {
      id: "msg-1",
      content: "Hey! How's your project going?",
      sender_id: "user-2",
      created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-2",
      content: "Going great! Just finished the token integration.",
      sender_id: "user-1",
      created_at: new Date(Date.now() - 45 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-3",
      content: "That's awesome! Can you share some tips?",
      sender_id: "user-2",
      created_at: new Date(Date.now() - 35 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-4",
      content: "I'll write up a guide and post it.",
      sender_id: "user-1",
      created_at: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-5",
      content: "Thanks for the tip!",
      sender_id: "user-2",
      created_at: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    },
  ],
  "user-3": [
    {
      id: "msg-6",
      content: "I saw your post about the blockchain project",
      sender_id: "user-3",
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-7",
      content: "Yeah! Want to collaborate?",
      sender_id: "user-1",
      created_at: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-8",
      content: "Let's collaborate on that project",
      sender_id: "user-3",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ],
  "user-4": [
    {
      id: "msg-9",
      content: "Are you coming to the community meetup?",
      sender_id: "user-4",
      created_at: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-10",
      content: "Yes! Looking forward to it.",
      sender_id: "user-1",
      created_at: new Date(Date.now() - 24.5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-11",
      content: "See you at the meetup!",
      sender_id: "user-4",
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

// Mock wallet data
export const mockWallet = {
  id: "wallet-1",
  user_id: "user-1",
  balance: 350,
  created_at: "2024-01-15T10:00:00Z",
};

export const mockTransactions = [
  {
    id: "tx-1",
    from_user_id: "user-1",
    to_user_id: "user-2",
    amount: 50,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    from_user: mockUsers[0],
    to_user: mockUsers[1],
  },
  {
    id: "tx-2",
    from_user_id: "user-3",
    to_user_id: "user-1",
    amount: 75,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    from_user: mockUsers[2],
    to_user: mockUsers[0],
  },
  {
    id: "tx-3",
    from_user_id: "user-1",
    to_user_id: "user-4",
    amount: 25,
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    from_user: mockUsers[0],
    to_user: mockUsers[3],
  },
  {
    id: "tx-4",
    from_user_id: "user-2",
    to_user_id: "user-1",
    amount: 100,
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    from_user: mockUsers[1],
    to_user: mockUsers[0],
  },
];

// Admin stats
export const mockAdminStats = {
  totalUsers: 1250,
  totalPosts: 4567,
  totalCommunities: 89,
  totalTransactions: 15432,
};

// Admin-specific data for user management, reported posts, and airdrops
export const mockUsersManagement = [
  {
    id: "user-1",
    username: "johndoe",
    email: "john@tokensphere.com",
    status: "active",
    verified: true,
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    username: "sarahsmith",
    email: "sarah@tokensphere.com",
    status: "active",
    verified: true,
    created_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "user-3",
    username: "mikechen",
    email: "mike@tokensphere.com",
    status: "active",
    verified: false,
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    id: "user-4",
    username: "emmawilson",
    email: "emma@tokensphere.com",
    status: "banned",
    verified: true,
    created_at: "2024-02-10T10:00:00Z",
  },
  {
    id: "user-5",
    username: "alexjones",
    email: "alex@tokensphere.com",
    status: "active",
    verified: false,
    created_at: "2024-03-01T10:00:00Z",
  },
];

export const mockReportedPosts = [
  {
    id: "post-r1",
    type: "post",
    content:
      "This is a suspicious post that might contain spam or inappropriate content.",
    author_id: "user-5",
    author_name: "Alex Jones",
    author_username: "alexjones",
    reported_by: "user-2",
    reported_by_name: "Sarah Smith",
    reason: "Spam content",
    created_at: "2024-03-15T10:00:00Z",
    reported_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "pending",
  },
  {
    id: "post-r2",
    type: "poll",
    question: "Is this platform good for scams?",
    options: [
      { id: "opt-x", text: "Yes", votes: 5 },
      { id: "opt-y", text: "Absolutely", votes: 3 },
    ],
    total_votes: 8,
    ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    author_id: "user-3",
    author_name: "Mike Chen",
    author_username: "mikechen",
    reported_by: "user-1",
    reported_by_name: "John Doe",
    reason: "Inappropriate content",
    created_at: "2024-03-14T10:00:00Z",
    reported_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: "pending",
  },
  {
    id: "post-r3",
    type: "event",
    title: "Free Crypto Giveaway (Scam Warning)",
    description: "Potentially misleading event promising free cryptocurrency.",
    start_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    location: "Suspicious Link",
    attendees_count: 12,
    author_id: "user-4",
    author_name: "Emma Wilson",
    author_username: "emmawilson",
    reported_by: "user-3",
    reported_by_name: "Mike Chen",
    reason: "Misinformation",
    created_at: "2024-03-13T10:00:00Z",
    reported_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "pending",
  },
];

export const mockCommunitiesManagement = [
  {
    id: "comm-1",
    name: "Crypto Developers",
    creator_id: "user-4",
    creator_name: "Emma Wilson",
    members_count: 245,
    status: "active",
    created_at: "2024-03-01T10:00:00Z",
  },
  {
    id: "comm-2",
    name: "NFT Artists",
    creator_id: "user-2",
    creator_name: "Sarah Smith",
    members_count: 189,
    status: "active",
    created_at: "2024-02-15T10:00:00Z",
  },
  {
    id: "comm-3",
    name: "DeFi Enthusiasts",
    creator_id: "user-3",
    creator_name: "Mike Chen",
    members_count: 312,
    status: "locked",
    created_at: "2024-03-05T10:00:00Z",
  },
  {
    id: "comm-4",
    name: "Web3 Startups",
    creator_id: "user-1",
    creator_name: "John Doe",
    members_count: 156,
    status: "active",
    created_at: "2024-03-10T10:00:00Z",
  },
];

export const mockAirdropHistory = [
  {
    id: "air-1",
    community_id: "comm-1",
    community_name: "Crypto Developers",
    amount: 5000,
    recipients_count: 50,
    conditions: {
      activity_level: "high",
      membership_duration: 30,
      role: "all",
      min_credits: 100,
    },
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    created_by: "admin-1",
  },
  {
    id: "air-2",
    community_id: "comm-2",
    community_name: "NFT Artists",
    amount: 3000,
    recipients_count: 30,
    conditions: {
      activity_level: "medium",
      membership_duration: 15,
      role: "user",
      min_credits: 50,
    },
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    created_by: "admin-1",
  },
];

// Mock polls data
export const mockPolls = [
  {
    id: "poll-1",
    community_id: "comm-1",
    question: "What's your favorite blockchain platform?",
    author_id: "user-4",
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    ends_at: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    options: [
      { id: "opt-1", text: "Ethereum", votes: 45 },
      { id: "opt-2", text: "Solana", votes: 32 },
      { id: "opt-3", text: "Polygon", votes: 18 },
      { id: "opt-4", text: "Other", votes: 12 },
    ],
    total_votes: 107,
    user_vote: "opt-1",
    profiles: mockUsers[3],
  },
  {
    id: "poll-2",
    community_id: "comm-1",
    question: "Should we host a virtual meetup next month?",
    author_id: "user-2",
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    ends_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    options: [
      { id: "opt-5", text: "Yes, definitely!", votes: 67 },
      { id: "opt-6", text: "Maybe, depends on timing", votes: 23 },
      { id: "opt-7", text: "No, prefer async", votes: 8 },
    ],
    total_votes: 98,
    user_vote: null,
    profiles: mockUsers[1],
  },
];

// Mock events data
export const mockEvents = [
  {
    id: "event-1",
    community_id: "comm-1",
    title: "Web3 Developer Workshop",
    description:
      "Learn about the latest web3 development tools and best practices",
    author_id: "user-3",
    start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ).toISOString(),
    location: "Virtual (Zoom)",
    attendees_count: 34,
    is_attending: true,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    profiles: mockUsers[2],
  },
];
