import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUpDown, TrendingUp, TrendingDown, Clock, Sparkles } from 'lucide-react';

type SortOption = 'recent' | 'price-asc' | 'price-desc' | 'volume-desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions = [
  { 
    value: 'recent', 
    label: 'Recently Listed', 
    icon: Sparkles,
    description: 'Latest NFTs added to the marketplace',
    color: 'from-purple-500/20 to-blue-500/20'
  },
  { 
    value: 'price-asc', 
    label: 'Price: Low to High', 
    icon: TrendingUp,
    description: 'Sort by lowest price first',
    color: 'from-green-500/20 to-emerald-500/20'
  },
  { 
    value: 'price-desc', 
    label: 'Price: High to Low', 
    icon: TrendingDown,
    description: 'Sort by highest price first',
    color: 'from-red-500/20 to-orange-500/20'
  },
  { 
    value: 'volume-desc', 
    label: 'Volume: High to Low', 
    icon: ArrowUpDown,
    description: 'Sort by trading volume',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find(option => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 rounded-xl bg-black/40 px-4 py-2.5 text-white hover:bg-black/60 transition-all duration-200 border border-gray-800"
      >
        {selectedOption && (
          <>
            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${selectedOption.color}`}>
              <selectedOption.icon className="w-4 h-4" />
            </div>
            <span className="font-medium">{selectedOption.label}</span>
          </>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-black/95 border border-gray-800 shadow-xl z-50 overflow-hidden">
          <div className="p-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value as SortOption);
                  setIsOpen(false);
                }}
                className={`w-full rounded-lg p-3 transition-all duration-200
                  ${value === option.value 
                    ? 'bg-gradient-to-br ' + option.color + ' text-white' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${value === option.value ? 'bg-white/10' : 'bg-black/40'}`}>
                    <option.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-400">{option.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 