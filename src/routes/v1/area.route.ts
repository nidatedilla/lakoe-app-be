import { Router } from 'express';
import { searchAreasByInput } from '../../controllers/area.controller';

const areaRouter = Router();

areaRouter.get('/search', searchAreasByInput);

export default areaRouter;
