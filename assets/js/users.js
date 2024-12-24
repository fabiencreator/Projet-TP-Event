let content = document.getElementById("users-content");
// console.log(content);

let accueilA = document.getElementById("accueil-a");
// console.log(accueilA);

// ----------------Event---------------

accueilA.addEventListener("mouseover", () => {
  accueilA.style.backgroundColor = "rgba(75, 177, 55, 0.541)";
});
accueilA.addEventListener("mouseout", () => {
  accueilA.style.backgroundColor = "";
});

import usersCard from "../../conpenents/users-card.js";

let lienUser = `http://localhost:3000/users`;

fetch(lienUser)
  .then((response) => response.json())
  .then((users) => {
    console.log(users);
    users.forEach((element) => {
      content.innerHTML += `${usersCard(element)}`;
      let boutton = document.querySelectorAll(".boutton-sup");
      boutton.forEach((button) => {
        // console.log(button);

        // ----------------Supprime les utilisateurs-----------------------------

        button.addEventListener("click", (e) => {
          // console.log(e);
          let userId = e.target.getAttribute("data-id");

          let confirmation = confirm(
            `Voulez vous supprimer l'utilisateur suivant : ${element.username} avec l'ID ${element.id} ? `
          );
          if (confirmation) {
            deleteUser(userId);
            alert("Utilisateur supprimé !");
          }
        });
      });
    });

    // --------------------Gestion de role utilisateur------------

    let forms = document.querySelectorAll("#users-form");
    forms.forEach((form) => {
      // console.log(forms);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e);

        let userId = form.getAttribute("data-id");
        let newRole = form.querySelector("#select-users").value;

        if (newRole) {
          updateRole(userId, newRole);
        } else {
          alert("Veuillez sélectionner un rôle.");
        }
      });
    });
  })
  .catch((err) => console.log(err));

// ------------------fonction pour supprimer un utilisateur-----------

function deleteUser(userId) {
  fetch(`http://localhost:3000/users/${userId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

// -------------Fonction pour changer le role-------------------

function updateRole(userId, newRole) {
  fetch(`http://localhost:3000/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: newRole }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Rôle de l'utilisateur à changer.");
    })
    .catch((err) => {
      console.error(err);
    });
}
