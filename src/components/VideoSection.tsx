"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ContactModal, { ModalMode } from "./ContactModal";

// Add TypeScript support for YouTube API
declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

const videos = [
    {
        id: "PRC-01",
        title: "Production & Handling",
        duration: "Main Process",
        thumbnail: "https://img.youtube.com/vi/stxbJGpsXlA/maxresdefault.jpg",
        videoId: "stxbJGpsXlA",
        category: "Operations"
    },
    {
        id: "MCH-01",
        title: "Fillezy Rapid Machine",
        duration: "Demo",
        thumbnail: "https://img.youtube.com/vi/xCCLPySnkOg/maxresdefault.jpg",
        videoId: "xCCLPySnkOg",
        category: "Machines"
    },
    {
        id: "MCH-02",
        title: "Hexapaper Machine",
        duration: "Demo",
        thumbnail: "https://img.youtube.com/vi/WjgrvyX6p6A/maxresdefault.jpg",
        videoId: "WjgrvyX6p6A",
        category: "Machines"
    },
    {
        id: "MCH-03",
        title: "Paper Air Cushion",
        duration: "Demo",
        thumbnail: "https://img.youtube.com/vi/VQTznDSmuNQ/maxresdefault.jpg",
        videoId: "VQTznDSmuNQ",
        category: "Machines"
    },
    {
        id: "MCH-04",
        title: "Air Cushion Bags",
        duration: "Demo",
        thumbnail: "https://img.youtube.com/vi/putyMACb5Bs/maxresdefault.jpg",
        videoId: "putyMACb5Bs",
        category: "Machines"
    },
    {
        id: "TST-01",
        title: "Customer Testimonials",
        duration: "Feedback",
        thumbnail: "https://img.youtube.com/vi/4de3n6C4FIA/maxresdefault.jpg",
        videoId: "4de3n6C4FIA",
        category: "Testimonials"
    },
    {
        id: "TST-02",
        title: "Air Bubble & Cushions",
        duration: "Testimonial",
        thumbnail: "https://img.youtube.com/vi/VMBSng_gGG0/maxresdefault.jpg",
        videoId: "VMBSng_gGG0",
        category: "Testimonials"
    }
];

export default function VideoSection() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    const [activeVideo, setActiveVideo] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Initialize YouTube API
    useEffect(() => {
        // Only load the script if it hasn't been loaded yet
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        (window as any).onYouTubeIframeAPIReady = () => {
            console.log("YouTube API Ready");
        };
    }, []);

    // Create player when isPlaying or activeVideo changes
    useEffect(() => {
        if (isPlaying && window.YT && window.YT.Player) {
            if (playerRef.current) {
                playerRef.current.destroy();
            }

            playerRef.current = new window.YT.Player('youtube-player', {
                videoId: videos[activeVideo].videoId,
                playerVars: {
                    autoplay: 1,
                    rel: 0,
                    modestbranding: 1,
                },
                events: {
                    onStateChange: (event: any) => {
                        // YT.PlayerState.ENDED is 0
                        if (event.data === 0) {
                            handleNextVideo();
                        }
                    }
                }
            });
        }
    }, [isPlaying, activeVideo]);

    const handleNextVideo = () => {
        const nextIdx = (activeVideo + 1) % videos.length;
        setActiveVideo(nextIdx);

        // Scroll the carousel to the next video
        if (scrollRef.current) {
            const container = scrollRef.current;
            const items = container.querySelectorAll('.video-thumbnail-item');
            if (items[nextIdx]) {
                (items[nextIdx] as HTMLElement).scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    };

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const item = container.querySelector('.video-thumbnail-item');
            if (item) {
                const itemWidth = (item as HTMLElement).offsetWidth;
                const gap = 24; // text-gap-6
                const scrollAmount = itemWidth + gap;

                container.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <section className="relative py-24 bg-[#0B0F14] technical-grid paper-grain overflow-hidden border-t border-white/5 industrial-dark-section">
            {/* Architectural Grid Line */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-white/5 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="relative pt-12">
                    <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 text-[11px] font-mono text-white/40 font-black uppercase tracking-[0.5em] mb-4"
                            >
                                <span className="h-px w-10 bg-primary" />
                                FACTORY_OPERATIONS_FEED
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-5xl font-black tracking-tight text-white lg:text-7xl mb-6 uppercase leading-[0.85]"
                            >
                                Packaging Operations <br />
                                <span className="text-primary italic font-serif font-light lowercase">in real environments.</span>
                            </motion.h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => openContactModal("QUOTATION")}
                                className="group flex items-center justify-center gap-4 rounded-2xl border-2 border-white/10 bg-transparent px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all shadow-xl whitespace-nowrap"
                            >
                                Book a Live Demo
                            </button>
                        </div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xl text-white/80 font-bold leading-relaxed max-w-3xl mt-6"
                    >
                        See how on-demand cushioning improves speed, consistency, and protection in live packing operations.
                    </motion.p>
                </div>

                {/* Main Video Player */}
                <motion.div
                    id="video-player-root"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mt-16 group"
                >
                    <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 shadow-3xl shadow-black/50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0F14] via-transparent to-primary/5 z-10 pointer-events-none" />

                        {isPlaying ? (
                            <div className="absolute inset-0 z-0">
                                <div id="youtube-player" className="w-full h-full" />
                            </div>
                        ) : (
                            <motion.img
                                key={`thumb-${activeVideo}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                src={videos[activeVideo].thumbnail}
                                alt={videos[activeVideo].title}
                                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                            />
                        )}

                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center z-30">
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsPlaying(true);
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:bg-primary-hover transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="relative z-10 w-0 h-0 border-y-[15px] border-y-transparent border-l-[25px] border-l-white ml-2" />
                                    <motion.div
                                        className="absolute inset-0 bg-white/20"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "0%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            </div>
                        )}

                        {/* Status Overlay */}
                        <div className="absolute bottom-10 left-10 z-20 flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#FF6B35]" />
                                <p className="text-sm font-black text-white uppercase tracking-widest">LIVE_OPERATIONS_FEED</p>
                            </div>
                        </div>

                        {/* Video Info Overlay */}
                        <div className="absolute bottom-10 right-10 z-20">
                            <div className="text-right">
                                <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-1">
                                    {videos[activeVideo].title}
                                </h3>
                                <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                                    {videos[activeVideo].category} • {videos[activeVideo].duration}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Video Slider Header */}
                <div className="flex items-center gap-3 mt-12 mb-6">
                    <div className="h-1.5 w-10 bg-primary rounded-full" />
                    <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] font-black">
                        SELECT_OPERATIONS_FEED
                    </h4>
                </div>

                <div className="relative group/carousel">
                    {/* Left Navigation Arrow */}
                    <AnimatePresence>
                        {canScrollLeft && (
                            <motion.button
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                onClick={() => scroll('left')}
                                className="absolute left-[-28px] top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/20 hover:scale-110 active:scale-95 transition-transform"
                            >
                                <ChevronLeft size={28} strokeWidth={3} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Right Navigation Arrow */}
                    <AnimatePresence>
                        {canScrollRight && (
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                onClick={() => scroll('right')}
                                className="absolute right-[-28px] top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/20 hover:scale-110 active:scale-95 transition-transform"
                            >
                                <ChevronRight size={28} strokeWidth={3} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar cursor-grab active:cursor-grabbing select-none"
                    >
                        {videos.map((video, idx) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => {
                                    setActiveVideo(idx);
                                    setIsPlaying(true);
                                    document.getElementById('video-player-root')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                                className={`video-thumbnail-item relative group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 snap-center shrink-0 w-[240px] md:w-[calc(25%-1.25rem)] ${activeVideo === idx
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-white/10 hover:border-white/30"
                                    }`}
                            >
                                <div className="relative aspect-video bg-black">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                                    {/* Play Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${activeVideo === idx
                                            ? "bg-primary"
                                            : "bg-white/20 group-hover:bg-white/30"
                                            }`}>
                                            <Play size={16} fill="currentColor" className="text-white ml-0.5" />
                                        </div>
                                    </div>

                                    {/* Video Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${activeVideo === idx
                                                ? "bg-primary text-white"
                                                : "bg-white/20 text-white/80"
                                                }`}>
                                                {video.category}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-black uppercase text-white tracking-tight line-clamp-1">
                                            {video.title}
                                        </h4>
                                        <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider mt-1">
                                            {video.duration}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Features Bullets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16 border-t border-white/10 pt-12">
                    <div className="p-6">
                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-2">Faster packing output</h4>
                        <p className="text-white/40 text-[11px] font-bold leading-relaxed">Efficient on-demand production.</p>
                    </div>
                    <div className="p-6">
                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-2">Reduced manual handling</h4>
                        <p className="text-white/40 text-[11px] font-bold leading-relaxed">Ergonomic workflow integration.</p>
                    </div>
                    <div className="p-6">
                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-2">Consistent quality</h4>
                        <p className="text-white/40 text-[11px] font-bold leading-relaxed">Reliable structural protection.</p>
                    </div>
                </div>
            </div>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                initialMode={contactMode}
            />
        </section>
    );
}
