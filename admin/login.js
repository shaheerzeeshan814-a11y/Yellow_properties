import { supabase } from "../src/js/supabase.js";

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

const loginMessage =
  document.getElementById("loginMessage");


// ========================================
// MESSAGE
// ========================================

function showMessage(message, type = "error") {

  loginMessage.textContent = message;

  loginMessage.className =
    `login-message ${type}`;
}


// ========================================
// CHECK EXISTING LOGIN
// ========================================

async function checkExistingSession() {

  const {
    data,
    error
  } = await supabase.auth.getSession();

  if (error) {

    console.error(
      "Session check error:",
      error
    );

    return;
  }

  if (data.session) {

    window.location.replace(
      "./dashboard.html"
    );
  }
}


// ========================================
// LOGIN
// ========================================

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
        "Enter your email and password."
      );

      return;
    }


    loginButton.disabled = true;

    loginText.textContent =
      "Signing in...";

    showMessage("");


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


        if (
          error.message
            .toLowerCase()
            .includes(
              "invalid login credentials"
            )
        ) {

          showMessage(
            "Incorrect email or password."
          );

        } else {

          showMessage(
            error.message
          );

        }


        loginButton.disabled = false;

        loginText.textContent =
          "Login";

        return;
      }


      if (!data.session) {

        showMessage(
          "Login failed: no session was created."
        );

        loginButton.disabled = false;

        loginText.textContent =
          "Login";

        return;
      }


      showMessage(
        "Login successful!",
        "success"
      );


      // Session is now stored by Supabase.

      setTimeout(() => {

        window.location.replace(
          "./dashboard.html"
        );

      }, 500);


    } catch (error) {

      console.error(
        "Unexpected login error:",
        error
      );

      showMessage(
        "Unable to connect to Supabase."
      );

      loginButton.disabled = false;

      loginText.textContent =
        "Login";
    }

  }
);


// ========================================
// START
// ========================================

checkExistingSession();