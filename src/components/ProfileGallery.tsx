"use client";

import { useEffect, useState } from "react";

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
    "http://localhost:5000";

  const API_BASE_URL = BACKEND_URL.replace(/\/+$/, "");

  // =========================================================
  // CONVERT PHOTO TO URL
  // =========================================================

  const getImageUrl = (
    image?: string | null
  ): string => {
    if (!image) {
      return DEFAULT_IMAGE;
    }

    const value = String(image).trim();

    if (!value) {
      return DEFAULT_IMAGE;
    }

    // Full URL
    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    // /uploads/matrimonial/file.jpg
    if (value.startsWith("/uploads/")) {
      return `${API_BASE_URL}${value}`;
    }

    // uploads/matrimonial/file.jpg
    if (value.startsWith("uploads/")) {
      return `${API_BASE_URL}/${value}`;
    }

    // /matrimonial/file.jpg
    if (value.startsWith("/matrimonial/")) {
      return `${API_BASE_URL}/uploads${value}`;
    }

    // filename only
    return `${API_BASE_URL}/uploads/matrimonial/${value}`;
  };

  // =========================================================
  // CLEAN IMAGE LIST
  // =========================================================

  const validImages = images
    .filter(
      (image) =>
        image &&
        String(image).trim() !== ""
    )
    .map((image) => String(image).trim());

  const galleryImages =
    validImages.length > 0
      ? validImages
      : [DEFAULT_IMAGE];

  // =========================================================
  // SELECTED IMAGE
  // =========================================================

  const [selectedImage, setSelectedImage] =
    useState<string>(
      galleryImages[0]
    );

  // =========================================================
  // WHEN API IMAGES CHANGE
  // =========================================================

  useEffect(() => {
    setSelectedImage(galleryImages[0]);
  }, [images]);

  // =========================================================
  // IMAGE ERROR
  // =========================================================

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = event.currentTarget;

    // Already showing fallback
    if (
      img.src.includes(
        "/images/default-profile.jpg"
      )
    ) {
      return;
    }

    console.log(
      "Image failed:",
      img.src
    );

    img.src = DEFAULT_IMAGE;
  };

  // =========================================================
  // SELECT THUMBNAIL
  // =========================================================

  const handleSelectImage = (
    image: string
  ) => {
    setSelectedImage(image);
  };

  // =========================================================
  // MAIN IMAGE URL
  // =========================================================

  const selectedImageUrl =
    getImageUrl(selectedImage);

  const selectedIndex =
    galleryImages.indexOf(
      selectedImage
    );

  return (
    <div className="w-full">

      {/* ================================================= */}
      {/* MAIN IMAGE */}
      {/* ================================================= */}

      <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-lg">

        <img
          src={selectedImageUrl}
          alt="Profile"
          className="h-[600px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
        />

        {/* Counter */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white">
            {selectedIndex >= 0
              ? selectedIndex + 1
              : 1}{" "}
            / {galleryImages.length}
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* THUMBNAILS */}
      {/* ================================================= */}

      {galleryImages.length > 1 && (
        <div className="mt-5 flex gap-4 overflow-x-auto pb-2">

          {galleryImages.map(
            (image, index) => {
              const imageUrl =
                getImageUrl(image);

              const isSelected =
                selectedImage === image;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    handleSelectImage(image)
                  }
                  className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 ${
                    isSelected
                      ? "border-rose-600 shadow-md"
                      : "border-gray-200 hover:border-rose-400"
                  }`}
                >

                  <img
                    src={imageUrl}
                    alt={`Profile ${
                      index + 1
                    }`}
                    className="h-full w-full object-cover"
                    onError={
                      handleImageError
                    }
                  />

                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600" />
                  )}

                </button>
              );
            }
          )}

        </div>
      )}

    </div>
  );
}