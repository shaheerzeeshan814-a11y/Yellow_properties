import"./modulepreload-polyfill-B5Qt9EMX.js";import{createClient as d}from"https://esm.sh/@supabase/supabase-js@2";const u="https://vkooufqxtkqwyytocztz.supabase.co",g="sb_publishable_JZAXgNUK2NoWdHXRla_4dw_oBuAlSzr",m=d(u,g);async function h(){const t=document.getElementById("properties-container");if(!t)return;t.innerHTML=`
    <div class="loading-properties">
      Loading properties...
    </div>
  `;const{data:e,error:r}=await m.from("properties").select("*").order("created_at",{ascending:!1});if(r){console.error("Could not load properties:",r),t.innerHTML=`
      <div class="properties-error">
        Unable to load properties right now.
      </div>
    `;return}if(!e||e.length===0){t.innerHTML=`
      <div class="no-properties">
        <h3>No properties available</h3>
        <p>New listings will appear here soon.</p>
      </div>
    `;return}t.innerHTML=e.map(s=>b(s)).join("")}function b(t){const e=t.image||"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",r=o(t.title||"Property"),s=o(t.location||""),a=o(t.price||"Price on request"),n=o(t.status||"Available"),i=o(t.property_type||"Property"),c=t.bedrooms??"-",p=t.bathrooms??"-",l=o(t.area||"-");return`
    <article class="property-card">

      <div class="property-image">

        <img
          src="${o(e)}"
          alt="${r}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'"
        >

        <span class="property-status">
          ${n}
        </span>

      </div>


      <div class="property-content">

        <div class="property-type">
          ${i}
        </div>

        <h3>
          ${r}
        </h3>

        <p class="property-location">
          📍 ${s}
        </p>

        <div class="property-price">
          ${a}
        </div>


        <div class="property-details">

          <span>
            🛏 ${c} Beds
          </span>

          <span>
            🛁 ${p} Baths
          </span>

          <span>
            📐 ${l}
          </span>

        </div>


        <button
          class="property-btn"
          onclick="contactAboutProperty('${v(t.title||"")}')"
        >
          Enquire Now
        </button>

      </div>

    </article>
  `}window.contactAboutProperty=function(t){const e=`Hi Yellow Properties, I'm interested in ${t}.`;window.open(`https://wa.me/923001234567?text=${encodeURIComponent(e)}`,"_blank")};function o(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function v(t){return String(t).replace(/\\/g,"\\\\").replace(/'/g,"\\'")}h();
