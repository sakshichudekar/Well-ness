import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, Heart, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-wellness">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-hero p-4 rounded-full shadow-wellness">
              <Leaf className="h-12 w-12 text-primary-foreground animate-gentle-bounce" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              WellnessFlow
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover, create, and share wellness sessions that nurture your mind, body, and spirit. 
            Join our community of mindful practitioners on their journey to inner peace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity text-lg px-8 py-3">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Welcome Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-wellness bg-gradient-card border-border text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="bg-accent p-3 rounded-full">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold">Community Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Explore a library of wellness sessions created by our mindful community. 
                From meditation to yoga, find what speaks to your soul.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-wellness bg-gradient-card border-border text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="bg-accent p-3 rounded-full">
                  <Heart className="h-8 w-8 text-accent-foreground" />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold">Create & Share</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Design your own wellness sessions and share them with others. 
                Auto-save drafts and publish when ready to inspire the community.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-wellness bg-gradient-card border-border text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="bg-accent p-3 rounded-full">
                  <Sparkles className="h-8 w-8 text-accent-foreground" />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold">Personal Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Track your wellness journey with personalized sessions. 
                Cultivate mindfulness and inner peace at your own pace.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of mindful souls who have found peace and balance through WellnessFlow.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity text-lg px-8 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
