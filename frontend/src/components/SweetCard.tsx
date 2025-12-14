import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sweetsAPI } from '@/api/axios';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
}

interface SweetCardProps {
  sweet: Sweet;
  onPurchaseSuccess?: () => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onPurchaseSuccess }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      await sweetsAPI.purchase(sweet._id);
      toast({
        title: 'Purchase Successful! 🎉',
        description: `You bought ${sweet.name}`,
      });
      onPurchaseSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Purchase Failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const isOutOfStock = sweet.quantity === 0;

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
              {sweet.name}
            </h3>
            <Badge variant="secondary" className="mt-1">
              {sweet.category}
            </Badge>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-primary">
              ${sweet.price.toFixed(2)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative pb-2">
        {sweet.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {sweet.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className={`text-sm font-medium ${isOutOfStock ? 'text-destructive' : 'text-muted-foreground'}`}>
            {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} in stock`}
          </span>
        </div>
      </CardContent>

      <CardFooter className="relative pt-2">
        <Button
          onClick={handlePurchase}
          disabled={isOutOfStock || isPurchasing}
          className="w-full gap-2"
          variant={isOutOfStock ? 'secondary' : 'default'}
        >
          {isPurchasing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              {isOutOfStock ? 'Out of Stock' : 'Purchase'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SweetCard;
