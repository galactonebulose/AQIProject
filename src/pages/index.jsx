"use client";
import { useState } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
//import { Button } from '@/components/ui/button';
import LoginPage from '@/components/LoginPage';
import { toast } from 'sonner';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Hardcoded authentication logic
    if (username === 'Aaryan' && password === 'abcd') {
      toast.success("Successfully logged in");
      setIsLoggedIn(true);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      {!isLoggedIn ? (
        // Show Login Page if not logged in
        <LoginPage onLogin={handleLogin} />
      ) : (
        // Show Main Page after successful login
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-6 text-center">India Air Quality Index</h1>
          <p className="text-xl mb-8 text-center max-w-xl">
            Explore real-time air quality and weather information for cities across India.
          </p>

          <Link href="/map">
            <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
              <MapPin className="mr-2 group-hover:animate-pulse" />
              Explore Map
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
