import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let newTornament = {};

    const data = await readFile('./server/tournaments.json');
    const tournaments = JSON.parse(data);

    if (tournaments.length > 0) {
      newTornament = {
        id: tournaments[tournaments.length - 1].id + 1,
        name: req.body.name,
        matchList: [],
      };
    } else {
      newTornament = {
        id: 1,
        name: req.body.name,
        matchList: [],
      };
    }

    const newData = [...tournaments, newTornament];

    await writeFile('./server/tournaments.json', JSON.stringify(newData));

    res.status(200).json(newTornament);
  } else if (req.method === 'GET') {
    let data = null;
    let tournaments = [];

    try {
      data = await readFile('./server/tournaments.json');
    } catch (err) {
      if (err.code === 'ENOENT')
        await writeFile('./server/tournaments.json', JSON.stringify([]));
    }

    const response = JSON.parse(data);
    if (response.length > 0)
      tournaments = response.map((el) => ({ id: el.id, name: el.name }));

    res.status(200).json(tournaments);
  } else {
    res.status(405).json();
  }
}
