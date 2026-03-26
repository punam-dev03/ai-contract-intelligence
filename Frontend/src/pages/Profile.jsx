import { useEffect, useState } from "react";
import API from "../api/api";

const Profile = () => {

  const [user,setUser] = useState(null);

  useEffect(()=>{

    const fetchUser = async()=>{

      const res = await API.get("/users/me");

      setUser(res.data);

    };

    fetchUser();

  },[]);

  if(!user){
    return <div className="text-center mt-20">Loading profile...</div>
  }

  return(

    <div className="space-y-8">

      {/* Profile Card */}

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg flex items-center gap-6">

        <img
        src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`}
        className="w-20 h-20 rounded-full"
        />

        <div>

          <h2 className="text-2xl font-bold dark:text-white">
            {user.name}
          </h2>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">

          <p className="text-gray-500 text-sm">
            Contracts Uploaded
          </p>

          <h3 className="text-2xl font-bold mt-2">
            12
          </h3>

        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">

          <p className="text-gray-500 text-sm">
            Average Risk Score
          </p>

          <h3 className="text-2xl font-bold mt-2">
            46%
          </h3>

        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">

          <p className="text-gray-500 text-sm">
            Total Penalty Exposure
          </p>

          <h3 className="text-2xl font-bold mt-2">
            ₹2.3L
          </h3>

        </div>

      </div>

    </div>

  )

};

export default Profile;