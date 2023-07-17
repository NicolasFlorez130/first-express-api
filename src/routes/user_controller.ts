import express from 'express';
import userService from '../services/user_service';
import { IUser } from '../schema/user';
import boom from '@hapi/boom';

const router = express.Router();

router.post('/create', async (req, res, next) => {
   try {
      const data: IUser = {
         ...req.body,
         createdAt: new Date(),
      };

      await userService.create(data);
      res.send('Created successfully');
   } catch (error) {
      next(error);
   }
});

router.get('/findAll', async (_, res, next) => {
   try {
      const users = await userService.findAll();
      res.json(users);
   } catch (error) {
      next(error);
   }
});

router.get('/findById/:id', async (req, res, next) => {
   try {
      const id = req.params['id'];

      if (!id) {
         throw boom.badRequest('Id not provided');
      }

      const user = await userService.find(Number(id));

      res.send(user);
   } catch (error) {
      next(error);
   }
});

router.put('/edit', async (req, res, next) => {
   try {
      const data: IUser = {
         ...req.body,
         createdAt: new Date(req.body.createdAt),
      };

      await userService.edit(data);

      res.send('Edited successfully');
   } catch (error) {
      next(boom.badRequest(error.message));
   }
});

router.delete('/deleteById/:id', async (req, res, next) => {
   try {
      const id = req.params['id'];

      if (!id) {
         throw boom.badRequest('Id not provided');
      }

      await userService.delete(Number(id));
      res.send('Deleted successfully');
   } catch (error) {
      next(error);
   }
});

export default router;
