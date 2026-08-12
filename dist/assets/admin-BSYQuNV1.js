import"./modulepreload-polyfill-B5Qt9EMX.js";const l="yellow_properties_data",s=[{id:"property-1",title:"Premium Residential Property",location:"Eden Orchard, Faisalabad",type:"House",purpose:"Sale",price:"Contact for price",beds:"4 Beds",baths:"4 Baths",area:"10 Marla",image:"/images/property1.jpg",featured:!0,visible:!0},{id:"property-2",title:"Residential Plot",location:"Eden Orchard, Faisalabad",type:"Plot",purpose:"Sale",price:"Contact for price",beds:"—",baths:"—",area:"10 Marla",image:"/images/property2.jpg",featured:!1,visible:!0},{id:"property-3",title:"Prime Investment Opportunity",location:"Eden Orchard, Faisalabad",type:"Commercial",purpose:"Sale",price:"Contact for price",beds:"—",baths:"—",area:"Prime Location",image:"/images/property3.jpg",featured:!1,visible:!0}];function a(){const t=localStorage.getItem(l);if(!t)return localStorage.setItem(l,JSON.stringify(s)),[...s];try{return JSON.parse(t)}catch{return localStorage.setItem(l,JSON.stringify(s)),[...s]}}function B(t){localStorage.setItem(l,JSON.stringify(t))}const P=document.getElementById("loginScreen"),S=document.getElementById("adminApp"),f=document.getElementById("loginForm"),E=document.getElementById("loginError"),L="admin",A="yellow123";function h(){P.classList.add("hidden"),S.classList.remove("hidden"),y()}sessionStorage.getItem("yellow_admin_logged_in")==="true"&&h();f&&f.addEventListener("submit",t=>{t.preventDefault();const r=document.getElementById("username").value.trim(),e=document.getElementById("password").value;r===L&&e===A?(sessionStorage.setItem("yellow_admin_logged_in","true"),E.textContent="",h()):E.textContent="Incorrect username or password."});const v=document.getElementById("logoutBtn");v&&v.addEventListener("click",()=>{sessionStorage.removeItem("yellow_admin_logged_in"),location.reload()});const g={dashboard:document.getElementById("dashboardSection"),properties:document.getElementById("propertiesSection"),addProperty:document.getElementById("addPropertySection")};function m(t){Object.values(g).forEach(e=>{e&&e.classList.add("hidden")}),g[t]&&g[t].classList.remove("hidden");const r=document.getElementById("pageTitle");if(r){const e={dashboard:"Dashboard",properties:"Properties",addProperty:"Add Property"};r.textContent=e[t]||"Dashboard"}document.querySelectorAll(".side-link").forEach(e=>{e.classList.remove("active"),e.dataset.section===t&&e.classList.add("active")})}document.querySelectorAll("[data-section]").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.section;r&&m(r)})});function T(){const t=a(),r=t.length,e=t.filter(d=>d.purpose==="Sale").length,n=t.filter(d=>d.purpose==="Rent").length,o=t.filter(d=>d.featured===!0).length;document.getElementById("totalProperties").textContent=r,document.getElementById("saleProperties").textContent=e,document.getElementById("rentProperties").textContent=n,document.getElementById("featuredProperties").textContent=o,_(t)}function _(t){const r=document.getElementById("recentProperties");if(!r)return;const e=[...t].reverse().slice(0,5);if(!e.length){r.innerHTML="<p>No properties yet.</p>";return}r.innerHTML=e.map(n=>`

      <div class="recent-item">

        <div class="recent-image">

          <img
            src="${n.image||""}"
            alt=""
            onerror="this.style.display='none'"
          >

        </div>


        <div class="recent-info">

          <strong>
            ${i(n.title)}
          </strong>

          <span>
            ${i(n.location)}
          </span>

        </div>


        <div class="recent-price">

          ${i(n.price)}

        </div>

      </div>

    `).join("")}function $(){const t=document.getElementById("propertyTable");if(!t)return;const r=a();if(!r.length){t.innerHTML=`
      <tr>
        <td colspan="6">
          No properties found.
        </td>
      </tr>
    `;return}t.innerHTML=r.map(e=>`

      <tr>

        <td>

          <div class="table-property">

            <div class="table-image">

              <img
                src="${e.image||""}"
                alt=""
                onerror="this.style.display='none'"
              >

            </div>

            <div>

              <strong>
                ${i(e.title)}
              </strong>

              <span>
                ${i(e.location)}
              </span>

            </div>

          </div>

        </td>


        <td>
          ${i(e.type)}
        </td>


        <td>
          ${i(e.purpose)}
        </td>


        <td>
          ${i(e.price)}
        </td>


        <td>

          <span
            class="status ${e.visible?"":"hidden-status"}"
          >

            ${e.visible?"Visible":"Hidden"}

          </span>

        </td>


        <td>

          <div class="table-actions">

            <button
              class="edit-btn"
              data-edit="${e.id}"
            >
              Edit
            </button>

            <button
              class="delete-btn"
              data-delete="${e.id}"
            >
              Delete
            </button>

          </div>

        </td>

      </tr>

    `).join(""),document.querySelectorAll("[data-edit]").forEach(e=>{e.addEventListener("click",()=>{w(e.dataset.edit)})}),document.querySelectorAll("[data-delete]").forEach(e=>{e.addEventListener("click",()=>{C(e.dataset.delete)})})}function w(t){const e=a().find(n=>n.id===t);e&&(document.getElementById("propertyId").value=e.id,document.getElementById("propertyTitle").value=e.title,document.getElementById("propertyLocation").value=e.location,document.getElementById("propertyType").value=e.type,document.getElementById("propertyPurpose").value=e.purpose,document.getElementById("propertyPrice").value=e.price,document.getElementById("propertyBeds").value=e.beds,document.getElementById("propertyBaths").value=e.baths,document.getElementById("propertyArea").value=e.area,document.getElementById("propertyImage").value=e.image,document.getElementById("propertyFeatured").checked=e.featured,document.getElementById("propertyVisible").checked=e.visible,document.getElementById("formTitle").textContent="Edit Property",u(),m("addProperty"))}function C(t){const r=a().find(o=>o.id===t);if(!r||!confirm(`Delete "${r.title}"?`))return;const n=a().filter(o=>o.id!==t);B(n),y()}const c=document.getElementById("propertyForm");c&&c.addEventListener("submit",t=>{t.preventDefault();const r=document.getElementById("propertyId").value,e={id:r||`property-${Date.now()}`,title:document.getElementById("propertyTitle").value.trim(),location:document.getElementById("propertyLocation").value.trim(),type:document.getElementById("propertyType").value,purpose:document.getElementById("propertyPurpose").value,price:document.getElementById("propertyPrice").value.trim(),beds:document.getElementById("propertyBeds").value.trim(),baths:document.getElementById("propertyBaths").value.trim(),area:document.getElementById("propertyArea").value.trim(),image:document.getElementById("propertyImage").value.trim(),featured:document.getElementById("propertyFeatured").checked,visible:document.getElementById("propertyVisible").checked},n=a(),o=n.findIndex(d=>d.id===r);o>=0?n[o]=e:n.push(e),B(n),alert(o>=0?"Property updated successfully.":"Property added successfully."),b(),y(),m("properties")});function b(){c&&(c.reset(),document.getElementById("propertyId").value="",document.getElementById("propertyVisible").checked=!0,document.getElementById("formTitle").textContent="Add Property",u())}const I=document.getElementById("cancelEdit");I&&I.addEventListener("click",()=>{b(),m("properties")});const p=document.getElementById("propertyImage");function u(){const t=document.getElementById("imagePreview");if(!t)return;const r=p?p.value.trim():"";if(!r){t.innerHTML="<span>Image preview</span>";return}t.innerHTML=`

    <img
      src="${i(r)}"
      alt="Preview"
      onerror="
        this.style.display='none';
        this.parentElement.innerHTML='<span>Image could not be loaded</span>';
      "
    >

  `}p&&p.addEventListener("input",u);function i(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function y(){T(),$(),u()}sessionStorage.getItem("yellow_admin_logged_in")==="true"&&y();
