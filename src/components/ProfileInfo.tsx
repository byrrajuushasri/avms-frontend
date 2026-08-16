import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaRupeeSign,
  FaBirthdayCake,
  FaRulerVertical,
  FaCheckCircle,
  FaPrayingHands,
} from "react-icons/fa";

export default function ProfileInfo() {
  return (
    <div>

      {/* Profile ID */}
      <div className="flex items-center gap-3 mb-3">

        <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-semibold">
          ID : AVM102548
        </span>

        <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <FaCheckCircle />
          Verified Profile
        </span>

      </div>

      {/* Name */}

      <h1 className="text-4xl font-bold text-gray-800">
        Priya Kumari
      </h1>

      <p className="text-gray-500 mt-2">
        Software Engineer
      </p>

      {/* Quick Details */}

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-gray-50 rounded-xl p-4">
          <FaBirthdayCake className="text-rose-600 text-xl mb-2" />
          <p className="text-sm text-gray-500">Age</p>
          <h3 className="font-semibold">25 Years</h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <FaRulerVertical className="text-rose-600 text-xl mb-2" />
          <p className="text-sm text-gray-500">Height</p>
          <h3 className="font-semibold">5'4"</h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <FaGraduationCap className="text-rose-600 text-xl mb-2" />
          <p className="text-sm text-gray-500">Education</p>
          <h3 className="font-semibold">M.Tech</h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <FaBriefcase className="text-rose-600 text-xl mb-2" />
          <p className="text-sm text-gray-500">Profession</p>
          <h3 className="font-semibold">
            Software Engineer
          </h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <FaRupeeSign className="text-rose-600 text-xl mb-2" />
          <p className="text-sm text-gray-500">Annual Income</p>
          <h3 className="font-semibold">₹12 Lakhs</h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <FaMapMarkerAlt className="text-rose-600 text-xl mb-2" />
          <p className="text-sm text-gray-500">Location</p>
          <h3 className="font-semibold">Hyderabad</h3>
        </div>

      </div>

      {/* Personal Details */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Personal Details
        </h2>

        <div className="grid grid-cols-2 gap-y-4">

          <p><span className="font-semibold">Religion :</span> Hindu</p>

          <p><span className="font-semibold">Caste :</span> Arya Vysya</p>

          <p><span className="font-semibold">Gotram :</span> Bharadwaja</p>

          <p><span className="font-semibold">Mother Tongue :</span> Telugu</p>

          <p><span className="font-semibold">Marital Status :</span> Never Married</p>

          <p><span className="font-semibold">Physical Status :</span> Normal</p>

        </div>

      </div>

      {/* About */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          About Me
        </h2>

        <p className="text-gray-600 leading-8">
          I am a caring, family-oriented, and ambitious person.
          Currently working as a Software Engineer in Hyderabad.
          Looking for a well-educated, caring and understanding life partner
          from the Arya Vysya community.
        </p>

      </div>


    </div>
  );
}