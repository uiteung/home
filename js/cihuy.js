import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";

CihuyDomReady(() => {
  const rtmlink = CihuyId("rtm");
  const token = CihuyGetCookie("login");

  rtmlink.addEventListener("click", () => {
    // event.preventDefault();
    const newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${token}`;

    window.location.href(newUrl);
  });
});
