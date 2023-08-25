import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";

let rtmlink = CihuyId("rtm");
let token = CihuyGetCookie("login");

// CihuyDomReady(() => {
//   rtmlink.addEventListener("click", () => {
//     // event.preventDefault();
//     let newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${token}`;

//     window.location.replace(newUrl);
//   });
// });
rtmLink.addEventListener("click", function (event) {
  event.preventDefault(); // Mencegah perilaku default tautan

  if (token) {
    // Buat URL baru dengan menambahkan parameter uuid (gunakan nilai token)
    let newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${token}`;

    // Arahkan pengguna ke URL baru
    window.location.assign = newUrl;
    console.log(newUrl);
  } else {
    console.log("Token tidak ditemukan dalam cookie.");
  }
});
