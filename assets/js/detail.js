let detailId = document.getElementById("content-detail");
// console.log(detailId);

let buttonRemove = document.getElementById("button-remove");
// console.log(buttonRemove);

let buttonReserve = document.getElementById("button-reserve");
// console.log(buttonReserve);

let AccueilIndex = document.getElementById("indexAccueil");
console.log(AccueilIndex);

// ------------Comparer le role pour faire apparaitre les elements-----------

const loggedinUser = localStorage.getItem("loggedUser");
const logged = JSON.parse(loggedinUser);
console.log(logged);

if (loggedinUser) {
  if (logged.role === "admin") {
    buttonRemove.style.display = "block";
    buttonReserve.style.visibility = "visible";
  } else if (logged.role === "superadmin") {
    buttonRemove.style.display = "block";
    buttonReserve.style.visibility = "visible";
  } else if (logged.role === "user") {
    buttonReserve.style.visibility = "visible";
  }
}

// ----------------Event--------------

AccueilIndex.addEventListener("mouseover", () => {
  AccueilIndex.style.backgroundColor = "rgba(75, 177, 55, 0.541)";
  AccueilIndex.style.transform = "scale(1.4)";
  AccueilIndex.style.transition = "0.5s";
});
AccueilIndex.addEventListener("mouseout", () => {
  AccueilIndex.style.backgroundColor = "";
  AccueilIndex.style.transform = "scale(1)";
});

buttonRemove.addEventListener("mouseover", () => {
  buttonRemove.style.transform = "scale(1.4)";
  buttonRemove.style.transition = "0.5s";
});
buttonRemove.addEventListener("mouseout", () => {
  buttonRemove.style.transform = "scale(1)";
});

const param = new URLSearchParams(window.location.search);
const myId = param.get("id");
// console.log(myId);

import detailCard from "../../conpenents/detail-card.js";
// console.log(detailCard);

let lien = `http://localhost:3000/events/${myId}`;

fetch(lien)
  .then((response) => response.json())
  .then((event) => {
    console.log(event);
    // console.log(event.cover);
    detailId.innerHTML = `${detailCard(event)} `;

    // ---------------Boutons reservation----------

    if (event.participants < event.capacity) {
      buttonReserve.addEventListener("click", () => {
        event.participants++;
        console.log(event.participants);
        buttonReserve.disabled = true;
      });
    }

    // -----------------------MAP Geolocalisation Event-------------------------
    var map = L.map("map").setView(
      [`${event.position.latitude}`, ` ${event.position.longitude} `],
      13
    );
    var marker = L.marker([
      `${event.position.latitude}`,
      ` ${event.position.longitude} `,
    ]).addTo(map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    marker
      .bindPopup(
        ` ${event.event_name}<br>${event.event_type} organisé par ${event.organizer} `
      )
      .openPopup();
  })
  .catch((err) => {
    console.log(err);
  });

// -----------------Remove button-----------------------

buttonRemove.addEventListener("click", () => {
  if (confirm("Voulez vous supprimer l'événement ? ")) {
    supEvent();
    alert("Evénement supprimé");
  }
});

function supEvent() {
  fetch(lien, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((newEvent) => {
      // console.log(newEvent);

      // ---------redirige la page en direction de l'accueil-----
      window.location.href = "../index.html";
    })

    .catch((err) => {
      console.log(err);
    });
}
