'use client';

import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/health`);
      if (response.ok) {
        const data = await response.json();
        setApiStatus(data.message || 'API is healthy');
      } else {
        setApiStatus('API is not responding');
      }
    } catch (error) {
      setApiStatus('Unable to connect to API');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      <main className="flex flex-col gap-8 items-center max-w-4xl">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to Grimoire Collective
        </h1>
        
        <p className="text-xl text-center opacity-80">
          A mystical collection of knowledge and wisdom
        </p>

        <Card className="max-w-md w-full">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md font-semibold">Backend API Status</p>
            </div>
          </CardHeader>
          <CardBody>
            <p className={isLoading ? 'text-gray-500' : 'text-success'}>
              {apiStatus}
            </p>
            <Button 
              color="primary" 
              className="mt-4"
              onClick={checkApiHealth}
              isLoading={isLoading}
            >
              Check API Health
            </Button>
          </CardBody>
        </Card>

        <div className="flex gap-4 flex-wrap justify-center">
          <Button color="secondary" variant="bordered">
            Explore Grimoires
          </Button>
          <Button color="primary">
            Get Started
          </Button>
        </div>
      </main>

      <footer className="text-sm opacity-60">
        Built with Next.js, TypeScript, and Hero UI
      </footer>
    </div>
  );
}
