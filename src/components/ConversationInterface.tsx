import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import VoiceControls from "./VoiceControls";

interface ConversationPhase {
  id: string;
  name: string;
  description: string;
}

interface Relationship {
  id: string;
  name: string;
  type: string;
  avatar?: string;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
}

interface ConversationHistoryProps {
  messages: Message[];
}

// Create a local ConversationHistory component since we can't import it
const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  messages = [],
}) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.sender === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <p>{message.text}</p>
            <div className="mt-1 text-xs opacity-70">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {message.sentiment !== "neutral" && (
                <Badge
                  variant="outline"
                  className={`ml-2 ${
                    message.sentiment === "positive"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {message.sentiment}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ConversationInterfaceProps {
  onBack?: () => void;
  selectedRelationship?: Relationship;
  isListening?: boolean;
  isSpeaking?: boolean;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({
  onBack = () => {},
  selectedRelationship = {
    id: "1",
    name: "Sarah",
    type: "Friend",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  isListening = false,
  isSpeaking = false,
}) => {
  const [activePhase, setActivePhase] = useState<string>("history");

  const conversationPhases: ConversationPhase[] = [
    {
      id: "history",
      name: "Relationship History",
      description: "Explore how you met and your favorite memories together",
    },
    {
      id: "emotional",
      name: "Emotional Mapping",
      description: "Reflect on your feelings and emotional connection",
    },
    {
      id: "dynamics",
      name: "Dynamics & Tensions",
      description:
        "Explore challenges and misunderstandings in your relationship",
    },
    {
      id: "reflection",
      name: "Dual-Lens Reflection",
      description: "Consider how they might view you and your relationship",
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: `Let's talk about your relationship with ${selectedRelationship.name}. How did you two first meet?`,
      timestamp: new Date().toISOString(),
      sentiment: "neutral",
    },
    {
      id: "2",
      sender: "user",
      text: "We met at a conference about three years ago. We were both attending the same workshop.",
      timestamp: new Date().toISOString(),
      sentiment: "positive",
    },
    {
      id: "3",
      sender: "ai",
      text: "That sounds like an interesting way to meet! What was your first impression of them?",
      timestamp: new Date().toISOString(),
      sentiment: "neutral",
    },
  ]);

  const handleNextPhase = () => {
    const currentIndex = conversationPhases.findIndex(
      (phase) => phase.id === activePhase,
    );
    if (currentIndex < conversationPhases.length - 1) {
      setActivePhase(conversationPhases[currentIndex + 1].id);
    }
  };

  const handlePreviousPhase = () => {
    const currentIndex = conversationPhases.findIndex(
      (phase) => phase.id === activePhase,
    );
    if (currentIndex > 0) {
      setActivePhase(conversationPhases[currentIndex - 1].id);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto bg-background">
      {/* Header with relationship info */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10 border-2 border-primary">
            <img
              src={selectedRelationship.avatar}
              alt={selectedRelationship.name}
            />
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">
              {selectedRelationship.name}
            </h2>
            <Badge variant="outline">{selectedRelationship.type}</Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4 mr-2" />
            View Insights
          </Button>
        </div>
      </div>

      {/* Main conversation area */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Phase navigation */}
        <div className="p-4 border-b">
          <Tabs
            value={activePhase}
            onValueChange={setActivePhase}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full">
              {conversationPhases.map((phase) => (
                <TabsTrigger
                  key={phase.id}
                  value={phase.id}
                  className="text-xs sm:text-sm"
                >
                  {phase.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-2 text-sm text-muted-foreground">
              {
                conversationPhases.find((phase) => phase.id === activePhase)
                  ?.description
              }
            </div>
          </Tabs>
        </div>

        {/* Conversation history */}
        <div className="flex-grow overflow-y-auto p-4">
          <ConversationHistory messages={messages} />
        </div>

        {/* Voice controls and input area */}
        <div className="p-4 border-t bg-muted/20">
          <div className="flex flex-col items-center">
            <VoiceControls
              isListening={isListening}
              isSpeaking={isSpeaking}
              onStartListening={() => console.log("Start listening")}
              onStopListening={() => console.log("Stop listening")}
              onMuteAI={() => console.log("Mute AI")}
              onUnmuteAI={() => console.log("Unmute AI")}
            />

            <div className="w-full mt-4 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousPhase}
                disabled={activePhase === conversationPhases[0].id}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Phase
              </Button>

              <Button
                variant="outline"
                onClick={handleNextPhase}
                disabled={
                  activePhase ===
                  conversationPhases[conversationPhases.length - 1].id
                }
              >
                Next Phase
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationInterface;
