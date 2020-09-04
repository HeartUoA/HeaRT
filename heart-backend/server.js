import { connect } from 'mongoose';
import app from './app';
import { API_PORT, DB_URL } from './config';

(async () => {
  await connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(API_PORT);
  console.log(`App listening on port ${API_PORT}...`);
})();
