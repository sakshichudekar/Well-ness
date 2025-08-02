import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Lock,
  UserPlus,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import API from "@/lib/api";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("🚀 Registration attempt:", { email, password });

    try {
      // Make the API call
      const res = await API.post("/auth/register", { email, password });
      
      console.log("✅ Full server response:", res);
      console.log("📦 Response data:", res.data);
      console.log("📊 Response status:", res.status);

      // Validate response structure
      if (!res.data || typeof res.data !== 'object') {
        throw new Error("Invalid response format from server");
      }

      // Check if the response indicates success
      if (!res.data.success) {
        throw new Error(res.data.message || "Registration failed");
      }

      // Extract data safely
      const responseData = res.data.data;
      if (!responseData) {
        throw new Error("No user data in response");
      }

      const { token, email: userEmail, userId } = responseData;

      // Validate required fields
      if (!token || !userEmail || !userId) {
        console.error("❌ Missing required fields:", { token: !!token, userEmail: !!userEmail, userId: !!userId });
        throw new Error("Incomplete user data received");
      }

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userId", userId);

      console.log("💾 Data stored in localStorage:", {
        token: token.substring(0, 20) + "...",
        userEmail,
        userId
      });

      // Success toast
      toast({
        title: "🎉 Registration Successful!",
        description: "Welcome to WellnessFlow! You've been successfully registered.",
        variant: "default",
      });
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      
    } catch (err: any) {
      console.error("❌ Registration error:", err);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.response) {
        // Server responded with error status
        console.error("Server error response:", err.response);
        const serverData = err.response.data;
        errorMessage = serverData?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Network error
        console.error("Network error:", err.request);
        errorMessage = "Network error. Please check your connection.";
      } else {
        // Other error
        errorMessage = err.message || "An unexpected error occurred.";
      }
      
      // Error toast
      toast({
        title: "❌ Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-wellness flex items-center justify-center p-4">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-wellness">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-hero p-3 rounded-full">
              <UserPlus className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Join WellnessFlow</CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account to start your wellness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-border focus:ring-primary"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-border focus:ring-primary"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-hero hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
