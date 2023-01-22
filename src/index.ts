import axios from 'axios';
import * as dotenv from 'dotenv';
import { envsafe, str, url } from 'envsafe';
import cron from 'node-cron';

dotenv.config();

const env = envsafe({
  API_URL: url({
    devDefault: 'http://localhost:8000/api/cron',
    desc: 'The api url to send request',
  }),
  TOKEN: str({
    desc: 'The access token for processing',
  }),
});

/* Run at 0:00 every day */
cron.schedule(`0 0 0 * * *`, async () => {
  axios
    .get(env.API_URL, {
      headers: {
        'X-Access-Token': env.TOKEN,
      },
    })
    .then((response) => console.log(response.data))
    .catch(console.log);
});
