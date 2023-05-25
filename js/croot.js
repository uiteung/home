import { token } from "./controller/cookies.js";

if (token === "") {
	window.location.assign("https://iteung.ulbi.ac.id");
}