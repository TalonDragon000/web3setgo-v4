import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Sparkles, LogIn, Coins } from "lucide-react";
import { TypewriterText } from "./TypewriterText";

interface LandingPageProps {
  onStartQuiz: () => void;
  onLogin: () => void;
}

export function LandingPage({ onStartQuiz, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4"
        >
          <Coins className="w-10 h-10 text-white" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            You've heard the buzz about <TypewriterText words={["Web3", "Crypto", "Blockchain", "Bitcoin"]} />
            <br></br>
            — now see what it really means for you.
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Take our quick quiz to discover your personal Web3 path and get a custom dashboard with beginner-friendly tools and guides.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onStartQuiz}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Take the Quiz
          </Button>
          <Button
            onClick={onLogin}
            size="lg"
            variant="outline"
            className="border-2"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Member Login
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div>
            <div className="text-purple-600">15K+</div>
            <div className="text-gray-600">Web3 Enthusiasts</div>
          </div>
          <div>
            <div className="text-blue-600">100+</div>
            <div className="text-gray-600">Crypto Projects</div>
          </div>
          <div>
            <div className="text-purple-600">24/7</div>
            <div className="text-gray-600">Market Updates</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
