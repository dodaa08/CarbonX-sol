'use client';

import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import NFTCard from '../components/marketplace/NFTCard';
import { mockNFTs } from './mockData';

type SortOption = 'price-asc' | 'price-desc' | 'volume-desc' | 'recent';

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  

  const collections = useMemo(() => ['all', ...new Set(mockNFTs.map(nft => nft.collection))], []);

  const filteredNFTs = useMemo(() => {
    return mockNFTs
      .filter(nft => {
        const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            nft.collection.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCollection = selectedCollection === 'all' || nft.collection === selectedCollection;
        const matchesPrice = nft.price >= priceRange[0] && nft.price <= priceRange[1];
        return matchesSearch && matchesCollection && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'volume-desc':
            return (b.volume24h || 0) - (a.volume24h || 0);
          default:
            return 0;
        }
      });
  }, [searchQuery, selectedCollection, priceRange, sortBy]);

  const totalVolume = useMemo(() => 
    filteredNFTs.reduce((sum, nft) => sum + (nft.volume24h || 0), 0),
    [filteredNFTs]
  );

  return (
    <div className="min-h-screen bg-black/95 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className='py-2 mb-5'>
          <h1 className="font-medium text-gray-300 block mb-2  text-xl">
            *A early staged version of the platform, UI is not final yet.
          </h1>
        </div>

        {/* Header */}
        {/* <div className="mb-8">
          <h1 className="text-4xl font-bold">CarbonX Marketplace</h1>
          <p className="mt-2 text-gray-400">Discover and support environmental initiatives through NFTs</p>
        </div> */}

        {/* Search and Filters Bar */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 " />
            <input
              type="text"
              placeholder="Search NFTs or collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-black/40 px-10 py-4 text-white placeholder-gray-400 focus:outline-none border-2 border-gray-900"
            />
          </div>
          
          {/* <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg bg-black/40 px-4 py-2 text-white hover:bg-black/60"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button> */}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-xl bg-black px-4 py-2 text-white focus:outline-none focus:ring-blue-800 transition-all duration-2000 font-bold cursor-pointer"
          >
            <option value="recent">Recently Listed</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="volume-desc">Volume: High to Low</option>
          </select>
        </div>

        {/* Stats Bar */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-black/40 p-4">
            <p className="text-sm text-gray-400">Total Volume (24h)</p>
            <p className="text-2xl font-bold">{totalVolume.toFixed(2)} SOL</p>
          </div>
          <div className="rounded-lg bg-black/40 p-4">
            <p className="text-sm text-gray-400">Floor Price</p>
            <p className="text-2xl font-bold">
              {Math.min(...filteredNFTs.map(nft => nft.floorPrice || Infinity)).toFixed(2)} SOL
            </p>
          </div>
          <div className="rounded-lg bg-black/40 p-4">
            <p className="text-sm text-gray-400">Items Listed</p>
            <p className="text-2xl font-bold">{filteredNFTs.length}</p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
         
            <div className="w-64 flex-shrink-0">
              <div className="rounded-lg bg-black/40 p-4">
                <h2 className="mb-4 text-lg font-semibold">Collections</h2>
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <button
                      key={collection}
                      onClick={() => setSelectedCollection(collection)}
                      className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${
                        selectedCollection === collection
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-black/60 hover:text-white'
                      }`}
                    >
                      {collection === 'all' ? 'All Collections' : collection}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <h2 className="mb-4 text-lg font-semibold">Price Range (SOL)</h2>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{priceRange[0]} SOL</span>
                      <span>{priceRange[1]} SOL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          

          {/* NFT Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNFTs.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 