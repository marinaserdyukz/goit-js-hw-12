import{a as w,S,i as n}from"./assets/vendor-C1DvvBV_.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const v="46234405-5fabb3e7cd0fd4a5073c0abd3",q="https://pixabay.com/api/";async function f(r,e){return(await w.get(q,{params:{key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}})).data}const m=document.querySelector(".gallery"),h=document.querySelector(".loader"),y=document.querySelector(".load-more"),E=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(r){const e=r.map(o=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${o.largeImageURL}">
            <img
              class="gallery-image"
              src="${o.webformatURL}"
              alt="${o.tags}"
            />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${o.likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${o.views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${o.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${o.downloads}
              </p>
            </div>
          </a>
        </li>
      `).join("");m.insertAdjacentHTML("beforeend",e),E.refresh()}function P(){m.innerHTML=""}function p(){h.classList.remove("is-hidden")}function b(){h.classList.add("is-hidden")}function d(){y.classList.remove("is-hidden")}function c(){y.classList.add("is-hidden")}const L=document.querySelector(".form"),B=document.querySelector(".load-more");let a=1,i="";L.addEventListener("submit",M);B.addEventListener("click",$);async function M(r){if(r.preventDefault(),i=r.currentTarget.elements["search-text"].value.trim(),!i){n.error({title:"Error",message:"Please enter a search query!"});return}a=1,P(),c(),p();try{const e=await f(i,a);if(e.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}g(e.hits),a*15>=e.totalHits?(c(),n.info({message:"We're sorry, but you've reached the end of search results."})):d()}catch{n.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{b(),L.reset()}}async function $(){a+=1,c(),p();try{const r=await f(i,a);g(r.hits),a*15>=r.totalHits||r.hits.length<15?(c(),n.info({message:"We're sorry, but you've reached the end of search results."})):d();const e=document.querySelector(".gallery-item");if(e){const o=e.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}catch{a-=1,n.error({title:"Error",message:"Something went wrong. Please try again later."}),d()}finally{b()}}
//# sourceMappingURL=index.js.map
