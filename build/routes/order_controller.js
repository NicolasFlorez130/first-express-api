import express from 'express';
import orderService from '../services/order_service';
import boom from '@hapi/boom';
const router = express.Router();
router.post('/create', async (req, res, next) => {
    try {
        await orderService.create(req.body);
        res.send('Created successfully');
    }
    catch (error) {
        next(error);
    }
});
router.get('/findAll', async (_, res, next) => {
    try {
        const users = await orderService.findAll();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
router.get('/findById/:id', async (req, res, next) => {
    try {
        const id = req.params['id'];
        if (!id) {
            throw boom.badRequest('Id not provided');
        }
        const user = await orderService.find(Number());
        res.send(user);
    }
    catch (error) {
        next(error);
    }
});
router.put('/edit', async (req, res, next) => {
    try {
        await orderService.edit(req.body);
        res.send('Edited successfully');
    }
    catch (error) {
        next(boom.badRequest(error.message));
    }
});
router.delete('/deleteById/:id', async (req, res, next) => {
    try {
        const id = req.params['id'];
        if (!id) {
            throw boom.badRequest('Id not provided');
        }
        await orderService.delete(Number(id));
        res.send('Deleted successfully');
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=order_controller.js.map