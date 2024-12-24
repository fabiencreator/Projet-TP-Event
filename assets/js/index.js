let newEventId = document.getElementById("content-newEvent");
// console.log(newEventId);

let formAccueil = document.getElementById("form-accueil");
// console.log(formAccueil);

let formCo = document.getElementById("formCo");
// console.log(formCo);

let connection = document.getElementById("connection");
// console.log(formCo, connection);

let formIns = document.getElementById("formins");
// console.log(formIns);

let inscription = document.getElementById("inscription");
// console.log(inscription);

let formDeco = document.getElementById("form-deco");
// console.log(formDeco);

let formUsers = document.getElementById("formusers");
console.log(formUsers);

// ---------------Identifiant--------------
formCo.addEventListener("click", () => {
  connection.style.display = "block";
});

formIns.addEventListener("click", () => {
  inscription.style.display = "block";
});
// ------------------Event----------------

formUsers.addEventListener("mouseover", () => {
  formUsers.style.backgroundColor = "rgba(58, 36, 197, 0.678)";
});
formUsers.addEventListener("mouseout", () => {
  formUsers.style.backgroundColor = "";
});

formAccueil.addEventListener("mouseover", () => {
  formAccueil.style.backgroundColor = "rgba(75, 177, 55, 0.541)";
});
formAccueil.addEventListener("mouseout", () => {
  formAccueil.style.backgroundColor = "";
});

formCo.addEventListener("mouseover", () => {
  formCo.style.backgroundColor = "rgba(212, 69, 189, 0.54)";
});
formCo.addEventListener("mouseout", () => {
  formCo.style.backgroundColor = "";
});

formDeco.addEventListener("mouseover", () => {
  formDeco.style.backgroundColor = "rgba(194, 13, 13, 0.62)";
});
formDeco.addEventListener("mouseout", () => {
  formDeco.style.backgroundColor = "";
});

formIns.addEventListener("mouseover", () => {
  formIns.style.backgroundColor = "rgba(30, 138, 180, 0.54)";
});
formIns.addEventListener("mouseout", () => {
  formIns.style.backgroundColor = "";
});

newEventId.addEventListener("mouseover", (e) => {
  if (e.target.closest(".content-p")) {
    e.target.closest(".content-p").style.backgroundColor = "lightblue";
    e.target.closest(".content-p").style.border = "solid 3px orange";
  }
});

newEventId.addEventListener("mouseout", (e) => {
  if (e.target.closest(".content-p")) {
    e.target.closest(".content-p").style.backgroundColor = "";
  }
});

newEventId.addEventListener("mouseover", (e) => {
  if (e.target.closest("#button")) {
    e.target.closest("#button").style.color = "black";
    e.target.closest("#button").style.border =
      "solid 1px rgba(75, 177, 55, 0.541)";
    e.target.closest("#button").style.backgroundColor =
      "rgba(75, 177, 55, 0.541)";
  }
});

newEventId.addEventListener("mouseout", (e) => {
  if (e.target.closest("#button")) {
    e.target.closest("#button").style.color = "";
    e.target.closest("#button").style.border = "";
    e.target.closest("#button").style.backgroundColor = "";
  }
});

import eventsCard from "../../conpenents/event-card.js";
// console.log(newEventsCard);

fetch(`http://localhost:3000/events`)
  .then((response) => response.json())
  .then((newEvent) => {
    // console.log(newEvent);
    newEvent.forEach((element) => {
      newEventId.innerHTML += `${eventsCard(element)}`;
    });
  })
  .catch((err) => {
    console.log(err);
  });

// -------------------formulaire inscription --------------

const formInscription = document.querySelector("#incription-form");
console.log(formInscription);

let lienUsers = `http://localhost:3000/users`;

fetch(lienUsers)
  .then((response) => response.json())
  .then((events) => {
    formInscription.addEventListener("submit", function (log) {
      // empeche le rechargement de la page
      log.preventDefault();
    });
  })
  .catch((err) => {
    console.log(err);
  });

formInscription.addEventListener("submit", (e) => {
  console.log(e);

  e.preventDefault();
  let username = e.target.usernameins.value;
  let password = e.target.passwordins.value;
  let role = "user";
  // console.log(username, password);

  const formData = {
    username,
    password,
    role,
  };
  console.log(formData);

  fetch(lienUsers, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then(
      alert(
        "Félicitations pour votre inscription ! Vous faites maintenant partie de notre communauté."
      )
    )
    // window.
    .catch((err) => {
      console.log(err);
    });
});

// -------------------------------Formulaire connexion----------------------------

let loginForm = document.getElementById("login-form");
// console.log(loginForm);

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  // console.log(username, password);

  fetch(lienUsers)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      // Verifie les identifiants
      const user = data.find(
        (user) =>
          user.username === username.value && user.password === password.value
      );

      if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        alert(`Bienvenue dans votre espace personnel ${user.username}.`);
        updateUI();
        window.location.href = "../index.html";
      } else {
        alert(
          "Les informations que vous avez saisies sont incorrectes. Veuillez vérifier votre nom d'utilisateur et votre mot de passe, puis réessayez."
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function updateUI() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser) {
    formCo.style.display = "none";
    formIns.style.display = "none";
    formDeco.style.display = "block";
  }
}
// Vérifier si l'utilisateur est déjà connecté au chargement de la page
window.onload = function () {
  updateUI();
};

// Gestionnaire d'événements pour le bouton de déconnexion
formDeco.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  alert("Vous etes deconnecté");
  formCo.style.display = "";
  formIns.style.display = "";
  formDeco.style.display = "";
  window.location.href = "../index.html";
});

// ------------Comparatif du role pour apparaitre les elements-----------

const loggedinUser = localStorage.getItem("loggedUser");
const logged = JSON.parse(loggedinUser);
console.log(logged);

if (loggedinUser) {
  if (logged.role === "admin") {
    formAccueil.style.display = "block";
  }
  if (logged.role === "superadmin") {
    formUsers.style.display = "block";
    formAccueil.style.display = "block";
  }
}
