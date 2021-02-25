import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await readFile('./server/tournaments.json');
    const tournaments = JSON.parse(data);

    const tournament = tournaments.find(
      (el) => el.id === parseInt(req.query.id, 10)
    );

    res.status(200).json(tournament);
  } else if (req.method === 'DELETE') {
    const data = await readFile('./server/tournaments.json');
    const tournaments = JSON.parse(data);
    const newData = tournaments.filter(
      (el) => el.id !== parseInt(req.query.id, 10)
    );

    await writeFile('./server/tournaments.json', JSON.stringify(newData));

    res.status(200).json();
  } else if (req.method === 'PUT') {
    const data = await readFile('./server/tournaments.json');
    const tournaments = JSON.parse(data);

    const index = tournaments.findIndex(
      (el) => el.id === parseInt(req.query.id, 10)
    );

    tournaments[index] = { ...req.body };

    await writeFile('./server/tournaments.json', JSON.stringify(tournaments));

    res.status(200).json();
  } else {
    res.status(405).json();
  }
}
