'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface SearchWithSuggestionsProps {
  products: Product[];
  onSearch: (term: string) => void;
  className?: string;
}

const SearchWithSuggestions = ({ products, onSearch, className = '' }: SearchWithSuggestionsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm, products]);

  const handleSearch = () => {
    onSearch(searchTerm);
    setIsOpen(false);
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchTerm(product.title);
    onSearch(product.title);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="pr-10"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0"
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          {suggestions.map((product) => (
            <div
              key={product.id}
              className="p-2 hover:bg-muted cursor-pointer flex items-center space-x-2"
              onClick={() => handleSuggestionClick(product)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-8 h-8 object-contain"
              />
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{product.title}</p>
                <p className="text-sm text-muted-foreground">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchWithSuggestions;