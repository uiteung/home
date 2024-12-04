import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyGetHeaders } from "https://c-craftjs.github.io/api/api.js";
import { CihuyQuerySelector } from "https://c-craftjs.github.io/element/element.js";

document.addEventListener("DOMContentLoaded", function () {
  // Dapatkan elemen dengan ID "rtm"
  let rtmLink = document.getElementById("rtm");

  // Dapatkan nilai cookie "login"
  //   let token = CihuyGetCookie("login");

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

        //

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
          targetPage = "dashboard-admins.html";
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

// <----- Lulu ----->

document.addEventListener("DOMContentLoaded", () => {
  // Fungsi untuk mendapatkan nilai cookie dan mendekripsinya
  function getCookie(name) {
    const key = "kecuali-mhs"; // Kunci harus sama dengan yang digunakan untuk enkripsi
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].trim();
      if (cookiePair.startsWith(name + "=")) {
        const encryptedValue = cookiePair.substring(name.length + 1);
        const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
        const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedValue;
      }
    }
    return null;
  }

  // Fungsi untuk handle klik pada link
  function handleLinkClick(event) {
    event.preventDefault(); // Cegah redirect default
    const link = event.target.closest("a"); // Cari elemen <a> terdekat
    if (!link) return; // Jika tidak ada elemen <a>, hentikan eksekusi

    const accessToken = getCookie("user_role") ? getCookie("user_role") : null; // Ambil nilai cookie peg_role
    if (accessToken !== null) {
      // Jika memiliki akses, redirect ke halaman tujuan
      window.location.href = link.href; // Gunakan link.href
    } else {
      // Jika tidak memiliki akses, tampilkan pesan error
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Mohon maaf, Anda tidak memiliki akses menuju halaman ini",
      });
    }
  }

  // Tambahkan event listener pada link
  const luluCard = document.getElementById("luluCard");
  luluCard.addEventListener("click", handleLinkClick);
});
