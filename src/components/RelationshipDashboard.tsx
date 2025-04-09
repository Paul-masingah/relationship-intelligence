import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Heart,
  TrendingUp,
  MessageCircle,
  AlertCircle,
  Smile,
  Frown,
  Meh,
  ChevronRight,
} from "lucide-react";

interface EmotionData {
  date: string;
  sentiment: number;
  depth: number;
}

interface ThemeData {
  theme: string;
  count: number;
  sentiment: number;
}

interface RelationshipData {
  id: string;
  name: string;
  type: string;
  emotionalData: EmotionData[];
  themes: ThemeData[];
  insights: string[];
  suggestedTopics: string[];
}

const RelationshipDashboard = ({
  relationshipId = "1",
}: {
  relationshipId?: string;
}) => {
  const [selectedRelationship, setSelectedRelationship] =
    useState<string>(relationshipId);
  const [timeRange, setTimeRange] = useState<string>("30days");

  // Mock data for demonstration
  const relationships: RelationshipData[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      type: "Friend",
      emotionalData: [
        { date: "2023-01-01", sentiment: 0.7, depth: 3 },
        { date: "2023-01-08", sentiment: 0.8, depth: 4 },
        { date: "2023-01-15", sentiment: 0.6, depth: 3 },
        { date: "2023-01-22", sentiment: 0.9, depth: 5 },
        { date: "2023-01-29", sentiment: 0.7, depth: 4 },
        { date: "2023-02-05", sentiment: 0.8, depth: 4 },
      ],
      themes: [
        { theme: "Support", count: 12, sentiment: 0.9 },
        { theme: "Shared Activities", count: 8, sentiment: 0.8 },
        { theme: "Communication", count: 6, sentiment: 0.5 },
        { theme: "Trust", count: 5, sentiment: 0.7 },
        { theme: "Boundaries", count: 3, sentiment: 0.3 },
      ],
      insights: [
        "You feel most supported when discussing career challenges",
        "Shared outdoor activities strengthen your connection",
        "Communication tends to be more strained during busy periods",
        "You value their perspective on family matters",
      ],
      suggestedTopics: [
        "How do you feel about the balance of support in your relationship?",
        "What new activities would you like to explore together?",
        "How might you improve communication during busy times?",
      ],
    },
    {
      id: "2",
      name: "Michael Chen",
      type: "Partner",
      emotionalData: [
        { date: "2023-01-01", sentiment: 0.9, depth: 5 },
        { date: "2023-01-08", sentiment: 0.7, depth: 4 },
        { date: "2023-01-15", sentiment: 0.8, depth: 5 },
        { date: "2023-01-22", sentiment: 0.6, depth: 3 },
        { date: "2023-01-29", sentiment: 0.9, depth: 5 },
        { date: "2023-02-05", sentiment: 0.8, depth: 4 },
      ],
      themes: [
        { theme: "Intimacy", count: 15, sentiment: 0.9 },
        { theme: "Future Plans", count: 10, sentiment: 0.7 },
        { theme: "Daily Routines", count: 8, sentiment: 0.6 },
        { theme: "Conflict Resolution", count: 6, sentiment: 0.4 },
        { theme: "Family", count: 5, sentiment: 0.8 },
      ],
      insights: [
        "You feel most connected during quiet evenings together",
        "Discussions about the future bring both excitement and anxiety",
        "Small daily gestures of affection are important to you",
        "You appreciate their patience during disagreements",
      ],
      suggestedTopics: [
        "How do you envision your relationship evolving in the next year?",
        "What daily rituals would you like to establish together?",
        "How can you better support each other during stressful times?",
      ],
    },
  ];

  const currentRelationship =
    relationships.find((r) => r.id === selectedRelationship) ||
    relationships[0];

  // Calculate average sentiment
  const averageSentiment =
    currentRelationship.emotionalData.reduce(
      (sum, data) => sum + data.sentiment,
      0,
    ) / currentRelationship.emotionalData.length;

  // Calculate average depth
  const averageDepth =
    currentRelationship.emotionalData.reduce(
      (sum, data) => sum + data.depth,
      0,
    ) / currentRelationship.emotionalData.length;

  // Get sentiment icon based on value
  const getSentimentIcon = (value: number) => {
    if (value >= 0.7) return <Smile className="h-5 w-5 text-green-500" />;
    if (value >= 0.4) return <Meh className="h-5 w-5 text-amber-500" />;
    return <Frown className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="bg-background p-6 rounded-lg w-full max-w-7xl mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Relationship Dashboard</h1>

          <div className="flex space-x-4">
            <Select
              value={selectedRelationship}
              onValueChange={setSelectedRelationship}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {relationships.map((relationship) => (
                  <SelectItem key={relationship.id} value={relationship.id}>
                    {relationship.name} ({relationship.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-rose-500" />
                  Relationship Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <span className="font-medium">
                      {currentRelationship.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <Badge variant="outline">{currentRelationship.type}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Conversations:
                    </span>
                    <span className="font-medium">
                      {currentRelationship.emotionalData.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Last conversation:
                    </span>
                    <span className="font-medium">
                      {
                        currentRelationship.emotionalData[
                          currentRelationship.emotionalData.length - 1
                        ].date
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Smile className="h-5 w-5 mr-2 text-amber-500" />
                  Emotional Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">
                        Average Sentiment
                      </span>
                      <div className="flex items-center">
                        {getSentimentIcon(averageSentiment)}
                        <span className="ml-1 font-medium">
                          {(averageSentiment * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <Progress value={averageSentiment * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">
                        Conversation Depth
                      </span>
                      <span className="font-medium">
                        {((averageDepth / 5) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress
                      value={(averageDepth / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">
                        Reciprocity
                      </span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  Relationship Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Emotional Stability
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Stable
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Communication Quality
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      Improving
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Conflict Resolution
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Good
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Overall Health
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Strong
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="emotional">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="emotional">Emotional Trends</TabsTrigger>
            <TabsTrigger value="themes">Key Themes</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="emotional" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Emotional Patterns Over Time</CardTitle>
                <CardDescription>
                  Track how your emotional connection has evolved through
                  conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentRelationship.emotionalData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sentiment"
                        stroke="#8884d8"
                        strokeWidth={2}
                        name="Sentiment Score"
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="depth"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        name="Conversation Depth (scaled)"
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    Data from {currentRelationship.emotionalData[0].date} to{" "}
                    {
                      currentRelationship.emotionalData[
                        currentRelationship.emotionalData.length - 1
                      ].date
                    }
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" /> View More History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="themes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Conversation Themes</CardTitle>
                <CardDescription>
                  Topics and themes that appear frequently in your conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentRelationship.themes}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="theme" />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="#8884d8"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#82ca9d"
                      />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="count"
                        name="Frequency"
                        fill="#8884d8"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="sentiment"
                        name="Sentiment"
                        fill="#82ca9d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Theme Details</h4>
                  <ScrollArea className="h-[120px]">
                    <div className="space-y-2">
                      {currentRelationship.themes.map((theme, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                        >
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {theme.theme}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Mentioned {theme.count} times
                            </span>
                          </div>
                          <div className="flex items-center">
                            {getSentimentIcon(theme.sentiment)}
                            <span className="ml-1 text-sm">
                              {(theme.sentiment * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-1" /> Explore Themes in
                  Conversation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Relationship Insights</CardTitle>
                <CardDescription>
                  Patterns and observations from your conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                    <ScrollArea className="h-[150px]">
                      <div className="space-y-2">
                        {currentRelationship.insights.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start p-2 rounded-md hover:bg-muted"
                          >
                            <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{insight}</p>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Suggested Topics for Future Conversations
                    </h4>
                    <div className="space-y-2">
                      {currentRelationship.suggestedTopics.map(
                        (topic, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.3 + index * 0.1,
                            }}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted group cursor-pointer"
                          >
                            <p className="text-sm">{topic}</p>
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start a New Conversation</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RelationshipDashboard;
