import { useRef } from "react";
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
  "/videos/video5.mp4",
  "/videos/video6.mp4",
];

const VideoCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const handleVideoEnd = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Pause current video
    videoRefs.current[index]?.pause();

    // If last video → go back to first
    if (index === videos.length - 1) {
      swiper.slideTo(0);
      videoRefs.current[0]?.play();
    } else {
      swiper.slideTo(index + 1);
      videoRefs.current[index + 1]?.play();
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={() => {
          // Pause all videos when slide changes
          videoRefs.current.forEach((video) => video?.pause());
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={video}
                muted
                playsInline
                controls
                className="w-full aspect-video object-cover max-w-xl "
                onEnded={() => handleVideoEnd(index)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoCarousel;
