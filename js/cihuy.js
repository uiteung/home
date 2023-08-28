import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";

CihuyDomReady(() => {
  // Dapatkan elemen dengan ID "rtm"
  let rtmLink = CihuyId("rtm");

  // Dapatkan nilai cookie "login"
  let token = CihuyGetCookie("login");

  rtmLink.addEventListener("click", function (event) {
    event.preventDefault();
    // Mencegah perilaku default tautan

    if (token) {
      let newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${token}`;
      window.location.assign(newUrl);
    } else {
      console.log("Token tidak ditemukan dalam cookie.");
    }
  });
});

// CihuyDomReady(() => {
//   rtmlink.addEventListener("click", () => {
//     event.preventDefault();
//     let newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${token}`;

//     window.location.assign(newUrl);
//   });
// });
