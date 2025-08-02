import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, User, Clock } from "lucide-react";

interface Session {
  id: string;
  title: string;
  tags: string[];
  jsonUrl: string;
  author: string;
  duration: string;
}

const Dashboard = () => {
  // Mock data - will be replaced with API calls later
  const [sessions] = useState<Session[]>([
    {
      id: "1",
      title: "Morning Meditation Flow",
      tags: ["meditation", "morning", "beginner"],
      jsonUrl: "https://example.com/sessions/morning-meditation.json",
      author: "Sarah Williams",
      duration: "15 min"
    },
    {
      id: "2", 
      title: "Gentle Yoga Stretches",
      tags: ["yoga", "stretching", "flexibility"],
      jsonUrl: "https://example.com/sessions/gentle-yoga.json",
      author: "Michael Chen",
      duration: "30 min"
    },
    {
      id: "3",
      title: "Breathing Exercises for Stress",
      tags: ["breathing", "stress-relief", "anxiety"],
      jsonUrl: "https://example.com/sessions/stress-breathing.json",
      author: "Emma Thompson",
      duration: "10 min"
    },
    {
      id: "4",
      title: "Deep Sleep Relaxation",
      tags: ["sleep", "relaxation", "evening"],
      jsonUrl: "https://example.com/sessions/deep-sleep.json",
      author: "David Park",
      duration: "20 min"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Public Wellness Sessions</h1>
            <p className="text-muted-foreground">Discover sessions created by our community</p>
          </div>
          <Link to="/my-sessions">
            <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
              Go to My Sessions
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <Card key={session.id} className="shadow-card hover:shadow-wellness transition-shadow duration-300 bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
                  {session.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {session.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {session.duration}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {session.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-1">JSON File URL:</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-foreground font-mono truncate flex-1">
                        {session.jsonUrl}
                      </p>
                      <a 
                        href={session.jsonUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;