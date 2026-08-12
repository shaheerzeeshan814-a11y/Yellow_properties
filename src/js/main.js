import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  "https://vkooufqxtkqwyytocztz.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_JZAXgNUK2NoWdHXRla_4dw_oBuAlSzr";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// ------------------------------------------
// LOAD PROPERTIES
// ------------------------------------------

async function loadProperties() {

  const container =
    document.getElementById("properties-container");

  if (!container) return;

  container.innerHTML = `
    <div class="loading-properties">
      Loading properties...
    </div>
  `;


  const {
    data,
    error
  } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", {
      ascending: false
    });


  if (error) {

    console.error(
      "Could not load properties:",
      error
    );

    container.innerHTML = `
      <div class="properties-error">
        Unable to load properties right now.
      </div>
    `;

    return;
  }


  if (!data || data.length === 0) {

    container.innerHTML = `
      <div class="no-properties">
        <h3>No properties available</h3>
        <p>New listings will appear here soon.</p>
      </div>
    `;

    return;
  }


  container.innerHTML = data
    .map(property => createPropertyCard(property))
    .join("");
}


// ------------------------------------------
// PROPERTY CARD
// ------------------------------------------

function createPropertyCard(property) {

  const image =
    property.image ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";


  const title =
    escapeHTML(property.title || "Property");


  const location =
    escapeHTML(property.location || "");


  const price =
    escapeHTML(property.price || "Price on request");


  const status =
    escapeHTML(property.status || "Available");


  const type =
    escapeHTML(
      property.property_type || "Property"
    );


  const bedrooms =
    property.bedrooms ?? "-";


  const bathrooms =
    property.bathrooms ?? "-";


  const area =
    escapeHTML(property.area || "-");


  return `
    <article class="property-card">

      <div class="property-image">

        <img
          src="${escapeHTML(image)}"
          alt="${title}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'"
        >

        <span class="property-status">
          ${status}
        </span>

      </div>


      <div class="property-content">

        <div class="property-type">
          ${type}
        </div>

        <h3>
          ${title}
        </h3>

        <p class="property-location">
          📍 ${location}
        </p>

        <div class="property-price">
          ${price}
        </div>


        <div class="property-details">

          <span>
            🛏 ${bedrooms} Beds
          </span>

          <span>
            🛁 ${bathrooms} Baths
          </span>

          <span>
            📐 ${area}
          </span>

        </div>


        <button
          class="property-btn"
          onclick="contactAboutProperty('${escapeAttribute(property.title || "")}')"
        >
          Enquire Now
        </button>

      </div>

    </article>
  `;
}


// ------------------------------------------
// CONTACT BUTTON
// ------------------------------------------

window.contactAboutProperty =
  function(title) {

    const message =
      `Hi Yellow Properties, I'm interested in ${title}.`;

    // Change this to Yellow Properties'
    // WhatsApp number.

    const phone =
      "923001234567";

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };


// ------------------------------------------
// SECURITY HELPERS
// ------------------------------------------

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}


// ------------------------------------------
// START
// ------------------------------------------

loadProperties();