import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactService from "./services/contact";

const Header = ({ text }) => <h2>{text}</h2>;

const Notification = ({ successMsg, errorMsg }) => {
  if (!successMsg && !errorMsg) return null;
  return (
    <div className={successMsg ? "success" : "error"}>
      <p>{successMsg || errorMsg}</p>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [msg, setMsg] = useState({ error: "", success: "" });

  useEffect(() => {
    contactService
      .getAll()
      .then((res) => setPersons(res))
      .catch((error) => {
        console.log(error);
        setMsg({
          error: "Failed to load contacts. Please refresh the page.",
          success: "",
        });
      });
  }, []);

  useEffect(() => {
    if (msg.success || msg.error) {
      const timeoutId = setTimeout(() => {
        setMsg({ error: "", success: "" });
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [msg.success, msg.error]);

  const updateContactById = (id) => {
    const personToUpdate = persons.find((person) => person.id === id);

    if (!personToUpdate) {
      setMsg({
        error: "Contact not found.",
        success: "",
      });
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

        setMsg({ error: "", success: `Updated ${updatedContact.name}` });
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error);

        const serverErrorMsg = error.response.data.error;

        if (serverErrorMsg) {
          setMsg({
            error: serverErrorMsg,
            success: "",
          });
          return;
        }

        setPersons(persons.filter((person) => person.id !== id));
        setMsg({
          error: `Failed to update ${updatedContact.name}. It may have already been removed from the server.`,
          success: "",
        });
      });
  };

  const handleAddContact = (event) => {
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
        setMsg({ error: "", success: `Added ${newContact.name}` });
      })
      .catch((error) => {
        console.log(error);
        const serverErrorMsg = error.response.data.error;

        if (serverErrorMsg) {
          setMsg({
            error: serverErrorMsg,
            success: "",
          });
          return;
        }
        setMsg({
          error: `Failed to add ${newContact.name}. Please try again.`,
          success: "",
        });
      });
  };

  const handleDeleteContactById = (id) => {
    const matchingContact = persons.find((person) => person.id === id);
    if (!matchingContact) {
      setMsg({
        error: "Contact does not exist",
        success: "",
      });
      return;
    }

    const confirmDelete = window.confirm(`Delete ${matchingContact.name}?`);

    if (confirmDelete) {
      contactService
        .deleteById(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));

          setMsg({
            error: "",
            success: `Deleted ${matchingContact.name}`,
          });
        })
        .catch((error) => {
          console.log(error);
          setPersons(persons.filter((person) => person.id !== id));

          setMsg({
            error: `Failed to delete ${matchingContact.name}. It may have already been removed from the server.`,
            success: "",
          });
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
        <Notification successMsg={msg.success} errorMsg={msg.error} />
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
          handleSubmit={handleAddContact}
        />
      </section>

      <section>
        <Header text="Number" />
        <Persons
          persons={personsToDisplay()}
          onDelete={handleDeleteContactById}
        />
      </section>
    </div>
  );
};

export default App;
