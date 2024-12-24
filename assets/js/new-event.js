let eventId = document.getElementById("eventId");
// console.log(eventId);

let submit = document.getElementById("submit");
// console.log(submit);

let accueil = document.getElementById("accueil");
// console.log(accueil);

// ----------event----------------

submit.addEventListener("mouseover", () => {
  submit.style.transform = "rotate(-20deg)";
  submit.style.transition = "transform 0.5s ease-in-out";
});

submit.addEventListener("mouseout", () => {
  submit.style.transform = "rotate(0deg)";
});

accueil.addEventListener("mouseover", () => {
  accueil.style.transform = "scale(1.4)";
  accueil.style.transition = "transform 0.5s ease-in-out";
  accueil.style.color = "black";
});

accueil.addEventListener("mouseout", () => {
  accueil.style.transform = "scale(1)";
  accueil.style.color = "";
});

// --------------envoie formulaire event--------------

const form = document.querySelector("form");
console.log(form);

fetch("http://localhost:3000/events")
  .then((response) => response.json())
  .then((events) => {
    form.addEventListener("submit", function (log) {
      // empeche le rechargement de la page

      log.preventDefault();
      //  --------remonte la page aprés event au click du bouton submit-------
      window.scrollTo({
        top: 0,
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

form.addEventListener("submit", (e) => {
  console.log(e);

  e.preventDefault();
  let event_name = e.target.name.value;
  let organizer = e.target.organizer.value;
  let event_type = e.target.type.value;
  let capacity = e.target.capacity.value;
  let event_date = e.target.date.value;
  let event_time = e.target.time.value;
  let address = e.target.adress.value;
  let city = e.target.postal.value;
  let country = e.target.pays.value;
  let latitude = e.target.latitude.value;
  let longitude = e.target.longitude.value;
  let price = e.target.price.value;
  let cover = e.target.image.value;
  // console.log(
  //   event_name,
  //   organizer,
  //   event_type,
  //   capacity,
  //   event_date,
  //   event_time,
  //   address,
  //   city,
  //   latitude,
  //   longitude,
  //   price,
  //   country,
  //   cover
  // );

  const formData = {
    event_name,
    organizer,
    event_type,
    capacity,
    event_date,
    event_time,
    price,
    position: { latitude, longitude, address, city, country },
    cover,
  };
  console.log(formData);

  fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then(
      alert(
        "Merci d'avoir rempli le formulaire ! Nous avons bien reçu vos informations."
      )
    )
    .catch((err) => {
      console.log(err);
    });
});
