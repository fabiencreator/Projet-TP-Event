export default function detailCard(event) {
  return `<div id="content"></div>
<h1>${event.event_name}  dans ${nextEventDate(event)}</h1>
<img src="${event.cover}" alt="image de concert">
<h2>${event.event_type} organisé par ${event.organizer}</h2>
 <div id="map-text">
<p id="text">Rejoignez-nous pour une soirée exceptionnelle avec le Rock Night Festival, un événement incontournable pour tous les amateurs de musique !
    Ce concert se tiendra le ${event.event_date} à partir de ${
    event.event_time
  }, dans le cadre magnifique du ${event.position.city}, en ${
    event.position.country
  }. Avec une capacité impressionnante de  ${
    event.capacity
  } personnes, cet événement réunira une foule enthousiaste, déjà composée de ${
    event.participants
  } inscrits.
    
    Organisé par ${event.organizer}, le ${
    event.event_name
  } promet une ambiance électrique, des performances spectaculaires et une expérience musicale inoubliable. Ne manquez pas cette occasion de vibrer au son des meilleurs groupes dans l'une des plus belles salles de concert.  </p>
   <div id="map"></div> </div>
   <h3>Détails de l'événement :</h3>
    <p>
    Date : ${event.event_date}
    Heure : ${event.event_time}
    Lieu : ${event.position.address},${event.position.city},${
    event.position.country
  }
    Capacité : ${event.capacity}
    Participants inscrits : ${event.participants}
    
    Réservez vos billets dès maintenant et préparez-vous à vivre une soirée mémorable !  </p> 
   
<i>Tarif : ${event.price} € 
  `;
  // ----------------Temps restant avant Event---------

  function nextEventDate(event) {
    let date = new Date();
    // console.log(date);
    let dateEvent = new Date(event.event_date);
    // console.log(dateEvent);
    let time = dateEvent - date;

    let monthEvent = Math.round(time / (1000 * 60 * 60 * 24 * 30));
    let reste = time % (1000 * 60 * 60 * 24 * 30);

    let daysEvent = Math.round(reste / (1000 * 60 * 60 * 24));
    let rests = reste % (1000 * 60 * 60 * 24);

    let hoursEvent = Math.round(rests / (1000 * 60 * 60));
    let rest = rests % (1000 * 60 * 60);

    let minEvent = Math.round(rest / (1000 * 60));
    let res = rest % (1000 * 60);

    let secEvent = Math.round(res / 1000);

    console.log(monthEvent, daysEvent, hoursEvent, minEvent);

    return `${monthEvent} mois, ${daysEvent} jours, ${hoursEvent} heures, ${minEvent}min, ${secEvent}secondes.`;
  }
}
