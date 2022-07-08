let listNames = [
  { id: 1, nome: "Isabela", idade: 24 },
  { id: 2, nome: "Higor", idade: 22 },
];
const axios = require("axios");
const scheduler = require("node-schedule");

// GET

exports.getAll = (req, res) => {
  res.status(200).json(listNames);
};

exports.getById = (req, res) => {
  let idParam = Number(req.params.id);
  let idQuery = Number(req.query.id);
  let idBody = Number(req.body.id);
  let userId = listNames.find(
    (user) => user.id === idParam || idQuery || idBody
  );
  res.status(200).json(userId);
};

// POST

exports.postBody = (req, res) => {
  let { id, nome, idade } = req.body;
  listNames.push({ id, nome, idade });
  res.status(201).json(listNames);
};

exports.postParam = (req, res) => {
  let id = Number(req.params.id);
  let nome = req.params.nome;
  let idade = Number(req.params.idade);
  listNames.push({ id, nome, idade });
  res.status(201).json(listNames);
};

exports.postQuery = (req, res) => {
  let id = Number(req.query.id);
  let nome = req.query.nome;
  let idade = Number(req.query.idade);
  listNames.push({ id, nome, idade });
  res.status(201).json(listNames);
};

// PUT

exports.putBody = (req, res) => {
  let { id, nome, idade } = req.body;
  let userId = listNames.findIndex((user) => user.id === id);
  listNames[userId].nome = nome;
  listNames[userId].idade = idade;
  res.status(201).json(listNames);
};

exports.putParam = (req, res) => {
  let id = Number(req.params.id);
  let nome = req.params.nome;
  let idade = Number(req.params.idade);
  let userId = listNames.findIndex((user) => user.id === id);
  listNames[userId].nome = nome;
  listNames[userId].idade = idade;
  res.status(201).json(listNames);
};

exports.putQuery = (req, res) => {
  let id = Number(req.query.id);
  let nome = req.query.nome;
  let idade = Number(req.query.idade);
  let userId = listNames.findIndex((user) => user.id === id);
  listNames[userId].nome = nome;
  listNames[userId].idade = idade;
  res.status(201).json(listNames);
};

// DELETE

exports.deleteBodyQuery = (req, res) => {
  let id = Number(req.body.id);
  let idQuery = Number(req.query.id);
  let userId = listNames.findIndex((user) => user.id === id || idQuery);
  listNames.splice(userId, 1);
  res.status(200).json(listNames);
};

exports.deleteParam = (req, res) => {
  let id = Number(req.params.id);
  let userId = listNames.findIndex((user) => user.id === id);
  listNames.splice(userId, 1);
  res.status(200).send(listNames);
};

// Rotina de consulta à API do IBGE

let municipalities = {};

const initMunicipalities = async () => {
  let response = await axios.get(
    "https://servicodados.ibge.gov.br/api/v1/localidades/distritos"
  );

  let districts = response.data.filter(
    (district) =>
      district.municipio["regiao-imediata"]["regiao-intermediaria"].UF.sigla ===
      "MG"
  );

  municipalities = districts;
};

initMunicipalities();

const scheduledGet = scheduler.scheduleJob("0 12 * * *", initMunicipalities);

exports.getDistrict = (req, res) => {
  res.status(200).json(municipalities);
};
