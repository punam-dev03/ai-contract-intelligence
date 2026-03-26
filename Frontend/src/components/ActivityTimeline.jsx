import { motion } from "framer-motion";

const ActivityTimeline = ({ contracts }) => {

if(!contracts || contracts.length === 0){
return (
<div className="text-gray-500">
No activity yet
</div>
)
}

return(

<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">

<h2 className="text-lg font-semibold mb-6 dark:text-white">
Recent Activity
</h2>

<div className="relative border-l border-gray-200 dark:border-slate-700 ml-4">

{contracts.slice(0,5).map((contract,index)=>{

return(

<motion.div
key={index}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.1}}
className="mb-8 ml-6"
>

{/* DOT */}

<span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-indigo-500 rounded-full ring-8 ring-white dark:ring-slate-800"></span>

{/* CONTENT */}

<h3 className="font-semibold text-gray-900 dark:text-white">
{contract.fileName}
</h3>

<p className="text-sm text-gray-500">

AI analyzed this contract and detected

<span className={`ml-1 font-medium ${
contract.overallRiskScore >= 70
? "text-red-500"
: contract.overallRiskScore >= 40
? "text-yellow-500"
: "text-green-500"
}`}>

{contract.overallRiskScore}% risk

</span>

</p>

<p className="text-xs text-gray-400 mt-1">
Contract uploaded and processed by AI
</p>

</motion.div>

)

})}

</div>

</div>

)

}

export default ActivityTimeline