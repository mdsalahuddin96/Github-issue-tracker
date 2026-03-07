const cardContainer=document.getElementById('card-container');
const totalIssue=document.getElementById('total-issue');
let openIssues;
let closedIssues;
function displayLabels(labels){
    const labelsElm=labels.map(label=>`<span class="text-[12px] font-medium rounded-sm bg-[#eedf57]">${label.toUpperCase()}</span>`);
    return labelsElm.join(" ");
}
function displayAllIssue(issues,id){
    totalIssue.innerText=issues.length;
    removeActiveClass();
    cardContainer.innerHTML='';
    
    issues.forEach(issue=>{
        
        const card=document.createElement('div');
        card.className=`card bg-base-100 card-lg shadow-sm p-4 border-t-3 ${issue.status=="open"?'border-green-600':'border-purple-600'}`;
        card.setAttribute('id',issue.id);
        card.innerHTML=`
                    <div class="flex justify-between items-center">
                        <img src=${issue.status=='open'?'./assets/Open-Status.png':'./assets/Closed-Status.png'}>
                        <p class="text-sm font-medium px-4 py-[6px] rounded-full  ${issue.priority=="high"?'high':`${issue.priority=='medium'?'medium':'low'}`}">${issue.priority=="high"?'HIGH':`${issue.priority=='medium'?'MEDIUM':'LOW'}`}</p>
                    </div>
                    <div class="space-y-2 mt-2">
                        <h2 class="font-semibold text-sm">${issue.title}</h2>
                        <p class="text-[#64748B] text-[12px] line-clamp-2">${issue.description}</p>
                        ${displayLabels(issue.labels)}
                    </div>
                    
                    <div class="mt-6">
                        <div class="flex justify-between items-center">
                            <p class="text-[#64748B] text-[12px]">${issue.author}</p>
                            <p class="text-[#64748B] text-[12px]">${new Date(issue.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-[#64748B] text-[12px]">${issue.assignee}</p>
                            <p class="text-[#64748B] text-[12px]">${new Date(issue.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>`
        
       cardContainer.appendChild(card)
    })
    document.getElementById(id).classList.add('active');
}
function removeActiveClass(){
    const categoryBtn=document.querySelectorAll('.category-btn');
    categoryBtn.forEach(btn=>btn.classList.remove('active'));
}
const loadAllIssues=async(id)=>{
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res=await fetch(url)
    const data=await res.json();
    openIssues=data.data.filter(issue=>issue.status==='open');
    closedIssues=data.data.filter(issue=>issue.status=='closed');
    displayAllIssue(data.data, id="all-btn");
}
const loadOpenIssue=async(id)=>{
    displayAllIssue(openIssues,id)  
}
const loadClosedIssue=async(id)=>{
    displayAllIssue(closedIssues,id)
}
loadAllIssues()

