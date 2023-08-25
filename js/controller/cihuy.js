
import {CihuyId} from "https://c-craftjs.github.io/element/element.js";
import {CihuyGetCookie} from "https://c-craftjs.github.io/link/link.js"


export function magiclink(event){
    event.preventDefault();

    const token = CihuyGetCookie("login");
    const newurlrtm = "https://rtm.ulbi.ac.id?uuid=" +token;

    window.location.href = newurlrtm
}

CihuyId("rtm").addEventListener("click", magiclink)