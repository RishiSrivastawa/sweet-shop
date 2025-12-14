import { useState, useEffect, useCallback } from 'react';
import { sweetsAPI } from '@/api/axios';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Package, Loader2, Candy, AlertTriangle } from 'lucide-react';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
}

interface SweetFormData {
  name: string;
  category: string;
  price: string;
  quantity: string;
  description: string;
}

const initialFormData: SweetFormData = {
  name: '',
  category: '',
  price: '',
  quantity: '',
  description: '',
};

const categories = ['Chocolate', 'Candy', 'Cake', 'Cookie', 'Ice Cream', 'Pastry', 'Other'];

const Admin = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<SweetFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restockId, setRestockId] = useState<string | null>(null);
  const [restockQuantity, setRestockQuantity] = useState('');
  const [isRestocking, setIsRestocking] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const fetchSweets = useCallback(async () => {
    try {
      const response = await sweetsAPI.getAll();
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
  }, [toast]);

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      description: formData.description || undefined,
    };

    try {
      if (editingId) {
        await sweetsAPI.update(editingId, payload);
        toast({ title: 'Sweet Updated', description: `${formData.name} has been updated` });
      } else {
        await sweetsAPI.create(payload);
        toast({ title: 'Sweet Created', description: `${formData.name} has been added` });
      }
      setFormData(initialFormData);
      setEditingId(null);
      setDialogOpen(false);
      fetchSweets();
    } catch (error: any) {
      toast({
        title: editingId ? 'Update Failed' : 'Create Failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (sweet: Sweet) => {
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
      description: sweet.description || '',
    });
    setEditingId(sweet._id);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await sweetsAPI.delete(deleteId);
      toast({ title: 'Sweet Deleted', description: 'The sweet has been removed' });
      setDeleteId(null);
      fetchSweets();
    } catch (error: any) {
      toast({
        title: 'Delete Failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRestock = async () => {
    if (!restockId || !restockQuantity) return;
    setIsRestocking(true);
    try {
      await sweetsAPI.restock(restockId, parseInt(restockQuantity));
      toast({ title: 'Restocked', description: `Added ${restockQuantity} units to stock` });
      setRestockId(null);
      setRestockQuantity('');
      fetchSweets();
    } catch (error: any) {
      toast({
        title: 'Restock Failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsRestocking(false);
    }
  };

  const openAddDialog = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setDialogOpen(true);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
            <h2 className="mt-4 font-display text-xl font-semibold">Access Denied</h2>
            <p className="mt-2 text-muted-foreground">
              You need admin privileges to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="mt-1 text-muted-foreground">Manage your sweet inventory</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Sweet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingId ? 'Edit Sweet' : 'Add New Sweet'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="0"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editingId ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>{editingId ? 'Update' : 'Create'}</>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        {isLoading ? (
          <LoadingSpinner size="lg" text="Loading inventory..." />
        ) : sweets.length === 0 ? (
          <Card className="animate-fade-in">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Candy className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold">No sweets yet</h3>
              <p className="mt-1 text-muted-foreground">Add your first sweet to get started</p>
              <Button onClick={openAddDialog} className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Add Sweet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="animate-fade-in overflow-hidden">
            <CardHeader>
              <CardTitle className="font-display">Inventory ({sweets.length} items)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sweets.map((sweet) => (
                      <TableRow key={sweet._id}>
                        <TableCell className="font-medium">{sweet.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{sweet.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right">${sweet.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              sweet.quantity === 0
                                ? 'text-destructive font-medium'
                                : sweet.quantity < 10
                                ? 'text-sweet-caramel font-medium'
                                : ''
                            }
                          >
                            {sweet.quantity}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Dialog
                              open={restockId === sweet._id}
                              onOpenChange={(open) => !open && setRestockId(null)}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setRestockId(sweet._id)}
                                >
                                  <Package className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-xs">
                                <DialogHeader>
                                  <DialogTitle>Restock {sweet.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Quantity to add</Label>
                                    <Input
                                      type="number"
                                      min="1"
                                      value={restockQuantity}
                                      onChange={(e) => setRestockQuantity(e.target.value)}
                                      placeholder="Enter quantity"
                                    />
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      onClick={() => setRestockId(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={handleRestock}
                                      disabled={!restockQuantity || isRestocking}
                                    >
                                      {isRestocking ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        'Restock'
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(sweet)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <Dialog
                              open={deleteId === sweet._id}
                              onOpenChange={(open) => !open && setDeleteId(null)}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setDeleteId(sweet._id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-xs">
                                <DialogHeader>
                                  <DialogTitle>Delete Sweet</DialogTitle>
                                </DialogHeader>
                                <p className="text-muted-foreground">
                                  Are you sure you want to delete "{sweet.name}"? This action
                                  cannot be undone.
                                </p>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => setDeleteId(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                  >
                                    {isDeleting ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      'Delete'
                                    )}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
