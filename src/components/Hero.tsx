import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[620px] sm:min-h-[650px] lg:min-h-[600px] flex items-center overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/bg-banner.png"
        alt="Arya Vysya Matrimony"
        fill
        priority
        sizes="100vw"
        className="
          object-cover
          object-[65%_center]
          sm:object-[60%_center]
          lg:object-center
        "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Mobile Extra Overlay */}
      <div className="absolute inset-0 bg-black/10 lg:hidden" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Side */}
          <div className="text-white max-w-xl">

            {/* Badge */}
            <span className="
              inline-flex
              items-center
              bg-rose-600
              px-4
              sm:px-5
              py-2
              rounded-full
              text-xs
              sm:text-sm
              font-medium
            ">
              ❤️ Trusted Arya Vysya Matrimony
            </span>

            {/* Heading */}
            <h3 className="
              mt-5
              text-3xl
              sm:text-3xl
              lg:text-3xl
              font-semibold
              leading-tight
            ">
              Find Your Perfect
              <span className="block text-yellow-300">
                Life Partner
              </span>
            </h3>

            {/* Description */}
            <p className="
              mt-5
              text-base
              sm:text-sm
              text-gray-200
              leading-relaxed
              max-w-lg
            ">
              Join thousands of verified Arya Vysya bride and groom
              profiles and begin your journey towards a happy married life.
            </p>

            {/* Buttons */}
            <div className="
              flex
              flex-col
              sm:flex-row
              gap-3
              sm:gap-4
              mt-7
            ">

              <Link
                href="/register"
                className="
                  bg-rose-600
                  hover:bg-rose-700
                  text-center
                  px-7
                  py-3.5
                  sm:px-8
                  sm:py-4
                  rounded-lg
                  font-semibold
                  transition
                "
              >
                Register Free
              </Link>

              

            </div>

            {/* Statistics */}
            <div className="
              grid
              grid-cols-3
              gap-3
              sm:gap-8
              mt-9
              sm:mt-12
            ">

              <div>
                <h2 className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  text-yellow-300
                ">
                  25K+
                </h2>

                <p className="text-xs sm:text-sm mt-1">
                  Brides
                </p>
              </div>

              <div>
                <h2 className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  text-yellow-300
                ">
                  22K+
                </h2>

                <p className="text-xs sm:text-sm mt-1">
                  Grooms
                </p>
              </div>

              <div>
                <h2 className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  text-yellow-300
                ">
                  12K+
                </h2>

                <p className="text-xs sm:text-sm mt-1">
                  Success Stories
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="hidden lg:block" />

        </div>

      </div>

    </section>
  );
}