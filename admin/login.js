import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


// ==========================================
// SUPABASE
// ==========================================

const SUPABASE_URL =
  "https://vkooufqxtkqwyytocztz.supabase.co";


// IMPORTANT:
// Put your SUPABASE PUBLISHABLE KEY here.
// Do NOT use your service_role/secret key.

const SUPABASE_ANON_KEY =
  "sb_publishable_JZAXgNUK2NoWdHXRla_4dw_oBuAlSzr";


const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// ==========================================
// ELEMENTS
// ==========================================

const loginForm =
  document.getElementById("loginForm");

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

const loginButton =
  document.getElementById("loginButton");

const loginMessage =
  document.getElementById("loginMessage");


// ==========================================
// CHECK IF ALREADY LOGGED IN
// ==========================================

async function checkExistingSession() {

  try {

    const {
      data: {
        session
      },
      error
    } = await supabase.auth.getSession();


    if (error) {

      console.error(
        "Session error:",
        error
      );

      return;
    }


    if (session) {

      window.location.href =
        "./dashboard.html";

    }

  } catch (error) {

    console.error(
      "Session check failed:",
      error
    );

  }

}


checkExistingSession();


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();


    const email =
      emailInput.value.trim();

    const password =
      passwordInput.value;


    // Clear previous message

    loginMessage.textContent = "";

    loginMessage.className = "error";


    // Basic validation

    if (!email) {

      loginMessage.textContent =
        "Please enter your email.";

      return;
    }


    if (!password) {

      loginMessage.textContent =
        "Please enter your password.";

      return;
    }


    // Disable button

    loginButton.disabled = true;

    loginButton.textContent =
      "Signing in...";


    try {

      const {
        data,
        error
      } = await supabase.auth.signInWithPassword({

        email: email,

        password: password

      });


      if (error) {

        console.error(
          "Supabase login error:",
          error
        );


        loginMessage.textContent =
          error.message;


        loginButton.disabled = false;

        loginButton.textContent =
          "Sign In";

        return;
      }


      if (!data.session) {

        loginMessage.textContent =
          "Login failed. No session was created.";

        loginButton.disabled = false;

        loginButton.textContent =
          "Sign In";

        return;
      }


      // Success

      loginMessage.className =
        "error success";

      loginMessage.textContent =
        "Login successful. Opening dashboard...";


      // Small delay so the user can see success

      setTimeout(
        function () {

          window.location.href =
            "./dashboard.html";

        },
        500
      );


    } catch (error) {

      console.error(
        "Unexpected login error:",
        error
      );


      loginMessage.textContent =
        "Something went wrong. Please try again.";


      loginButton.disabled = false;

      loginButton.textContent =
        "Sign In";

    }

  }
);


// ==========================================
// AUTH STATE
// ==========================================

supabase.auth.onAuthStateChange(
  function (event, session) {

    console.log(
      "Auth event:",
      event
    );


    if (
      event === "SIGNED_IN" &&
      session
    ) {

      window.location.href =
        "./dashboard.html";

    }

  }
);