import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = await readFile('./server/tournaments.json');
    const tournaments = JSON.parse(data);

    const newTornament = {
      id: tournaments.length,
      name: req.body.name,
      matchList: [],
    };

    console.log(JSON.stringify(newTornament));

    res.status(200).json(newTornament);
  } else {
    res.status(405).body();
  }
}
