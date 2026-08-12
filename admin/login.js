import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";


// ==========================================
// SUPABASE
// ==========================================

const SUPABASE_URL =
  "https://vkooufqxtkqwyytocztz.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_JZAXgNUK2NoWdHXRla_4dw_oBuAlSzr";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);


// ==========================================
// ELEMENTS
// ==========================================

const form =
  document.getElementById("loginForm");

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

const loginButton =
  document.getElementById("loginButton");

const loginText =
  document.getElementById("loginText");

const message =
  document.getElementById("loginMessage");


// ==========================================
// MESSAGE
// ==========================================

function showMessage(text, type = "error") {

  message.textContent = text;

  message.className =
    `login-message ${type}`;

}


// ==========================================
// CHECK EXISTING SESSION
// ==========================================

async function checkSession() {

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
}


// ==========================================
// LOGIN
// ==========================================

form.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    const email =
      emailInput.value.trim();

    const password =
      passwordInput.value;


    if (!email || !password) {

      showMessage(
        "Please enter your email and password."
      );

      return;
    }


    loginButton.disabled = true;

    loginText.textContent =
      "Signing in...";

    showMessage("", "");


    try {

      const {
        data,
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });


      if (error) {

        console.error(
          "Login error:",
          error
        );

        showMessage(
          getLoginError(error)
        );

        loginButton.disabled = false;

        loginText.textContent =
          "Login";

        return;
      }


      if (!data.session) {

        showMessage(
          "Login failed. No session was created."
        );

        loginButton.disabled = false;

        loginText.textContent =
          "Login";

        return;
      }


      showMessage(
        "Login successful! Redirecting...",
        "success"
      );


      // Give Supabase a moment to save
      // the session before redirecting.

      setTimeout(() => {

        window.location.href =
          "./dashboard.html";

      }, 500);


    } catch (error) {

      console.error(
        "Unexpected login error:",
        error
      );

      showMessage(
        "Something went wrong. Please try again."
      );

      loginButton.disabled = false;

      loginText.textContent =
        "Login";
    }

  }
);


// ==========================================
// FRIENDLY ERRORS
// ==========================================

function getLoginError(error) {

  if (
    error.message
      .toLowerCase()
      .includes("invalid login credentials")
  ) {

    return "Incorrect email or password.";
  }


  if (
    error.message
      .toLowerCase()
      .includes("email not confirmed")
  ) {

    return "Please confirm your email address first.";
  }


  return error.message ||
    "Unable to log in.";
}


// ==========================================
// START
// ==========================================

checkSession();