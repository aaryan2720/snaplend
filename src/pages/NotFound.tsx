
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto py-16">
        <div className="w-24 h-24 bg-snaplend-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl font-bold text-snaplend-600">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-snaplend-900">Page not found</h1>
        <p className="text-snaplend-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button asChild>
            <Link to="/explore">Browse Listings</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
