"use client";


import {
FaBars,
FaBell,
FaUserCircle
} from "react-icons/fa";


export default function AdminHeader({
setOpen
}:any){


return (

<header className="
h-20
bg-white
border-b
border-pink-100
flex
items-center
justify-between
px-6
lg:px-8
">


<button

onClick={()=>setOpen(true)}

className="
lg:hidden
text-xl
text-[#8B1E3F]
"

>

<FaBars/>

</button>




<div>

<h2 className="
font-semibold
text-black
">

Welcome Admin 👋

</h2>


</div>





<div className="
flex
items-center
gap-6
">


<button className="relative">

<FaBell className="text-gray-500 text-xl"/>

<span className="
absolute
top-0
right-0
w-2
h-2
bg-gray-50/80
rounded-full
"/>


</button>




<div className="
flex
items-center
gap-2
">


<FaUserCircle 
className="
text-3xl
bg-gray-50/80
"/>


<div className="hidden md:block">

<p className="text-sm font-medium">
Admin
</p>

<p className="text-xs text-gray-400">
Super Admin
</p>


</div>


</div>


</div>



</header>

)


}