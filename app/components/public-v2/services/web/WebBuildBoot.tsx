/**
 * Script synchrone (head, app/layout.tsx) : active PLAN CSS si motion OK
 * sur la landing Web. Évite le flash « page terminée → wireframe ».
 * Sans JS / reduced-motion / autre page : pas d’attribut → design final.
 */
export const WEB_BUILD_BOOT_SCRIPT = `(function(){try{var p=location.pathname||'';if(p.indexOf('creation-site-web-montreal')===-1)return;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;document.documentElement.setAttribute('data-web-build','run');}catch(e){}})();`
