if(!self.define){let e,i={};const n=(n,c)=>(n=new URL(n+".js",c).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const a=e=>n(e,o),f={module:{uri:o},exports:r,require:a};i[o]=Promise.all(c.map((e=>f[e]||a(e)))).then((e=>(s(...e),r)))}}define(["./workbox-3ea082d2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/fa-brands-400.e281f2a2.svg",revision:null},{url:"assets/fa-regular-400.934530d8.svg",revision:null},{url:"assets/fa-solid-900.d5b21251.svg",revision:null},{url:"assets/index.4ac39af3.js",revision:null},{url:"assets/index.76b909f6.css",revision:null},{url:"assets/ionicons.fc9f329f.svg",revision:null},{url:"icons/apple-touch-icon-114x114.png",revision:"b79eb4ccc28e4bcb3d827c79a99ddca6"},{url:"icons/apple-touch-icon-120x120.png",revision:"ffa59118c699bc1734627af47ee529f5"},{url:"icons/apple-touch-icon-144x144.png",revision:"6715b87a905f396a15d15786e4d6e01a"},{url:"icons/apple-touch-icon-152x152.png",revision:"1b1da4f68a8df6cd14549c6a72de94ca"},{url:"icons/apple-touch-icon-180x180.png",revision:"fc91faf23324861a745a05adb4967c93"},{url:"icons/apple-touch-icon-57x57.png",revision:"295cac367ef0e00ae5e6403c33d04828"},{url:"icons/apple-touch-icon-72x72.png",revision:"b60a7e4cc07b5d6b95fe5e45a7b5e953"},{url:"icons/apple-touch-icon-76x76.png",revision:"762f770cce832f03f3ed68a3d317b316"},{url:"icons/apple-touch-icon.png",revision:"295cac367ef0e00ae5e6403c33d04828"},{url:"icons/favicon.ico",revision:"d5f56182928d195bfe81a890e1440f8f"},{url:"icons/ic_144.png",revision:"b76cc14b26441effe155db18342c5ed6"},{url:"icons/ic_192.png",revision:"b5ccf71889cf2fb9c17af67d787e0bfd"},{url:"icons/ic_96.png",revision:"645ffd70eebea8d5b030015716ad7fa3"},{url:"index.html",revision:"f88c267b5eff07a66cb8f65528eeb1b4"},{url:"registerSW.js",revision:"aeab4c3da531dfc3d9a4242bfa1d3a9d"},{url:"vite.svg",revision:"489993939dcb1f780a534a6fc7df83a2"},{url:"manifest.webmanifest",revision:"ad76b33dfa4ba3be2c7b26e777709489"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
