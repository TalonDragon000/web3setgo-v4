import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { OnboardingQuiz } from "./components/OnboardingQuiz";
import { CustomDashboard } from "./components/CustomDashboard";
import { LoginForm } from "./components/LoginForm";

type ViewState = "landing" | "quiz" | "dashboard" | "login";

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

function App() {
  const [view, setView] = useState<ViewState>("landing");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Check for existing user session on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        
        // Migrate old interest categories to new Web3 categories
        const oldToNewInterestMap: Record<string, string> = {
          technology: "defi",
          creative: "nft",
          business: "trading",
          wellness: "dao"
        };
        
        // Check if profile has old interest categories
        if (oldToNewInterestMap[profile.primaryInterest]) {
          // Map old interests to new ones
          const newInterests: Record<string, number> = {
            defi: profile.interests.technology || 0,
            nft: profile.interests.creative || 0,
            trading: profile.interests.business || 0,
            dao: profile.interests.wellness || 0,
          };
          
          profile.primaryInterest = oldToNewInterestMap[profile.primaryInterest];
          profile.interests = newInterests;
          
          // Save migrated profile
          localStorage.setItem("userProfile", JSON.stringify(profile));
        }
        
        setUserProfile(profile);
        setView("dashboard");
      } catch (error) {
        console.error("Error loading saved profile:", error);
        localStorage.removeItem("userProfile");
      }
    }
  }, []);

  const handleQuizComplete = (
    interests: Record<string, number>,
    path: { mainCategory: string; subcategory: string; contentType: string; cta: string }
  ) => {
    // Find the primary interest (highest score)
    const primaryInterest = Object.entries(interests).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    // For demo purposes, create a default user profile
    // In a real app, you would collect this during registration
    const newProfile: UserProfile = {
      name: "New Member",
      email: "member@example.com",
      primaryInterest,
      interests,
      quizPath: path,
    };

    setUserProfile(newProfile);
    localStorage.setItem("userProfile", JSON.stringify(newProfile));
    setView("dashboard");
  };

  const handleLogin = (email: string, name: string) => {
    // Check if user exists in localStorage
    const savedProfile = localStorage.getItem("userProfile");
    
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        // Update name and email
        profile.name = name;
        profile.email = email;
        setUserProfile(profile);
        localStorage.setItem("userProfile", JSON.stringify(profile));
        setView("dashboard");
      } catch (error) {
        // If no saved profile, redirect to quiz
        setView("quiz");
      }
    } else {
      // No saved profile, need to take quiz first
      // For demo, we'll create a default profile
      const defaultProfile: UserProfile = {
        name,
        email,
        primaryInterest: "defi",
        interests: {
          defi: 2,
          nft: 1,
          dao: 0,
          trading: 0,
        },
        quizPath: {
          mainCategory: "money",
          subcategory: "earn",
          contentType: "read",
          cta: "Read earning guides",
        },
      };
      setUserProfile(defaultProfile);
      localStorage.setItem("userProfile", JSON.stringify(defaultProfile));
      setView("dashboard");
    }
  };

  const handleLogout = () => {
    // Keep the profile in localStorage but return to landing page
    setView("landing");
  };

  const handleClearAndStartQuiz = () => {
    // Clear existing profile and start fresh quiz
    localStorage.removeItem("userProfile");
    setUserProfile(null);
    setView("quiz");
  };

  return (
    <>
      {view === "landing" && (
        <LandingPage
          onStartQuiz={handleClearAndStartQuiz}
          onLogin={() => setView("login")}
        />
      )}

      {view === "quiz" && (
        <OnboardingQuiz
          onComplete={handleQuizComplete}
          onBack={() => setView("landing")}
        />
      )}

      {view === "dashboard" && userProfile && (
        <CustomDashboard userProfile={userProfile} onLogout={handleLogout} />
      )}

      {view === "login" && (
        <LoginForm
          onLogin={handleLogin}
          onClose={() => setView("landing")}
        />
      )}
    </>
  );
}

export default App;
