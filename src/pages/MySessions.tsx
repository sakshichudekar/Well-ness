import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, ExternalLink, FileText, Eye } from "lucide-react";

interface Session {
  id: string;
  title: string;
  status: "draft" | "published";
  jsonUrl: string;
  tags: string[];
}

const MySessions = () => {
  // Mock data - will be replaced with API calls later
  const [sessions] = useState<Session[]>([
    {
      id: "1",
      title: "My Custom Morning Routine",
      status: "draft",
      jsonUrl: "",
      tags: ["morning", "custom"]
    },
    {
      id: "2",
      title: "Evening Wind Down Session",
      status: "published",
      jsonUrl: "https://example.com/my-sessions/evening-session.json",
      tags: ["evening", "relaxation"]
    },
    {
      id: "3",
      title: "Workplace Stress Relief",
      status: "draft",
      jsonUrl: "",
      tags: ["stress", "workplace"]
    },
    {
      id: "4",
      title: "Quick Energy Boost",
      status: "published",
      jsonUrl: "https://example.com/my-sessions/energy-boost.json",
      tags: ["energy", "quick"]
    }
  ]);

  const draftSessions = sessions.filter(session => session.status === "draft");
  const publishedSessions = sessions.filter(session => session.status === "published");

  const SessionCard = ({ session }: { session: Session }) => (
    <Card className="shadow-card hover:shadow-wellness transition-shadow duration-300 bg-gradient-card border-border">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
            {session.title}
          </CardTitle>
          <Badge 
            variant={session.status === "published" ? "default" : "secondary"}
            className={session.status === "published" ? "bg-primary" : ""}
          >
            {session.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {session.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          {session.jsonUrl && (
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
          )}
          
          <div className="flex gap-2 pt-2">
            <Link to={`/session-editor/${session.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            {session.status === "published" && (
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                View
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Sessions</h1>
            <p className="text-muted-foreground">Manage your draft and published wellness sessions</p>
          </div>
          <Link to="/session-editor">
            <Button className="bg-gradient-hero hover:opacity-90 transition-opacity gap-2">
              <Plus className="h-4 w-4" />
              Create New Session
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          {/* Draft Sessions */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Drafts</h2>
              <Badge variant="secondary">{draftSessions.length}</Badge>
            </div>
            
            {draftSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/30 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    No draft sessions yet. Start creating your first session!
                  </p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Published Sessions */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Published</h2>
              <Badge variant="secondary">{publishedSessions.length}</Badge>
            </div>
            
            {publishedSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/30 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Eye className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    No published sessions yet. Publish your first session to share with the community!
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MySessions;