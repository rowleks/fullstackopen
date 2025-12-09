require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/persons");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("dist"));

// Custom morgan token to log POST request body
morgan.token("post-data", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

// Custom format that includes POST data for POST requests
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

app.get("/api/persons", (_, res) => {
  Person.find({}).then((persons) => {
    return res.json(persons);
  });
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    res.status(400).json({ error: "name and number are required" });
  } else {
    Person.exists({ name }).then((existingPerson) => {
      if (existingPerson) {
        return res.status(400).json({ error: "name must be unique" });
      }

      const newPerson = new Person({
        name,
        number,
      });

      newPerson.save().then((savedPerson) => {
        res.status(201).json(savedPerson);
      });
    });
  }
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
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
  Person.countDocuments().then((count) => {
    res.end(
      `Phonebook has info for ${count} ${
        count === 1 ? "person" : "people"
      } \n ${new Date()}`
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
