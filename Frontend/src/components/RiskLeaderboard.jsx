import { motion } from "framer-motion";

const RiskLeaderboard = ({ contracts }) => {

if(!contracts || contracts.length === 0){
return (
<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">
No contracts found
</div>
)
}

const sorted = [...contracts]
.sort((a,b)=>b.overallRiskScore - a.overallRiskScore)
.slice(0,5)

return(

<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">

<h2 className="text-lg font-semibold mb-6 dark:text-white">
Top Risky Contracts
</h2>

<div className="space-y-4">

{sorted.map((c,index)=>{

return(

<motion.div
key={index}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.1}}
className="flex justify-between items-center border-b pb-3"
>

<div className="flex items-center gap-3">

<span className="text-sm font-semibold text-gray-500">
#{index+1}
</span>

<span className="dark:text-white">
{c.fileName}
</span>

</div>

<span className={`font-semibold ${
c.overallRiskScore >= 70
? "text-red-500"
: c.overallRiskScore >= 40
? "text-yellow-500"
: "text-green-500"
}`}>

{c.overallRiskScore}%

</span>

</motion.div>

)

})}

</div>

</div>

)

}

export default RiskLeaderboard