export default function eventsCard(event) {
  return ` <div class="event-card">
        <div class="content-p">
        <div>
            <img src="${event.cover}" alt="image de concert" />
          </div>
          <div>
            <h2>${event.event_name}</h2>
            <h3>${event.event_type} de ${event.participants} participants</h3>
            <p>${event.event_date} ${event.event_time}</p>
            <p>${event.position.city} ${event.position.country}</p>
            <p>${event.price} €</p>     
            
            <a id="button" href="/pages/detail.html?id=${event.id}">detail de l'événement</a>

          </div>
        </div>
      </div>
        `;
}
