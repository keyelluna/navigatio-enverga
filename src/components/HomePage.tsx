import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Search, Menu, Droplet, Trash2, AlertCircle, Accessibility, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import imgImage1 from "figma:asset/e30c10d7f9b16dd75f0275ed8191330fefa3bd8d.png";
import MobileCampusMap from './MobileCampusMap';
import HamburgerMenu from './HamburgerMenu';
import LostFoundModal from './LostFoundModal';
import FacilityDetailModal from './FacilityDetailModal';
import { Toaster } from './ui/sonner';
import { facilitiesData, type FacilityData } from '../data/facilitiesData';

interface HomePageProps {
  userType: 'visitor' | 'student' | 'faculty' | null;
  onLogout: () => void;
}

// Mock building data for search - merged with facilities
const buildings = facilitiesData.map(facility => ({
  id: facility.id,
  name: facility.name,
  location: facility.location,
  description: facility.description,
  facility: facility
}));

export default function HomePage({ userType, onLogout }: HomePageProps) {
  const [showHamburger, setShowHamburger] = useState(false);
  const [showLostFound, setShowLostFound] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<FacilityData | null>(null);
  const [highlightMode, setHighlightMode] = useState<'none' | 'water' | 'trash' | 'accessibility'>('none');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof buildings>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const toggleHighlight = (mode: 'water' | 'trash' | 'accessibility') => {
    setHighlightMode(prev => prev === mode ? 'none' : mode);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    const results = buildings.filter(building =>
      building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  const handleFacilityClick = (facility: FacilityData) => {
    setSelectedFacility(facility);
  };

  const handleBuildingCardClick = (facility: FacilityData) => {
    setSelectedFacility(facility);
    setShowSearchResults(false);
    setShowAllFacilities(false);
  };

  return (
    <div className="bg-white relative w-full min-h-screen">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-[maroon] text-white py-3 sm:py-4 px-3 sm:px-4 md:px-8 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <img src={imgImage1} alt="Logo" className="size-10 sm:size-12 md:size-14" />
            <div>
              <h1 className="font-lilita text-[16px] sm:text-[20px] md:text-[24px]">Campus Navigator</h1>
              <p className="text-[10px] sm:text-xs md:text-sm opacity-80 hidden sm:block">Find your way around campus</p>
            </div>
          </div>
          <button 
            onClick={() => setShowHamburger(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu className="size-5 sm:size-6" />
          </button>
        </div>
      </header>

      {/* Hamburger Menu */}
      <HamburgerMenu
        isOpen={showHamburger}
        onClose={() => setShowHamburger(false)}
        userType={userType}
        onLogout={onLogout}
      />

      {/* Lost & Found Modal */}
      <LostFoundModal
        isOpen={showLostFound}
        onClose={() => setShowLostFound(false)}
        userType={userType}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-[#780302] mb-2 font-lilita text-[28px] md:text-[36px]">
            Welcome to Campus Navigator
          </h2>
          <p className="text-gray-600">
            Navigate through the university with ease. Search for buildings, rooms, and facilities.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8 bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] p-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for buildings, rooms, or facilities..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-[#780302] hover:bg-[#5a0201] h-12 px-6"
            >
              Search
            </Button>
          </div>

          {/* Search Results */}
          {showSearchResults && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#780302]">Search Results ({searchResults.length})</h3>
                <button
                  onClick={() => setShowSearchResults(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Clear
                </button>
              </div>
              {searchResults.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No buildings found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchResults.map((building) => (
                    <div
                      key={building.id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => handleBuildingCardClick(building.facility)}
                    >
                      <h4 className="text-[#780302] mb-1">{building.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{building.location}</p>
                      <p className="text-xs text-gray-500">{building.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feature Buttons */}
        <div className="mb-8">
          <h3 className="text-[#780302] mb-4 font-lilita text-[20px]">
            Map Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={() => toggleHighlight('water')}
              className={`flex flex-col items-center gap-2 h-auto py-4 transition-all ${
                highlightMode === 'water' 
                  ? 'bg-[#4697ba] text-white border-2 border-[#4697ba]' 
                  : 'bg-white text-[#4697ba] border-2 border-[#4697ba] hover:bg-[#4697ba] hover:text-white'
              }`}
            >
              <Droplet className="size-6" />
              <span className="text-sm">Water Stations</span>
            </Button>

            <Button
              onClick={() => toggleHighlight('trash')}
              className={`flex flex-col items-center gap-2 h-auto py-4 transition-all ${
                highlightMode === 'trash' 
                  ? 'bg-[#22c55e] text-white border-2 border-[#22c55e]' 
                  : 'bg-white text-[#22c55e] border-2 border-[#22c55e] hover:bg-[#22c55e] hover:text-white'
              }`}
            >
              <Trash2 className="size-6" />
              <span className="text-sm">Trash Bins</span>
            </Button>

            <Button
              onClick={() => setShowLostFound(true)}
              className="flex flex-col items-center gap-2 h-auto py-4 bg-white text-[#f59e0b] border-2 border-[#f59e0b] hover:bg-[#f59e0b] hover:text-white transition-all"
            >
              <AlertCircle className="size-6" />
              <span className="text-sm">Lost & Found</span>
            </Button>

            <Button
              onClick={() => toggleHighlight('accessibility')}
              className={`flex flex-col items-center gap-2 h-auto py-4 transition-all ${
                highlightMode === 'accessibility' 
                  ? 'bg-[#8b5cf6] text-white border-2 border-[#8b5cf6]' 
                  : 'bg-white text-[#8b5cf6] border-2 border-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white'
              }`}
            >
              <Accessibility className="size-6" />
              <span className="text-sm">Accessibility</span>
            </Button>
          </div>
        </div>

        {/* Campus Map - Much Larger */}
        <div className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] overflow-hidden mb-8">
          <div className="h-[70vh] min-h-[500px] md:h-[600px]">
            <MobileCampusMap highlightMode={highlightMode} onFacilityClick={handleFacilityClick} />
          </div>
        </div>

        {/* View All Facilities Button */}
        <div className="mb-8 text-center">
          <Button
            onClick={() => setShowAllFacilities(!showAllFacilities)}
            className="bg-[#780302] hover:bg-[#5a0201] text-white px-8 py-6 h-auto"
          >
            <MapPin className="size-5 mr-2" />
            {showAllFacilities ? 'Hide All Facilities' : 'View All Facilities'}
          </Button>
        </div>

        {/* All Facilities Grid */}
        {showAllFacilities && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-white rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] p-6">
              <h3 className="text-[#780302] mb-6 font-lilita text-[24px]">
                Campus Facilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {facilitiesData.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleBuildingCardClick(facility)}
                  >
                    <div className="h-32 bg-gray-200 overflow-hidden">
                      <img
                        src={facility.image}
                        alt={facility.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-[#780302] mb-1">{facility.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{facility.location}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{facility.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Facility Detail Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <FacilityDetailModal
            facility={selectedFacility}
            onClose={() => setSelectedFacility(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[maroon] text-white py-6 px-4 md:px-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="opacity-80">© 2025 University Campus Navigator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}