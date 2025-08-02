import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, Eye, Link2, Tag, FileText, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  
  // Auto-save functionality will be added later
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Mock data loading for editing existing session
  useEffect(() => {
    if (id) {
      // Mock loading existing session data
      setTitle("Existing Session Title");
      setTags("meditation, morning, beginner");
      setJsonUrl("https://example.com/sessions/existing.json");
      setIsDraft(true);
    }
  }, [id]);

  const handleSaveDraft = () => {
    // Save draft logic will be added later
    setLastSaved(new Date());
    toast({
      title: "Draft saved",
      description: "Your session has been saved as a draft.",
    });
  };

  const handlePublish = () => {
    // Publish logic will be added later
    setIsDraft(false);
    setLastSaved(new Date());
    toast({
      title: "Session published",
      description: "Your session is now live and visible to the community.",
    });
    navigate("/my-sessions");
  };

  const tagList = tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/my-sessions">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to My Sessions
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {id ? "Edit Wellness Session" : "Create New Wellness Session"}
            </h1>
            <p className="text-muted-foreground">
              Design your custom wellness experience to share with others
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Form */}
          <div className="space-y-6">
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Session Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground font-medium">Session Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title for your session"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-border focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-foreground font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="tags"
                    placeholder="meditation, yoga, breathing, relaxation"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border-border focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate tags with commas to help others discover your session
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jsonUrl" className="text-foreground font-medium flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    JSON File URL
                  </Label>
                  <Input
                    id="jsonUrl"
                    placeholder="https://example.com/your-session-data.json"
                    value={jsonUrl}
                    onChange={(e) => setJsonUrl(e.target.value)}
                    className="border-border focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Link to your session configuration JSON file
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                onClick={handleSaveDraft}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button 
                onClick={handlePublish}
                className="flex-1 gap-2 bg-gradient-hero hover:opacity-90 transition-opacity"
                disabled={!title || !jsonUrl}
              >
                <Eye className="h-4 w-4" />
                Publish Session
              </Button>
            </div>

            {lastSaved && (
              <p className="text-xs text-muted-foreground text-center">
                Last saved: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* Preview */}
          <div>
            <Card className="shadow-card border-border bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
                <p className="text-sm text-muted-foreground">
                  This is how your session will appear to others
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                      {title || "Your Session Title"}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {isDraft ? "Draft" : "Published"}
                      </Badge>
                    </div>
                  </div>

                  {tagList.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tagList.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {jsonUrl && (
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        JSON File URL:
                      </p>
                      <p className="text-sm text-foreground font-mono truncate">
                        {jsonUrl}
                      </p>
                    </div>
                  )}

                  {(!title && !jsonUrl) && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Fill in the details to see your preview</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionEditor;