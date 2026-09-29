const tg=window.Telegram?.WebApp; if(tg){tg.ready();tg.expand();}
const API=localStorage.getItem('ZOTA_API')||'';
const moviesEl=document.querySelector('#movies'), player=document.querySelector('#player'), video=document.querySelector('#video');
document.querySelector('#close').onclick=()=>{video.pause();player.classList.add('hidden')};
async function load(){try{const r=await fetch(API+'/api/movies');if(!r.ok)throw Error();const movies=await r.json();render(movies)}catch(e){render([{title:'Demo Movie',description:'Connect the backend to load your published movies.',thumbnail_url:'https://placehold.co/400x600/111/fff?text=Zota+Prime',hls_url:''}])}}
function render(ms){moviesEl.textContent='';ms.forEach(m=>{const c=document.createElement('article');c.className='card';const img=document.createElement('img');img.src=m.thumbnail_url||'https://placehold.co/400x600';img.alt=m.title||'';const d=document.createElement('div');const b=document.createElement('b');b.textContent=m.title||'Untitled';const p=document.createElement('div');p.className='muted';p.textContent=m.release_year||'';d.append(b,p);c.append(img,d);c.onclick=()=>openMovie(m);moviesEl.append(c)})}
function openMovie(m){if(!m.hls_url)return alert('This movie has no playback URL yet.');video.src=m.hls_url;player.classList.remove('hidden');video.play().catch(()=>{})}
document.querySelector('#tgLink').href=localStorage.getItem('ZOTA_TELEGRAM_URL')||'https://t.me/Animexzotaprimebot';load();
