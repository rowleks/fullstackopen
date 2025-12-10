require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/persons");
const PORT = process.env.PORT || 3001;

app.use(express.static("dist"));
app.use(express.json());

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

const updatePerson = (id, name, number) => {
  const person = { name, number };
  return Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  });
};

app.get("/api/persons", (_, res) => {
  Person.find({}).then((persons) => {
    return res.json(persons);
  });
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    res.status(400).json({ error: "name and number are required" });
  } else {
    Person.exists({ name }).then((existingPerson) => {
      if (existingPerson) {
        updatePerson(existingPerson._id, name, number)
          .then((updatedPerson) => {
            res.json(updatedPerson);
          })
          .catch((error) => next(error));
      } else {
        const newPerson = new Person({
          name,
          number,
        });

        newPerson
          .save()
          .then((savedPerson) => {
            res.status(201).json(savedPerson);
          })
          .catch((error) => next(error));
      }
    });
  }
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "person not found" });
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  updatePerson(req.params.id, name, number)
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).end();
      }
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.get("/info", (_, res) => {
  Person.countDocuments().then((count) => {
    res.send(
      `Phonebook has info for ${count} ${
        count === 1 ? "person" : "people"
      } \n ${new Date()}`
    );
  });
});

app.use((_, res) => {
  res.status(404).send({ error: "unknown endpoint" });
});

const errorHandler = (error, _, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("Connecting to MongoDB...");
});
