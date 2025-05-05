import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";

const baseURLAPI = "https://repoulbi-be.ulbi.ac.id/repoulbi/contents";
const repository = "general";

document.addEventListener("DOMContentLoaded", function () {
    let token = CihuyGetCookie("login");
    if (token === "") {
        window.location.href = "https://euis.ulbi.ac.id"
    };

    console.log("repo.js loaded")

    fetch("https://repoulbi-be.ulbi.ac.id/repoulbi/getuploaddetails", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "login": `${token}` // Kirim header login
        }
    })
        .then((response) => response.json())
        .then((res) => {
            const data = res.data;
            console.log("response", res.data);
            const tbody = document.querySelector("table tbody");
            tbody.innerHTML = ""; // Kosongkan isi tabel dulu

            data.forEach((item) => {
                const tr = document.createElement("tr");

                const tanggal = new Date(item.tanggal_ditetapkan);
                const formattedDate = tanggal.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });

                tr.innerHTML = `<tr>
            <td>${item.filename}</td>
            <td>${formattedDate}</td>
            <td>
              <button type="button" class="btn btn-primary btn-square ms-auto" onclick="viewFile('${item.download_url}')">View</button>
            </td></tr>
          `;

                tbody.appendChild(tr);
            });
        })
        .catch((error) => {
            console.error("Gagal mengambil data:", error);
        });

    window.viewFile = function (url) {
        if (!url) {
            console.error("No URL provided.");
            alert("View URL not available for this item.");
            return;
        }

        const pdfUrl = encodeURIComponent(url);
        window.open(`https://repo.ulbi.ac.id/view.html?pdfUrl=${pdfUrl}`, "_blank");
        // window.open("view/#" + { url }, "_blank");
    };
});