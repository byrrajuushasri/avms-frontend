import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaSearch,
} from "react-icons/fa";

const matches = [
  {
    id: "AV1001",
    name: "Sowmya",
    age: 25,
    city: "Hyderabad",
    education: "B.Tech",
    profession: "Software Engineer",
    image: "/matches/girl1.jpg",
  },
  {
    id: "AV1002",
    name: "Keerthana",
    age: 24,
    city: "Vijayawada",
    education: "MBA",
    profession: "Bank Officer",
    image: "/matches/girl2.jpg",
  },
  {
    id: "AV1003",
    name: "Harsha",
    age: 28,
    city: "Visakhapatnam",
    education: "M.Tech",
    profession: "Business",
    image: "/matches/groom1.jpg",
  },
  {
    id: "AV1004",
    name: "Anusha",
    age: 26,
    city: "Guntur",
    education: "B.Pharmacy",
    profession: "Pharmacist",
    image: "/matches/girl3.jpg",
  },
];

export default function MatchesPage() {
  return (
    <main className="min-h-screen bg-rose-50 py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-rose-600">
            Find Your Perfect Match ❤️
          </h1>

          <p className="text-gray-500 mt-3">
            Search and explore verified Arya Vysya member profiles.
          </p>
        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

          <div className="grid md:grid-cols-5 gap-4">

            <input
              type="text"
              placeholder="Name / Member ID"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 text-gray-700"
            />

            <select className="border  border-gray-300 rounded-xl focus:ring-rose-500) text-gray-400 px-4 py-3">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <select className="border border-gray-300 rounded-xl focus:ring-rose-500) text-gray-400 px-4 py-3">
              <option>Age</option>
              <option>21-25</option>
              <option>26-30</option>
              <option>31-35</option>
            </select>

            <select className="border border-gray-300 rounded-xl focus:ring-rose-500) text-gray-400 px-4 py-3">
              <option>City</option>
              <option>Hyderabad</option>
              <option>Vijayawada</option>
              <option>Visakhapatnam</option>
              <option>Guntur</option>
            </select>

            <button className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl flex justify-center items-center gap-2">
              <FaSearch />
              Search
            </button>

          </div>

        </div>

        {/* Results */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold text-gray-800">
            Matching Profiles
          </h2>

          <span className="bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold">
            {matches.length} Results
          </span>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {matches.map((member) => (

            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >

              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                className="w-full h-72 object-cover"
              />

              <div className="p-5">

                <div className="flex justify-between items-center">

                  <div>
                    <h2 className="text-xl font-bold">
                      {member.name}
                    </h2>

                    <p className="text-gray-500">
                      {member.age} Years
                    </p>
                  </div>

                  <button>
                    <FaHeart className="text-rose-600 text-xl hover:scale-110 transition" />
                  </button>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Member ID : {member.id}
                </p>

                <div className="mt-5 space-y-3">

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-rose-600" />
                    {member.city}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaGraduationCap className="text-rose-600" />
                    {member.education}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaBriefcase className="text-rose-600" />
                    {member.profession}
                  </div>

                </div>

                <div className="mt-6 flex gap-3">

                   <Link
    href={`/profile/${member.id}`}
    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg font-medium text-center"
  >
    View Profile
  </Link>

                  <button className="flex-1 border border-rose-600 text-rose-600 hover:bg-rose-50 py-2 rounded-lg font-medium">
                    Interest
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}