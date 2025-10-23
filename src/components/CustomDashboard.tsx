import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { motion } from "motion/react";
import {
  LogOut,
  Settings,
  Bookmark,
  Bell,
  Coins,
  Palette,
  Users,
  LineChart,
  BookOpen,
  Video,
  Wrench,
  Gamepad2,
  CheckCircle,
  Target,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface UserProfile {
  name: string;
  email: string;
  primaryInterest: string;
  interests: Record<string, number>;
  quizPath?: {
    mainCategory: string;
    subcategory: string;
    contentType: string;
    cta: string;
  };
}

interface CustomDashboardProps {
  userProfile: UserProfile;
  onLogout: () => void;
}

const interestConfig = {
  defi: {
    icon: Coins,
    color: "blue",
    title: "DeFi - Decentralized Finance",
    image: "https://images.unsplash.com/photo-1666816943035-15c29931e975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjEyMjU2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  nft: {
    icon: Palette,
    color: "purple",
    title: "NFTs - Digital Art & Collectibles",
    image: "https://images.unsplash.com/photo-1635237755468-5fba69c13f29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwbmZ0fGVufDF8fHx8MTc2MTIxNzE5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  dao: {
    icon: Users,
    color: "green",
    title: "DAOs - Decentralized Organizations",
    image: "https://images.unsplash.com/photo-1644843521804-74ec147cb7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBmdXR1cmV8ZW58MXx8fHwxNzYxMjUzMDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  trading: {
    icon: LineChart,
    color: "orange",
    title: "Trading & Investment",
    image: "https://images.unsplash.com/photo-1633534415766-165181ffdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRyYWRpbmd8ZW58MXx8fHwxNzYxMTQ5OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
};

// Get personalized content based on quiz path
const getPersonalizedContent = (quizPath?: UserProfile["quizPath"]) => {
  if (!quizPath) {
    return {
      heroTitle: "Your Web3 Journey",
      heroDescription: "Explore curated content to master crypto and blockchain technology",
      specificTopics: [
        "Getting Started with Crypto",
        "Understanding Blockchain Basics",
        "Web3 Security Best Practices",
      ],
      activityCards: [
        { icon: BookOpen, title: "0/5 Guides", description: "Read to Get Started", color: "blue" },
        { icon: CheckCircle, title: "0 Completed", description: "Activities Finished", color: "green" },
        { icon: Clock, title: "~15 min", description: "Estimated Time", color: "purple" },
      ],
    };
  }

  const { mainCategory, subcategory, contentType, cta } = quizPath;
  const pathKey = `${mainCategory}_${subcategory}`;

  // Content type configuration
  const contentTypeConfig: Record<string, { icon: any; description: string }> = {
    read: { icon: BookOpen, description: "Educational guides and articles" },
    tutorial: { icon: Gamepad2, description: "Interactive step-by-step tutorials" },
    video: { icon: Video, description: "Video courses and expert talks" },
    tools: { icon: Wrench, description: "Platform comparisons and recommendations" },
  };

  const typeInfo = contentTypeConfig[contentType] || contentTypeConfig.read;

  // Path-specific content
  const pathContent: Record<string, {
    heroTitle: string;
    heroDescription: string;
    specificTopics: string[];
    activityCards: Array<{ icon: any; title: string; description: string; color: string }>;
  }> = {
    money_earn: {
      heroTitle: cta || "Start Earning with Crypto",
      heroDescription: "Learn safe ways to earn passive income through staking, lending, and DeFi protocols",
      specificTopics: [
        "Understanding DeFi Yield: Staking vs. Lending",
        "Top 5 Safe Platforms for Earning Crypto",
        "How to Calculate APY and Risk in DeFi",
      ],
      activityCards: [
        { icon: typeInfo.icon, title: "3 Resources", description: typeInfo.description, color: "blue" },
        { icon: Target, title: "Your Goal", description: "Learn Safe Earning", color: "green" },
        { icon: TrendingUp, title: "Skill Level", description: "Beginner Friendly", color: "purple" },
      ],
    },
    money_trade: {
      heroTitle: cta || "Master Crypto Trading",
      heroDescription: "Understand markets, technical analysis, and build a solid trading strategy",
      specificTopics: [
        "Technical Analysis Basics for Crypto",
        "Understanding Market Cycles and Sentiment",
        "Building a Balanced Crypto Portfolio",
      ],
      activityCards: [
        { icon: typeInfo.icon, title: "3 Resources", description: typeInfo.description, color: "orange" },
        { icon: Target, title: "Your Goal", description: "Understand Markets", color: "green" },
        { icon: LineChart, title: "Focus Area", description: "Trading & Analysis", color: "blue" },
      ],
    },
    nft_create: {
      heroTitle: cta || "Create Your First NFT",
      heroDescription: "Learn how to mint, price, and sell your digital art as NFTs",
      specificTopics: [
        "Choosing the Right Blockchain for Your NFTs",
        "Pricing Strategies for Digital Artists",
        "Building a Community Around Your Art",
      ],
      activityCards: [
        { icon: typeInfo.icon, title: "3 Resources", description: typeInfo.description, color: "purple" },
        { icon: Target, title: "Your Goal", description: "Create & Sell NFTs", color: "green" },
        { icon: Palette, title: "Creator Path", description: "Artist Resources", color: "pink" },
      ],
    },
    nft_collect: {
      heroTitle: cta || "Start Your NFT Collection",
      heroDescription: "Discover how to find, evaluate, and purchase valuable NFTs safely",
      specificTopics: [
        "How to Research NFT Projects",
        "Spotting Red Flags in NFT Launches",
        "Using Rarity Tools and Analytics",
      ],
      activityCards: [
        { icon: typeInfo.icon, title: "3 Resources", description: typeInfo.description, color: "purple" },
        { icon: Target, title: "Your Goal", description: "Build Collection", color: "green" },
        { icon: Bookmark, title: "Collector Path", description: "Curation & Research", color: "blue" },
      ],
    },
    dao_join: {
      heroTitle: cta || "Join Your First DAO",
      heroDescription: "Find and participate in decentralized communities that match your interests",
      specificTopics: [
        "Understanding DAO Governance Tokens",
        "How to Participate in DAO Proposals",
        "Finding the Right DAO for Your Interests",
      ],
      activityCards: [
        { icon: typeInfo.icon, title: "3 Resources", description: typeInfo.description, color: "green" },
        { icon: Target, title: "Your Goal", description: "Join Community", color: "green" },
        { icon: Users, title: "Member Path", description: "Governance & Voting", color: "blue" },
      ],
    },
    dao_start: {
      heroTitle: cta || "Build Your Own DAO",
      heroDescription: "Create and manage a decentralized organization from the ground up",
      specificTopics: [
        "Treasury Management Best Practices",
        "Choosing Governance Models for Your DAO",
        "Legal Considerations for DAOs",
      ],
      activityCards: [
        { icon: typeInfo.icon, title: "3 Resources", description: typeInfo.description, color: "green" },
        { icon: Target, title: "Your Goal", description: "Launch DAO", color: "green" },
        { icon: Award, title: "Founder Path", description: "Leadership & Strategy", color: "purple" },
      ],
    },
    privacy_control: {
      heroTitle: cta || "Take Control of Your Data",
      heroDescription: "Set up self-custody wallets and manage your digital identity securely",
      specificTopics: [
        "Setting Up a Hardware Wallet",
        "Understanding Seed Phrases and Recovery",
        "Decentralized Identity Solutions",
      ],
      activityCards: [
        { icon: typeInfo.icon, title: "3 Resources", description: typeInfo.description, color: "indigo" },
        { icon: Target, title: "Your Goal", description: "Own Your Data", color: "green" },
        { icon: Award, title: "Control Path", description: "Self-Custody", color: "purple" },
      ],
    },
    privacy_security: {
      heroTitle: cta || "Secure Your Crypto",
      heroDescription: "Protect your assets and identity from scams, hacks, and tracking",
      specificTopics: [
        "Common Crypto Scams and How to Avoid Them",
        "Two-Factor Authentication Best Practices",
        "Secure Communication Tools for Web3",
      ],
      activityCards: [
        { icon: typeInfo.icon, title: "3 Resources", description: typeInfo.description, color: "indigo" },
        { icon: Target, title: "Your Goal", description: "Stay Secure", color: "green" },
        { icon: Award, title: "Security Path", description: "Protection & Privacy", color: "blue" },
      ],
    },
  };

  return pathContent[pathKey] || pathContent.money_earn;
};

export function CustomDashboard({ userProfile, onLogout }: CustomDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const config = interestConfig[userProfile.primaryInterest as keyof typeof interestConfig] || interestConfig.defi;
  const IconComponent = config.icon;
  const personalizedContent = getPersonalizedContent(userProfile.quizPath);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 bg-${config.color}-500 rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Welcome back, {userProfile.name}!</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {getInitials(userProfile.name)}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Personalized Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="overflow-hidden">
            <div className="relative h-64">
              <ImageWithFallback
                src={config.image}
                alt={config.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="p-8 text-white max-w-2xl">
                  <Badge className="mb-3 bg-white/20 backdrop-blur-sm">
                    Your Personalized Path
                  </Badge>
                  <h2 className="text-white mb-3">{personalizedContent.heroTitle}</h2>
                  <p className="text-white/90 mb-4">
                    {personalizedContent.heroDescription}
                  </p>
                  <Button className="bg-white text-gray-900 hover:bg-gray-100">
                    Get Started Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="learning">Learning Path</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Activity Cards - Personalized */}
            <div className="grid gap-6 md:grid-cols-3">
              {personalizedContent.activityCards.map((card, index) => {
                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <CardIcon className={`w-5 h-5 text-${card.color}-500`} />
                        <Badge variant="secondary">New</Badge>
                      </div>
                      <div className="text-gray-900">{card.title}</div>
                      <div className="text-gray-600">{card.description}</div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Personalized Topics from Quiz Results */}
            <div>
              <h3 className="text-gray-900 mb-4">Your Learning Resources</h3>
              <div className="space-y-4">
                {personalizedContent.specificTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline">
                              {userProfile.quizPath?.contentType === "read" && "📖 Guide"}
                              {userProfile.quizPath?.contentType === "tutorial" && "🎮 Tutorial"}
                              {userProfile.quizPath?.contentType === "video" && "🎥 Video"}
                              {userProfile.quizPath?.contentType === "tools" && "🔧 Tools"}
                              {!userProfile.quizPath?.contentType && "📖 Guide"}
                            </Badge>
                          </div>
                          <h4 className="text-gray-900 mb-1">{topic}</h4>
                          <p className="text-gray-600">
                            Recommended based on your quiz results
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Start
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Learning Path Tab */}
          <TabsContent value="learning" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Your Web3 Learning Journey</h3>
              <div className="space-y-4">
                {personalizedContent.specificTopics.map((topic, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">{topic}</h4>
                      <p className="text-gray-600">
                        {index === 0 && "Start here to build your foundation"}
                        {index === 1 && "Dive deeper into practical applications"}
                        {index === 2 && "Master advanced concepts and best practices"}
                      </p>
                      <div className="mt-3 flex items-center space-x-2">
                        <Button size="sm" variant={index === 0 ? "default" : "outline"}>
                          {index === 0 ? "Start Now" : "Coming Soon"}
                        </Button>
                        <Badge variant="secondary">~5-10 min</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved">
            <Card className="p-12 text-center">
              <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">Your Saved Items</h3>
              <p className="text-gray-600 mb-4">
                Bookmark resources as you explore to save them for later
              </p>
              <Button onClick={() => setActiveTab("overview")}>Browse Content</Button>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-4">Profile Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-700">Name</label>
                      <div className="text-gray-900">{userProfile.name}</div>
                    </div>
                    <div>
                      <label className="text-gray-700">Email</label>
                      <div className="text-gray-900">{userProfile.email}</div>
                    </div>
                    <div>
                      <label className="text-gray-700 mb-2 block">Your Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(userProfile.interests)
                          .sort(([, a], [, b]) => b - a)
                          .map(([interest, score]) => (
                            <Badge key={interest} variant="secondary">
                              {interest === "defi" ? "DeFi" : interest === "nft" ? "NFTs" : interest === "dao" ? "DAOs" : "Trading"} ({score})
                            </Badge>
                          ))}
                      </div>
                    </div>
                    {userProfile.quizPath && (
                      <div>
                        <label className="text-gray-700 mb-2 block">Learning Preference</label>
                        <Badge variant="outline" className="px-4 py-2">
                          {userProfile.quizPath.contentType === "read" && "📖 Reading"}
                          {userProfile.quizPath.contentType === "tutorial" && "🎮 Interactive Tutorials"}
                          {userProfile.quizPath.contentType === "video" && "🎥 Video Content"}
                          {userProfile.quizPath.contentType === "tools" && "🔧 Tools & Platforms"}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
