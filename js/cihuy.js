import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyPostHeaders } from "https://c-craftjs.github.io/api/api.js";

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
const apiUrlMenu = "https://simbe-dev.ulbi.ac.id/api/v1/menu/";
CihuyPostHeaders(apiUrlMenu, token)
  .then((result) => {
    console.log(result);

    // Parse respons JSON
    const response = JSON.parse(result);

    // Dapatkan data URL dari respons
    const dataUrl = response.data;

    // URL dasar situs Anda
    const baseUrl = "https://alamat-situs-anda.com";

    // Gabungkan URL data dengan URL dasar
    const fullUrl = baseUrl + dataUrl;

    // Menentukan URL tujuan berdasarkan data URL
    let destinationUrl = "";

    if (dataUrl === "/admins") {
      destinationUrl = "/Dashboard.html";
    } else if (dataUrl === "/fakultas") {
      destinationUrl = "/DashboardFakultas.html";
    } else if (dataUrl === "/auditors") {
      destinationUrl = "/DashboardAuditor.html";
    } else if (dataUrl === "/prodi") {
      destinationUrl = "/DashboardProdi.html";
    } else {
      // URL tidak sesuai, tangani sesuai kebutuhan
      console.error("URL tidak sesuai");
      return;
    }

    // Redirect pengguna ke halaman yang sesuai
    window.location.href = baseUrl + destinationUrl;
  })
  .catch((error) => {
    console.log("Error:", error);
  });
