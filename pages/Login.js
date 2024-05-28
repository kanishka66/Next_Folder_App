import React, { useContext, useState } from "react";
import Signup from "./SignUp";
import { useRouter } from 'next/router';
import { query,getDocs,where } from "firebase/firestore";
import { usersRef } from "../Config/FirebaseConfig";
import bcrypt from 'bcryptjs';
import { Appstate } from "../context/AuthContext";
import swal from 'sweetalert';
import {TailSpin} from 'react-loader-spinner';

const Login = () => {
  const router=useRouter();
  const useAppstate = useContext(Appstate);
  const [form,setform] = useState({
      mobile:"",
      password:"",
  });
  const [loading,setLoading] = useState(false);

  const login = async () =>{
      setLoading(true);
      try{
          const quer = query(usersRef,where('mobile','==',form.mobile))
          const querySnapshot = await getDocs(quer);

  querySnapshot.forEach((doc)=>{
      const _data = doc.data();
      const isUser = bcrypt.compareSync(form.password , _data.password);
      if(isUser){
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          useAppstate.setUserNumber(_data.mobile);
          swal({
              title:"Logged In",
              icon:"success",
          buttons:false,
          timer:3000
      })
      router.push('/');
  }
      else{
          swal({
            title:error.message,
            icon:"error",
            buttons:false,
            timer:3000
          })
      }
  })

  } catch(error) {
       swal({
          title:error.message,
          icon:"error",
          buttons:false,
          timer:3000
      })
  }
  setLoading(false);
  }
  return (
    <div className="w-full mt-8 flex flex-col items-center">
      <h1 className="text-xl font-bold">Login</h1>
      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label for="message" className="leading-7 text-sm ">
            Mobile No.
          </label>
          <input
            type={"number"}
            value={form.mobile}
             onChange={(e)=>setform({...form,mobile:e.target.value})}
            id="message"
            name="message"
            className="w-full bg-white rounded border border-gray-300  focus:border-indigo-500    focus:bg-white focus:ring-2 focus:ring-indigo text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
        </div>
      </div>

      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label for="message" className="leading-7 text-sm ">
            Password
          </label>
          <input
            type={'password'}
             value={form.password}
             onChange={(e)=>setform({...form,password:e.target.value})}
            id="message"
            name="message"
            className="w-full bg-white rounded border border-gray-300  focus:border-indigo-500    focus:bg-white focus:ring-2 focus:ring-indigo text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
        </div>
      </div>
      <div className="p-2 w-full">
        <button
          onClick={login}
          className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg"
        >
          {loading?<TailSpin height={25} color='white'/>:'Login'}
        </button>
      </div>
      <div>
        <p>
          Do not have account?
          <button onClick={()=>{router.push("/SignUp")}}
            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg"
          >
            <span className="">Sign Up</span>
          </button>
          
        </p>
      </div>
    </div>
  );
};

export default Login;
