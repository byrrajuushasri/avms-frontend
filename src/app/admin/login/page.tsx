"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaLock,
  FaHeart,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    // API call here
    // router.push("/admin/dashboard")
  };


  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fffdfd] via-[#fff7f8] to-[#fdecef]">

      {/* Background */}
      <div className="absolute -left-52 top-24 w-[500px] h-[500px] rounded-full bg-pink-200/40 blur-[120px]" />

      <div className="absolute -right-56 bottom-0 w-[520px] h-[520px] rounded-full bg-rose-200/40 blur-[120px]" />


      {/* Hearts */}

      <FaHeart className="absolute left-10 top-52 text-pink-300 text-7xl opacity-20" />

      <FaHeart className="absolute right-24 top-36 text-pink-300 text-5xl opacity-20" />


      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">


        <div className="
        w-full max-w-md 
        bg-white/95 
        backdrop-blur-md
        rounded-[30px]
        shadow-[0_20px_60px_rgba(233,30,99,0.15)]
        border border-pink-100
        p-10
        ">


          {/* Logo */}

          <div className="text-center mb-8">

            <div className="
            mx-auto mb-4
            w-16 h-16
            rounded-full
            bg-gradient-to-r from-[#d81b60] to-[#f06292]
            flex items-center justify-center
            text-white text-3xl
            ">

              <FaHeart />

            </div>


            <h1 className="text-2xl font-bold text-[#8B1E3F]">
              Admin Login
            </h1>


            <p className="text-sm text-gray-500 mt-2">
              Welcome back! Please login to continue
            </p>


          </div>



          <form 
          onSubmit={handleSubmit}
          className="space-y-5">


            {/* Email */}

            <div>

              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>


              <div className="
              mt-2 flex items-center 
              h-12 px-4 rounded-xl
              border border-[#f2d9df]
              focus-within:ring-2
              focus-within:ring-pink-100
              ">


                <FaEnvelope className="text-rose-500 mr-3"/>


                <input

                value={formData.email}

                onChange={(e)=>
                  setFormData({
                    ...formData,
                    email:e.target.value
                  })
                }

                type="email"
                placeholder="Enter email"
                className="w-full outline-none text-sm"

                />

              </div>

            </div>



            {/* Password */}

            <div>


            <div className="flex justify-between">

            <label className="text-sm font-medium text-gray-600">
              Password
            </label>


            <Link
            href="/forgot-password"
            className="text-sm text-rose-500"
            >
              Forgot?
            </Link>


            </div>



            <div className="
            mt-2 flex items-center 
            h-12 px-4 rounded-xl
            border border-[#f2d9df]
            ">


            <FaLock className="text-rose-500 mr-3"/>


            <input

            value={formData.password}

            onChange={(e)=>
              setFormData({
                ...formData,
                password:e.target.value
              })
            }


            type={
              showPassword 
              ? "text" 
              : "password"
            }

            placeholder="Enter password"

            className="w-full outline-none text-sm"

            />


            <button
            type="button"
            onClick={()=>
              setShowPassword(!showPassword)
            }
            >

            {
              showPassword 
              ?
              <FaEyeSlash className="text-gray-500"/>
              :
              <FaEye className="text-gray-500"/>
            }


            </button>


            </div>

            </div>




            {/* Remember */}

            <div className="flex items-center gap-2">

              <input 
              type="checkbox"
              className="accent-rose-600"
              />

              <span className="text-sm text-gray-600">
                Remember me
              </span>

            </div>




            {/* Button */}

            <Link href="/admin/dashboard">
  <button
    type="button"
    className="
      w-full h-12
      rounded-xl
      bg-gradient-to-r
      from-[#d81b60]
      to-[#f06292]
      text-white
      font-semibold
      shadow-lg
      hover:scale-[1.02]
      transition
    "
  >
    Login
  </button>
</Link>


          </form>


        </div>


      </div>


    </section>
  );
}