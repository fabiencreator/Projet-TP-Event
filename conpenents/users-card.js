export default function userscard(element) {
  return `<div id= "card">
    <ul>
      <li>${element.id}</li>
      <li> ${element.username} </li>
      <li> ${element.role} </li>
      <form id="users-form" data-id="${element.id}">
  <select name="utils" id="select-users">
    <option value="">--Role de l'utilisateur--</option>
    <option value="superadmin">superadmin</option>
    <option value="admin">admin</option>
    <option value="user">user</option>
  </select>
  <button type="submit">Valider</button>
</form>
      <button class="boutton-sup" data-id="${element.id}" >supprimer</button>
    </ul><div>`;
}
