"use client";


import {useState} from "react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";


export default function AdminLayout({
children
}:{
children:React.ReactNode
}){


const [open,setOpen]=useState(false);



return (

<div className="min-h-screen bg-white">


<AdminSidebar
open={open}
setOpen={setOpen}
/>



<div className="
lg:ml-72
">


<AdminHeader
setOpen={setOpen}
/>


<main className="p-6">

{children}

</main>


</div>



</div>

)

}