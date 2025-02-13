import express, { Express } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger';
import cors from 'cors';
import router from './routes/v1/index.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api', router);

app.listen(port, () => {
  console.log('server dah jalan');
});
