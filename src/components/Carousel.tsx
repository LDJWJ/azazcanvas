import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Template } from '@/data/templates';
import { trackClick } from '@/lib/tracking';

import template1 from '@/assets/templates/template-1.jpg';
import template2 from '@/assets/templates/template-2.jpg';

const featuredImages = [template1, template2];

interface CarouselProps {
  templates: Template[];
}

export function Carousel({ templates }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    trackClick('btn_carousel_prev');
    setCurrentIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  }, [templates.length]);

  const goToNext = useCallback(() => {
    trackClick('btn_carousel_next');
    setCurrentIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  }, [templates.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!templates.length) return null;

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="relative w-full flex-shrink-0"
            >
              <div className="aspect-[16/10] bg-muted">
                <img
                  src={featuredImages[index % featuredImages.length]}
                  alt={template.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white hover:scale-110"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white hover:scale-110"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {templates.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${index === currentIndex ? 'carousel-dot-active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
