import Image from "next/image";
import React, { useState,useContext } from "react";
import CreateFolderModal from "./Folder/CreateFolderModal";
import UploadFileModal from "./File/UploadFileModal";
import { useRouter } from "next/router";
import { Appstate } from "../context/AuthContext";
import Login from "../pages/Login";
import {TailSpin} from 'react-loader-spinner';



function SideNavBar() {
    const useAppstate = useContext(Appstate);

    const [activeIndex,setActiveIndex]=useState(0);
    const router=useRouter();

    const onMenuClick=(item,index)=>{
        setActiveIndex(index);
        router.push('/')
    }

    const showmoddal = ()=>{
      if(useAppstate.login ){
        window.upload_file.showModal();
      }
      else{
        swal({
          title:"Only admin can create folder",
          icon:"error",
          buttons:false,
          timer:3000
        })
      }
    }
    const foldermodal =()=>{
      if(useAppstate.login){
        window.my_modal_3.showModal()
      }
      else{
        swal({
          title:"Only admin can create folder",
          icon:"error",
          buttons:false,
          timer:3000
        })
      }
    }
    const logout =()=>{
      useAppstate.setLogin(false);
      swal({
        title:"Loged Out",
        icon:"success",
          buttons:false,
          timer:3000
    })
    }

    

  return (
    <div
      className="w-[200px]
    bg-white h-screen sticky top-0
    z-10 shadow-blue-200 shadow-md
    p-5"
    >
      
      <button
        onClick={showmoddal}
        className="flex gap-2 items-center text-[13px]
        bg-blue-500 p-2 text-white rounded-md px-3
        hover:scale-105 transition-all mt-5 w-full justify-center"
      >
        Add New File
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        className="flex gap-2 items-center text-[13px]
        bg-sky-400 w-full p-2 justify-center text-white rounded-md px-3
        hover:scale-105 transition-all mt-1"
        onClick={foldermodal}
      >
        Create Folder
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {useAppstate.login? 
        <button
        onClick={logout}
         className="flex gap-2 items-center text-[13px]
         bg-blue-500 p-2 text-white rounded-md px-3
          hover:scale-105 transition-all mt-5 w-full justify-center"
        >
          LOGOUT
          
      </button>
      :
      <button
           onClick={()=>router.push("/Login")}
         className="flex gap-2 items-center text-[13px]
         bg-blue-500 p-2 text-white rounded-md px-3
          hover:scale-105 transition-all mt-5 w-full justify-center"
        >
          LOGIN
          
      </button>
      }
      <button
        className="flex gap-2 items-center text-[13px]
        bg-sky-400 w-full p-2 justify-center text-white rounded-md px-3
        hover:scale-105 transition-all mt-1"
        onClick={()=>router.push("/")}
      >
        HOME
        
      </button>

      
        <dialog id="my_modal_3" className="modal">
            <CreateFolderModal/>
        </dialog>
        <dialog id="upload_file" className="modal">
            <UploadFileModal 
            closeModal={()=>window.upload_file.close()}/>
        </dialog>
      
    </div>
  );
}

export default SideNavBar;
