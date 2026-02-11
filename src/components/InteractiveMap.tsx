"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { locations, Location } from "@/data/locations";
import { Phone, Mail, Globe, Building2, Factory, Users, ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

type FilterType = 'all' | 'headquarters' | 'manufacturing' | 'partner';

// Calculate distance
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Custom Marker with Pulse Animation and Brand Colors
const createCustomIcon = (types: Location['type'], isSelected: boolean) => {
    const brandOrange = '#FF6B35'; // Corporate
    const manufacturingBlack = '#1A1C1E'; // Manufacturing
    const partnerCharcoal = '#4B5563'; // Partner

    // Prioritize color: headquarters > manufacturing > partner
    const iconColor = types.includes('headquarters')
        ? brandOrange
        : types.includes('manufacturing')
            ? manufacturingBlack
            : partnerCharcoal;

    const size = isSelected ? 52 : 46;

    const svg = `
        <svg width="${size}" height="${size}" viewBox="0 0 38 46" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feOffset dx="0" dy="2" result="offsetBlur" />
                    <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
                </filter>
            </defs>
            
            <!-- Pulse Effect -->
            <circle cx="19" cy="40" r="6" fill="${iconColor}" opacity="0.15">
                <animate attributeName="r" from="4" to="12" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
            </circle>

            <!-- Marker Teardrop Body -->
            <path d="M19 42C19 42 34 29.5 34 16C34 7.71573 27.2843 1 19 1C10.7157 1 4 7.71573 4 16C4 29.5 19 42 19 42Z" 
                  fill="${iconColor}" 
                  stroke="white" 
                  stroke-width="2" 
                  filter="url(#shadow)" />
            
            <!-- Inner Circle -->
            <circle cx="19" cy="16" r="6" fill="white" />
            
            <!-- Bottom Point Alignment Shadow -->
            <circle cx="19" cy="42" r="2" fill="black" opacity="0.2" />
        </svg>
    `;

    return new Icon({
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
        className: 'transition-all duration-500 ease-out',
        iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
    });
};

function MapController({
    locations,
    selectedCountry
}: {
    locations: Location[],
    selectedCountry: string | null
}) {
    const map = useMap();

    useEffect(() => {
        if (selectedCountry && locations.length > 0) {
            const countryLocations = locations.filter(loc => loc.country === selectedCountry);
            if (countryLocations.length > 0) {
                const bounds: L.LatLngTuple[] = countryLocations.map(loc => [loc.coordinates[0], loc.coordinates[1]]);
                map.flyToBounds(bounds, {
                    padding: [100, 100],
                    duration: 1.5
                });
            }
        } else if (locations.length > 0) {
            const bounds: L.LatLngTuple[] = locations.map(loc => [loc.coordinates[0], loc.coordinates[1]]);
            map.flyToBounds(bounds, {
                padding: [100, 100],
                duration: 1.5
            });
        }
    }, [locations, selectedCountry, map]);

    return null;
}

// [NEW] Auto-Zoom Component that handles "Nearest Location" logic
function AutoZoomHandler({
    userLocation,
    locations,
    markerRefs
}: {
    userLocation: [number, number] | null,
    locations: Location[],
    markerRefs: React.MutableRefObject<{ [key: string]: L.Marker | null }>
}) {
    const map = useMap();
    const [hasZoomed, setHasZoomed] = useState(false);

    useEffect(() => {
        if (userLocation && locations.length > 0 && !hasZoomed) {
            // Find nearest location
            let nearest = locations[0];
            let minDist = Infinity;

            locations.forEach(loc => {
                const dist = calculateDistance(userLocation[0], userLocation[1], loc.coordinates[0], loc.coordinates[1]);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = loc;
                }
            });

            if (nearest) {
                // Fly to nearest with OFFSET (using padding)
                // This forces the marker to be in the bottom half of the screen
                // leaving room for the popup above it relative to the filters.
                const offsetPadding = window.innerWidth < 768 ? [0, 350] : [0, 100]; // Increased mobile top padding

                map.flyToBounds(L.latLngBounds([nearest.coordinates[0], nearest.coordinates[1]], [nearest.coordinates[0], nearest.coordinates[1]]), {
                    paddingTopLeft: offsetPadding as [number, number],
                    maxZoom: 11,
                    duration: 2
                });

                // Open Popup (needs slight delay for map to start moving)
                setTimeout(() => {
                    const marker = markerRefs.current[nearest.id];
                    if (marker) {
                        marker.openPopup();
                    }
                }, 1000);

                setHasZoomed(true);
            }
        }
    }, [userLocation, locations, map, hasZoomed, markerRefs]);

    return null;
}

export default function InteractiveMap() {
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // [NEW] Refs for programmatic access to markers
    const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const countries = useMemo(() => {
        const uniqueCountries = new Set(locations.map(loc => loc.country));
        return Array.from(uniqueCountries).sort();
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => setUserLocation([position.coords.latitude, position.coords.longitude]),
                (error) => console.log("Location access denied/failed:", error.message)
            );
        }
    }, []);

    const filteredLocations = useMemo(() => {
        return locations.filter(loc => {
            const matchesFilter = activeFilter === 'all' || loc.type.includes(activeFilter as any);
            const matchesCountry = !selectedCountry || loc.country === selectedCountry;
            return matchesFilter && matchesCountry;
        });
    }, [activeFilter, selectedCountry]);

    return (
        <div className="relative w-full">
            {/* Architectural Wrapper for Map & Overlays */}
            <div className="relative overflow-hidden bg-white rounded-3xl border border-black/5 shadow-2xl h-[500px] md:h-[700px] group">

                {/* PERSISTENT FILTERS: Positioned overlay on top of map tiles */}
                <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 z-[1000] flex flex-col md:flex-row gap-4 justify-between pointer-events-none">

                    {/* Filter Pills - Black & Brand Orange Aesthetic (Horizontal Scroll on Mobile) */}
                    <div className="flex gap-2 pointer-events-auto overflow-x-auto pb-2 md:pb-0 whitespace-nowrap scrollbar-hide">
                        {[
                            { type: 'all', label: 'All', icon: null },
                            { type: 'headquarters', label: 'Corporate Office', icon: <Building2 size={13} /> },
                            { type: 'manufacturing', label: 'Manufacturing Plants', icon: <Factory size={13} /> },
                            { type: 'partner', label: 'Partners', icon: <Users size={13} /> }
                        ].map((filter) => (
                            <button
                                key={filter.type}
                                onClick={() => setActiveFilter(filter.type as FilterType)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.1em] transition-all border flex-shrink-0 ${activeFilter === filter.type
                                    ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-[0_4px_15px_rgba(255,107,53,0.3)]'
                                    : 'bg-black text-white border-white/10 hover:border-[#FF6B35] shadow-lg'
                                    }`}
                            >
                                {filter.icon}
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Country Selector - Solid Dark Styling */}
                    <div className="md:w-60 pointer-events-auto relative group">
                        <select
                            className="w-full appearance-none bg-black border border-white/10 text-white py-2.5 px-5 pr-10 rounded-full text-[9px] font-black uppercase tracking-wider focus:outline-none focus:border-[#FF6B35] transition-all shadow-lg hover:border-white/20 cursor-pointer"
                            value={selectedCountry || ''}
                            onChange={(e) => setSelectedCountry(e.target.value || null)}
                        >
                            <option value="" className="bg-[#1a1a1a] text-gray-400">Select Country / Global</option>
                            {countries.map(country => (
                                <option key={country} value={country} className="bg-[#1a1a1a] text-white">{country}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#FF6B35]">
                            <Globe size={14} />
                        </div>
                    </div>
                </div>

                {/* Leaflet Map Implementation */}
                {isMounted && (
                    <MapContainer
                        id="fillezy-global-map"
                        center={[20, 0]}
                        zoom={2}
                        className="w-full h-full"
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.google.com/help/terms_maps.html">Google Maps</a>'
                            url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        />

                        <MapController locations={filteredLocations} selectedCountry={selectedCountry} />

                        {/* [NEW] Auto-Zoom Handler */}
                        <AutoZoomHandler
                            userLocation={userLocation}
                            locations={locations}
                            markerRefs={markerRefs}
                        />

                        {filteredLocations.map((location) => {
                            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates[0]},${location.coordinates[1]}`;
                            const distance = userLocation
                                ? calculateDistance(userLocation[0], userLocation[1], location.coordinates[0], location.coordinates[1])
                                : null;

                            const operationalDetail = location.type.includes('manufacturing')
                                ? 'Manufacturing Facility'
                                : location.type.includes('headquarters')
                                    ? 'Corporate Operations'
                                    : 'Partner Office';

                            return (
                                <Marker
                                    key={location.id}
                                    position={location.coordinates as L.LatLngExpression}
                                    icon={createCustomIcon(location.type, selectedCountry === location.country)}
                                    ref={(element) => {
                                        if (element) {
                                            markerRefs.current[location.id] = element;
                                        }
                                    }}
                                >
                                    <Popup
                                        className="replicate-popup"
                                        maxWidth={360}
                                        minWidth={250}
                                        autoPanPaddingTopLeft={[0, 150]}
                                        autoPanPaddingBottomRight={[0, 20]}
                                    >
                                        <div className="relative flex flex-col bg-white overflow-hidden rounded-xl border border-black/10 shadow-sm h-full group/popup">
                                            {/* Architectural Corner Accents */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-black/20 z-50 transition-colors" />
                                            <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-black/20 z-50 transition-colors" />
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-black/20 z-50 transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-black/20 z-50 transition-colors" />

                                            {/* Technical Grid Header Area - Ultra Compact on Mobile */}
                                            <div className="relative h-24 md:h-44 bg-[#F4F4F5] flex items-center justify-center p-4 md:p-8 border-b border-black/5">
                                                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:1rem_1rem]" />

                                                {/* Centered Logo Overlay - Smaller on Mobile */}
                                                <Image
                                                    src="/fillezey logo.png"
                                                    alt="Fillezy"
                                                    width={100}
                                                    height={48}
                                                    className="object-contain relative z-20"
                                                />

                                                {/* Floating Category Tag */}
                                                <div className="absolute top-2 left-2 md:top-4 md:left-4 z-40">
                                                    <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-md bg-white border border-black/5 shadow-sm">
                                                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary animate-pulse" />
                                                        <span className="text-[6px] md:text-[9px] font-mono font-bold uppercase tracking-widest text-black/70">
                                                            {location.type.map(t => t === 'headquarters' ? 'HQ' : t === 'manufacturing' ? 'FACTORY' : 'PARTNER').join(' & ')}
                                                        </span>
                                                    </span>
                                                </div>

                                                {/* Country Badge */}
                                                <div className="absolute top-2 right-2 md:top-4 md:right-10 z-40">
                                                    <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-md bg-white border border-black/5 shadow-sm text-[7px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-black/60">
                                                        <Globe size={8} className="md:w-[10px] md:h-[10px] text-primary" />
                                                        {location.country}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content Area - Ultra Compact Padding on Mobile */}
                                            <div className="p-3 md:p-6 flex flex-col flex-grow relative bg-white">
                                                <div className="mb-2 md:mb-4">
                                                    <h3 className="font-black text-primary uppercase leading-[0.9] font-sans text-base md:text-xl mb-1 md:mb-1.5">
                                                        {location.name}
                                                    </h3>
                                                    <p className="text-[7px] md:text-[9px] font-mono font-bold text-black/40 uppercase tracking-[0.2em]">
                                                        {operationalDetail} — {location.country}
                                                    </p>
                                                </div>

                                                <div className="mb-3 md:mb-6">
                                                    <p className="text-[#1A1C1E]/60 font-medium text-[9px] md:text-xs leading-relaxed mb-1.5 md:mb-2 uppercase tracking-wide line-clamp-2">
                                                        {location.address}
                                                    </p>
                                                    {distance !== null && (
                                                        <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-mono font-bold text-black/30 uppercase tracking-widest">
                                                            <MapPin size={8} className="md:w-[10px] md:h-[10px] text-primary" />
                                                            {Math.round(distance)} km away
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Interactive Footer */}
                                                <div className="mt-auto pt-2 md:pt-4 border-t border-dashed border-black/10 flex items-center justify-between pointer-events-auto">
                                                    <span className="text-[7px] md:text-[9px] font-mono font-bold uppercase tracking-widest text-[#1A1C1E]/40">
                                                        GET DIRECTION
                                                    </span>

                                                    <div className="flex items-center gap-2 md:gap-3">
                                                        {/* Contact Icons */}
                                                        <div className="flex gap-1.5 md:gap-2 mr-1 text-black">
                                                            {location.phone && (
                                                                <a
                                                                    href={`tel:${location.phone}`}
                                                                    className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#f4f4f5] !text-black shadow-sm hover:!bg-primary hover:!text-white hover:shadow-lg hover:shadow-primary/20 hover:scale-110 active:scale-95 transition-all outline-none no-underline"
                                                                >
                                                                    <Phone size={10} className="md:w-[14px] md:h-[14px] !text-current" strokeWidth={2.5} />
                                                                </a>
                                                            )}
                                                            {location.email && (
                                                                <a
                                                                    href={`mailto:${location.email}`}
                                                                    className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#f4f4f5] !text-black shadow-sm hover:!bg-primary hover:!text-white hover:shadow-lg hover:shadow-primary/20 hover:scale-110 active:scale-95 transition-all outline-none no-underline"
                                                                >
                                                                    <Mail size={10} className="md:w-[14px] md:h-[14px] !text-current" strokeWidth={2.5} />
                                                                </a>
                                                            )}
                                                        </div>

                                                        {/* The Signature Action Button */}
                                                        <a
                                                            href={googleMapsUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#f4f4f5] !text-black shadow-sm hover:!bg-primary hover:!text-white hover:shadow-lg hover:shadow-primary/20 hover:scale-110 active:scale-95 transition-all outline-none no-underline"
                                                        >
                                                            <ArrowUpRight size={12} className="md:w-[18px] md:h-[18px] !text-current" strokeWidth={2.5} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                )}
            </div>

            {/* Global Legend: External to Map Wrapper */}
            <div className="mt-6 flex justify-between items-center px-2 opacity-60 hover:opacity-100 transition-opacity">
                <div className="text-[10px] uppercase tracking-widest text-[#FF6B35] font-black flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#FF6B35]/30"></span>
                    Interactive Global Network // 9+ Manufacturing Plants
                </div>
                <div className="flex gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shadow-[0_0_8px_#FF6B35] animate-pulse"></div>
                        <span className="text-[10px] uppercase text-black font-black tracking-widest">Hi-Tech Facilities</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
