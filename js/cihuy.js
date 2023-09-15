import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyGetHeaders } from "https://c-craftjs.github.io/api/api.js";
import { CihuyQuerySelector } from "https://c-craftjs.github.io/element/element.js";

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

//membuat get user dashboard berdasarkan respons
document.addEventListener("DOMContentLoaded", () => {
  const simpelbiCard = document.getElementById("simpelbiCard");

  if (simpelbiCard) {
    simpelbiCard.addEventListener("click", async (event) => {
      event.preventDefault();

      const postApiUrlMenu = "https://simbe-dev.ulbi.ac.id/api/v1/menu/";

      try {
        let token = CihuyGetCookie("login");

        // Lakukan permintaan POST
        const postResult = await CihuyGetHeaders(postApiUrlMenu, token);

        // Parse respons JSON dari permintaan POST
        const responseData = JSON.parse(postResult);

        // Dapatkan data URL dari respons
        const dataUrl = responseData.data;

        // Tentukan halaman tujuan berdasarkan data URL
        let targetPage = "";
        if (
          responseData.code === 400 &&
          responseData.success === false &&
          responseData.status === "Data user level tidak ditemukan" &&
          responseData.data === null
        ) {
          window.location.assign = "https://euis.ulbi.ac.id/simpelbi/404.html";
        } else if (dataUrl === "/admins") {
          targetPage = "dashboard.html";
        } else if (dataUrl === "/prodi") {
          targetPage = "dashboard-prodi.html";
        } else if (dataUrl === "/fakultas") {
          targetPage = "dashboard-fakultas.html";
        } else if (dataUrl === "/auditors") {
          targetPage = "dashboard-auditor.html";
        } else if (
          responseData.code === 401 &&
          responseData.success === false &&
          responseData.status === "Unauthorize Token" &&
          responseData.data === null
        ) {
          targetPage = "404.html";
        } else {
          targetPage = "404.html";
          console.error("URL tidak sesuai");
          return;
        }

        // Konstruksi URL akhir
        const finalUrl = `https://euis.ulbi.ac.id/simpelbi${dataUrl}/${targetPage}`;

        // Arahkan pengguna ke URL akhir
        window.location.href = finalUrl;
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
});
