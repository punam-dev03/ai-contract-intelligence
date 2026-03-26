import { useEffect, useState } from "react";
import API from "../api/api";

const Settings = () => {

const [name,setName] = useState("");
const [email,setEmail] = useState("");

const [currentPassword,setCurrentPassword] = useState("");
const [newPassword,setNewPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

useEffect(()=>{

const fetchUser = async()=>{

const res = await API.get("/users/me");

setName(res.data.name);
setEmail(res.data.email);

};

fetchUser();

},[]);

const updateProfile = async()=>{

await API.put("/users/update",{name,email});

alert("Profile updated");

};

const changePassword = async()=>{

if(newPassword !== confirmPassword){
return alert("Passwords do not match");
}

await API.put("/users/change-password",{
currentPassword,
newPassword
});

alert("Password updated");

};

return(

<div className="space-y-8">

{/* Profile Settings */}

<div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg space-y-6">

<h2 className="text-xl font-bold dark:text-white">
Profile Settings
</h2>

<div className="grid md:grid-cols-2 gap-4">

<input
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
className="p-3 border rounded-lg"
/>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="p-3 border rounded-lg"
/>

</div>

<button
onClick={updateProfile}
className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
Save Changes
</button>

</div>

{/* Password */}

<div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg space-y-6">

<h2 className="text-xl font-bold dark:text-white">
Password & Security
</h2>

<input
type="password"
placeholder="Current Password"
value={currentPassword}
onChange={(e)=>setCurrentPassword(e.target.value)}
className="w-full p-3 border rounded-lg"
/>

<input
type="password"
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
className="w-full p-3 border rounded-lg"
/>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
className="w-full p-3 border rounded-lg"
/>

<button
onClick={changePassword}
className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
>
Change Password
</button>

</div>

</div>

)

};

export default Settings;