"use client";
import { FaDownload, FaUserCircle } from "react-icons/fa";

export default function MemberDetails() {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">

        <div className="text-center">
          <FaUserCircle className="mx-auto text-7xl text-rose-600" />
          <h2 className="text-2xl  text-rose-600 mt-4">Member Details</h2>
          <p className="text-green-600">Registration Successful 🎉</p>
        </div>

        <div className="mt-8 space-y-4">

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Member ID</span>
            <span>AV10001</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Name</span>
            <span>Ramanaraju</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Mobile</span>
            <span>9876543210</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email</span>
            <span>demo@gmail.com</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Gender</span>
            <span>Male</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Membership</span>
            <span className="text-green-600 font-semibold">Gold</span>
          </div>

        </div>

        {/* Download Button */}
        <button
          onClick={() => window.print()}
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
        >
          <FaDownload />
          Download Card
        </button>

        {/* Download Button */}
        <button
          onClick={() => window.print()}
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
        >
          <FaDownload />
          Download Receipt
        </button>


      </div>
    </div>
  );
}