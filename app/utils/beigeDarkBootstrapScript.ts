import { BEIGE_DARK_STORAGE_KEY, BEIGE_DARK_USER_CHOICE_KEY } from '@/utils/beigeDarkModeStore'

/** Script bloquant (avant paint) — aligne html/body sur la préférence localStorage. */
export const beigeDarkBootstrapScript = `(function(){try{
var K=${JSON.stringify(BEIGE_DARK_STORAGE_KEY)};
var C=${JSON.stringify(BEIGE_DARK_USER_CHOICE_KEY)};
var TN='themeName';
var raw=localStorage.getItem(K);
var theme=localStorage.getItem(TN);
var dark=raw===null||raw==='1'||raw==='true';
if((raw==='0'||raw==='false')&&theme==='siteDark'&&!localStorage.getItem(C)){
  dark=true;
  localStorage.setItem(K,'1');
}
var root=document.documentElement;
if(dark){
  root.classList.add('dark');
  root.style.setProperty('--theme-bg','#08080c');
  root.style.setProperty('--theme-bg2','#0f0f14');
  root.style.setProperty('--primary-color','#ea580c');
  root.style.setProperty('--secondary-color','#c2410c');
  root.style.setProperty('--accent-color','#fb923c');
  var g='linear-gradient(180deg,#08080c 0%,#0f0f14 100%)';
  root.style.setProperty('background',g,'important');
  document.body.style.setProperty('background',g,'important');
}else{
  root.classList.remove('dark');
}
}catch(e){}})();`
