
// Import required components
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Filter,
  MapPin,
  Grid3X3,
  LayoutList,
  Star,
  Info,
  XCircle,
} from "lucide-react";
import { fetchListings } from "@/services/listingService";
import { ListingProps } from "@/components/ListingCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [listings, setListings] = useState<ListingProps[]>([]);
  const [filteredListings, setFilteredListings] = useState<ListingProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("recommended");

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      try {
        const allListings = await fetchListings();
        const categoryListings = category
          ? allListings.filter(
              (listing) =>
                listing.category?.toLowerCase() === category.toLowerCase()
            )
          : allListings;

        setListings(categoryListings);
        setFilteredListings(categoryListings);

        // Extract available locations
        const locations = [
          ...new Set(categoryListings.map((listing) => listing.location)),
        ];
        setAvailableLocations(locations);

        // Set initial price range based on actual data
        if (categoryListings.length > 0) {
          const prices = categoryListings.map((listing) => listing.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange([minPrice, maxPrice]);
        }
      } catch (error) {
        console.error("Error loading listings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [category]);

  // Apply filters whenever filter states change
  useEffect(() => {
    let filtered = [...listings];

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (listing) =>
        listing.price >= priceRange[0] && listing.price <= priceRange[1]
    );

    // Apply location filter
    if (locationFilter.length > 0) {
      filtered = filtered.filter((listing) =>
        locationFilter.includes(listing.location)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      // recommended (default) - no specific sorting
      default:
        break;
    }

    setFilteredListings(filtered);
  }, [listings, searchTerm, priceRange, locationFilter, sortOption]);

  // Handle price range change
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  // Toggle location in filter
  const toggleLocationFilter = (location: string) => {
    if (locationFilter.includes(location)) {
      setLocationFilter(locationFilter.filter((loc) => loc !== location));
    } else {
      setLocationFilter([...locationFilter, location]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([
      Math.min(...listings.map((listing) => listing.price)),
      Math.max(...listings.map((listing) => listing.price)),
    ]);
    setLocationFilter([]);
    setSortOption("recommended");
  };

  // Render grid view item
  const renderGridItem = (listing: ListingProps) => (
    <Card
      key={listing.id}
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/item/${listing.id}`)}
    >
      <div className="relative h-48">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
            {listing.featured ? "Featured" : listing.priceUnit || "Day"}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {listing.title}
          </CardTitle>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{listing.rating || "New"}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{listing.location}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <p className="text-sm text-gray-600 line-clamp-2">
          {listing.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-1 flex justify-between items-center">
        <div className="text-primary font-bold">₹{listing.price}</div>
        <Button size="sm" variant="default">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );

  // Render list view item
  const renderListItem = (listing: ListingProps) => (
    <Card
      key={listing.id}
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer mb-4"
      onClick={() => navigate(`/item/${listing.id}`)}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 sm:w-48 sm:h-auto">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
              {listing.featured ? "Featured" : listing.priceUnit || "Day"}
            </Badge>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{listing.title}</h3>
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{listing.rating || "New"}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{listing.location}</span>
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {listing.description}
          </p>
          <div className="flex justify-between items-center mt-auto">
            <div className="text-primary font-bold">₹{listing.price}</div>
            <Button size="sm" variant="default">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <Container className="py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {category ? capitalizeFirstLetter(category) : "All Categories"}
        </h1>
        <p className="text-gray-600">
          Browse all available {category ? category.toLowerCase() : "items"} for
          rent
        </p>
      </div>

      {/* Filters and Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="sm:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your search results with these filters.
                </SheetDescription>
              </SheetHeader>

              <div className="py-4 space-y-6">
                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-1">
                    <Slider
                      min={
                        listings.length
                          ? Math.min(...listings.map((l) => l.price))
                          : 0
                      }
                      max={
                        listings.length
                          ? Math.max(...listings.map((l) => l.price))
                          : 5000
                      }
                      step={100}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceRangeChange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Location Filter */}
                <div>
                  <h3 className="font-medium mb-3">Location</h3>
                  <div className="space-y-2">
                    {availableLocations.map((location) => (
                      <div
                        key={location}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`location-${location}`}
                          checked={locationFilter.includes(location)}
                          onCheckedChange={() => toggleLocationFilter(location)}
                        />
                        <Label
                          htmlFor={`location-${location}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter>
                <Button variant="outline" onClick={resetFilters}>
                  Reset All
                </Button>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-8"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                Sort By
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSortOption("recommended")}
                className={
                  sortOption === "recommended" ? "bg-accent text-accent-foreground" : ""
                }
              >
                Recommended
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOption("price-low-high")}
                className={
                  sortOption === "price-low-high" ? "bg-accent text-accent-foreground" : ""
                }
              >
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOption("price-high-low")}
                className={
                  sortOption === "price-high-low" ? "bg-accent text-accent-foreground" : ""
                }
              >
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOption("rating")}
                className={
                  sortOption === "rating" ? "bg-accent text-accent-foreground" : ""
                }
              >
                Highest Rated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* View Toggle and Active Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Active Filters */}
          <div className="flex gap-2 flex-wrap">
            {locationFilter.length > 0 &&
              locationFilter.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {location}
                  <XCircle
                    className="h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLocationFilter(location);
                    }}
                  />
                </Badge>
              ))}
            {(searchTerm || locationFilter.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={resetFilters}
              >
                Reset All
              </Button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex border rounded-md overflow-hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none border-0"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Grid View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none border-0"
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>List View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Desktop Filters Panel */}
      <div className="hidden md:block mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
            <CardDescription>
              Refine your search results with these filters
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Price Range Filter */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-1">
                <Slider
                  min={
                    listings.length
                      ? Math.min(...listings.map((l) => l.price))
                      : 0
                  }
                  max={
                    listings.length
                      ? Math.max(...listings.map((l) => l.price))
                      : 5000
                  }
                  step={100}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceRangeChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <h3 className="font-medium mb-3">Location</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {availableLocations.slice(0, 6).map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-desktop-${location}`}
                      checked={locationFilter.includes(location)}
                      onCheckedChange={() => toggleLocationFilter(location)}
                    />
                    <Label
                      htmlFor={`location-desktop-${location}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a sort option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetFilters}>
              Reset All
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Showing {filteredListings.length} results
          {category ? ` in ${capitalizeFirstLetter(category)}` : ""}
        </div>
        {filteredListings.length === 0 && !loading && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <Info className="h-4 w-4 mr-1" />
                  Why no results?
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px]">
                <p>
                  No items match your current filters. Try adjusting your price
                  range, removing location filters, or clearing your search
                  term.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <CardHeader className="p-4 pb-2">
                <div className="h-6 bg-gray-200 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/2"></div>
              </CardHeader>
              <CardContent className="p-4 pt-0 pb-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-3/4"></div>
              </CardContent>
              <CardFooter className="p-4 pt-1 flex justify-between items-center">
                <div className="h-6 bg-gray-200 animate-pulse rounded-md w-1/4"></div>
                <div className="h-8 bg-gray-200 animate-pulse rounded-md w-1/3"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredListings.length === 0 ? (
        // No Results
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            We couldn't find any items matching your current filters. Try
            adjusting your search criteria or browse all items.
          </p>
          <Button onClick={resetFilters}>Clear All Filters</Button>
        </div>
      ) : (
        // Results Display
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => renderGridItem(listing))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((listing) => renderListItem(listing))}
          </div>
        )
      )}
    </Container>
  );
};

export default CategoryPage;
