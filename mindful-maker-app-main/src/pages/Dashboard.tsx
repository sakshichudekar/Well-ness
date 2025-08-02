import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, User, Clock, Pencil } from "lucide-react";

interface Session {
  _id: string;
  title: string;
  tags: string[];
  json_file_url: string;
  author: string;
  duration: string;
}

const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/session/my-sessions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch sessions");
        }

        const data = await res.json();
        console.log("Fetched data:", data);

        setSessions(data.sessions || []);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Wellness Sessions</h1>
            <p className="text-muted-foreground">View all the wellness sessions you’ve created</p>
          </div>

          {/* ✅ Add New Session */}
          <Link to="/my-sessions/new">
            <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
              + Add Session
            </Button>
          </Link>
        </div>

        {sessions.length === 0 ? (
          <p className="text-muted-foreground text-center mt-8">No sessions found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <Card
                key={session._id}
                className="shadow-card hover:shadow-wellness transition-shadow duration-300 bg-gradient-card border-border"
              >
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
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        JSON File URL:
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-foreground font-mono truncate flex-1">
                          {session.json_file_url}
                        </p>
                        <a
                          href={session.json_file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* ✅ Edit Button */}
                    <Link to={`/my-sessions/${session._id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 flex items-center gap-1"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
