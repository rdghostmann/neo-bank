import React from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import Image from "next/image"

const partnerImages = [
  "/partner/partner-1.png",
  "/partner/partner-2.png",
  "/partner/partner-3.png",
  "/partner/partner-4.png",
  "/partner/partner-5.png",
  "/partner/partner-6.png",
]

const Partners = () => {
  return (
    <div className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <Splide
          options={{
            type: "loop",
            perPage: 5,
            gap: "2rem",
            autoplay: true,
            interval: 2000,
            pauseOnHover: false,
            arrows: false,
            pagination: false,
            breakpoints: {
              1024: { perPage: 4 },
              768: { perPage: 3 },
              480: { perPage: 2 },
            },
          }}
          aria-label="Partner Logos"
        >
          {partnerImages.map((src, idx) => (
            <SplideSlide key={idx}>
              <div className="flex items-center justify-center h-20">
                <Image
                  src={src}
                  alt={`Partner ${idx + 1}`}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  )
}