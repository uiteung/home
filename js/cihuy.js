import {
  CihuyId,
  CihuyClickListenenr,
} from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";

function redirectRTM(token) {
  const newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${encodeURIComponent(
    token
  )}`;
  window.location.assign(newUrl);
}

CihuyDomReady(() => {
  const token = CihuyGetCookie("login");
  CihuyAddClickListener("rtm", (event) => {
    event.preventDefault();
    redirectRTM(token);
  });
});
