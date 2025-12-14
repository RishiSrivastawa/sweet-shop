import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Candy, ShoppingBag, Shield, Sparkles } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-accent/10" />
        
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Handcrafted with love
            </div>
            
            <h1 className="font-display text-5xl font-bold tracking-tight text-foreground md:text-7xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Sweet Shop
              <span className="block text-primary">Management</span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground md:text-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
              Discover our delicious collection of handcrafted sweets, candies, and treats. 
              From classic chocolates to artisan confections.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: '300ms' }}>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2 text-lg px-8">
                    <ShoppingBag className="h-5 w-5" />
                    Browse Sweets
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="gap-2 text-lg px-8">
                      <Candy className="h-5 w-5" />
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="text-lg px-8">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-muted-foreground">
              A complete system for managing your sweet shop inventory
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: ShoppingBag,
                title: 'Easy Purchasing',
                description: 'Browse and purchase sweets with a simple, intuitive interface',
              },
              {
                icon: Shield,
                title: 'Admin Controls',
                description: 'Full inventory management for administrators',
              },
              {
                icon: Candy,
                title: 'Live Stock Updates',
                description: 'Real-time inventory tracking and restock alerts',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border/50 bg-card p-8 shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-12 text-center shadow-sweet md:p-16">
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                Ready to explore?
              </h2>
              <p className="mt-4 text-primary-foreground/80 text-lg">
                Join us and discover a world of sweet delights
              </p>
              <div className="mt-8">
                <Link to={isAuthenticated ? '/dashboard' : '/register'}>
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    {isAuthenticated ? 'Go to Dashboard' : 'Create Account'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Sweet Shop. Made with 🍬 and love by Rishi Srivastawa.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
