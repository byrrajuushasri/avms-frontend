import Image from "next/image";
import Link from "next/link";
import {
  FaUsers,
  FaHeart,
  FaShieldAlt,
  FaAward,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="bg-[#fffaf9]">

     

      {/* About Section */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <Image
              src="/about/about-img.png"
              alt="About"
              width={600}
              height={500}
              className="rounded-3xl shadow-2xl"
            />

          </div>

          <div>

            <span className="text-rose-600 font-semibold uppercase tracking-widest">
              Who We Are
            </span>

            <h2 className="text-2xl  text-rose-600 mt-3">
              Trusted Matrimony Platform
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Arya Vysya Matrimony is a dedicated matrimonial platform
              created exclusively for the Arya Vysya community. Our mission
              is to help families find genuine life partners through a secure,
              verified, and easy-to-use platform.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              We combine traditional family values with modern technology to
              provide safe matchmaking for brides and grooms across India and abroad.
            </p>

          </div>

        </div>

      </section>
{/* Leadership Team */}

<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">
      <h2 className="text-2xl  text-rose-600">
        Our Leadership Team
      </h2>

      <p className="text-gray-500 mt-3">
        Meet the dedicated leaders serving the Arya Vysya community.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        {
          img: "/about/president.jpg",
          name: "Sri Raman Rao",
          role: "President",
        },
        {
          img: "/about/vice-president.jpg",
          name: "Sri Srinivas",
          role: "Vice President",
        },
        {
          img: "/about/secretary.jpg",
          name: "Sri Prasad",
          role: "General Secretary",
        },
        {
          img: "/about/treasurer.jpg",
          name: "Sri Rajesh",
          role: "Treasurer",
        },
      ].map((leader, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden text-center"
        >
          <Image
            src={leader.img}
            alt={leader.name}
            width={350}
            height={350}
            className="w-full h-72 object-cover"
          />

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800">
              {leader.name}
            </h3>

            <p className="text-rose-600 font-semibold mt-2">
              {leader.role}
            </p>

            <p className="text-gray-500 mt-3 text-sm">
              Serving the Arya Vysya community with dedication,
              integrity, and commitment.
            </p>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>
      {/* Features */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-2xl  text-rose-600">
              Why Choose Us
            </h2>

            <p className="text-gray-500 mt-4">
              Trusted by thousands of Arya Vysya families.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

            {[
              {
                icon: <FaShieldAlt />,
                title: "Verified Profiles",
                desc: "Every profile goes through verification for better trust.",
              },
              {
                icon: <FaUsers />,
                title: "Large Community",
                desc: "Thousands of active bride and groom profiles.",
              },
              {
                icon: <FaHeart />,
                title: "Successful Matches",
                desc: "Helping families find their perfect life partner.",
              },
              {
                icon: <FaAward />,
                title: "Premium Service",
                desc: "Dedicated support and premium membership benefits.",
              },
              {
                icon: <FaHandshake />,
                title: "Trusted Support",
                desc: "Friendly customer support for every member.",
              },
              {
                icon: <FaCheckCircle />,
                title: "100% Secure",
                desc: "Your personal information is protected with privacy controls.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#fff7f8] rounded-2xl p-8 text-center shadow hover:shadow-xl transition"
              >
                <div className="text-5xl text-rose-600 flex justify-center mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              ["25,000+", "Registered Members"],
              ["15,000+", "Verified Profiles"],
              ["10,000+", "Happy Marriages"],
              ["24/7", "Customer Support"],
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >
                <h2 className="text-4xl font-bold text-rose-600">
                  {item[0]}
                </h2>

                <p className="mt-3 text-gray-500">
                  {item[1]}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      

    </main>
  );
}