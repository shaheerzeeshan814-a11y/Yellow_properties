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

const form =
  document.getElementById("propertyForm");

const imageBox =
  document.getElementById("imageBox");

const imageFile =
  document.getElementById("imageFile");

const imageUrl =
  document.getElementById("imageUrl");

const preview =
  document.getElementById("preview");

const selectedName =
  document.getElementById("selectedName");

const submitBtn =
  document.getElementById("submitBtn");

const message =
  document.getElementById("message");


// Holds the image pasted/selected
let selectedImageFile = null;


// ==========================================
// LOGIN CHECK
// ==========================================

async function checkLogin() {

  const {
    data,
    error
  } = await supabase.auth.getSession();

  if (error || !data.session) {

    window.location.href =
      "./login.html";

    return false;
  }

  return true;
}


// ==========================================
// SHOW PREVIEW
// ==========================================

function showPreview(file) {

  if (!file) return;

  selectedImageFile = file;

  const url =
    URL.createObjectURL(file);

  preview.src = url;

  preview.style.display = "block";

  selectedName.textContent =
    file.name || "Pasted image";

}


// ==========================================
// CHOOSE FILE
// ==========================================

imageFile.addEventListener(
  "change",
  function () {

    const file =
      imageFile.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      showError(
        "Please choose an image file."
      );

      return;
    }

    showPreview(file);

  }
);


// ==========================================
// PASTE IMAGE
// ==========================================

document.addEventListener(
  "paste",
  function (event) {

    const items =
      event.clipboardData?.items;

    if (!items) return;

    for (const item of items) {

      if (
        item.kind === "file" &&
        item.type.startsWith("image/")
      ) {

        const file =
          item.getAsFile();

        if (file) {

          showPreview(file);

          event.preventDefault();

          return;
        }
      }
    }

  }
);


// ==========================================
// DRAG & DROP
// ==========================================

imageBox.addEventListener(
  "dragover",
  function (event) {

    event.preventDefault();

    imageBox.classList.add(
      "dragging"
    );

  }
);


imageBox.addEventListener(
  "dragleave",
  function () {

    imageBox.classList.remove(
      "dragging"
    );

  }
);


imageBox.addEventListener(
  "drop",
  function (event) {

    event.preventDefault();

    imageBox.classList.remove(
      "dragging"
    );

    const file =
      event.dataTransfer.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      showError(
        "Please drop an image file."
      );

      return;
    }

    showPreview(file);

  }
);


// ==========================================
// IMAGE URL PREVIEW
// ==========================================

imageUrl.addEventListener(
  "input",
  function () {

    // Don't replace a selected/pasted image

    if (selectedImageFile) {
      return;
    }

    const url =
      imageUrl.value.trim();

    if (!url) {

      preview.style.display =
        "none";

      return;
    }

    preview.src = url;

    preview.style.display =
      "block";

    selectedName.textContent =
      "Image URL";

  }
);


// ==========================================
// UPLOAD IMAGE TO SUPABASE STORAGE
// ==========================================

async function uploadImage(file) {

  const extension =
    file.name
      ?.split(".")
      .pop()
      ?.toLowerCase() || "jpg";


  const fileName =
    `${crypto.randomUUID()}.${extension}`;


  const filePath =
    `properties/${fileName}`;


  const {
    error
  } = await supabase.storage
    .from("property-images")
    .upload(
      filePath,
      file,
      {
        contentType: file.type,
        upsert: false
      }
    );


  if (error) {

    throw new Error(
      "Image upload failed: " +
      error.message
    );

  }


  const {
    data
  } = supabase.storage
    .from("property-images")
    .getPublicUrl(filePath);


  if (!data?.publicUrl) {

    throw new Error(
      "Could not create image URL."
    );

  }


  return data.publicUrl;

}


// ==========================================
// ADD PROPERTY
// ==========================================

form.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();

    clearMessage();

    const title =
      document
        .getElementById("title")
        .value
        .trim();

    const location =
      document
        .getElementById("location")
        .value
        .trim();

    const price =
      document
        .getElementById("price")
        .value
        .trim();

    const status =
      document
        .getElementById("status")
        .value;

    const propertyType =
      document
        .getElementById("propertyType")
        .value;

    const bedrooms =
      document
        .getElementById("bedrooms")
        .value;

    const bathrooms =
      document
        .getElementById("bathrooms")
        .value;

    const area =
      document
        .getElementById("area")
        .value
        .trim();

    const description =
      document
        .getElementById("description")
        .value
        .trim();


    if (!title) {

      showError(
        "Please enter a property title."
      );

      return;
    }


    if (!location) {

      showError(
        "Please enter the location."
      );

      return;
    }


    if (!price) {

      showError(
        "Please enter the price."
      );

      return;
    }


    submitBtn.disabled = true;

    submitBtn.textContent =
      "Saving Property...";


    try {

      // ====================================
      // DETERMINE IMAGE
      // ====================================

      let finalImageUrl = "";


      // A pasted/selected local image
      // takes priority over URL

      if (selectedImageFile) {

        submitBtn.textContent =
          "Uploading Image...";

        finalImageUrl =
          await uploadImage(
            selectedImageFile
          );

      }

      // Otherwise use URL

      else if (
        imageUrl.value.trim()
      ) {

        finalImageUrl =
          imageUrl.value.trim();

      }


      // ====================================
      // INSERT PROPERTY
      // ====================================

      submitBtn.textContent =
        "Saving Property...";


      const {
        data,
        error
      } = await supabase
        .from("properties")
        .insert([
          {
            title: title,
            location: location,
            price: price,
            status: status,

            property_type:
              propertyType,

            bedrooms:
              bedrooms
                ? Number(bedrooms)
                : null,

            bathrooms:
              bathrooms
                ? Number(bathrooms)
                : null,

            area: area,

            image:
              finalImageUrl,

            description:
              description
          }
        ])
        .select();


      if (error) {

        console.error(
          "Database error:",
          error
        );

        throw new Error(
          error.message
        );

      }


      console.log(
        "Property created:",
        data
      );


      showSuccess(
        "Property added successfully!"
      );


      form.reset();

      selectedImageFile = null;

      preview.src = "";

      preview.style.display =
        "none";

      selectedName.textContent =
        "";


      setTimeout(
        function () {

          window.location.href =
            "./dashboard.html";

        },
        1000
      );


    } catch (error) {

      console.error(
        error
      );

      showError(
        error.message ||
        "Something went wrong."
      );

      submitBtn.disabled =
        false;

      submitBtn.textContent =
        "Add Property";

    }

  }
);


// ==========================================
// MESSAGES
// ==========================================

function showError(text) {

  message.className =
    "message error";

  message.textContent =
    text;

}


function showSuccess(text) {

  message.className =
    "message success";

  message.textContent =
    text;

}


function clearMessage() {

  message.className =
    "message";

  message.textContent =
    "";

}


// ==========================================
// START
// ==========================================

checkLogin();