const express = require("express");
const app = express();
const PORT = 3001;

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/api/persons", (_, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const newPerson = req.body;

  if (!newPerson.name || !newPerson.number) {
    res.status(400).json({ error: "name and number are required" });
  } else {
    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      return res.status(400).json({ error: "name must be unique" });
    }

    newPerson.id = Math.floor(Math.random() * 10000).toString();
    persons.push(newPerson);

    res.status(201).json(newPerson);
  }
});

app.get("/api/persons/:id", (req, res) => {
  const personInfo = persons.find((person) => person.id === req.params.id);

  if (!personInfo) res.status(404).end();
  else res.json(personInfo);
});

app.delete("/api/persons/:id", (req, res) => {
  const personInfo = persons.find((person) => person.id === req.params.id);
  if (!personInfo) res.status(404).end();
  else {
    persons = persons.filter((person) => person.id !== req.params.id);
    res.status(204).end();
  }
});

app.get("/info", (_, res) => {
  const totalPersons = persons.length;
  res.end(
    `Phonebook has info for ${totalPersons} ${
      totalPersons === 1 ? "person" : "people"
    } \n ${new Date()}`
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
