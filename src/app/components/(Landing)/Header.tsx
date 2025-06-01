"use client"

import { Flower, Github } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import SortDropdown from '../marketplace/SortDropdown';

// Dynamically import the TopAlert component
const TopAlert = dynamic(() => import('./TopAlert'), { ssr: false });
// Dynamically import the WalletConnect component
const WalletConnect = dynamic(() => import('./WalletConnect'), { ssr: false });

const Header = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc' | 'volume-desc'>('recent');

  const handleAlert = (feature: string) => {
    setAlertMessage(``);
    setTimeout(() => {
      setAlertMessage(null); // Hide alert after 3 seconds
    }, 3000); // You can adjust this timeout duration
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[1400px]">

        <div className="flex justify-between border-2 border-gray-900 rounded-full py-5 mt-5 px-10 w-max mx-auto text-white">
          {/* Top Alert */}
          <div className="flex w-max items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2">
                <Flower className="text-white" />
                <h1 className="text-xl font-bold">CarbonX</h1>
              </div>
            </Link>

            {/* Navigation Items */}
            <div className="flex gap-10 px-20">
              <Link href="/register">
                <h1
                  className="text-xl font-bold cursor-pointer"
                  onMouseEnter={() => handleAlert('Register Org')}
                >
                  Enroll Orgs
                </h1>
              </Link>
              <Link href="/marketplace">
                <h1 className="text-xl font-bold cursor-pointer">
                  Explore NFTs
                </h1>
              </Link>
              <Link href="#features">
                <h1
                  className="text-xl font-bold cursor-pointer"
                  onMouseEnter={() => handleAlert('Register Org')}
                >
                  How it works
                </h1>
              </Link>
            </div>

            {/* Connect Button */}
            <div className="flex items-center gap-2">
              <WalletConnect />
            </div>
          </div>
          {alertMessage && <TopAlert message={alertMessage} />}
        </div>
      </div>
    
    </div>
  );
};

export default Header;
