import { motion } from "framer-motion";

const RedFlagPanel = ({ contract }) => {

if(!contract || !contract.clauses) return null

const redFlags = contract.clauses.filter(c => c.severity >= 60)

if(redFlags.length === 0){
return(
<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">
No major red flags detected
</div>
)
}

return(

<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">

<h2 className="text-lg font-semibold mb-6 dark:text-white">
⚠️ Contract Red Flags
</h2>

<div className="space-y-4">

{redFlags.map((flag,index)=>{

return(

<motion.div
key={index}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.1}}
className="border-b pb-3"
>

<div className="flex justify-between">

<span className="font-medium dark:text-white">
{flag.category}
</span>

<span className="text-red-500 font-semibold">
{flag.severity}% Risk
</span>

</div>

<p className="text-sm text-gray-500 mt-1">
{flag.explanation}
</p>

</motion.div>

)

})}

</div>

</div>

)

}

export default RedFlagPanel