import {
  CihuyId,
  CihuyLinkClick,
} from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";

CihuyDomReady(() => {
  const token = CihuyGetCookie("login");

  const rtmlink = CihuyId("rtm");
  const uuid = token;
  //   console.log("Token:", token);

  rtmlink.addEventListener("click", (event) => {
    // console.log("UUID:", uuid);
    // console.log(`URL: https://rtm.ulbi.ac.id/index.php/auth?uuid=${uuid}`);
    CihuyLinkClick(
      event,
      `https://rtm.ulbi.ac.id/index.php/auth?uuid=${encodeURIComponent(token)}`
    );
  });
});
