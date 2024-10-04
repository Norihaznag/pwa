"use client";

import { useState } from "react";

const Profile = () => {
    const [info, setInfo] = useState({
        identifier: 'haller',
        role: 'admin',
        email: 'nordin0aznag@gmail.com',
    });

    const d = {
        phone: '+212723525278',
        password: '',
        newpassword: '',
    }

    const inputs = Object.entries(info);




    return (
        <div className="min-h-screen">
            <h1 className="text-[1.6rem] text-white">Profile</h1>
            <div className="main grid md:grid-cols-3 mt-8 gap-4">

                {
                    inputs.map(([key, value], index) =>
                        <div key={index} className="input flex flex-col text-white " id={key}>
                            <label htmlFor={key} className="capitalize">{key}</label>
                            <input type={key} name={key} className="p-2 bg-black  " id="" />
                        </div>
                    )
                }

                <div className="input flex flex-col text-white " id="phone">
                    <label htmlFor="phone" className="capitalize">phone</label>
                    <input type="tel" name="phone" className="p-2 bg-black  " id="" />
                </div>



                <div className="input flex flex-col text-white ">
                    <label htmlFor="password" className="capitalize">password</label>
                    <input  type="password" name="password" className="p-2 bg-black  " id="password" />
                </div>


                <div className="input flex flex-col text-white ">
                    <label htmlFor="newpassword" className="capitalize">new password</label>
                    <input type="password" name="newpassword" className="p-2 bg-black  " id="newpassword" />
                </div>



            </div>
        </div>
    )
}

export default Profile