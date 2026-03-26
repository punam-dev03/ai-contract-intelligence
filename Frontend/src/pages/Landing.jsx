import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Landing = () => {

const [stats,setStats] = useState({
risk:6.8,
fairness:"Moderate",
penalty:200000
})
const riskChartData = [
{ clause:"Penalty", risk:80 },
{ clause:"Termination", risk:60 },
{ clause:"Payment", risk:40 },
{ clause:"Liability", risk:70 }
]
const [demoOpen,setDemoOpen] = useState(false)
const [scanStep,setScanStep] = useState(0)
const [uploading,setUploading] = useState(false)
const [activeSection,setActiveSection] = useState("")
useEffect(()=>{

const interval = setInterval(()=>{

setStats({
risk:(Math.random()*4+5).toFixed(1),
fairness:Math.random()>0.5?"Moderate":"High",
penalty:Math.floor(Math.random()*200000+100000)
})

},4000)

return ()=>clearInterval(interval)

},[])
useEffect(()=>{

const steps=[0,1,2]

let i=0

const interval=setInterval(()=>{

setScanStep(steps[i])

i=(i+1)%steps.length

},2000)

return ()=>clearInterval(interval)

},[])
useEffect(()=>{

const handleScroll=()=>{

const sections=["features","platform","workflow","cta"]

let current=""

sections.forEach(id=>{

const element=document.getElementById(id)

if(element){

const top=element.offsetTop-120

if(window.scrollY>=top){

current=id

}

}

})

setActiveSection(current)

}

window.addEventListener("scroll",handleScroll)

return ()=>window.removeEventListener("scroll",handleScroll)

},[])
return (

<div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">


{/* NAVBAR */}

<header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">

<div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

<Logo/>

<nav className="flex items-center gap-8 text-sm font-medium">

<a
href="#features"
className={`hover:text-indigo-600 ${activeSection==="features"?"text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1":""}`}
>
Features
</a>

<a
href="#platform"
className={`hover:text-indigo-600 ${activeSection==="platform"?"text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1":""}`}
>
Platform
</a>

<a
href="#workflow"
className={`hover:text-indigo-600 ${activeSection==="workflow"?"text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1":""}`}
>
Workflow
</a>

<a
href="#cta"
className={`hover:text-indigo-600 ${activeSection==="cta"?"text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1":""}`}
>
Start
</a>

<Link to="/login" className="hover:text-indigo-600">
Login
</Link>

<Link
to="/register"
className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
>
Create Account
</Link>

</nav>

</div>

</header>


{/* HERO */}

<section className="max-w-7xl mx-auto px-8 mt-24 grid md:grid-cols-2 gap-20 items-center">

<div>

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
className="text-5xl font-bold leading-tight"
>

AI Contract Intelligence Platform

</motion.h1>

<p className="mt-6 text-gray-600 text-lg">

Analyze contracts using AI clause intelligence,
risk scoring, negotiation simulation and financial impact modeling.

</p>

<div className="mt-10 flex gap-6">

<Link
to="/register"
className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
>
Start Free
</Link>
<Link
to="/login"
className="px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-100"
>
Sign In
</Link>

</div>

</div>


{/* LIVE DEMO PANEL */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
whileHover={{scale:1.02}}
transition={{duration:0.3}}
className="bg-white border rounded-2xl shadow-xl p-8 hover:shadow-2xl transition duration-500 cursor-pointer"
>

<div className="space-y-6">

<div className="p-4 bg-gray-50 rounded-lg border">

<h4 className="text-sm text-gray-500">
Risk Score
</h4>

<p className="text-2xl font-bold text-indigo-600">
{stats.risk}/10
</p>

</div>

<div className="p-4 bg-gray-50 rounded-lg border">

<h4 className="text-sm text-gray-500">
Fairness Index
</h4>

<p className="text-xl font-semibold">
{stats.fairness}
</p>

</div>

<div className="p-4 bg-gray-50 rounded-lg border">

<h4 className="text-sm text-gray-500">
Penalty Exposure
</h4>

<p className="text-xl font-semibold text-red-600">
₹ {stats.penalty.toLocaleString()}
</p>

</div>

</div>

</motion.div>

</section>
<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-24"></div>
<div className="max-w-4xl mx-auto mt-16 bg-white border rounded-xl shadow-lg p-8 hover:shadow-2xl transition">

<h3 className="text-xl font-semibold mb-6 text-center">
AI Contract Scanner Demo
</h3>

<div className="grid md:grid-cols-3 gap-6 text-center">

{/* Upload */}

<div className={`p-6 rounded-lg border transition
${scanStep===0 ? "bg-indigo-50 border-indigo-500" : "bg-gray-50"}
`}>

<div className="text-3xl mb-2">📤</div>

<h4 className="font-semibold">
Upload Contract
</h4>

<p className="text-sm text-gray-500 mt-2">
Upload PDF contract for AI analysis
</p>

</div>


{/* AI Scanning */}

<div className={`p-6 rounded-lg border transition
${scanStep===1 ? "bg-indigo-50 border-indigo-500" : "bg-gray-50"}
`}>

<div className={`text-3xl mb-2 ${scanStep===1 ? "animate-pulse" : ""}`}>
🤖
</div>

<h4 className="font-semibold">
AI Scanning
</h4>

<p className="text-sm text-gray-500 mt-2">
AI extracts clauses and evaluates risks
</p>

</div>


{/* Risk Score */}

<div className={`p-6 rounded-lg border transition
${scanStep===2 ? "bg-indigo-50 border-indigo-500" : "bg-gray-50"}
`}>

<div className="text-3xl mb-2">📊</div>

<h4 className="font-semibold">
Risk Score
</h4>

<p className="text-sm text-gray-500 mt-2">
Generate contract risk insights instantly
</p>

</div>

</div>

</div>
<div className="max-w-3xl mx-auto mt-16">

<h3 className="text-xl font-semibold text-center mb-6">
Try Uploading a Contract
</h3>

<div
onClick={()=>setUploading(true)}
className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-indigo-500 hover:bg-indigo-50 transition cursor-pointer"
>

<div className="text-4xl mb-4">
📄
</div>

<p className="text-gray-600">
Drag & drop your contract PDF here
</p>

<p className="text-gray-400 text-sm mt-2">
or click to browse files
</p>

</div>

{/* AI Processing Message */}

{uploading && (

<div className="text-center mt-6 text-indigo-600 animate-pulse">

AI is analyzing your contract...

</div>

)}

</div>
<div className="max-w-3xl mx-auto mt-12 text-center">

<h4 className="font-semibold mb-3">
Example Risk Score
</h4>

<div className="bg-gray-200 rounded-full h-4 overflow-hidden">

<div className="bg-red-500 h-4 w-[70%]"></div>

</div>

<p className="text-sm text-gray-500 mt-2">
Risk Level: High
</p>

</div>
<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-24"></div>
<div className="max-w-4xl mx-auto mt-16">

<h3 className="text-xl font-semibold text-center mb-6">
AI Risk Visualization
</h3>

<div className="bg-white border rounded-xl shadow-lg p-8">

<ResponsiveContainer width="100%" height={300}>

<BarChart data={riskChartData}>

<XAxis dataKey="clause" />

<YAxis />

<Tooltip />

<Bar dataKey="risk" fill="#6366f1" />

</BarChart>

</ResponsiveContainer>

</div>

</div>
<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-24"></div>
{/* FEATURES */}

<section id="features" className="max-w-7xl mx-auto px-8 mt-32">

<h2 className="text-3xl font-bold text-center mb-20">
Core Platform Features
</h2>

<div className="grid md:grid-cols-3 gap-12">

{[
{
title:"Clause Intelligence",
icon:"📄",
desc:"AI automatically extracts contract clauses and categorizes them into termination, penalty, payment and obligations."
},

{
title:"Risk Scoring",
icon:"📊",
desc:"Advanced hybrid algorithms calculate an objective legal risk score based on clause severity and penalties."
},

{
title:"Negotiation Simulator",
icon:"⚖️",
desc:"Simulate negotiation scenarios to understand how modifying clauses affects risk and financial exposure."
},

{
title:"Contract Comparison",
icon:"🔍",
desc:"Compare two contracts or versions and detect structural differences in clauses and risk levels."
},

{
title:"Financial Impact Simulation",
icon:"💰",
desc:"Estimate how contract penalties impact your monthly income, savings and recovery time."
},

{
title:"AI Risk Dashboard",
icon:"📈",
desc:"Visualize contract insights with analytics charts including risk distribution and clause severity."
}

].map((f,i)=>(

<motion.div
key={i}
whileHover={{y:-10,scale:1.05,rotate:0.3}}
transition={{duration:0.25}}
className="p-8 bg-white border rounded-xl shadow-sm hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-2 transition cursor-pointer"
>

<div className="text-4xl mb-4">
{f.icon}
</div>

<h3 className="font-semibold text-lg mb-2">
{f.title}
</h3>

<p className="text-gray-600 text-sm leading-relaxed">
{f.desc}
</p>

</motion.div>

))}

</div>

</section>

<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-24"></div>
{/* PLATFORM */}

<section id="platform" className="max-w-7xl mx-auto px-8 mt-32">

<h2 className="text-3xl font-bold text-center mb-24">
AI Platform Architecture
</h2>

<div className="space-y-24">

<div className="grid md:grid-cols-2 gap-20 items-center">

<div>

<h3 className="text-2xl font-semibold mb-4">
AI Contract Analysis
</h3>

<p className="text-gray-600">
Upload contracts and automatically extract clauses,
penalties and obligations using AI.
</p>

</div>
<motion.div
whileHover={{scale:1.05, rotate:0.5}}
transition={{duration:0.3}}
className="bg-indigo-50 rounded-xl p-8 shadow text-center text-indigo-600 font-semibold cursor-pointer"
>
AI Analysis Preview
</motion.div>

</div>


<div className="grid md:grid-cols-2 gap-20 items-center">
<motion.div
whileHover={{scale:1.05, rotate:0.5}}
transition={{duration:0.3}}
className="bg-indigo-50 rounded-xl p-8 shadow text-center text-indigo-600 font-semibold cursor-pointer"
>
Clause Intelligence Engine
</motion.div>

<div>

<h3 className="text-2xl font-semibold mb-4">
Clause Intelligence
</h3>

<p className="text-gray-600">
Understand contract structure and negotiation risk.
</p>

</div>

</div>


<div className="grid md:grid-cols-2 gap-20 items-center">

<div>

<h3 className="text-2xl font-semibold mb-4">
Negotiation Simulation
</h3>

<p className="text-gray-600">
Simulate negotiation impact and evaluate financial exposure.
</p>

</div>
<motion.div
whileHover={{scale:1.05, rotate:0.5}}
transition={{duration:0.3}}
className="bg-indigo-50 rounded-xl p-8 shadow text-center text-indigo-600 font-semibold cursor-pointer"
>
Negotiation Engine
</motion.div>

</div>

</div>

</section>

<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-24"></div>
{/* WORKFLOW */}

<section id="workflow" className="max-w-6xl mx-auto px-8 mt-32">

<h2 className="text-3xl font-bold text-center mb-20">
AI Contract Intelligence Workflow
</h2>

<div className="grid md:grid-cols-4 gap-10 text-center">

{[
"Upload Contract",
"AI Clause Extraction",
"Risk Score Calculation",
"Negotiation Insights"
].map((step,i)=>(

<motion.div key={i} whileHover={{scale:1.05}}>

<div className="w-12 h-12 mx-auto bg-indigo-600 text-white flex items-center justify-center rounded-full mb-4">
{i+1}
</div>

<p className="font-medium text-gray-700">
{step}
</p>

</motion.div>

))}

</div>

</section>

<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-24"></div>
{/* TRUST SECTION */}

<section className="max-w-6xl mx-auto px-8 mt-24 text-center">

<p className="text-gray-500 text-sm mb-8">
Built with modern AI infrastructure
</p>

<div className="flex justify-center gap-12 text-gray-400 font-semibold">

<span>OpenAI</span>
<span>MongoDB</span>
<span>React</span>
<span>Node.js</span>

</div>

</section>
<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-24"></div>

{/* CTA */}

<section id="cta" className="max-w-5xl mx-auto mt-32 text-center pb-32">

<h2 className="text-4xl font-bold">
Analyze Contracts With AI
</h2>

<p className="text-gray-600 mt-4">
Upload agreements and detect hidden legal risks instantly.
</p>

<Link
to="/register"
className="inline-block mt-8 px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-lg hover:shadow-indigo-400/40 transition"
>
Create Free Account
</Link>

</section>

<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-24"></div>
{/* FOOTER */}

<footer className="border-t border-gray-200 bg-white">

<div className="max-w-7xl mx-auto px-8 py-14 grid md:grid-cols-4 gap-10">

<div>

<h3 className="font-semibold mb-4">
AI Contract Intelligence
</h3>

<p className="text-gray-500 text-sm">
AI-powered platform for analyzing contracts
and detecting legal risk.
</p>

</div>


<div>

<h4 className="font-medium mb-4">Platform</h4>

<ul className="space-y-2 text-gray-500 text-sm">

<li>Contract Analysis</li>
<li>Clause Intelligence</li>
<li>Risk Dashboard</li>
<li>Negotiation Simulator</li>

</ul>

</div>


<div>

<h4 className="font-medium mb-4">Technology</h4>

<ul className="space-y-2 text-gray-500 text-sm">

<li>React</li>
<li>Node.js</li>
<li>MongoDB</li>
<li>OpenAI API</li>

</ul>

</div>


<div>

<h4 className="font-medium mb-4">Creator</h4>

<p className="text-sm text-gray-500 mb-3">
Built by <span className="font-medium text-gray-700">
Punam Patil
</span>
</p>

<div className="flex gap-4 mt-3 text-xl">

<a
href="mailto:punampatilpp310@gmail.com"
className="hover:text-indigo-600 transition"
>
<FaEnvelope />
</a>

<a
href="https://github.com/Punampatil2005"
target="_blank"
className="hover:text-indigo-600 transition"
>
<FaGithub />
</a>

<a
href="https://linkedin.com/in/punampatil2005"
target="_blank"
className="hover:text-indigo-600 transition"
>
<FaLinkedin />
</a>

</div>

</div>

</div>


<div className="text-center text-gray-400 text-sm pb-6">

© 2026 AI Contract Intelligence — Built with MERN + AI

</div>

</footer>

</div>

)

}

export default Landing