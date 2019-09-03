// implement your API here
const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (request, res) => {
  res.send("test da server!");
});

const Hubs = require("./data/db.js");

// Method GET READ

server.get("/api/users", (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved." });
    });
});

// Method POST CREATE
server.post("/api/users", (req, res) => {
  const hubInformation = req.body;
  console.log("hub info from body", hubInformation);
  Hubs.insert(hubInformation)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Please provide name and bio for the user." });
    });
});

// Method POST(GET BY ID) UPDATE

server.get("/api/users/:id", (req, res) => {
  const hubId = req.params.id;

  Hubs.findById(hubId)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else
        res
          .status(404)
          .json({ message: "THe user with thespecified id does not exist." });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved." });
    });
});

// METHOD DELETE(BY ID)

server.delete("/api/users/:id", (req, res) => {
  const hubId = req.params.id;
  Hubs.remove(hubId)
    .then(hub => {
      if (hub) {
        res.status(200).json({ message: "user delted" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

// METHOD UPDATE/PUT

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Hubs.update(id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res
          .status(404)
          .json({ message: "Please provide name and bio for the user." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be modified." });
    });
});

const port = 8000;
server.listen(port, () => console.log("api running"));
