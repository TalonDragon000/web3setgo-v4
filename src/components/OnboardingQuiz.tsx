import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Sparkles, BookOpen, Video, Wrench, Gamepad2 } from "lucide-react";

interface QuizOption {
  value: string;
  label: string;
  next?: string;
  cta?: string;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

const quizQuestions: Record<string, QuizQuestion> = {
  // ── 1️⃣ Main question ───────────────────────────────
  q1: {
    question: "What excites you most about the future of the internet?",
    options: [
      { value: "money", label: "Taking control of my money and learning new ways to earn", next: "money_q2" },
      { value: "nft", label: "Owning, creating, or collecting digital art and items", next: "nft_q2" },
      { value: "dao", label: "Being part of online communities that make real decisions together", next: "dao_q2" },
      { value: "privacy", label: "Protecting my data and having true online ownership", next: "privacy_q2" },
    ],
  },

  // ── 💰 MONEY & FINANCE ───────────────────────────────
  money_q2: {
    question: "What would you like to do first with crypto?",
    options: [
      { value: "earn", label: "Learn simple, safe ways to earn or save with crypto", next: "money_earn_q3" },
      { value: "trade", label: "Understand how crypto markets and investing work", next: "money_trade_q3" },
    ],
  },
  money_earn_q3: {
    question: "What do you want to do next?",
    options: [
      { value: "read", label: "📖 Read beginner guides on staking, lending, and earning safely", cta: "Read earning guides" },
      { value: "tutorial", label: "🎮 Follow a step-by-step tutorial to earn your first crypto", cta: "Start earning tutorial" },
      { value: "video", label: "🎥 Watch videos on DeFi strategies for beginners", cta: "Watch earning videos" },
      { value: "tools", label: "🔧 Compare trusted platforms for earning and saving", cta: "Explore earning platforms" },
    ],
  },
  money_trade_q3: {
    question: "What do you want to do next?",
    options: [
      { value: "read", label: "📖 Read articles on trading basics and market analysis", cta: "Read trading guides" },
      { value: "tutorial", label: "🎮 Practice trading with a simulated walkthrough", cta: "Try trading simulator" },
      { value: "video", label: "🎥 Watch expert traders explain markets and strategies", cta: "Watch trading videos" },
      { value: "tools", label: "🔧 See beginner-friendly exchanges and portfolio trackers", cta: "Explore trading tools" },
    ],
  },

  // ── 🎨 NFTS ───────────────────────────────
  nft_q2: {
    question: "What part of NFTs interests you most?",
    options: [
      { value: "create", label: "Making and selling my own digital art", next: "nft_create_q3" },
      { value: "collect", label: "Finding cool art or collectibles to own", next: "nft_collect_q3" },
    ],
  },
  nft_create_q3: {
    question: "What do you want to do next?",
    options: [
      { value: "read", label: "📖 Read guides on creating, minting, and selling NFTs", cta: "Read creator guides" },
      { value: "tutorial", label: "🎨 Create and mint your first NFT with guided steps", cta: "Create your first NFT" },
      { value: "video", label: "🎥 Watch artists share their NFT creation process", cta: "Watch creator videos" },
      { value: "tools", label: "🔧 Explore platforms for minting and selling your art", cta: "Explore NFT creation tools" },
    ],
  },
  nft_collect_q3: {
    question: "What do you want to do next?",
    options: [
      { value: "read", label: "📖 Read guides on finding valuable NFTs and avoiding scams", cta: "Read collector guides" },
      { value: "tutorial", label: "🎨 Walk through buying your first NFT safely", cta: "Buy your first NFT" },
      { value: "video", label: "🎥 Watch collectors explain how to evaluate NFT projects", cta: "Watch collector videos" },
      { value: "tools", label: "🌐 Browse top NFT marketplaces and trending collections", cta: "Explore NFT marketplaces" },
    ],
  },

  // ── 🤝 DAOS ───────────────────────────────
  dao_q2: {
    question: "What sounds most exciting about online communities?",
    options: [
      { value: "join", label: "Joining a group that funds and builds projects together", next: "dao_join_q3" },
      { value: "start", label: "Starting or managing a community of my own", next: "dao_start_q3" },
    ],
  },
  dao_join_q3: {
    question: "What do you want to do next?",
    options: [
      { value: "read", label: "📖 Read about how DAOs work and what to look for", cta: "Read DAO membership guides" },
      { value: "tutorial", label: "🛠️ Join a beginner-friendly DAO with guided onboarding", cta: "Join your first DAO" },
      { value: "video", label: "🎥 Watch members share their DAO experiences", cta: "Watch DAO community videos" },
      { value: "tools", label: "🔍 Browse active DAOs you can join today", cta: "Discover DAOs to join" },
    ],
  },
  dao_start_q3: {
    question: "What do you want to do next?",
    options: [
      { value: "read", label: "📖 Read comprehensive guides on launching and managing a DAO", cta: "Read DAO founder guides" },
      { value: "tutorial", label: "🛠️ Create a test DAO with step-by-step guidance", cta: "Build your first DAO" },
      { value: "video", label: "🎥 Watch DAO founders explain governance and operations", cta: "Watch founder videos" },
      { value: "tools", label: "🔧 Explore platforms for creating and managing DAOs", cta: "See DAO creation tools" },
    ],
  },

  // ── 🔐 PRIVACY & OWNERSHIP ───────────────────────────────
  privacy_q2: {
    question: "What matters most to you about online privacy?",
    options: [
      { value: "control", label: "Having full control over who sees my data", next: "privacy_control_q3" },
      { value: "security", label: "Keeping my identity and assets safe from hacks or tracking", next: "privacy_security_q3" },
    ],
  },
  privacy_control_q3: {
    question: "What do you want to do next?",
    options: [
      { value: "read", label: "📖 Read about self-custody, digital identity, and data ownership", cta: "Read ownership guides" },
      { value: "tutorial", label: "🔐 Set up your own self-custody wallet step-by-step", cta: "Create your wallet" },
      { value: "video", label: "🎥 Watch experts explain decentralized identity", cta: "Watch privacy videos" },
      { value: "tools", label: "🛡️ Explore wallets and identity tools you control", cta: "See self-custody tools" },
    ],
  },
  privacy_security_q3: {
    question: "What do you want to do next?",
    options: [
      { value: "read", label: "📖 Read security best practices and threat prevention", cta: "Read security guides" },
      { value: "tutorial", label: "🔐 Secure your accounts with a guided security setup", cta: "Start security tutorial" },
      { value: "video", label: "🎥 Watch security experts share protection strategies", cta: "Watch security videos" },
      { value: "tools", label: "🛡️ Find tools for encryption, VPNs, and secure browsing", cta: "Explore security tools" },
    ],
  },
};

// Map interests from the quiz flow to dashboard categories
const interestMapping: Record<string, string> = {
  money: "defi",
  earn: "defi",
  trade: "trading",
  guides: "defi",
  tools: "trading",
  nft: "nft",
  create: "nft",
  collect: "nft",
  start: "nft",
  explore: "nft",
  dao: "dao",
  join: "dao",
  build: "dao",
  find: "dao",
  privacy: "dao",
  control: "dao",
  security: "trading",
  wallet: "defi",
  privacytools: "dao",
};

export interface QuizPath {
  mainCategory: string;
  subcategory: string;
  contentType: string;
  cta: string;
}

interface OnboardingQuizProps {
  onComplete: (interests: Record<string, number>, path: QuizPath) => void;
  onBack: () => void;
}

export function OnboardingQuiz({ onComplete, onBack }: OnboardingQuizProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState("q1");
  const [questionHistory, setQuestionHistory] = useState<string[]>(["q1"]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [finalInterestScores, setFinalInterestScores] = useState<Record<string, number>>({});

  const currentQuestion = quizQuestions[currentQuestionId];
  const currentAnswer = answers[currentQuestionId];
  const totalSteps = 3; // Always 3 questions in each path
  const currentStep = questionHistory.length;
  const progress = (currentStep / totalSteps) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestionId]: value });
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    const selectedOption = currentQuestion.options.find(
      (opt) => opt.value === currentAnswer
    );

    if (selectedOption?.next) {
      // Navigate to next question
      setDirection(1);
      setCurrentQuestionId(selectedOption.next);
      setQuestionHistory([...questionHistory, selectedOption.next]);
    } else {
      // Quiz complete - calculate interests and show results
      const interestScores: Record<string, number> = {
        defi: 0,
        nft: 0,
        dao: 0,
        trading: 0,
      };

      // Count all answers and map to interests
      Object.values(answers).forEach((answer) => {
        const mappedInterest = interestMapping[answer];
        if (mappedInterest) {
          interestScores[mappedInterest] = (interestScores[mappedInterest] || 0) + 1;
        }
      });

      // Include the final answer
      const finalMappedInterest = interestMapping[currentAnswer];
      if (finalMappedInterest) {
        interestScores[finalMappedInterest] = (interestScores[finalMappedInterest] || 0) + 1;
      }

      setFinalInterestScores(interestScores);
      setShowResults(true);
    }
  };

  const handleCompleteOnboarding = () => {
    const mainCategory = answers.q1;
    const subcategory = answers[Object.keys(answers).find(key => key.includes("_q2")) || ""] || "";
    const contentType = currentAnswer;
    const selectedOption = currentQuestion.options.find(opt => opt.value === contentType);
    
    const path: QuizPath = {
      mainCategory,
      subcategory,
      contentType,
      cta: selectedOption?.cta || ""
    };
    
    onComplete(finalInterestScores, path);
  };

  const handlePrevious = () => {
    if (questionHistory.length > 1) {
      setDirection(-1);
      const newHistory = [...questionHistory];
      newHistory.pop();
      const previousQuestionId = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestionId(previousQuestionId);
    } else {
      onBack();
    }
  };

  const isLastQuestion = !currentQuestion.options.some((opt) => opt.next);

  // Get personalized recommendations based on quiz path
  const getRecommendations = () => {
    const mainCategory = answers.q1;
    const subcategory = answers[Object.keys(answers).find(key => key.includes("_q2")) || ""];
    const contentType = currentAnswer;

    const selectedOption = currentQuestion.options.find(opt => opt.value === contentType);
    
    // Category-specific content
    const categoryContent: Record<string, { title: string; description: string; gradient: string }> = {
      money: {
        title: "DeFi & Crypto Finance",
        description: "Master decentralized finance, from earning passive income to understanding crypto markets.",
        gradient: "from-blue-500 to-cyan-500"
      },
      nft: {
        title: "NFTs & Digital Collectibles",
        description: "Explore the world of digital ownership, from creating art to collecting rare pieces.",
        gradient: "from-purple-500 to-pink-500"
      },
      dao: {
        title: "DAOs & Web3 Communities",
        description: "Join decentralized communities and participate in collective decision-making.",
        gradient: "from-green-500 to-emerald-500"
      },
      privacy: {
        title: "Privacy & Digital Ownership",
        description: "Take control of your data and assets with self-custody and privacy tools.",
        gradient: "from-indigo-500 to-purple-500"
      }
    };

    // Content type icons
    const contentTypeIcons: Record<string, any> = {
      read: BookOpen,
      tutorial: Gamepad2,
      video: Video,
      tools: Wrench
    };

    // Specific content based on path
    const specificContent: Record<string, string[]> = {
      // Money paths
      money_earn: [
        "Understanding DeFi Yield: Staking vs. Lending",
        "Top 5 Safe Platforms for Earning Crypto",
        "How to Calculate APY and Risk in DeFi"
      ],
      money_trade: [
        "Technical Analysis Basics for Crypto",
        "Understanding Market Cycles and Sentiment",
        "Building a Balanced Crypto Portfolio"
      ],
      // NFT paths
      nft_create: [
        "Choosing the Right Blockchain for Your NFTs",
        "Pricing Strategies for Digital Artists",
        "Building a Community Around Your Art"
      ],
      nft_collect: [
        "How to Research NFT Projects",
        "Spotting Red Flags in NFT Launches",
        "Using Rarity Tools and Analytics"
      ],
      // DAO paths
      dao_join: [
        "Understanding DAO Governance Tokens",
        "How to Participate in DAO Proposals",
        "Finding the Right DAO for Your Interests"
      ],
      dao_start: [
        "Treasury Management Best Practices",
        "Choosing Governance Models for Your DAO",
        "Legal Considerations for DAOs"
      ],
      // Privacy paths
      privacy_control: [
        "Setting Up a Hardware Wallet",
        "Understanding Seed Phrases and Recovery",
        "Decentralized Identity Solutions"
      ],
      privacy_security: [
        "Common Crypto Scams and How to Avoid Them",
        "Two-Factor Authentication Best Practices",
        "Secure Communication Tools for Web3"
      ]
    };

    const pathKey = subcategory ? `${mainCategory}_${subcategory}` : mainCategory;
    const categoryInfo = categoryContent[mainCategory] || categoryContent.money;
    const ContentIcon = contentTypeIcons[contentType] || BookOpen;
    const specificTopics = specificContent[pathKey] || specificContent.money_earn;

    return {
      categoryInfo,
      ContentIcon,
      selectedOption,
      specificTopics
    };
  };

  // Results view
  if (showResults) {
    const { categoryInfo, ContentIcon, selectedOption, specificTopics } = getRecommendations();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full"
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-gray-900 mb-2">Your Web3 Journey Awaits!</h2>
            <p className="text-gray-600">
              We've created a personalized experience based on your interests
            </p>
          </div>

          {/* Main Category Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="overflow-hidden mb-6">
              <div className={`bg-gradient-to-r ${categoryInfo.gradient} p-8 text-white`}>
                <Badge className="mb-3 bg-white/20 backdrop-blur-sm text-white border-white/30">
                  Your Focus Area
                </Badge>
                <h3 className="text-white mb-2">{categoryInfo.title}</h3>
                <p className="text-white/90">{categoryInfo.description}</p>
              </div>
            </Card>
          </motion.div>

          {/* Content Type Preference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ContentIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2">Your Preferred Learning Style</h4>
                  <p className="text-gray-600 mb-4">
                    {selectedOption?.label || "Personalized content just for you"}
                  </p>
                  
                  {/* Specific Topics */}
                  <div className="space-y-2">
                    <p className="text-gray-700">You'll get access to:</p>
                    <ul className="space-y-2">
                      {specificTopics.map((topic, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start space-x-2 text-gray-600"
                        >
                          <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
                          <span>{topic}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Interest Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 mb-6">
              <h4 className="text-gray-900 mb-4">Your Web3 Interests</h4>
              <div className="flex flex-wrap gap-3">
                {Object.entries(finalInterestScores)
                  .sort(([, a], [, b]) => b - a)
                  .filter(([, score]) => score > 0)
                  .map(([interest, score]) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="px-4 py-2"
                    >
                      {interest === "defi" ? "DeFi" : interest === "nft" ? "NFTs" : interest === "dao" ? "DAOs" : "Trading"}
                      <span className="ml-2 opacity-60">·</span>
                      <span className="ml-2">{score} {score === 1 ? "point" : "points"}</span>
                    </Badge>
                  ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <Button
              onClick={handleCompleteOnboarding}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              Continue to Your Dashboard
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="w-full"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-500 mt-6"
          >
            Your personalized dashboard will track your progress and recommend content based on your interests
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">
              Question {currentStep} of {totalSteps}
            </span>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestionId}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              <h2 className="text-gray-900 mb-6">
                {currentQuestion.question}
              </h2>

              <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
                <div className="space-y-4">
                  {currentQuestion.options.map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          currentAnswer === option.value
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleAnswer(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label
                          htmlFor={option.value}
                          className="flex-1 cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </RadioGroup>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-6">
          <Button onClick={handlePrevious} variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            {questionHistory.length === 1 ? "Back to Home" : "Previous"}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {isLastQuestion ? "Complete" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
