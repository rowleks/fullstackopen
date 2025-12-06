const Person = ({ person, onDelete }) => {
  return (
    <div>
      {person.name} {person.number} {""}
      <button onClick={() => onDelete(person.id)}>Delete</button>
    </div>
  );
};

const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Persons;
