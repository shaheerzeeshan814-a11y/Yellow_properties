import"./modulepreload-polyfill-B5Qt9EMX.js";import{createClient as p}from"https://esm.sh/@supabase/supabase-js@2";const g="https://vkooufqxtkqwyytocztz.supabase.co",m="sb_publishable_JZAXgNUK2NoWdHXRla_4dw_oBuAlSzr",a=p(g,m),s=document.getElementById("properties"),f=document.getElementById("totalProperties"),h=document.getElementById("availableProperties"),y=document.getElementById("soldProperties"),i=document.getElementById("logoutBtn");async function v(){const{data:t,error:e}=await a.auth.getSession();return e?(console.error("Session error:",e),window.location.href="./login.html",null):t.session?t.session:(window.location.href="./login.html",null)}async function c(){s.innerHTML=`
    <div class="loading">
      Loading properties...
    </div>
  `;try{const{data:t,error:e}=await a.from("properties").select("*").order("created_at",{ascending:!1});if(e){console.error("Database error:",e),s.innerHTML=`
        <div class="error">
          <strong>Could not load properties.</strong>
          <br><br>
          ${r(e.message)}
        </div>
      `;return}w(t||[]),b(t||[])}catch(t){console.error("Unexpected error:",t),s.innerHTML=`
      <div class="error">
        Something went wrong while loading properties.
      </div>
    `}}function w(t){f.textContent=t.length;const e=t.filter(n=>String(n.status||"").toLowerCase()==="available").length,o=t.filter(n=>String(n.status||"").toLowerCase()==="sold").length;h.textContent=e,y.textContent=o}function b(t){if(!t.length){s.innerHTML=`
      <div class="empty">

        <h3 style="margin-bottom:10px;">
          No properties yet
        </h3>

        <p>
          Add your first property using the
          "Add Property" button.
        </p>

      </div>
    `;return}s.innerHTML=t.map(A).join(""),document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",async()=>{const o=e.dataset.id;await S(o)})})}function A(t){const e=t.title||t.name||"Untitled Property",o=t.location||"Location not specified",n=t.price||"Price on request",d=t.image||t.image_url||"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",u=t.status||"Available";return`

    <article class="property">

      <img
        class="property-image"
        src="${l(d)}"
        alt="${l(e)}"
        onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'"
      >

      <div class="property-content">

        <div class="property-title">
          ${r(e)}
        </div>

        <div class="property-location">
          📍 ${r(o)}
        </div>

        <div class="property-price">
          ${r(String(n))}
        </div>

        <div style="
          color:#999;
          font-size:13px;
          margin-bottom:15px;
        ">
          Status:
          ${r(String(u))}
        </div>

        <div class="property-actions">

          <button
            class="delete-btn"
            data-id="${l(String(t.id))}"
          >
            Delete
          </button>

        </div>

      </div>

    </article>

  `}async function S(t){if(confirm("Are you sure you want to delete this property?"))try{const{error:o}=await a.from("properties").delete().eq("id",t);if(o){console.error("Delete error:",o),alert("Could not delete property: "+o.message);return}await c()}catch(o){console.error("Unexpected delete error:",o),alert("Something went wrong while deleting.")}}i.addEventListener("click",async()=>{i.disabled=!0,i.textContent="Logging out...";const{error:t}=await a.auth.signOut();if(t){console.error("Logout error:",t),alert("Could not log out."),i.disabled=!1,i.textContent="Logout";return}window.location.href="./login.html"});function r(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function l(t){return r(t)}async function L(){await v()&&await c()}L();
