import ProfileGallery from "@/components/ProfileGallery";
import ProfileInfo from "@/components/ProfileInfo";
import InterestButtons from "@/components/InterestButtons";

export default function ProfilePage() {
  return (
    <section className="bg-[#fafafa] min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-5">

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Left Side */}
            <ProfileGallery />

            {/* Right Side */}

            <div>

              <ProfileInfo />

              <div className="mt-8">
                <InterestButtons />
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}