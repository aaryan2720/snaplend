
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import AgreementPage from "./pages/AgreementPage";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import CheckoutPayment from "./pages/CheckoutPayment";
import CreateListing from "./pages/CreateListing";
import Explore from "./pages/Explore";
import FavoritesPage from "./pages/FavoritesPage";
import HowItWorks from "./pages/HowItWorks";
import Index from "./pages/Index";
import ItemDetail from "./pages/ItemDetail";
import Login from "./pages/Login";
import MessagesPage from "./pages/MessagesPage";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import SettingsPage from "./pages/SettingsPage";
import SignUp from "./pages/SignUp";
import UserBookings from "./pages/UserBookings";
import UserListings from "./pages/UserListings";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/item/:id" element={<ItemDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/explore" element={<Explore />} />
    <Route path="/browse/:category" element={<CategoryPage />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
    <Route path="/checkout/payment" element={
      <ProtectedRoute>
        <CheckoutPayment />
      </ProtectedRoute>
    } />
    <Route path="/payment" element={
      <ProtectedRoute>
        <PaymentPage />
      </ProtectedRoute>
    } />
    <Route path="/payment-success" element={
      <ProtectedRoute>
        <PaymentSuccess />
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    } />
    <Route path="/agreement/:id" element={
      <ProtectedRoute>
        <AgreementPage />
      </ProtectedRoute>
    } />
    <Route path="/listings" element={
      <ProtectedRoute>
        <UserListings />
      </ProtectedRoute>
    } />
    <Route path="/bookings" element={
      <ProtectedRoute>
        <UserBookings />
      </ProtectedRoute>
    } />
    <Route path="/favorites" element={
      <ProtectedRoute>
        <FavoritesPage />
      </ProtectedRoute>
    } />
    <Route path="/messages" element={
      <ProtectedRoute>
        <MessagesPage />
      </ProtectedRoute>
    } />
    <Route path="/settings" element={
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    } />
    <Route 
      path="/create-listing" 
      element={
        <ProtectedRoute>
          <CreateListing />
        </ProtectedRoute>
      } 
    />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
