import { useEffect, useState } from "react";
import API from "../api/api";
import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";

const CompareContracts = () => {

const [contracts,setContracts] = useState([]);
const [contractA,setContractA] = useState("");
const [contractB,setContractB] = useState("");
const [result,setResult] = useState(null);
const [versionDiff,setVersionDiff] = useState(null);

useEffect(()=>{

API.get("/contracts/my")
.then(res=>setContracts(res.data))
.catch(err=>console.log(err))

},[]);

// ---------------- RISK COMPARE (backend)

const compare = async()=>{

if(!contractA || !contractB){
alert("Select both contracts")
return
}

const res = await API.post("/contracts/compare",{
contractAId:contractA,
contractBId:contractB
})

setResult(res.data)

}

// ---------------- VERSION DIFFERENCE (frontend)

const compareVersions = ()=>{

if(!contractA || !contractB){
alert("Select both contracts")
return
}

const contract1 = contracts.find(c=>c._id===contractA)
const contract2 = contracts.find(c=>c._id===contractB)

const differences = []

contract1.clauses.forEach((clauseA)=>{

const match = contract2.clauses.find(
c=>c.category===clauseA.category
)

if(!match){

differences.push({
type:"Clause Removed",
clause:clauseA.category
})

}else{

if(clauseA.severity !== match.severity){

differences.push({
type:"Risk Changed",
clause:clauseA.category,
from:clauseA.severity,
to:match.severity
})

}

if(clauseA.penaltyAmount !== match.penaltyAmount){

differences.push({
type:"Penalty Changed",
clause:clauseA.category,
from:clauseA.penaltyAmount,
to:match.penaltyAmount
})

}

}

})

setVersionDiff({differences})

}

return(

<div className="space-y-6">

<h1 className="text-3xl font-bold">
Compare Contracts
</h1>

{/* SELECT CONTRACTS */}

<div className="grid md:grid-cols-2 gap-4">

<select
className="p-3 border rounded"
onChange={(e)=>setContractA(e.target.value)}
>

<option>Select Contract A</option>

{contracts.map(c=>(
<option key={c._id} value={c._id}>
{c.fileName}
</option>
))}

</select>

<select
className="p-3 border rounded"
onChange={(e)=>setContractB(e.target.value)}
>

<option>Select Contract B</option>

{contracts.map(c=>(
<option key={c._id} value={c._id}>
{c.fileName}
</option>
))}

</select>

</div>

{/* BUTTONS */}

<div className="flex gap-4 mt-4">

<button
onClick={compare}
className="bg-blue-600 text-white px-6 py-3 rounded-lg"
>
Compare Risk
</button>

<button
onClick={compareVersions}
className="bg-purple-600 text-white px-6 py-3 rounded-lg"
>
Check Version Differences
</button>

</div>

{/* RISK RESULT */}

{result && (

<div className="mt-10 grid md:grid-cols-2 gap-8">

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-bold mb-2">
{result.contractA.name}
</h3>

<div className="text-3xl text-red-500">
{result.contractA.risk}%
</div>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-bold mb-2">
{result.contractB.name}
</h3>

<div className="text-3xl text-green-500">
{result.contractB.risk}%
</div>

</div>

<div className="md:col-span-2 bg-green-50 p-6 rounded-xl text-center">

<h2 className="text-xl font-bold">
🏆 Safer Contract
</h2>

<p className="text-2xl text-green-600">
{result.saferOption}
</p>

</div>

</div>

)}
{result && (

<div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mt-8">

<h2 className="text-xl font-bold mb-4 dark:text-white">
Risk Comparison Chart
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={[
{
name: result.contractA.name,
risk: result.contractA.risk
},
{
name: result.contractB.name,
risk: result.contractB.risk
}
]}>

<XAxis dataKey="name" />

<YAxis />

<Tooltip />

<Bar dataKey="risk" fill="#6366f1" />

</BarChart>

</ResponsiveContainer>

</div>

)}
{/* VERSION DIFFERENCE */}

{versionDiff && (

<div className="bg-white p-6 rounded-xl shadow mt-6">

<h2 className="text-lg font-bold mb-4">
Version Differences
</h2>

{versionDiff.differences.length===0 && (
<p>No differences found</p>
)}

{versionDiff.differences.map((d,i)=>(

<div key={i} className="border-b py-2">

<p>
<b>{d.type}</b> — {d.clause}
</p>

{d.from && (
<p className="text-sm text-gray-500">
{d.from} → {d.to}
</p>
)}

</div>

))}

</div>

)}

</div>

)

}

export default CompareContracts