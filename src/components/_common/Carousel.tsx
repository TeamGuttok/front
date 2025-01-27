import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { KNOWN_SERVICES } from '#constants/knownServices'; // 서비스 데이터 import

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null); // 캐러셀의 DOM 참조
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태
  const duplicatedServices = [...KNOWN_SERVICES, ...KNOWN_SERVICES];

  useEffect(() => {
    if (carouselRef.current) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        const firstChild = carouselRef.current?.firstChild as HTMLElement;

        if (firstChild) {
          setTimeout(() => {
            // 첫 번째 아이템을 맨 뒤로 이동
            carouselRef.current?.appendChild(firstChild);
            setIsAnimating(false);
          }, 300);
        }
      }, 3000);

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
    }
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={carouselRef}
        className={`flex ${isAnimating ? 'transition-transform duration-700' : ''}`} // 애니메이션 부드럽게
        style={{ transform: isAnimating ? 'translateX(-100%)' : 'translateX(0)' }}
      >
        {duplicatedServices.map((service, index) => (
          <div
            key={`${service.id}-${index}`}
            className="flex-shrink-0 w-64 h-40 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center mx-4"
          >
            <Image src={service.iconUrl} alt={service.name} width={64} height={64} className="w-16 h-16 mb-2" />
            <span className="text-lg font-semibold text-gray-700">{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
