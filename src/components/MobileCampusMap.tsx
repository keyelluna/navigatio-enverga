import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, Droplet, Trash2, Accessibility, MapPin } from 'lucide-react';
import campusMapBase from '../assets/campus-map-base.jpg';
import campusMapWater from '../assets/campus-map-water.jpg';
import campusMapTrash from '../assets/campus-map-trash.jpg';
import campusMapAccessibility from '../assets/campus-map-accessibility.jpg';

interface MobileCampusMapProps {
  highlightMode: 'none' | 'water' | 'trash' | 'accessibility';
  onFeatureSelect?: (feature: string) => void;
}

// Subtle reminder markers for clickable zones
const featureZones = {
  water: [
    { x: 20, y: 35, label: 'Library' },
    { x: 40, y: 45, label: 'Main Hall' },
    { x: 60, y: 30, label: 'Cafeteria' },
    { x: 75, y: 55, label: 'Gym' },
    { x: 50, y: 70, label: 'Science Building' }
  ],
  trash: [
    { x: 15, y: 30, label: 'Entrance' },
    { x: 35, y: 40, label: 'Courtyard' },
    { x: 55, y: 35, label: 'Plaza' },
    { x: 70, y: 50, label: 'Sports Area' },
    { x: 45, y: 65, label: 'Garden' }
  ],
  accessibility: [
    { x: 25, y: 40, label: 'Main Entrance' },
    { x: 45, y: 50, label: 'Admin Building' },
    { x: 65, y: 45, label: 'Student Center' },
    { x: 55, y: 75, label: 'Library Ramp' }
  ]
};

export default function MobileCampusMap({ highlightMode, onFeatureSelect }: MobileCampusMapProps) {
  const [zoom, setZoom] = useState(1.2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Get the appropriate map image based on highlight mode
  const getCurrentMapImage = useCallback(() => {
    switch (highlightMode) {
      case 'water':
        return campusMapWater;
      case 'trash':
        return campusMapTrash;
      case 'accessibility':
        return campusMapAccessibility;
      default:
        return campusMapBase;
    }
  }, [highlightMode]);

  // Get current feature zones - memoized
  const getCurrentZones = useMemo(() => {
    if (highlightMode === 'none') return [];
    return featureZones[highlightMode as keyof typeof featureZones] || [];
  }, [highlightMode]);

  // Get feature label and icon - memoized
  const featureInfo = useMemo(() => {
    switch (highlightMode) {
      case 'water':
        return { label: 'Water Stations', icon: Droplet, color: '#0ea5e9' };
      case 'trash':
        return { label: 'Trash Bins', icon: Trash2, color: '#22c55e' };
      case 'accessibility':
        return { label: 'Accessible Routes', icon: Accessibility, color: '#a855f7' };
      default:
        return { label: 'Campus Map', icon: MapPin, color: '#64748b' };
    }
  }, [highlightMode]);

  const FeatureIcon = featureInfo.icon;

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Reset position when highlight mode changes
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    positionRef.current = { x: 0, y: 0 };
    setIsMapLoaded(false);
  }, [highlightMode]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.3, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.3, 1));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1.2);
    setPosition({ x: 0, y: 0 });
    positionRef.current = { x: 0, y: 0 };
  }, []);

  const updatePosition = useCallback((newX: number, newY: number) => {
    // Calculate boundaries
    const maxX = (containerSize.width * (zoom - 1)) / 2;
    const maxY = (containerSize.height * (zoom - 1)) / 2;

    const constrainedX = Math.max(Math.min(newX, maxX), -maxX);
    const constrainedY = Math.max(Math.min(newY, maxY), -maxY);

    positionRef.current = { x: constrainedX, y: constrainedY };
    
    // Use CSS transform directly for better performance
    if (mapRef.current) {
      mapRef.current.style.transform = `scale(${zoom}) translate(${constrainedX / zoom}px, ${constrainedY / zoom}px)`;
    }
  }, [zoom, containerSize]);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    dragStartRef.current = {
      x: clientX - positionRef.current.x,
      y: clientY - positionRef.current.y
    };
  }, [zoom]);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newX = clientX - dragStartRef.current.x;
    const newY = clientY - dragStartRef.current.y;

    updatePosition(newX, newY);
  }, [isDragging, updatePosition]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      // Sync state with ref for next drag
      setPosition(positionRef.current);
    }
  }, [isDragging]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(1, Math.min(prev + delta, 3)));
  }, []);

  // Update transform when zoom changes
  useEffect(() => {
    if (mapRef.current && !isDragging) {
      mapRef.current.style.transform = `scale(${zoom}) translate(${positionRef.current.x / zoom}px, ${positionRef.current.y / zoom}px)`;
    }
  }, [zoom, isDragging]);

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden flex flex-col">
      {/* Fixed Header Label */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div 
              className="p-1.5 sm:p-2 rounded-full transition-colors"
              style={{ backgroundColor: `${featureInfo.color}15` }}
            >
              <FeatureIcon 
                className="size-4 sm:size-5" 
                style={{ color: featureInfo.color }}
              />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm sm:text-base">{featureInfo.label}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500">
                {highlightMode === 'none' 
                  ? 'Select a feature to view locations' 
                  : `${getCurrentZones.length} locations available`}
              </p>
            </div>
          </div>
          
          {/* Zoom indicator */}
          <div className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
            {Math.round(zoom * 100)}%
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={containerRef}
        className="flex-1 relative touch-pan-y touch-pan-x mt-12 sm:mt-16 mb-10 sm:mb-12"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            cursor: isDragging ? 'grabbing' : zoom > 1 ? 'grab' : 'default'
          }}
        >
          <div
            ref={mapRef}
            className="relative w-full h-full"
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              willChange: isDragging ? 'transform' : 'auto',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            {/* Map Image with smooth transition */}
            <AnimatePresence mode="wait">
              <img
                key={highlightMode}
                src={getCurrentMapImage()}
                alt="Campus Map"
                className={`w-full h-full object-contain select-none pointer-events-none transition-opacity duration-300 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}
                draggable={false}
                loading="eager"
                onLoad={() => setIsMapLoaded(true)}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Instructions overlay for first-time users */}
        {highlightMode === 'none' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in fade-in duration-500">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 max-w-xs mx-4 text-center">
              <MapPin className="size-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-700 mb-2">Explore the Campus</p>
              <p className="text-sm text-gray-500">
                Select a feature button below to view locations, or use zoom controls to explore
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Zoom Controls */}
      <div className="absolute right-4 bottom-20 z-20 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          aria-label="Zoom in"
        >
          <ZoomIn className="size-5 text-gray-700" />
        </button>
        
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          aria-label="Zoom out"
        >
          <ZoomOut className="size-5 text-gray-700" />
        </button>
        
        <button
          onClick={handleReset}
          className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 active:scale-95 transition-all"
          aria-label="Reset view"
        >
          <RotateCcw className="size-5 text-gray-700" />
        </button>
      </div>

      {/* Fixed Bottom Legend */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="px-4 py-3">
          {highlightMode !== 'none' ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="size-3 rounded-full"
                  style={{ backgroundColor: featureInfo.color }}
                />
                <span className="text-sm text-gray-700">
                  Active locations shown on map
                </span>
              </div>
              <span className="text-xs text-gray-500">
                Tap markers for details
              </span>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-500">
                {zoom > 1 ? 'Drag to pan • Pinch to zoom' : 'Pinch to zoom in • Select features above'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Accessibility announcements for screen readers */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {highlightMode !== 'none' && 
          `Now showing ${featureInfo.label}. ${getCurrentZones.length} locations available on map.`
        }
        {zoom !== 1.2 && `Map zoom level: ${Math.round(zoom * 100)} percent`}
      </div>
    </div>
  );
}