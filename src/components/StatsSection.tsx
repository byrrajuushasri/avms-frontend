import {
  FaUserAlt,
  FaShieldAlt,
  FaHeart,
  FaAward,
} from "react-icons/fa";

export default function StatsSection() {
  return (
    <section className="py-8">
  <div className="max-w-7xl mx-auto px-6">

    <div className="bg-[#fff7f8] rounded-2xl shadow-sm border border-[#f4e4e7] px-10 py-8">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

        {/* Item 1 */}
        <div>
         <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-rose-100 flex items-center justify-center">
  <FaUserAlt className="text-2xl text-[#d81b60]" />
</div>
          <h2 className="text-2xl  text-[#d81b60]">
            25L+
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Registered Members
          </p>
        </div>

        {/* Item 2 */}
        <div>
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-rose-100 flex items-center justify-center">
  <FaShieldAlt className="text-2xl text-[#d81b60]" />
</div>
          <h2 className="text-2xl  text-[#d81b60]">
            15L+
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Verified Profiles
          </p>
        </div>

        {/* Item 3 */}
        <div>
         <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-rose-100 flex items-center justify-center">
  <FaHeart className="text-2xl text-[#d81b60]" />
</div>
          <h2 className="text-2xl  text-[#d81b60]">
            10L+
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Successful Matches
          </p>
        </div>

        {/* Item 4 */}
        <div>
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-rose-100 flex items-center justify-center">
  <FaAward className="text-2xl text-[#d81b60]" />
</div>
          <h2 className="text-2xl  text-[#d81b60]">
            20+
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Years of Trust
          </p>
        </div>

      </div>

    </div>

  </div>
</section>
  );
}