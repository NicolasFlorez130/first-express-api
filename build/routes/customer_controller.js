import express from 'express';
import customerService from '../services/customer_service';
import boom from '@hapi/boom';
const router = express.Router();
router.post('/create', async (req, res, next) => {
    try {
        await customerService.create(req.body);
        res.send('Created successfully');
    }
    catch (error) {
        next(error);
    }
});
router.get('/findAll', async (_, res, next) => {
    try {
        const users = await customerService.findAll();
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
        const user = await customerService.find(Number());
        res.send(user);
    }
    catch (error) {
        next(error);
    }
});
router.put('/edit', async (req, res, next) => {
    try {
        await customerService.edit(req.body);
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
        await customerService.delete(Number(id));
        res.send('Deleted successfully');
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=customer_controller.js.map