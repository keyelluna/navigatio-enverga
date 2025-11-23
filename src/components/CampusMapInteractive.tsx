import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import campusMapBase from 'figma:asset/c2edb7f8c1a5ab31b5f3f9415f03df7a8844591a.png';
import { facilitiesData, type FacilityData } from '../data/facilitiesData';

interface CampusMapInteractiveProps {
  highlightMode: 'none' | 'water' | 'trash' | 'accessibility';
  onFacilityClick: (facility: FacilityData) => void;
}

export default function CampusMapInteractive({ highlightMode, onFacilityClick }: CampusMapInteractiveProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMap, setCurrentMap] = useState(campusMapBase);
  const [zoom, setZoom] = useState(1); // Start at normal zoom, let users zoom in
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show loading animation when switching maps
    setIsLoading(true);
    
    // Simulate map loading time
    const timer = setTimeout(() => {
      // In a real implementation, you would switch to different map images here
      // For now, we'll use the same base map
      // You can add different map versions for each highlight mode:
      // const maps = {
      //   'none': campusMapBase,
      //   'water': campusMapWater,
      //   'trash': campusMapTrash,
      //   'accessibility': campusMapAccessibility
      // };
      // setCurrentMap(maps[highlightMode]);
      
      setCurrentMap(campusMapBase);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [highlightMode]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 1));
    if (zoom <= 1.2) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Get marker color based on highlight mode
  const getMarkerColor = (type: string) => {
    switch (highlightMode) {
      case 'water':
        return '#4697ba';
      case 'trash':
        return '#22c55e';
      case 'accessibility':
        return '#8b5cf6';
      default:
        return null;
    }
  };

  // Mock positions for markers - these would correspond to actual locations on your map
  const getMarkers = () => {
    const markers = [];
    const markerColor = getMarkerColor(highlightMode);
    
    if (!markerColor) return [];

    const getMarkerLabel = () => {
      switch (highlightMode) {
        case 'water':
          return 'Water Stations';
        case 'trash':
          return 'Trash Bins';
        case 'accessibility':
          return 'Accessibility';
        default:
          return '';
      }
    };

    const markerLabel = getMarkerLabel();

    // Define marker positions based on highlight mode
    // These are percentage-based positions on the map
    const positions = {
      water: [
        { x: 15, y: 30 },
        { x: 35, y: 45 },
        { x: 55, y: 35 },
        { x: 75, y: 50 },
        { x: 45, y: 65 },
        { x: 25, y: 70 },
        { x: 65, y: 25 },
        { x: 85, y: 40 }
      ],
      trash: [
        { x: 10, y: 25 },
        { x: 30, y: 40 },
        { x: 50, y: 30 },
        { x: 70, y: 45 },
        { x: 40, y: 60 },
        { x: 20, y: 75 },
        { x: 60, y: 20 },
        { x: 80, y: 55 },
        { x: 90, y: 35 }
      ],
      accessibility: [
        { x: 20, y: 35 },
        { x: 40, y: 50 },
        { x: 60, y: 40 },
        { x: 80, y: 60 },
        { x: 50, y: 70 },
        { x: 30, y: 25 }
      ]
    };

    const currentPositions = positions[highlightMode as keyof typeof positions] || [];

    return currentPositions.map((pos, idx) => (
      <motion.div
        key={`${highlightMode}-${idx}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: idx * 0.1 }}
        className="absolute"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 5
        }}
      >
        {/* Show label only for first marker */}
        {idx === 0 ? (
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg">
            <div 
              className="relative"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: markerColor,
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {/* Pulse ring */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: markerColor,
                  opacity: 0.5
                }}
              />
            </div>
            <span className="text-sm text-gray-700 whitespace-nowrap">{markerLabel}</span>
          </div>
        ) : (
          <div 
            className="relative"
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: markerColor,
              borderRadius: '50%',
              border: '3px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: markerColor,
                opacity: 0.5
              }}
            />
          </div>
        )}
      </motion.div>
    ));
  };

  return (
    <div className="relative w-full h-full min-h-[600px] lg:min-h-[700px] bg-[#f5d5c8] rounded-lg overflow-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="size-16 border-4 border-[#780302]/20 border-t-[#780302] rounded-full"
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-[#780302]"
            >
              Loading Campus Map...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-2">
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Zoom In"
        >
          <ZoomIn className="size-5 text-[#780302]" />
        </button>
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Zoom Out"
        >
          <ZoomOut className="size-5 text-[#780302]" />
        </button>
        <button
          onClick={handleResetZoom}
          disabled={zoom === 1}
          className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Reset Zoom"
        >
          <Maximize2 className="size-5 text-[#780302]" />
        </button>
        <div className="text-xs text-center text-gray-600 mt-1">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={containerRef}
        className={`w-full h-full overflow-hidden ${zoom > 1 ? 'cursor-move' : 'cursor-default'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Map Image with Markers */}
        <motion.div
          key={highlightMode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: zoom,
            x: position.x,
            y: position.y
          }}
          transition={{ duration: 0.3 }}
          className="w-full h-full relative"
          style={{
            transformOrigin: 'center center'
          }}
        >
          <img
            src={currentMap}
            alt="Campus Map"
            className="w-full h-full object-cover select-none"
            draggable={false}
          />

          {/* Highlight Mode Markers */}
          {getMarkers()}
        </motion.div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h4 className="text-[#780302] mb-2">Campus Map</h4>
        <p className="text-sm text-gray-600">
          {highlightMode === 'water' && 'Showing water stations across campus'}
          {highlightMode === 'trash' && 'Showing trash bin locations'}
          {highlightMode === 'accessibility' && 'Showing accessibility features'}
          {highlightMode === 'none' && 'Use the feature buttons above to highlight specific locations'}
        </p>
      </div>

      {/* Map Controls Info */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
        <p className="text-xs text-gray-600">
          {zoom > 1 
            ? 'Drag to pan • Scroll to zoom' 
            : 'Scroll or use + button to zoom in'
          }
        </p>
      </div>
    </div>
  );
}