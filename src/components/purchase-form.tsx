'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { CartItem } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  contactInfo: z.string().min(5, { message: 'Please enter a valid email or phone number.' })
    .refine(value => {
      const emailRegex = /\S+@\S+\.\S+/;
      const phoneRegex = /^\+?[1-9]\d{7,14}$/; 
      return emailRegex.test(value) || phoneRegex.test(value.replace(/\s|-|\(|\)/g, ''));
    }, {
      message: "Must be a valid email (e.g., user@example.com) or phone number (e.g., +12223334444)."
    }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PurchaseFormProps {
  cartItems: CartItem[];
  onOrderSuccess: () => void;
  totalPrice: number;
}

export function PurchaseForm({ cartItems, onOrderSuccess, totalPrice }: PurchaseFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contactInfo: '',
      notes: '',
    },
  });
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (cartItems.length === 0) {
      toast({
        title: 'Empty Cart',
        description: 'Please add items to your cart before placing an order.',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form Data:', data);
    console.log('Cart Items:', cartItems);

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    toast({
      title: 'Order Placed! 🍞',
      description: `Thank you, ${data.name}! We've received your order for ${itemCount} item(s). We'll contact you at ${data.contactInfo} for pickup details.`,
      variant: 'default',
      duration: 8000,
    });
    form.reset();
    onOrderSuccess(); // Clear the cart
    setIsSubmitting(false);
  };

  return (
    <section id="order" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">
            Complete Your Order
          </h2>
          <p className="mt-4 text-lg text-foreground max-w-xl mx-auto">
            Enter your details below to finalize your pickup order.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-8 bg-background p-8 sm:p-10 rounded-lg shadow-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium font-headline">Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="mt-2 h-12 text-base" placeholder="e.g. Jane Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium font-headline">Email or Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="mt-2 h-12 text-base" placeholder="e.g. email@example.com or +15551234567" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium font-headline">Optional Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="mt-2 text-base min-h-[100px]" placeholder="Any special requests or pickup considerations?" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center">
              <p className="text-2xl font-headline font-bold text-primary mb-4">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full font-headline text-xl h-14" 
                disabled={isSubmitting || cartItems.length === 0}
              >
                {isSubmitting ? 'Placing Order...' : (cartItems.length === 0 ? 'Cart is Empty' : `Pay $${totalPrice.toFixed(2)} & Place Order`)}
              </Button>
              {cartItems.length > 0 && (
                <p className="text-xs text-muted-foreground mt-3">
                  Payment processing is simulated. We will contact you to arrange pickup.
                </p>
              )}
               {cartItems.length === 0 && (
                <p className="text-xs text-muted-foreground mt-3">
                  Please add items to your cart from the "Our Daily Bakes" section.
                </p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
