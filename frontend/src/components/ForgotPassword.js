import React,{useState} from 'react';
import axios from 'axios';
const ForgotPassword = (props) => {
    const[otp,setOtp]=useState("");
    const[email,setEmail]=useState("");
    const[username,setUsername]=useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [inputOtp, setInputOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const emailHandeler=async(e)=>{
        e.preventDefault();
        await axios.post("http://127.0.0.1:8000/reset-password",{email:email}).then((response)=>{
            console.log(response.data);
            setOtp(response.data.otp)
        })
    }
    const validateOtp=async(e)=>{
        e.preventDefault();
        if(otp==inputOtp){
            setOtpVerified(true);
        }
    }
    const sendNewPassword=async(e)=>{
        e.preventDefault();
        await axios.post(`http://127.0.0.1:8000/update-password`,{username,newPassword}).then(()=>{
            alert("Password Updated Successfully");
            props.history.push("/user/login");
        })
        
    }
    return(
        <>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <form className="text-center border border-light p-5" action="#!">
                        <p className="h4 mb-4">Forgot Password</p>
                        <input type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" onChange={(e)=>{
                            setEmail(e.target.value)
                        }}/>
                        <input type="text" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="username" onChange={(e)=>{
                            setUsername(e.target.value)
                        }}/>
                        <button className="btn btn-info btn-block my-4" type="submit" onClick={emailHandeler}>Send</button>
                    </form>
                </div>
                </div>
            </div>

            
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <form className="text-center border border-light p-5" action="#!">
                        <p className="h4 mb-4">Enter OTP</p>
                        <input type="text" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="OTP" onChange={(e)=>{
                            setInputOtp(e.target.value)
                        }} />
                        <button className="btn btn-info btn-block my-4" type="submit" onClick={validateOtp}>Verify</button>
                    </form>
                </div>
                </div>
            </div>
            
            {otpVerified && (<>
            <div className="container py-5 h-100">
                <h1>OTP Verified</h1>
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <form className="text-center border border-light p-5" action="#!">
                        <p className="h4 mb-4">Enter New Password</p>
                        <input type="password" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="New Password" onChange={(e)=>{
                            setNewPassword(e.target.value)
                        }} />
                        <button className="btn btn-info btn-block my-4" type="submit" onClick={sendNewPassword}>Change</button>
                    </form>
                </div>
                </div>
            </div>
            </>)}
        </>
    )
}
export default ForgotPassword;