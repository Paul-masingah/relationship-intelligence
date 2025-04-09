import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Volume2,
  User,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConversationInterface from "./ConversationInterface";
import RelationshipDashboard from "./RelationshipDashboard";

const HomePage = () => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("conversation");
  const [userProfile, setUserProfile] = useState({
    name: "Alex",
    relationships: [
      { id: 1, name: "Sarah", type: "Partner", lastConversation: "2 days ago" },
      {
        id: 2,
        name: "Michael",
        type: "Friend",
        lastConversation: "1 week ago",
      },
      { id: 3, name: "Mom", type: "Family", lastConversation: "3 days ago" },
    ],
  });

  // Simulate checking if user is new or returning
  useEffect(() => {
    // In a real app, this would check local storage or a database
    const checkUserStatus = () => {
      // Simulating a check - would be replaced with actual logic
      const savedUser = localStorage.getItem("userProfile");
      if (savedUser) {
        setIsFirstTimeUser(false);
        setUserProfile(JSON.parse(savedUser));
      }
    };

    checkUserStatus();
  }, []);

  const completeOnboarding = () => {
    setIsFirstTimeUser(false);
    // In a real app, save user profile to storage/database
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  };

  const renderOnboarding = () => {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-background p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {onboardingStep === 1 && "Welcome to Relationship Intelligence"}
              {onboardingStep === 2 && "Privacy & Data Usage"}
              {onboardingStep === 3 && "Voice Recognition Setup"}
              {onboardingStep === 4 && "Create Your Profile"}
            </CardTitle>
            <CardDescription className="text-center">
              {onboardingStep === 1 &&
                "Reflect on your relationships through guided voice conversations"}
              {onboardingStep === 2 && "How we handle your data and privacy"}
              {onboardingStep === 3 &&
                "Set up your voice for better conversations"}
              {onboardingStep === 4 && "Tell us a bit about yourself"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {onboardingStep === 1 && (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-full bg-primary/10 w-20 h-20 mx-auto flex items-center justify-center">
                  <Volume2 className="h-10 w-10 text-primary" />
                </div>
                <p>
                  This app uses voice conversations to help you reflect on your
                  relationships and gain insights into patterns and dynamics.
                </p>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-4">
                <p>
                  Your privacy is important to us. Here's how we handle your
                  data:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Your conversations are stored securely</li>
                  <li>We analyze patterns to provide personalized insights</li>
                  <li>You can delete your data at any time</li>
                  <li>
                    We don't share your personal information with third parties
                  </li>
                </ul>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-full bg-primary/10 w-20 h-20 mx-auto flex items-center justify-center">
                  <Mic className="h-10 w-10 text-primary" />
                </div>
                <p>
                  To get started with voice conversations, we'll need permission
                  to use your microphone.
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    // In a real app, this would request microphone permissions
                    console.log("Requesting microphone permission");
                  }}
                >
                  Allow Microphone Access
                </Button>
              </div>
            )}

            {onboardingStep === 4 && (
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={userProfile.name}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {onboardingStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setOnboardingStep(onboardingStep - 1)}
              >
                Back
              </Button>
            )}
            {onboardingStep < 4 ? (
              <Button
                className="ml-auto"
                onClick={() => setOnboardingStep(onboardingStep + 1)}
              >
                Next
              </Button>
            ) : (
              <Button className="ml-auto" onClick={completeOnboarding}>
                Get Started
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  const renderMainInterface = () => {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Relationship Intelligence</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`}
                />
                <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4">
          <Tabs
            defaultValue="conversation"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="conversation">Conversation</TabsTrigger>
              <TabsTrigger value="insights">Relationship Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="conversation" className="space-y-4">
              {activeTab === "conversation" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="md:col-span-1">
                      <CardHeader>
                        <CardTitle>Your Relationships</CardTitle>
                        <CardDescription>
                          Select a relationship to start a conversation
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {userProfile.relationships.map((relationship) => (
                            <li key={relationship.id}>
                              <Button
                                variant="ghost"
                                className="w-full justify-between items-center text-left"
                                onClick={() => {}}
                              >
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage
                                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${relationship.name}`}
                                    />
                                    <AvatarFallback>
                                      {relationship.name[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div>{relationship.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {relationship.type}
                                    </div>
                                  </div>
                                </div>
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline">
                          Add New Relationship
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="md:col-span-3">
                      <CardHeader>
                        <CardTitle>Voice Conversation</CardTitle>
                        <CardDescription>
                          Talk about your relationship with Sarah
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="min-h-[400px]">
                        <ConversationInterface />
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="insights">
              {activeTab === "insights" && <RelationshipDashboard />}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    );
  };

  return isFirstTimeUser ? renderOnboarding() : renderMainInterface();
};

export default HomePage;
