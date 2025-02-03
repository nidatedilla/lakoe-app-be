import { Router } from 'express';
import {
  createMessageTemplate,
  deleteMessageTemplate,
  getMessageTemplate,
  sendMessage,
  updateMessageTemplate,
} from '../../controllers/message.controller';

const messageRouter = Router();

messageRouter.post('/', createMessageTemplate);
messageRouter.put('/:id', updateMessageTemplate);
messageRouter.delete('/:id', deleteMessageTemplate);
messageRouter.post('/send', sendMessage);
messageRouter.get('/', getMessageTemplate);

export default messageRouter;
