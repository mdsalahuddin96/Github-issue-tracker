const cardContainer=document.getElementById('card-container');
const totalIssue=document.getElementById('total-issue');
const spinner=document.getElementById('spinner');
const detailsModal=document.getElementById('details_modal');
const modalBox=document.getElementById('modal-box');
function displayLabels(labels){
    const labelsElm=labels.map(label=>`<span class="text-[12px] font-medium rounded-sm bg-[#eedf57]">${label.toUpperCase()}</span>`);
    return labelsElm.join(" ");
}
function displayAllIssue(issues){
    totalIssue.innerText=issues.length;
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
                    
                    <div class="mt-6 space-y-2">
                        <p class="text-[#64748B] text-[12px]"># ${issue.author}</p>
                        <p class="text-[#64748B] text-[12px]">${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>`
        
       cardContainer.appendChild(card)
    })
    
    manageSpinner(false);
}
function removeActiveClass(){
    const categoryBtn=document.querySelectorAll('.category-btn');
    categoryBtn.forEach(btn=>btn.classList.remove('active'));
}
function manageSpinner(status){
    if(status){
        spinner.classList.remove('hidden');
        cardContainer.innerHTML="";
    }
    else{
        spinner.classList.add('hidden');
    }
}


function showModalDetails(issue){
    modalBox.innerHTML=`
                    <div>
                        <h3 class="text-lg font-bold">${issue.title}</h3>
                        <div class="flex items-center gap-2 mt-2">
                            <span class="${issue.status==='open'?'open':'closed'}">${issue.status==='open'?'Opened':'Closed'}</span>
                            <p>.</p>
                            <p class="text-[12px] text-[#64748B]">Opened by <span>${issue.author}</span> </p>
                            <p>.</p>
                            <p class="text-[12px] text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div>
                        ${displayLabels(issue.labels)}
                    </div>
                    <p class='text-[16px] text-[#64748B]'>${issue.description}</p>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <p class="text-[#64748B] text-[16px]">Assignee:</p>
                            <p class="text-[16px] font-semibold">${issue.assignee}</p>
                        </div>
                        <div>
                            <p class="text-[#64748B] text-[16px]">Priority:</p>
                            <span class="text-sm mt-1 font-medium px-4 py-1 rounded-full ${issue.priority=="high"?'bg-[#EF4444] text-white':`${issue.priority=='medium'?'bg-[#F59E0B] text-white':'bg-[#9CA3AF] text-white'}`}">${issue.priority=="high"?'HIGH':`${issue.priority=='medium'?'MEDIUM':'LOW'}`}</span>
                        </div>
                    </div>
    `
    detailsModal.showModal();
}
const loadAllIssues=async(id='all-btn')=>{
    removeActiveClass();
    document.getElementById(id).classList.add('active');
    manageSpinner(true);
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res=await fetch(url)
    const data=await res.json();
    displayAllIssue(data.data);
}
const loadOpenIssue=async(id)=>{
    removeActiveClass();
    document.getElementById(id).classList.add('active');
    manageSpinner(true);
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res=await fetch(url)
    const data=await res.json();
    let openIssues=data.data.filter(issue=>issue.status==='open');
    displayAllIssue(openIssues)  
}
const loadClosedIssue=async(id)=>{
    removeActiveClass();
    document.getElementById(id).classList.add('active');
    manageSpinner(true);
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res=await fetch(url)
    const data=await res.json();
    let closedIssues=data.data.filter(issue=>issue.status=='closed');
    displayAllIssue(closedIssues);
}

const loadModalDetails=async(id)=>{
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res=await fetch(url)
    const data=await res.json();
    showModalDetails(data.data)
}
cardContainer.addEventListener('click',(event)=>{
    const selectedCard=event.target.closest('.card');
    if(selectedCard){
        loadModalDetails(selectedCard.id)
    }
})
loadAllIssues()

