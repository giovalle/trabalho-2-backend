const PersonsSchema = require("./persons-schema");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const persons = await PersonsSchema.find().exec();
    res.status(200).send(persons);
  } catch (e) {
    res.status(500).send({
      error: "Algo deu errado ao listar todas as pessoas.",
      trace: e,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const person = new PersonsSchema(req.body);
    await person.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send({
      error:
        "Você não providenciou todos os campos necessários, ou errou o nome de algum campo.",
      trace: e,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const person = await PersonsSchema.findById(req.params.id).exec();
    if (!person) {
      return res.status(404).send();
    }
    res.status(200).send(person);
  } catch (e) {
    res.status(500).send({
      error: `Algo deu errado ao buscar a pessoa com ID ${req.params.id}.`,
      trace: e,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const person = await PersonsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).exec();
    if (!person) {
      return res.status(404).send();
    }
    res.status(200).send(person);
  } catch (e) {
    res.status(500).send({
      error: `Algo deu errado ao fazer update da pessoa com ID ${req.params.id}.`,
      trace: e,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const person = await PersonsSchema.findByIdAndDelete(req.params.id).exec();
    if (!person) {
      return res.status(404).send();
    }
    res.status(204).send();
  } catch (e) {
    res.status(500).send({
      error: `Algo deu errado ao deletar a pessoa com ID ${req.params.id}.`,
      trace: e,
    });
  }
});

module.exports = router;
