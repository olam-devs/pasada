"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { PasadaImage } from "@/components/ui/PasadaImage";
import type { HeroSlide } from "@/lib/home-page";

export function HeroSlideshow({
  slides,
  intervalSeconds = 5.5,
  children,
}: {
  slides: HeroSlide[];
  intervalSeconds?: number;
  children?: ReactNode;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    const select = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", select);
    emblaApi.on("reInit", select);
    select();
    return () => {
      emblaApi.off("select", select);
      emblaApi.off("reInit", select);
    };
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi || slides.length < 2 || paused || interacting) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = setInterval(() => {
      if (!document.hidden && !reduced.matches) emblaApi.scrollNext();
    }, intervalSeconds * 1000);
    return () => clearInterval(timer);
  }, [emblaApi, intervalSeconds, slides.length, paused, interacting]);
  return (
    <section
      aria-label="PASADA highlights"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-[var(--brand-maroon)]"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setInteracting(false);
      }}
    >
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {slides.map((slide, i) => (
            <div
              key={slide._key}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== index}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              {slide.fit === "contain" ? (
                <div className="absolute inset-0 mx-auto max-w-7xl">
                  <div className="absolute bottom-24 right-5 aspect-square w-16 overflow-hidden rounded-xl bg-white shadow-xl min-[375px]:w-20 lg:bottom-auto lg:right-[4%] lg:top-1/2 lg:w-[28%] lg:max-w-[360px] lg:-translate-y-1/2 lg:rounded-2xl">
                    <PasadaImage
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1280px) 360px, (min-width: 1024px) 28vw, 80px"
                      className="scale-110 object-contain"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <PasadaImage
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  <div className="hero-shade pointer-events-none absolute inset-0" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto flex min-h-[610px] max-w-7xl items-center px-5 pb-24 pt-12 sm:min-h-[570px] sm:px-8 md:px-16">
        {children}
      </div>
      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/10 text-white hover:bg-black/40 md:grid"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/10 text-white hover:bg-black/40 md:grid"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide._key}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => emblaApi?.scrollTo(i)}
                className="grid h-9 min-w-9 place-items-center"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-[var(--brand-gold)]" : "w-2.5 bg-white/70"}`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="absolute bottom-6 right-5 grid h-9 w-9 place-items-center rounded-full border border-white/40 text-white hover:bg-black/30"
          >
            {paused ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </>
      ) : null}
    </section>
  );
}
