import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


// ==========================================
// SUPABASE
// ==========================================

const SUPABASE_URL =
  "https://vkooufqxtkqwyytocztz.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_JZAXgNUK2NoWdHXRla_4dw_oBuAlSzr";


const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// ==========================================
// ELEMENTS
// ==========================================

const propertiesContainer =
  document.getElementById("properties");

const totalProperties =
  document.getElementById("totalProperties");

const availableProperties =
  document.getElementById("availableProperties");

const soldProperties =
  document.getElementById("soldProperties");

const logoutBtn =
  document.getElementById("logoutBtn");


// ==========================================
// CHECK LOGIN
// ==========================================

async function checkLogin() {

  const {
    data,
    error
  } = await supabase.auth.getSession();


  if (error) {

    console.error(
      "Session error:",
      error
    );

    window.location.href =
      "./login.html";

    return null;
  }


  if (!data.session) {

    window.location.href =
      "./login.html";

    return null;
  }


  return data.session;

}


// ==========================================
// LOAD PROPERTIES
// ==========================================

async function loadProperties() {

  propertiesContainer.innerHTML = `
    <div class="loading">
      Loading properties...
    </div>
  `;


  try {

    /*
      IMPORTANT:

      This assumes your Supabase table
      is called "properties".

      Recommended columns:

      id
      title
      location
      price
      image
      description
      status
    */


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
        "Database error:",
        error
      );

      propertiesContainer.innerHTML = `
        <div class="error">
          <strong>Could not load properties.</strong>
          <br><br>
          ${escapeHTML(error.message)}
        </div>
      `;

      return;
    }


    updateStats(data || []);

    displayProperties(data || []);


  } catch (error) {

    console.error(
      "Unexpected error:",
      error
    );

    propertiesContainer.innerHTML = `
      <div class="error">
        Something went wrong while loading properties.
      </div>
    `;

  }

}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStats(properties) {

  totalProperties.textContent =
    properties.length;


  const available =
    properties.filter(
      property =>
        String(property.status || "")
          .toLowerCase() === "available"
    ).length;


  const sold =
    properties.filter(
      property =>
        String(property.status || "")
          .toLowerCase() === "sold"
    ).length;


  availableProperties.textContent =
    available;

  soldProperties.textContent =
    sold;

}


// ==========================================
// DISPLAY PROPERTIES
// ==========================================

function displayProperties(properties) {

  if (!properties.length) {

    propertiesContainer.innerHTML = `
      <div class="empty">

        <h3 style="margin-bottom:10px;">
          No properties yet
        </h3>

        <p>
          Add your first property using the
          "Add Property" button.
        </p>

      </div>
    `;

    return;
  }


  propertiesContainer.innerHTML =
    properties
      .map(createPropertyCard)
      .join("");


  // Add delete listeners

  document
    .querySelectorAll(".delete-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          const id =
            button.dataset.id;

          await deleteProperty(id);

        }
      );

    });

}


// ==========================================
// PROPERTY CARD
// ==========================================

function createPropertyCard(property) {

  const title =
    property.title ||
    property.name ||
    "Untitled Property";


  const location =
    property.location ||
    "Location not specified";


  const price =
    property.price ||
    "Price on request";


  const image =
    property.image ||
    property.image_url ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";


  const status =
    property.status ||
    "Available";


  return `

    <article class="property">

      <img
        class="property-image"
        src="${escapeAttribute(image)}"
        alt="${escapeAttribute(title)}"
        onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'"
      >

      <div class="property-content">

        <div class="property-title">
          ${escapeHTML(title)}
        </div>

        <div class="property-location">
          📍 ${escapeHTML(location)}
        </div>

        <div class="property-price">
          ${escapeHTML(String(price))}
        </div>

        <div style="
          color:#999;
          font-size:13px;
          margin-bottom:15px;
        ">
          Status:
          ${escapeHTML(String(status))}
        </div>

        <div class="property-actions">

          <button
            class="delete-btn"
            data-id="${escapeAttribute(String(property.id))}"
          >
            Delete
          </button>

        </div>

      </div>

    </article>

  `;

}


// ==========================================
// DELETE PROPERTY
// ==========================================

async function deleteProperty(id) {

  const confirmed =
    confirm(
      "Are you sure you want to delete this property?"
    );


  if (!confirmed) {
    return;
  }


  try {

    const {
      error
    } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);


    if (error) {

      console.error(
        "Delete error:",
        error
      );

      alert(
        "Could not delete property: " +
        error.message
      );

      return;
    }


    await loadProperties();


  } catch (error) {

    console.error(
      "Unexpected delete error:",
      error
    );

    alert(
      "Something went wrong while deleting."
    );

  }

}


// ==========================================
// LOGOUT
// ==========================================

logoutBtn.addEventListener(
  "click",
  async () => {

    logoutBtn.disabled = true;

    logoutBtn.textContent =
      "Logging out...";


    const {
      error
    } = await supabase.auth.signOut();


    if (error) {

      console.error(
        "Logout error:",
        error
      );

      alert(
        "Could not log out."
      );

      logoutBtn.disabled = false;

      logoutBtn.textContent =
        "Logout";

      return;
    }


    window.location.href =
      "./login.html";

  }
);


// ==========================================
// SECURITY HELPERS
// ==========================================

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

  return escapeHTML(value);

}


// ==========================================
// START
// ==========================================

async function init() {

  const session =
    await checkLogin();


  if (!session) {
    return;
  }


  await loadProperties();

}


init();