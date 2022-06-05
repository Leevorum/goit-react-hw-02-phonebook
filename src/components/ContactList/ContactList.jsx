export default function ContactList({ filteredState, onDelete }) {
  return (
    <ul>
      {filteredState.map(contact => {
        return (
          <li key={contact.id}>
            {contact.name} : {contact.number}
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
