import 'dotenv/config';
import app from "./src/app.js"; 
import { sequelize } from './src/database/connectionDB.js';

const port = 3000 || process.env.PORT;


(async () => {
  try {
    await sequelize.sync( {force: false} );
    app.listen(port, () => console.log(`server run on port ${port}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()





