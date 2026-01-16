import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const videos = [
  "/videos/buildingvid.mp4",
  "/videos/poolvid.mp4",
  "/videos/poolvidtwo.mp4",
  "/videos/poolvidthree.mp4",
  "/videos/constructvid.mp4",
  "/videos/constructvidtwo.mp4",
];

const VideoCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  /* --------------------------------------------
     Detect desktop (prevents SSR issues)
  --------------------------------------------- */
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  /* --------------------------------------------
     Auto-pause when carousel leaves viewport
  --------------------------------------------- */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRefs.current.forEach((video) => video?.pause());
          setPlayingIndex(null);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* --------------------------------------------
     Handle video end → move to next slide
  --------------------------------------------- */
  const handleVideoEnd = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const nextIndex = index === videos.length - 1 ? 0 : index + 1;
    swiper.slideTo(nextIndex);

    if (isDesktop) {
      videoRefs.current[nextIndex]?.play();
      setPlayingIndex(nextIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className="
        w-screen 
        md:w-auto 
        -mx-4 
        md:mx-auto 
        mt-8 
        md:max-w-6xl
      "
    >
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation
        spaceBetween={16}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={() => {
          videoRefs.current.forEach((video) => video?.pause());
          setPlayingIndex(null);
        }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="video-swiper"
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-xl overflow-hidden shadow-lg bg-black">
              <div className="relative">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  src={video}
                  muted
                  playsInline
                  preload="metadata"
                  controls={isDesktop}
                  className="w-full h-[50vh] aspect-video object-cover"
                  onPlay={() => setPlayingIndex(index)}
                  onPause={() => setPlayingIndex(null)}
                  onEnded={() => handleVideoEnd(index)}
                />

                {/* Mobile Tap-to-Play Overlay */}
                {!isDesktop && playingIndex !== index && (
                  <button
                    onClick={() => {
                      videoRefs.current[index]?.play();
                      setPlayingIndex(index);
                    }}
                    className="
                      absolute inset-0 
                      flex items-center justify-center
                      bg-black/40 text-white
                      text-5xl
                    "
                    aria-label="Play video"
                  >
                    ▶
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoCarousel;
