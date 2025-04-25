
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: string[];
}

export const SearchBar = ({ onSearch, suggestions }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for doctors..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            onSearch(e.target.value);
          }}
          className="pl-10 w-full"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              className={cn(
                "w-full text-left px-4 py-2 hover:bg-gray-100",
                index !== suggestions.length - 1 && "border-b border-gray-100"
              )}
              onClick={() => handleSearch(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

