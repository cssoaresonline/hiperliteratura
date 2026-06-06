const form=document.getElementById('leadForm');
const msg=document.getElementById('formMsg');
const exportBtn=document.getElementById('exportCsv');

function getLeads(){return JSON.parse(localStorage.getItem('leads_biografia_mao_luva_ebook')||'[]')}
function saveLeads(leads){localStorage.setItem('leads_biografia_mao_luva_ebook',JSON.stringify(leads))}

form.addEventListener('submit',function(e){
  e.preventDefault();
  const data=new FormData(form);
  const nome=(data.get('nome')||'').trim();
  const email=(data.get('email')||'').trim();
  if(!email)return;
  const leads=getLeads();
  leads.push({nome,email,data:new Date().toISOString()});
  saveLeads(leads);
  form.reset();
  msg.textContent='Cadastro recebido. Lead salvo neste navegador.';
});

exportBtn.addEventListener('click',function(){
  const leads=getLeads();
  if(!leads.length){alert('Ainda não há leads salvos neste navegador.');return}
  const header='nome,email,data\n';
  const rows=leads.map(l=>[l.nome,l.email,l.data].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob=new Blob([header+rows],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='leads-biografia-mao-luva-ebook.csv';
  a.click();
  URL.revokeObjectURL(url);
});
