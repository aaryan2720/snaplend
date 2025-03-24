import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Upload, X, Info, Plus, Camera, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Categories to choose from
const categories = [
  { id: "furniture", name: "Furniture", icon: "🪑" },
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "vehicles", name: "Vehicles", icon: "🚗" },
  { id: "tools", name: "Tools", icon: "🔧" },
  { id: "sports", name: "Sports & Outdoors", icon: "🏄‍♂️" },
  { id: "clothes", name: "Clothes & Accessories", icon: "👕" },
  { id: "books", name: "Books & Media", icon: "📚" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
];

// Pricing options
const pricingOptions = [
  { value: "hour", label: "Per hour" },
  { value: "day", label: "Per day" },
  { value: "week", label: "Per week" },
  { value: "month", label: "Per month" },
];

const CreateListing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Form state
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [pricingUnit, setPricingUnit] = useState("day");
  const [deposit, setDeposit] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<{ id: number; file: File | null; preview: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const totalSteps = 3;
  
  // Image handling
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (loadEvent) => {
        setImages(images.map((img) => 
          img.id === id 
            ? { ...img, file, preview: loadEvent.target?.result as string } 
            : img
        ));
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const addImageSlot = () => {
    if (images.length < 8) {
      const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
      setImages([...images, { id: newId, file: null, preview: "" }]);
    }
  };
  
  const removeImage = (id: number) => {
    setImages(images.filter(img => img.id !== id));
  };
  
  // Navigation
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // File upload
  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const image of images) {
      if (image.file) {
        const fileExt = image.file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
        const filePath = `${user?.id}/${fileName}`;
        
        const { data, error } = await supabase.storage
          .from('listings')
          .upload(filePath, image.file);
          
        if (error) {
          console.error('Error uploading image:', error);
          toast({
            title: "Upload failed",
            description: error.message,
            variant: "destructive",
          });
          continue;
        }
        
        // Get public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from('listings')
          .getPublicUrl(filePath);
          
        uploadedUrls.push(publicUrl);
      }
    }
    
    return uploadedUrls;
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Upload images first
      const imageUrls = await uploadImages();
      
      // Then save listing data
      const { data, error } = await supabase
        .from('listings')
        .insert({
          owner_id: user?.id,
          title,
          description,
          category,
          price: parseFloat(price),
          deposit: deposit ? parseFloat(deposit) : null,
          location: address,
          image_urls: imageUrls,
        })
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Listing created!",
        description: "Your item has been successfully listed for rent.",
      });
      
      // Navigate to the newly created listing
      if (data && data[0]?.id) {
        navigate(`/item/${data[0].id}`);
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error creating listing",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error creating listing:', error);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <Container className="max-w-screen-md">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-display font-semibold text-snaplend-900">
              List your item for rent
            </h1>
            <Link
              to="/"
              className="flex items-center text-snaplend-600 hover:text-snaplend-900 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Cancel
            </Link>
          </div>
          
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {[...Array(totalSteps)].map((_, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center relative flex-1"
                >
                  <button
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-medium z-10",
                      step > index + 1
                        ? "bg-primary text-white"
                        : step === index + 1
                          ? "bg-primary/10 text-primary border-2 border-primary"
                          : "bg-snaplend-100 text-snaplend-400 border-2 border-snaplend-200"
                    )}
                    onClick={() => index + 1 < step && setStep(index + 1)}
                    disabled={index + 1 > step}
                  >
                    {step > index + 1 ? <Check size={16} /> : index + 1}
                  </button>
                  
                  {index < totalSteps - 1 && (
                    <div 
                      className={cn(
                        "absolute h-0.5 inset-x-0 top-1/2 transform -translate-y-1/2 mx-5",
                        step > index + 1 ? "bg-primary" : "bg-snaplend-200"
                      )}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-2 px-2">
              <div className={cn(
                "text-sm font-medium transition-colors",
                step >= 1 ? "text-primary" : "text-snaplend-400"
              )}>
                Item Details
              </div>
              <div className={cn(
                "text-sm font-medium transition-colors",
                step >= 2 ? "text-primary" : "text-snaplend-400"
              )}>
                Photos
              </div>
              <div className={cn(
                "text-sm font-medium transition-colors",
                step >= 3 ? "text-primary" : "text-snaplend-400"
              )}>
                Location & Pricing
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="glass-card p-6 md:p-8 rounded-xl">
              {/* Step 1: Item Details */}
              {step === 1 && (
                <div className="animate-fade-up">
                  <h2 className="text-xl font-medium text-snaplend-900 mb-6">
                    Tell us about your item
                  </h2>
                  
                  {/* Title */}
                  <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-snaplend-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Professional DSLR Camera Kit"
                      className="w-full px-4 py-3 border border-snaplend-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      required
                    />
                    <p className="mt-1 text-sm text-snaplend-500">
                      Be clear and descriptive about what you're offering.
                    </p>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-snaplend-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your item in detail, including its condition, features, and any usage instructions."
                      className="w-full px-4 py-3 border border-snaplend-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      rows={5}
                      required
                    />
                    <p className="mt-1 text-sm text-snaplend-500">
                      Detailed descriptions help renters know exactly what they're getting.
                    </p>
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-snaplend-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          className={cn(
                            "flex flex-col items-center p-4 rounded-lg border transition-colors",
                            category === cat.id
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-snaplend-200 hover:bg-snaplend-50 text-snaplend-700"
                          )}
                          onClick={() => setCategory(cat.id)}
                        >
                          <span className="text-2xl mb-2">{cat.icon}</span>
                          <span className="text-sm font-medium">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Photos */}
              {step === 2 && (
                <div className="animate-fade-up">
                  <h2 className="text-xl font-medium text-snaplend-900 mb-6">
                    Add photos of your item
                  </h2>
                  
                  <p className="mb-6 text-snaplend-600">
                    High-quality photos help your listing stand out. Add at least one photo, but we recommend 4-6 for the best results.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {images.map((img) => (
                      <div 
                        key={img.id} 
                        className="relative aspect-square rounded-lg overflow-hidden border border-snaplend-200"
                      >
                        {img.preview ? (
                          <>
                            <img 
                              src={img.preview} 
                              alt={`Item preview ${img.id}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
                              onClick={() => removeImage(img.id)}
                            >
                              <X size={16} className="text-snaplend-700" />
                            </button>
                          </>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-snaplend-50 transition-colors">
                            <Upload size={24} className="text-snaplend-400 mb-2" />
                            <span className="text-xs text-snaplend-500">Upload image</span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, img.id)}
                            />
                          </label>
                        )}
                      </div>
                    ))}
                    
                    {images.length < 8 && (
                      <button
                        type="button"
                        onClick={addImageSlot}
                        className="aspect-square rounded-lg border border-dashed border-snaplend-300 flex flex-col items-center justify-center hover:bg-snaplend-50 transition-colors"
                      >
                        <Plus size={24} className="text-snaplend-400 mb-2" />
                        <span className="text-sm text-snaplend-500">Add photo</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg flex">
                    <div className="flex-shrink-0 mr-3">
                      <Info size={20} className="text-blue-500" />
                    </div>
                    <div className="text-sm text-blue-700">
                      <p className="font-medium mb-1">Photo tips:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Use natural lighting when possible</li>
                        <li>Show your item from multiple angles</li>
                        <li>Include closeups of any special features</li>
                        <li>Show any accessories that come with it</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Location & Pricing */}
              {step === 3 && (
                <div className="animate-fade-up">
                  <h2 className="text-xl font-medium text-snaplend-900 mb-6">
                    Set your location and pricing
                  </h2>
                  
                  {/* Location */}
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-sm font-medium text-snaplend-700 mb-1">
                      Pickup location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g., Indiranagar, Bangalore"
                        className="w-full pl-10 pr-4 py-3 border border-snaplend-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-snaplend-400" size={18} />
                    </div>
                    <p className="mt-1 text-sm text-snaplend-500">
                      We'll only show your general area until a booking is confirmed.
                    </p>
                  </div>
                  
                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-snaplend-700 mb-1">
                        Rental price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-snaplend-400">₹</span>
                        <input
                          id="price"
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="0"
                          min="0"
                          className="w-full pl-8 pr-4 py-3 border border-snaplend-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="pricingUnit" className="block text-sm font-medium text-snaplend-700 mb-1">
                        Price per <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="pricingUnit"
                        value={pricingUnit}
                        onChange={(e) => setPricingUnit(e.target.value)}
                        className="w-full px-4 py-3 border border-snaplend-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                      >
                        {pricingOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Security deposit */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="deposit" className="block text-sm font-medium text-snaplend-700">
                        Security deposit (optional)
                      </label>
                      <div className="relative group">
                        <Info size={14} className="text-snaplend-400 cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-white rounded shadow-md text-xs text-snaplend-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
                          A refundable amount collected to protect against damages.
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-snaplend-400">₹</span>
                      <input
                        id="deposit"
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        placeholder="0"
                        min="0"
                        className="w-full pl-8 pr-4 py-3 border border-snaplend-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <p className="mt-1 text-sm text-snaplend-500">
                      This will be collected at the time of booking and refunded upon safe return.
                    </p>
                  </div>
                  
                  {/* Terms agreement */}
                  <div className="mb-6">
                    <div className="flex items-start">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 mt-1 text-primary border-snaplend-300 rounded focus:ring-primary"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-snaplend-600">
                        I confirm that I own this item or have permission to list it for rent. I agree to SnapLend's{" "}
                        <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                          Terms of Service
                        </Link>.
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center"
                  >
                    Next
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating listing...
                      </div>
                    ) : (
                      <>
                        Create Listing
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateListing;
