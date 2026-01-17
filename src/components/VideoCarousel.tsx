import { useEffect, useRef, useState } from "react";

const videos = [
  "/videos/buildingvid.mp4",
  "/videos/poolvid.mp4",
  "/videos/poolvidtwo.mp4",
  "/videos/poolvidthree.mp4",
  "/videos/constructvid.mp4",
  "/videos/constructvidtwo.mp4",
];

const VideoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  /* --------------------------------------------
     Detect desktop
  --------------------------------------------- */
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  /* --------------------------------------------
     Pause all videos when leaving viewport
  --------------------------------------------- */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRefs.current.forEach((v) => v?.pause());
          setPlayingIndex(null);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* --------------------------------------------
     Scroll to next video when one ends (desktop)
  --------------------------------------------- */
  const handleVideoEnd = (index: number) => {
    if (!isDesktop || !containerRef.current) return;

    const nextIndex = index === videos.length - 1 ? 0 : index + 1;
    const nextVideo = videoRefs.current[nextIndex];

    nextVideo?.play();
    setPlayingIndex(nextIndex);

    containerRef.current.children[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  return (
    <div className="mt-8">
      <div
        ref={containerRef}
        className="
          flex gap-4 overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          px-4
        "
      >
        {videos.map((video, index) => (
          <div
            key={index}
            className="
              snap-center
              flex-shrink-0
              w-[90%]
              sm:w-[70%]
              md:w-[45%]
              lg:w-[30%]
            "
          >
            <div className="rounded-xl overflow-hidden bg-black shadow-lg relative">
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={video}
                muted
                playsInline
                preload="metadata"
                controls={isDesktop}
                className="w-full h-[50vh] object-cover"
                onPlay={() => setPlayingIndex(index)}
                onPause={() => setPlayingIndex(null)}
                onEnded={() => handleVideoEnd(index)}
              />

              {/* Mobile Tap Overlay */}
              {!isDesktop && playingIndex !== index && (
                <button
                  onClick={() => {
                    videoRefs.current[index]?.play();
                    setPlayingIndex(index);
                  }}
                  className="
                    absolute inset-0
                    flex items-center justify-center
                    bg-black/40
                    text-white text-5xl
                  "
                  aria-label="Play video"
                >
                  ▶
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
