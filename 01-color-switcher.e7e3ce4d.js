const t={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]"),body:document.querySelector("body")};let n=null;function e(t,n){t.disabled=!0,n.disabled=!1}t.btnStop.disabled=!1,t.btnStart.addEventListener("click",(function(){e(t.btnStart,t.btnStop),n=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.btnStop.addEventListener("click",(function(){clearInterval(n),e(t.btnStop,t.btnStart)}));
//# sourceMappingURL=01-color-switcher.e7e3ce4d.js.map
