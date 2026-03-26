import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RedFlagPanel from "../components/RedFlagPanel";
import jsPDF from "jspdf";
import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";

const ContractDetail = () => {

const { id } = useParams();
const navigate = useNavigate();

const [contract,setContract] = useState(null);
const [monthlyIncome,setMonthlyIncome] = useState("");
const [emergencySavings,setEmergencySavings] = useState("");
const [simulation,setSimulation] = useState(null);
const [loading,setLoading] = useState(false);

const [improvedClause,setImprovedClause] = useState(null);
const [showModal,setShowModal] = useState(false);

const [proposal,setProposal] = useState("");
const [negotiationResult,setNegotiationResult] = useState(null);

const [question,setQuestion] = useState("");
const [chatAnswer,setChatAnswer] = useState("");


useEffect(()=>{

API.get("/contracts/my")
.then(res=>{
const found = res.data.find(c=>c._id===id)
setContract(found)
})
.catch(err=>console.log(err))

},[id])

const chartData = contract?.clauses
? contract.clauses.map(c=>({
name:c.category || "Clause",
risk:c.severity || 0
}))
: []

// ================= DELETE =================

const deleteContract = async()=>{

if(!window.confirm("Delete contract?")) return

try{

await API.delete(`/contracts/${id}`)

alert("Contract deleted")

navigate("/dashboard/contracts")

}catch{

alert("Delete failed")

}

}

// ================= PDF =================

const downloadReport = ()=>{

if(!contract) return

const doc = new jsPDF()

doc.text("AI Contract Intelligence Report",20,20)

doc.text(`Contract Name: ${contract.fileName}`,20,40)
doc.text(`Risk Score: ${contract.overallRiskScore}%`,20,50)

let y=70

contract.clauses?.forEach((c,i)=>{

doc.text(`${i+1}. ${c.category} Risk: ${c.severity}%`,20,y)

y+=10

})

doc.save("AI_Contract_Report.pdf")

}

// ================= SIMULATION =================

const runSimulation = async()=>{

if(!monthlyIncome || !emergencySavings){

alert("Enter both values")

return

}

try{

setLoading(true)

const res = await API.post("/contracts/simulate",{

contractId:id,
monthlyIncome:Number(monthlyIncome),
emergencySavings:Number(emergencySavings)

})

setSimulation(res.data)

}catch{

alert("Simulation failed")

}finally{

setLoading(false)

}

}

// ================= REDLINE =================

const improveClause = async(text)=>{

try{

const res = await API.post("/contracts/redline",{clauseText:text})

setImprovedClause(res.data.improvedClause)

setShowModal(true)

}catch{

alert("Redline failed")

}

}

// ================= NEGOTIATION =================

const runNegotiation = async(text)=>{

try{

const res = await API.post("/contracts/negotiate",{

clauseText:text,
userProposal:proposal

})

setNegotiationResult(res.data)

}catch{

alert("Negotiation failed")

}

}

// ================= CHAT =================

const askContractAI = async()=>{

if(!question) return

try{

const res = await API.post("/contracts/chat",{

contractId:id,
question

})

setChatAnswer(res.data.answer)

}catch{

alert("AI chat failed")

}

}

if(!contract) return <div className="text-center mt-20">Loading...</div>

return(

<div className="space-y-10">

{/* HEADER */}

<div className="bg-white p-8 rounded-2xl shadow-lg">

<h1 className="text-3xl font-bold mb-6">
{contract.fileName}
</h1>

<div className="w-40">

<CircularProgressbar
value={contract.overallRiskScore}
text={`${contract.overallRiskScore}%`}

styles={buildStyles({

pathColor:
contract.overallRiskScore>=70
? "#ef4444"
: contract.overallRiskScore>=40
? "#f59e0b"
: "#22c55e"

})}
/>


</div>

<div className="flex gap-4 mt-6">

<a
 href={`http://localhost:5001/uploads/${contract.filePath}`}
 target="_blank"
 rel="noopener noreferrer"
 className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
>
View Original Contract
</a>
<button
onClick={downloadReport}
className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
Download Report
</button>

<button
onClick={deleteContract}
className="bg-red-600 text-white px-6 py-3 rounded-lg"
>
Delete Contract
</button>

</div>

</div>

{/* SUMMARY */}

<div className="bg-blue-50 p-6 rounded-xl shadow">

<h2 className="text-lg font-bold mb-3">
AI Executive Summary
</h2>

<p>{contract.executiveSummary}</p>

</div>

{/* HEATMAP */}

<div className="bg-white p-8 rounded-2xl shadow-lg">

<h2 className="text-xl font-bold mb-6">
Clause Risk Heatmap
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={chartData}>

<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>

<Bar dataKey="risk" fill="#6366f1"/>

</BarChart>

</ResponsiveContainer>

</div>

{/* CLAUSES */}

<div className="bg-white p-8 rounded-2xl shadow-lg">

<h2 className="text-xl font-bold mb-6">
Clause Intelligence Breakdown
</h2>

<div className="space-y-4">

{contract.clauses?.map((clause,i)=>{

const getColor=()=>{
if(clause.severity>=70) return "bg-red-100 text-red-600"
if(clause.severity>=40) return "bg-yellow-100 text-yellow-600"
return "bg-green-100 text-green-600"
}

return(

<div key={i} className="p-5 border rounded-xl">

<div className="flex justify-between">

<span className="font-semibold">
{clause.category}
</span>

<span className={`px-3 py-1 text-xs rounded-full ${getColor()}`}>
{clause.severity}% Severity
</span>

</div>

<p className="text-gray-600 mt-2">
{clause.description}
</p>

<button
onClick={()=>improveClause(clause.description)}
className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg"
>
Improve Clause
</button>
<RedFlagPanel contract={contract}/>
{/* NEGOTIATION */}

<div className="mt-4">

<textarea
placeholder="Propose negotiation"
className="w-full border p-2 rounded-lg"
value={proposal}
onChange={(e)=>setProposal(e.target.value)}
/>

<button
onClick={()=>runNegotiation(clause.description)}
className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
>
Simulate Negotiation
</button>

</div>

{negotiationResult && (

<div className="mt-3 bg-gray-100 p-3 rounded-lg">

<p>Risk Reduction: {negotiationResult.riskReduction}</p>
<p>Financial Impact: {negotiationResult.financialImpact}</p>
<p>Success Probability: {negotiationResult.successProbability}</p>

</div>

)}

<p className="mt-2 text-blue-600">
Why Risky: {clause.explanation}
</p>

<p className="mt-1 text-green-600">
Negotiation Tip: {clause.negotiationTip}
</p>

{clause.penaltyAmount && (

<p className="mt-2 text-red-500">
Penalty: ₹{clause.penaltyAmount}
</p>

)}

</div>

)

})}

</div>

</div>

{/* SIMULATION */}

<div className="bg-white p-8 rounded-2xl shadow-lg">

<h2 className="text-xl font-bold mb-6">
Financial Impact Simulation
</h2>

<input
type="number"
placeholder="Monthly Income"
value={monthlyIncome}
onChange={(e)=>setMonthlyIncome(e.target.value)}
className="p-3 border rounded-lg mr-4"
/>

<input
type="number"
placeholder="Emergency Savings"
value={emergencySavings}
onChange={(e)=>setEmergencySavings(e.target.value)}
className="p-3 border rounded-lg"
/>

<button
onClick={runSimulation}
className="block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
>
{loading ? "Calculating..." : "Run Simulation"}
</button>

{simulation && (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="mt-6"
>

<p>Personal Risk Level: {simulation.personalRiskLevel}</p>
<p>Recovery Time: {simulation.recoveryMonths} months</p>

</motion.div>

)}

</div>

{/* AI CHAT */}

<div className="bg-white p-8 rounded-2xl shadow-lg">

<h2 className="text-xl font-bold mb-6">
Ask AI About This Contract
</h2>

<textarea
placeholder="Ask something about this contract..."
value={question}
onChange={(e)=>setQuestion(e.target.value)}
className="w-full border p-3 rounded-lg"
/>

<button
onClick={askContractAI}
className="mt-3 bg-purple-600 text-white px-6 py-3 rounded-lg"
>
Ask AI
</button>

{chatAnswer && (

<div className="mt-6 bg-gray-100 p-4 rounded-lg">

<b>AI Answer:</b>

<p className="mt-2">
{chatAnswer}
</p>

</div>

)}

</div>

{/* MODAL */}

{showModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white p-8 rounded-2xl w-full max-w-2xl">

<h2 className="text-xl font-bold mb-4">
AI Suggested Improved Clause
</h2>

<p>{improvedClause}</p>

<button
onClick={()=>setShowModal(false)}
className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
>
Close
</button>

</div>

</div>

)}

</div>

)

}

export default ContractDetail