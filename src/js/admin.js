/* =====================================================
   YELLOW PROPERTIES
   ADMIN PANEL
===================================================== */

const STORAGE_KEY =
  "yellow_properties_data";


/* =====================================================
   DEFAULT PROPERTIES
===================================================== */

const defaultProperties = [

  {
    id: "property-1",
    title: "Premium Residential Property",
    location: "Eden Orchard, Faisalabad",
    type: "House",
    purpose: "Sale",
    price: "Contact for price",
    beds: "4 Beds",
    baths: "4 Baths",
    area: "10 Marla",
    image: "/images/property1.jpg",
    featured: true,
    visible: true
  },

  {
    id: "property-2",
    title: "Residential Plot",
    location: "Eden Orchard, Faisalabad",
    type: "Plot",
    purpose: "Sale",
    price: "Contact for price",
    beds: "—",
    baths: "—",
    area: "10 Marla",
    image: "/images/property2.jpg",
    featured: false,
    visible: true
  },

  {
    id: "property-3",
    title: "Prime Investment Opportunity",
    location: "Eden Orchard, Faisalabad",
    type: "Commercial",
    purpose: "Sale",
    price: "Contact for price",
    beds: "—",
    baths: "—",
    area: "Prime Location",
    image: "/images/property3.jpg",
    featured: false,
    visible: true
  }

];


/* =====================================================
   GET DATA
===================================================== */

function getProperties() {

  const saved =
    localStorage.getItem(STORAGE_KEY);

  if (!saved) {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultProperties)
    );

    return [...defaultProperties];
  }

  try {

    return JSON.parse(saved);

  } catch {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultProperties)
    );

    return [...defaultProperties];

  }

}


/* =====================================================
   SAVE DATA
===================================================== */

function saveProperties(properties) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(properties)
  );

}


/* =====================================================
   LOGIN
===================================================== */

const loginScreen =
  document.getElementById("loginScreen");

const adminApp =
  document.getElementById("adminApp");

const loginForm =
  document.getElementById("loginForm");

const loginError =
  document.getElementById("loginError");


/*
  DEMO LOGIN

  Change these for your demo.

  IMPORTANT:
  This is NOT secure authentication.
*/

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "yellow123";


function showAdmin() {

  loginScreen.classList.add("hidden");

  adminApp.classList.remove("hidden");

  renderEverything();

}


if (
  sessionStorage.getItem(
    "yellow_admin_logged_in"
  ) === "true"
) {

  showAdmin();

}


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const username =
        document.getElementById(
          "username"
        ).value.trim();


      const password =
        document.getElementById(
          "password"
        ).value;


      if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
      ) {

        sessionStorage.setItem(
          "yellow_admin_logged_in",
          "true"
        );

        loginError.textContent = "";

        showAdmin();

      } else {

        loginError.textContent =
          "Incorrect username or password.";

      }

    }
  );

}


/* =====================================================
   LOGOUT
===================================================== */

const logoutBtn =
  document.getElementById("logoutBtn");


if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    () => {

      sessionStorage.removeItem(
        "yellow_admin_logged_in"
      );

      location.reload();

    }
  );

}


/* =====================================================
   SECTION NAVIGATION
===================================================== */

const sections = {

  dashboard:
    document.getElementById(
      "dashboardSection"
    ),

  properties:
    document.getElementById(
      "propertiesSection"
    ),

  addProperty:
    document.getElementById(
      "addPropertySection"
    )

};


function openSection(name) {

  Object.values(sections)
    .forEach(section => {

      if (section) {
        section.classList.add("hidden");
      }

    });


  if (sections[name]) {

    sections[name]
      .classList.remove("hidden");

  }


  const title =
    document.getElementById(
      "pageTitle"
    );


  if (title) {

    const titles = {

      dashboard: "Dashboard",

      properties: "Properties",

      addProperty: "Add Property"

    };

    title.textContent =
      titles[name] || "Dashboard";

  }


  document
    .querySelectorAll(".side-link")
    .forEach(link => {

      link.classList.remove("active");

      if (
        link.dataset.section === name
      ) {

        link.classList.add("active");

      }

    });

}


document
  .querySelectorAll("[data-section]")
  .forEach(element => {

    element.addEventListener(
      "click",
      () => {

        const section =
          element.dataset.section;

        if (section) {

          openSection(section);

        }

      }
    );

  });


/* =====================================================
   DASHBOARD
===================================================== */

function renderDashboard() {

  const properties =
    getProperties();


  const total =
    properties.length;


  const sale =
    properties.filter(
      property =>
        property.purpose === "Sale"
    ).length;


  const rent =
    properties.filter(
      property =>
        property.purpose === "Rent"
    ).length;


  const featured =
    properties.filter(
      property =>
        property.featured === true
    ).length;


  document.getElementById(
    "totalProperties"
  ).textContent = total;


  document.getElementById(
    "saleProperties"
  ).textContent = sale;


  document.getElementById(
    "rentProperties"
  ).textContent = rent;


  document.getElementById(
    "featuredProperties"
  ).textContent = featured;


  renderRecent(properties);

}


/* =====================================================
   RECENT
===================================================== */

function renderRecent(properties) {

  const container =
    document.getElementById(
      "recentProperties"
    );


  if (!container) return;


  const recent =
    [...properties]
      .reverse()
      .slice(0, 5);


  if (!recent.length) {

    container.innerHTML =
      "<p>No properties yet.</p>";

    return;

  }


  container.innerHTML =
    recent.map(property => `

      <div class="recent-item">

        <div class="recent-image">

          <img
            src="${property.image || ""}"
            alt=""
            onerror="this.style.display='none'"
          >

        </div>


        <div class="recent-info">

          <strong>
            ${escapeHTML(property.title)}
          </strong>

          <span>
            ${escapeHTML(property.location)}
          </span>

        </div>


        <div class="recent-price">

          ${escapeHTML(property.price)}

        </div>

      </div>

    `).join("");

}


/* =====================================================
   PROPERTY TABLE
===================================================== */

function renderPropertyTable() {

  const table =
    document.getElementById(
      "propertyTable"
    );


  if (!table) return;


  const properties =
    getProperties();


  if (!properties.length) {

    table.innerHTML = `
      <tr>
        <td colspan="6">
          No properties found.
        </td>
      </tr>
    `;

    return;

  }


  table.innerHTML =
    properties.map(property => `

      <tr>

        <td>

          <div class="table-property">

            <div class="table-image">

              <img
                src="${property.image || ""}"
                alt=""
                onerror="this.style.display='none'"
              >

            </div>

            <div>

              <strong>
                ${escapeHTML(property.title)}
              </strong>

              <span>
                ${escapeHTML(property.location)}
              </span>

            </div>

          </div>

        </td>


        <td>
          ${escapeHTML(property.type)}
        </td>


        <td>
          ${escapeHTML(property.purpose)}
        </td>


        <td>
          ${escapeHTML(property.price)}
        </td>


        <td>

          <span
            class="status ${
              property.visible
                ? ""
                : "hidden-status"
            }"
          >

            ${
              property.visible
                ? "Visible"
                : "Hidden"
            }

          </span>

        </td>


        <td>

          <div class="table-actions">

            <button
              class="edit-btn"
              data-edit="${property.id}"
            >
              Edit
            </button>

            <button
              class="delete-btn"
              data-delete="${property.id}"
            >
              Delete
            </button>

          </div>

        </td>

      </tr>

    `).join("");


  document
    .querySelectorAll("[data-edit]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          editProperty(
            button.dataset.edit
          );

        }
      );

    });


  document
    .querySelectorAll("[data-delete]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          deleteProperty(
            button.dataset.delete
          );

        }
      );

    });

}


/* =====================================================
   EDIT
===================================================== */

function editProperty(id) {

  const properties =
    getProperties();


  const property =
    properties.find(
      item => item.id === id
    );


  if (!property) return;


  document.getElementById(
    "propertyId"
  ).value = property.id;


  document.getElementById(
    "propertyTitle"
  ).value = property.title;


  document.getElementById(
    "propertyLocation"
  ).value = property.location;


  document.getElementById(
    "propertyType"
  ).value = property.type;


  document.getElementById(
    "propertyPurpose"
  ).value = property.purpose;


  document.getElementById(
    "propertyPrice"
  ).value = property.price;


  document.getElementById(
    "propertyBeds"
  ).value = property.beds;


  document.getElementById(
    "propertyBaths"
  ).value = property.baths;


  document.getElementById(
    "propertyArea"
  ).value = property.area;


  document.getElementById(
    "propertyImage"
  ).value = property.image;


  document.getElementById(
    "propertyFeatured"
  ).checked =
    property.featured;


  document.getElementById(
    "propertyVisible"
  ).checked =
    property.visible;


  document.getElementById(
    "formTitle"
  ).textContent =
    "Edit Property";


  updateImagePreview();


  openSection(
    "addProperty"
  );

}


/* =====================================================
   DELETE
===================================================== */

function deleteProperty(id) {

  const property =
    getProperties()
      .find(item => item.id === id);


  if (!property) return;


  const confirmed =
    confirm(
      `Delete "${property.title}"?`
    );


  if (!confirmed) return;


  const properties =
    getProperties()
      .filter(item => item.id !== id);


  saveProperties(properties);


  renderEverything();

}


/* =====================================================
   FORM
===================================================== */

const propertyForm =
  document.getElementById(
    "propertyForm"
  );


if (propertyForm) {

  propertyForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const id =
        document.getElementById(
          "propertyId"
        ).value;


      const property = {

        id:
          id ||
          `property-${Date.now()}`,

        title:
          document.getElementById(
            "propertyTitle"
          ).value.trim(),

        location:
          document.getElementById(
            "propertyLocation"
          ).value.trim(),

        type:
          document.getElementById(
            "propertyType"
          ).value,

        purpose:
          document.getElementById(
            "propertyPurpose"
          ).value,

        price:
          document.getElementById(
            "propertyPrice"
          ).value.trim(),

        beds:
          document.getElementById(
            "propertyBeds"
          ).value.trim(),

        baths:
          document.getElementById(
            "propertyBaths"
          ).value.trim(),

        area:
          document.getElementById(
            "propertyArea"
          ).value.trim(),

        image:
          document.getElementById(
            "propertyImage"
          ).value.trim(),

        featured:
          document.getElementById(
            "propertyFeatured"
          ).checked,

        visible:
          document.getElementById(
            "propertyVisible"
          ).checked

      };


      const properties =
        getProperties();


      const existingIndex =
        properties.findIndex(
          item => item.id === id
        );


      if (existingIndex >= 0) {

        properties[existingIndex] =
          property;

      } else {

        properties.push(property);

      }


      saveProperties(properties);


      alert(
        existingIndex >= 0
          ? "Property updated successfully."
          : "Property added successfully."
      );


      resetForm();

      renderEverything();

      openSection(
        "properties"
      );

    }
  );

}


/* =====================================================
   RESET FORM
===================================================== */

function resetForm() {

  if (!propertyForm) return;


  propertyForm.reset();


  document.getElementById(
    "propertyId"
  ).value = "";


  document.getElementById(
    "propertyVisible"
  ).checked = true;


  document.getElementById(
    "formTitle"
  ).textContent =
    "Add Property";


  updateImagePreview();

}


const cancelEdit =
  document.getElementById(
    "cancelEdit"
  );


if (cancelEdit) {

  cancelEdit.addEventListener(
    "click",
    () => {

      resetForm();

      openSection(
        "properties"
      );

    }
  );

}


/* =====================================================
   IMAGE PREVIEW
===================================================== */

const imageInput =
  document.getElementById(
    "propertyImage"
  );


function updateImagePreview() {

  const preview =
    document.getElementById(
      "imagePreview"
    );


  if (!preview) return;


  const url =
    imageInput
      ? imageInput.value.trim()
      : "";


  if (!url) {

    preview.innerHTML =
      "<span>Image preview</span>";

    return;

  }


  preview.innerHTML = `

    <img
      src="${escapeHTML(url)}"
      alt="Preview"
      onerror="
        this.style.display='none';
        this.parentElement.innerHTML='<span>Image could not be loaded</span>';
      "
    >

  `;

}


if (imageInput) {

  imageInput.addEventListener(
    "input",
    updateImagePreview
  );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =====================================================
   RENDER EVERYTHING
===================================================== */

function renderEverything() {

  renderDashboard();

  renderPropertyTable();

  updateImagePreview();

}


/* =====================================================
   INITIAL
===================================================== */

if (
  sessionStorage.getItem(
    "yellow_admin_logged_in"
  ) === "true"
) {

  renderEverything();

}