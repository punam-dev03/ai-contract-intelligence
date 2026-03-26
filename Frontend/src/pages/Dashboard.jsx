import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/api";
import AnalyticsCharts from "../components/AnalyticsCharts";
import ActivityTimeline from "../components/ActivityTimeline";
import RiskLeaderboard from "../components/RiskLeaderboard";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
LineChart,
Line,
CartesianGrid
} from "recharts";

const Dashboard = () => {

const [analytics,setAnalytics] = useState(null)
const [contracts,setContracts] = useState([])
const [riskData,setRiskData] = useState([])
const [recent,setRecent] = useState([])


// ================= LOAD ANALYTICS =================

useEffect(()=>{

API.get("/analytics/dashboard")
.then(res=>{
setAnalytics(res.data)
})
.catch(err=>{
console.log(err)
})

},[])


// ================= LOAD CONTRACTS =================

useEffect(()=>{

API.get("/contracts/my")
.then(res=>{

setContracts(res.data)

const clauses=[]
const activity=[]

res.data.forEach(contract=>{

activity.push({
name:contract.fileName,
risk:contract.overallRiskScore
})

contract.clauses?.forEach(c=>{
clauses.push({
name:c.category,
risk:c.severity
})
})

})

setRiskData(clauses)
setRecent(activity.slice(0,5))

})

},[])



if(!analytics){

return(
<div className="text-center mt-20 dark:text-white">
Loading dashboard...
</div>
)

}


// ================= UI =================

return(

<div className="space-y-10">

{/* TITLE */}

<h1 className="text-3xl font-semibold dark:text-white">
Dashboard
</h1>



{/* ================= KPI CARDS ================= */}

<div className="grid md:grid-cols-3 gap-6">

<motion.div
whileHover={{scale:1.03}}
className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 shadow-sm"
>

<p className="text-gray-500 text-sm">
Total Contracts
</p>

<h2 className="text-3xl font-bold mt-2 dark:text-white">
{analytics.totalContracts}
</h2>

</motion.div>


<motion.div
whileHover={{scale:1.03}}
className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 shadow-sm"
>

<p className="text-gray-500 text-sm">
High Risk Contracts
</p>

<h2 className="text-3xl font-bold mt-2 text-red-500">
{analytics.highRiskCount}
</h2>

</motion.div>


<motion.div
whileHover={{scale:1.03}}
className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 shadow-sm"
>

<p className="text-gray-500 text-sm">
Industries Covered
</p>

<h2 className="text-3xl font-bold mt-2 dark:text-white">
{analytics.avgRiskByIndustry?.length || 0}
</h2>

</motion.div>

</div>



{/* ================= RISK ANALYTICS ================= */}

<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">

<h2 className="text-lg font-semibold mb-6 dark:text-white">
Contract Risk Overview
</h2>

<AnalyticsCharts data={analytics}/>

</div>



{/* ================= CLAUSE HEATMAP ================= */}

<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">

<h2 className="text-lg font-semibold mb-6 dark:text-white">
Clause Risk Heatmap
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={riskData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="risk" fill="#4f46e5"/>

</BarChart>

</ResponsiveContainer>

</div>



{/* ================= TWO COLUMN SECTION ================= */}

<div className="grid md:grid-cols-2 gap-6">


{/* RECENT ACTIVITY */}

<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">

<h2 className="text-lg font-semibold mb-4 dark:text-white">
Recent Contract Activity
</h2>

<div className="space-y-3">

{recent.map((r,i)=>(

<div
key={i}
className="flex justify-between border-b pb-2 text-sm"
>

<span className="dark:text-gray-200">
{r.name}
</span>

<span className={`font-semibold ${
r.risk >= 70
? "text-red-500"
: r.risk >= 40
? "text-yellow-500"
: "text-green-500"
}`}>

{r.risk}% Risk

</span>

</div>

))}

</div>

</div>



{/* TOP RISK CONTRACTS */}

<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">

<h2 className="text-lg font-semibold mb-4 dark:text-white">
Top Risky Contracts
</h2>

<ResponsiveContainer width="100%" height={250}>

<LineChart data={recent}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="risk"
stroke="#ef4444"
strokeWidth={2}
/>

</LineChart>

</ResponsiveContainer>

</div>


</div>



{/* ================= AI INSIGHTS ================= */}

<div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700">

<h2 className="text-lg font-semibold mb-4 dark:text-white">
Risk Insights
</h2>

<p className="text-gray-600 dark:text-gray-300">

Most contracts show elevated risk in termination clauses
and penalty conditions. Negotiating payment timelines
and liability caps may significantly reduce overall risk.

</p>

</div>
{/* ACTIVITY TIMELINE */}

<div className="grid md:grid-cols-2 gap-6">

<ActivityTimeline contracts={contracts}/>

<RiskLeaderboard contracts={contracts}/>

</div>

</div>

)

}

export default Dashboard