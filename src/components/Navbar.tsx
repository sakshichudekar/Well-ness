import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Leaf, ArrowLeft } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    
    // Navigate back to home page
    navigate('/');
  };

  const handleBack = () => {
    // Go back to previous page or home if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary animate-gentle-bounce" />
            <span className="text-xl font-semibold text-foreground">WellnessFlow</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            {/* Navigation Links */}
            <Link 
              to="/dashboard" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/my-sessions" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              My Sessions
            </Link>
            
            {/* Logout Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;