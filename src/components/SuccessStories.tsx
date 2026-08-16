import Image from "next/image";

const stories = [
  {
    id: 1,
    image: "/images/couple1.jpg",
    name: "Sneha & Karthik",
    date: "Married on 15 Jan 2023",
    quote: `"Happy Matrimony helped us find each other. Thank you!"`,
  },
  {
    id: 2,
    image: "/images/couple12.jpg",
    name: "Pooja & Nithin",
    date: "Married on 10 Feb 2023",
    quote: `"We found our perfect match here. Very thankful!"`,
  },
  {
    id: 3,
    image: "/images/couple11.jpg",
    name: "Divya & Sandeep",
    date: "Married on 05 Mar 2023",
    quote: `"Trusted platform with genuine profiles!"`,
  },
];

export default function SuccessStories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center justify-between mb-10">

          <div className="text-center w-full">
            <h2 className="text-2xl  text-[#8B1E3F]">
              Success Stories
            </h2>

            <p className="text-gray-500 mt-2">
              Real people, real stories, real happiness
            </p>
          </div>

          <button className="hidden md:block absolute right-10 bg-white border border-rose-300 text-rose-600 px-5 py-2 rounded-lg hover:bg-rose-600 hover:text-white transition">
            View All
          </button>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          {stories.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >

              <div className="overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={600}
                  className="w-full h-80 object-cover hover:scale-105 transition duration-500"
                />

              </div>

              <div className="p-5">

                <h3 className=" text-xl text-[#8B1E3F]">
                  {item.name}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {item.date}
                </p>

                <p className="text-gray-600 mt-4 leading-7 italic">
                  {item.quote}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Mobile Button */}

        <div className="text-center mt-8 md:hidden">
          <button className="border border-rose-500 text-rose-600 px-6 py-3 rounded-lg hover:bg-rose-600 hover:text-white transition">
            View All
          </button>
        </div>

      </div>
    </section>
  );
}