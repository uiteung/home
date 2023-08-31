import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyPostHeaders } from "https://c-craftjs.github.io/api/api.js";
import { CihuyQuerySelector } from "https://c-craftjs.github.io/element/element.js";
import { token } from "./controller/cookies";

document.addEventListener("DOMContentLoaded", function () {
  // Dapatkan elemen dengan ID "rtm"
  let rtmLink = document.getElementById("rtm");

  // Dapatkan nilai cookie "login"
  let token = CihuyGetCookie("login");

  // Tambahkan event listener untuk mengarahkan saat elemen diklik
  rtmLink.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah perilaku default tautan

    if (token) {
      // Buat URL baru dengan menambahkan parameter uuid (gunakan nilai token)
      let newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${token}`;

      // Arahkan pengguna ke URL baru
      window.location.assign(newUrl);
    } else {
      console.log("Token tidak ditemukan dalam cookie.");
    }
  });
});

export function handleRtmClick(event) {
  event.preventDefault();

  if (token) {
    let newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${token}`;
    window.location.assign(newUrl);
  } else {
    console.log("Token tidak ditemukan dalam cookie.");
  }
}

//membuat get user

function redirectToDashboard(baseUrl, dataUrl) {
  // Menentukan URL tujuan berdasarkan data URL
  let destinationUrl = "";

  if (dataUrl === "/admins") {
    destinationUrl = "/dashboard.html";
  } else if (dataUrl === "/fakultas") {
    destinationUrl = "/dashboard-fakultas.html";
  } else if (dataUrl === "/auditors") {
    destinationUrl = "/dashboard-auditor.html";
  } else if (dataUrl === "/prodi") {
    destinationUrl = "/dashboard-prodi.html";
  } else {
    // URL tidak sesuai, tangani sesuai kebutuhan
    console.error("URL tidak sesuai");
    return;
  }

  // Redirect pengguna ke halaman yang sesuai
  console.log("Redirecting to:", baseUrl + destinationUrl);

  window.location.href = baseUrl + dataUrl + destinationUrl;
}

const simpelbiCard = CihuyId("simpelbiCard");
token = CihuyGetCookie("login");

if (simpelbiCard) {
  simpelbiCard.addEventListener("click", async (event) => {
    event.preventDefault();

    const apiUrlMenu = "https://simbe-dev.ulbi.ac.id/api/v1/menu/";
    const baseUrl = "https://euis.ulbi.ac.id";

    try {
      const result = await CihuyPostHeaders(apiUrlMenu, token);
      const dataUrl = result.data;
      console.log("Data URL from API:", dataUrl);

      // Determine user role based on dataUrl
      let userRole = "";
      if (dataUrl === "/admins") {
        userRole = "admin";
      } else if (dataUrl === "/fakultas") {
        userRole = "fakultas";
      } else if (dataUrl === "/prodi") {
        userRole = "prodi";
      } else if (dataUrl === "/auditors") {
        userRole = "auditor";
      } else {
        console.error("URL tidak sesuai");
        return;
      }

      redirectToDashboard(baseUrl, dataUrl, userRole);
    } catch (error) {
      console.error("Error:", error);
    }
  });
}
