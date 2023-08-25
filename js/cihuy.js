import {
  CihuyId,
  CihuyLinkClick,
} from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/link/link.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";

const token = CihuyGetCookie("login");

CihuyDomReady(() => {
  const rtmlink = CihuyId("rtm");
  const uuid = token;

  rtmlink.addEventListener("click", (event) => {
    CihuyLinkClick(event, `https://rtm.ulbi.ac.id/index.php/auth?uuid=${uuid}`);
  });
});
