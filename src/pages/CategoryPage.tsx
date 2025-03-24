import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { getAllListings } from "@/services/listingService";
import ListingCard from "@/components/ListingCard";

interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const allListings = await getAllListings();
        const categoryListings = allListings.filter(
          (listing) => listing.category.toLowerCase() === category?.toLowerCase()
        );
        setListings(categoryListings);
        setFilteredListings(categoryListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [category]);

  useEffect(() => {
    // Apply search query filter
    let searchedListings = listings.filter((listing) =>
      listing.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply price range filter
    let priceFilteredListings = searchedListings.filter(
      (listing) => listing.price >= priceRange[0] && listing.price <= priceRange[1]
    );

    setFilteredListings(priceFilteredListings);
  }, [searchQuery, priceRange, listings]);

  return (
    <Container className="py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold capitalize">{category}</h1>

        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter Listings</DialogTitle>
                <DialogDescription>
                  Adjust the price range to find listings that fit your budget.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price Range</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="price-min"
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-24"
                    />
                    <span>-</span>
                    <Input
                      id="price-max"
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-24"
                    />
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setPriceRange(value)}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </Container>
  );
};

export default CategoryPage;
