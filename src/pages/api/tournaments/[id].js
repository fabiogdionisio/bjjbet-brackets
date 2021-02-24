import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await readFile('./server/tournaments.json');
    const tournaments = JSON.parse(data);

    const tournament = tournaments.find(
      (el) => el.id === parseInt(req.query.id, 10)
    );

    res.status(200).json(tournament);
  } else {
    res.status(405).body();
  }
}
