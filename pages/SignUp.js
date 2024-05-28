import React, { useState } from 'react';
import Login from './Login';
import { useRouter } from 'next/router';
import {getAuth,signInWithPhoneNumber,RecaptchaVerifier} from 'firebase/auth'
import { app ,usersRef} from '../Config/FirebaseConfig';
import swal from 'sweetalert';
import bcrypt from 'bcryptjs';
import {TailSpin} from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';

const auth = getAuth(app);

const Signup = () => {
    const router=useRouter();
    const [form,setform] = useState({
        name:"",
        mobile:"",
        password:"",
    });
    const [loading,setLoading] = useState(false);
    const [otpSent,setOtpSent] = useState(false);
    const [OTP,setOTP] = useState("");

    

    const generateRecaptha = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        
      }
    });
    }
    const requestOtp = () => {
        setLoading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth,`+91${form.mobile}`,appVerifier)
        .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            swal({
                text:"OTP Sent",
                icon:"success",
                buttons:false,
                timer:3000,
            });
            setOtpSent(true);
            setLoading(false);
        }).catch((error) => {
            console.log(error)
        })
    }

    const verifyOTP =  ()=> {
        try{
            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();

                swal({
                    text:"Sucessfully Registered",
                    icon:"success",
                    buttons:false,
                    timer: 3000,
                });
                router.push('/Login');
                setLoading(false);
            })
        } catch (error){
            console.log(error);
        }
    }

    const uploadData = async ()=>{
        const salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(form.password,salt);
        
        await addDoc(usersRef,{
            name:form.name,
            password:hash,
            mobile: form.mobile
        });
    }

    
  return (
    <div className='w-full mt-8 flex flex-col items-center'>
        <h1 className='text-xl font-bold'>Sign Up</h1>
       {
       otpSent?
            <>
            <div className="p-2 w-full md:w-1/3">
               <div className="relative">
               <label for="message" className="leading-7 text-sm ">Enter OTP</label>
               <input 
                value={form.OTP}

                onChange={(e) => setOTP(e.target.value)}
                id="message"
                name="message" className="w-full bg-white rounded border border-gray-300  focus:border-indigo-500    focus:bg-white focus:ring-2 focus:ring-indigo text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                </div>
            </div>
            <div className="p-2 w-full">
                <button 
                onClick={verifyOTP}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg">
                    {loading?<TailSpin height={25} color='white'/>:'Confirm OTP'}
                    </button>
            </div>
     </>
       :
        <>
      <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label for="message" className="leading-7 text-sm ">Name</label>
            <input
             value={form.name} 
             onChange={(e)=>setform({...form,name:e.target.value})} 
             id="message" 
             name="message" className="w-full bg-white rounded border border-gray-300  focus:border-indigo-500    focus:bg-white focus:ring-2 focus:ring-indigo text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
          </div>
        </div>
      <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label for="message" className="leading-7 text-sm ">Mobile No.</label>
            <input 
            type={"number"}
            value={form.mobile}
             onChange={(e)=>setform({...form,mobile:e.target.value})}
              id="message"
              name="message" className="w-full bg-white rounded border border-gray-300  focus:border-indigo-500    focus:bg-white focus:ring-2 focus:ring-indigo text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
          </div>
        </div>
       
        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label for="message" className="leading-7 text-sm ">Password</label>
            <input
            type={'password'}
             value={form.password} 
             onChange={(e)=>setform({...form,password:e.target.value})} 
             id="message" 
             name="message" className="w-full bg-white rounded border border-gray-300  focus:border-indigo-500    focus:bg-white focus:ring-2 focus:ring-indigo text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
          </div>
        </div>
        
        <div className="p-2 w-full">
          <button 
          onClick={requestOtp}
          className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg">
            {loading?<TailSpin height={25} color='white'/>:'Request OTP'}
            </button>
        </div>
        <div>
            <p>Already have an account? 
            <button onClick={()=>{router.push("/Login")}}
            className="flex gap-2 items-center text-[13px]
                   bg-blue-500 p-2 text-white rounded-md px-3
                          hover:scale-105 transition-all mt-5 w-full justify-center"
          >
            <span >Login</span>
            </button>
            </p>
            <div id='recaptcha-container'></div>
        </div>
        </>
       }
    </div>
  )
}

export default Signup

