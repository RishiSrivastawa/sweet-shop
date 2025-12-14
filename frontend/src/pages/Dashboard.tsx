import { useState, useEffect, useCallback } from 'react';
import { sweetsAPI } from '@/api/axios';
import SweetCard from '@/components/SweetCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, SlidersHorizontal, X, Candy } from 'lucide-react';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
}

const Dashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  const categories = ['Chocolate', 'Candy', 'Cake', 'Cookie', 'Ice Cream', 'Pastry', 'Other'];

  const fetchSweets = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: any = {};
      if (searchName) params.name = searchName;
      if (category && category !== 'all') params.category = category;
      if (minPrice) params.minPrice = parseFloat(minPrice);
      if (maxPrice) params.maxPrice = parseFloat(maxPrice);

      const hasFilters = Object.keys(params).length > 0;
      const response = hasFilters
        ? await sweetsAPI.search(params)
        : await sweetsAPI.getAll();
      
      setSweets(response.data.sweets || response.data);
    } catch (error: any) {
      toast({
        title: 'Error Loading Sweets',
        description: error.response?.data?.message || 'Failed to load sweets',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchName, category, minPrice, maxPrice, toast]);

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  const clearFilters = () => {
    setSearchName('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  const hasActiveFilters = searchName || category || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Our Sweet Collection
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover handcrafted treats made with love
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4 animate-slide-in">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search sweets..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  Active
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border/50 bg-card p-4 animate-scale-in">
              <div className="min-w-[150px] flex-1">
                <label className="mb-1.5 block text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-[100px]">
                <label className="mb-1.5 block text-sm font-medium">Min Price</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="min-w-[100px]">
                <label className="mb-1.5 block text-sm font-medium">Max Price</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSpinner size="lg" text="Loading delicious treats..." />
        ) : sweets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Candy className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold">No sweets found</h3>
            <p className="mt-1 text-muted-foreground">
              {hasActiveFilters
                ? 'Try adjusting your filters'
                : 'Check back soon for new treats!'}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sweets.map((sweet, index) => (
              <div
                key={sweet._id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <SweetCard sweet={sweet} onPurchaseSuccess={fetchSweets} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
