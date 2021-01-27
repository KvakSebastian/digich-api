const { Router } = require('express');
const { loginValidators } = require('../utils/validators.utils');
const authorizationControllers = require('../controllers/authorization.controllers');
const router = Router();

// POST http://localhost:5000/api/authorization/login
router.post('/login', loginValidators, authorizationControllers.loginController);

module.exports = router;
