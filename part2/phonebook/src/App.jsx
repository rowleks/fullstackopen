import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactService from "./services/contact";

const Header = ({ text }) => <h2>{text}</h2>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    contactService.getAll().then((res) => setPersons(res));
  }, []);

  const updateContactById = (id) => {
    const personToUpdate = persons.find((person) => person.id === id);
    if (!personToUpdate) {
      alert("Contact not found.");
      return;
    }
    const updatedContact = {
      ...personToUpdate,
      number: newNumber,
    };
    contactService
      .updateById(id, updatedContact)
      .then((res) => {
        setPersons(persons.map((person) => (person.id === id ? res : person)));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Failed to update contact. It may have already been removed from the server."
        );
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const addContact = (event) => {
    event.preventDefault();

    const existingContact = persons.find((person) => person.name === newName);

    if (existingContact) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );

      if (confirmUpdate) {
        updateContactById(existingContact.id);
      }
      return;
    }

    const newContact = {
      name: newName,
      number: newNumber,
    };

    contactService
      .create(newContact)
      .then((res) => {
        setPersons(persons.concat(res));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error adding a contact, please try again");
      });
  };

  const deleteContactById = (id) => {
    const matchingContact = persons.find((person) => person.id === id);
    if (!matchingContact) {
      return;
    }

    const confirmDelete = window.confirm(`Delete ${matchingContact.name}?`);

    if (confirmDelete) {
      contactService
        .deleteById(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log(error);
          alert(
            "Failed to delete contact. It may have already been removed from the server."
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const personsToDisplay = () => {
    if (searchQuery) {
      return persons.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    } else {
      return persons;
    }
  };

  return (
    <div>
      <section>
        <Header text="Phonebook" />
        <Filter
          searchQuery={searchQuery}
          handleSearchChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section>
        <Header text="Add a new" />
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleNameChange={(e) => setNewName(e.target.value)}
          handleNumberChange={(e) => setNewNumber(e.target.value)}
          handleSubmit={addContact}
        />
      </section>

      <section>
        <Header text="Number" />
        <Persons persons={personsToDisplay()} onDelete={deleteContactById} />
      </section>
    </div>
  );
};

export default App;
