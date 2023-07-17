import express from 'express';
import productService from '../services/product_service';
import boom from '@hapi/boom';

const router = express.Router();

router.post('/create', async (req, res, next) => {
   try {
      await productService.create(req.body);
      res.send('Created successfully');
   } catch (error) {
      next(error);
   }
});

router.get('/findAll', async (req, res, next) => {
   try {
      const { limit = 0, offset = 0, min_price = -1 * Infinity, max_price = Infinity } = req.query;

      console.log(limit, offset, min_price, max_price);

      const users = await productService.findAll(0, 0, -1 * Infinity, Infinity);
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

      const user = await productService.find(Number(id));

      res.send(user);
   } catch (error) {
      next(error);
   }
});

router.put('/edit', async (req, res, next) => {
   try {
      await productService.edit(req.body);

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

      await productService.delete(Number(id));

      res.send('Deleted successfully');
   } catch (error) {
      next(error);
   }
});

export default router;
