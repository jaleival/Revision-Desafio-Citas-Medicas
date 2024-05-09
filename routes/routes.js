import express from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
moment.locale("es");
import _ from "lodash";
import chalk from "chalk";
const routes = express.Router();
const users = [];

// Ruta principal para mostrar el listado de usuarios
routes.get("/usuarios", async (req, res) => {
  try {
    const consulta = await axios.get("https://randomuser.me/api/");
    const usuario = consulta.data.results[0];
    const name = usuario.name.first;
    const lastName = usuario.name.last;
    const gender = usuario.gender;
    const id = uuidv4().slice(0, 8);
    const timestamp = moment().format("MMMM Do YYYY, hh:mm a");

    users.push({ name, lastName, gender, id, timestamp });

    const [mujeres, hombres] = _.partition(users, { gender: "female" });
    /*     console.log('Mujeres', mujeres)
    console.log('Hombres', hombres) */
    const template = ` 
    <h5>Mujeres:</h5>
    <ol>
        ${mujeres.map(
          (item) =>
            `<li>Nombre: ${item.name} - Apellido: ${item.lastName} - Genero: ${item.gender} - 
            ID: ${item.id} - Timestamp: ${item.timestamp}</li>`
        )}
    </ol>
    <h5>Hombres:</h5>
    <ol>
        ${hombres.map(
        (item) =>
            `<li>Nombre: ${item.name} - Apellido: ${item.lastName} - Genero: ${item.gender} - 
            ID: ${item.id} - Timestamp: ${item.timestamp}</li>`
        )}
    </ol>
`;

    const consola = `Mujeres: ${mujeres.map(
      (item) =>
        ` / Nombre: ${item.name} - Apellido: ${item.lastName} - Genero: ${item.gender} - ID: ${item.id} - Timestamp: ${item.timestamp}`
    )};
    
Hombres: ${hombres.map(
      (item) =>
        ` / Nombre: ${item.name} - Apellido: ${item.lastName} - Genero: ${item.gender} - ID: ${item.id} - Timestamp: ${item.timestamp}`
    )}`;
    console.log(chalk.blue.bgWhite(consola));

    res.send(template);
  } catch (error) {
    console.log(error);
  }
});

export default routes;