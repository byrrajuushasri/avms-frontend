
"use client";

import { useEffect, useState } from "react";
import { getStorageImageUrl } from "@/lib/storage-image-url";

interface ProfileGalleryProps {
  images?: string[];
}

const DEFAULT_IMAGE = "/images/default-profile.jpg";

export default function ProfileGallery({
  images = [],
}: ProfileGalleryProps) {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://avms-backend-production.up.railway.app";

  const API_BASE_URL = BACKEND_URL.replace(/\/+$/, "");

  const validImages = images
    .filter((image) => image && image.trim() !== "")
    .map((image) => image.trim());

  const galleryImages =
    validImages.length > 0 ? validImages : [DEFAULT_IMAGE];

  const [selectedImage, setSelectedImage] = useState(
    galleryImages[0]
  );

  // Reset selected photo when API images change
  useEffect(() => {
    setSelectedImage(galleryImages[0]);
  }, [images]);

  const getImageUrl = (image?: string | null): string => {
    return getStorageImageUrl(image, API_BASE_URL) || DEFAULT_IMAGE;
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = event.currentTarget;

    if (!img.src.includes("/images/default-profile.jpg")) {
      img.src = DEFAULT_IMAGE;
    }
  };

  const selectedIndex = galleryImages.indexOf(selectedImage);

  // Show up to four thumbnails
  const thumbnailImages = galleryImages.slice(0, 4);

  return (
    <div className="w-full">
      {/* MAIN PROFILE IMAGE */}
      <div className="overflow-hidden rounded-3xl border border-[#eadfda] bg-white p-2 shadow-[0_10px_35px_rgba(70,20,30,0.12)] sm:p-3">
        <div className="group/main relative overflow-hidden rounded-2xl bg-[#f8f3f0]">
          <img
            key={selectedImage}
            src={getImageUrl(selectedImage)}
            alt="Matrimonial profile"
            onError={handleImageError}
            className="h-[380px] w-full object-cover transition-transform duration-700 ease-out group-hover/main:scale-105 sm:h-[480px] lg:h-[540px]"
          />

          {/* Profile photo label */}
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-3 py-2 shadow-md backdrop-blur-md sm:left-4 sm:top-4">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#800018]" />
            <span className="text-xs font-bold text-[#800018]">
              Profile Photos
            </span>
          </div>

          {/* Photo counter */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-3 right-3 rounded-full bg-black/65 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:bottom-4 sm:right-4">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
      </div>

      {/* THUMBNAIL GALLERY */}
      {galleryImages.length > 1 && (
        <div className="mt-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#800018]">
                Photo Gallery
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Hover to zoom · Click to view
              </p>
            </div>

            <span className="rounded-full bg-[#800018]/5 px-3 py-1.5 text-xs font-semibold text-[#800018]">
              {thumbnailImages.length} Photos
            </span>
          </div>

          {/* Four thumbnail columns */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {thumbnailImages.map((image, index) => {
              const isSelected = selectedImage === image;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View profile photo ${index + 1}`}
                  aria-pressed={isSelected}
                  className={`group/thumb relative aspect-[3/4] min-w-0 overflow-hidden rounded-xl border-2 bg-white p-1 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-95 sm:rounded-2xl sm:p-1.5 ${
                    isSelected
                      ? "border-[#800018] shadow-lg ring-2 ring-[#d9a928]/50"
                      : "border-[#e8ded9] hover:border-[#d9a928]"
                  }`}
                >
                  {/* Thumbnail image zoom effect */}
                  <img
                    src={getImageUrl(image)}
                    alt={`Profile thumbnail ${index + 1}`}
                    onError={handleImageError}
                    className="h-full w-full rounded-lg object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-125 sm:rounded-xl"
                  />

                  {/* Hover overlay */}
                  <span className="pointer-events-none absolute inset-1 rounded-lg bg-gradient-to-t from-[#800018]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100 sm:inset-1.5 sm:rounded-xl" />

                  {/* Zoom icon */}
                  <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-[#800018] opacity-0 shadow-lg transition-all duration-300 group-hover/thumb:scale-100 group-hover/thumb:opacity-100">
                    +
                  </span>

                  {/* Selected checkmark */}
                  {isSelected && (
                    <span className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#800018] text-[10px] font-bold text-white shadow-md">
                      ✓
                    </span>
                  )}

                  {/* Gold bottom line */}
                  {isSelected && (
                    <span className="absolute bottom-0 left-2 right-2 h-1 rounded-full bg-[#d9a928]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Single photo message */}
      {galleryImages.length === 1 && validImages.length > 0 && (
        <p className="mt-3 text-center text-xs text-gray-500">
          Profile photo
        </p>
      )}
    </div>
  );
}
