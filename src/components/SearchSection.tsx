"use client";

export default function SearchSection() {
  return (
    <section className="relative -mt-16 z-20 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">

          <h2 className="text-center text-2xl  text-[#8B1E3F] mb-8">
            Search Your Perfect Match
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">

            {/* Looking For */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Looking For
              </label>

              <select className="w-full h-12 rounded-lg border border-[#d9d9d9] bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-[#d81b60] focus:ring-2 focus:ring-[#f8bbd0]">
                <option>Bride</option>
                <option>Groom</option>
              </select>
            </div>

            {/* Age From */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Age From
              </label>

              <select className="w-full h-12 rounded-lg border border-[#d9d9d9] bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-[#d81b60] focus:ring-2 focus:ring-[#f8bbd0]">
                {Array.from({ length: 43 }, (_, i) => (
                  <option key={i}>{18 + i}</option>
                ))}
              </select>
            </div>

            {/* Age To */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Age To
              </label>

              <select className="w-full h-12 rounded-lg border border-[#d9d9d9] bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-[#d81b60] focus:ring-2 focus:ring-[#f8bbd0]">
                {Array.from({ length: 43 }, (_, i) => (
                  <option key={i}>{18 + i}</option>
                ))}
              </select>
            </div>

            {/* Religion */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Religion
              </label>

              <select className="w-full h-12 rounded-lg border border-[#d9d9d9] bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-[#d81b60] focus:ring-2 focus:ring-[#f8bbd0]">
                <option>Select Religion</option>
                <option>Hindu</option>
                <option>Christian</option>
                <option>Muslim</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Location
              </label>

              <select className="w-full h-12 rounded-lg border border-[#d9d9d9] bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-[#d81b60] focus:ring-2 focus:ring-[#f8bbd0]">
                <option>Select Location</option>
                <option>Hyderabad</option>
                <option>Vijayawada</option>
                <option>Visakhapatnam</option>
                <option>Warangal</option>
                <option>Tirupati</option>
              </select>
            </div>

            {/* Search Button */}
            <div>
              <button className="w-full h-12 rounded-lg  bg-rose-600 hover: bg-rose-700 text-white font-semibold shadow-md transition duration-300">
                Search
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}