const { Router } = require('express');
const passport = require('passport');
const { userValidators } = require('../utils/validators.utils');
const userControllers = require('../controllers/user.controllers');
const router = Router();

// POST http://localhost:5000/api/user/create
router.post('/create', userValidators, userControllers.createController);

// GET Protected JWT Web Token http://localhost:5000/api/user/all
router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    userControllers.getAllController,
);

// GET http://localhost:5000/api/user/getByUsername/:username
router.get('/getByUsername/:username', userControllers.getByUsernameController);

// GET Protected JWT Web Token http://localhost:5000/api/user/getById/:id
router.get(
    '/getById/:id',
    passport.authenticate('jwt', { session: false }),
    userControllers.getByIdController,
);

// PATCH http://localhost:5000/api/user/update/:id
router.patch('/update/:id', userValidators, userControllers.updateController);

// DELETE Protected JWT Web Token http://localhost:5000/api/user/delete/:id
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    userControllers.removeController,
);

module.exports = router;
