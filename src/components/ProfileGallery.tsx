"use client";

import { useState } from "react";

const images = [
  "/profiles/bride1.jpg",
  "/profiles/bride2.jpg",
  "/profiles/bride3.jpg",
  "/profiles/groom1.jpg",
  "/profiles/groom2.jpg",
];

export default function ProfileGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>

      {/* Main Image */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-lg">

        <img
          src={selectedImage}
          alt="Profile"
          className="w-full h-[600px] object-cover hover:scale-105 transition duration-500"
        />

      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-4 mt-5 overflow-x-auto">

        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`rounded-xl overflow-hidden border-2 transition ${
              selectedImage === img
                ? "border-rose-600"
                : "border-gray-200 hover:border-rose-400"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-24 h-24 object-cover"
            />
          </button>
        ))}

      </div>

    </div>
  );
}