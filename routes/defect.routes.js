const { Router } = require('express');
const passport = require('passport');
const { defectValidators } = require('../utils/validators.utils');
const defectControllers = require('../controllers/defect.controllers');
const router = Router();

// POST http://localhost:5000/api/defect/create
router.post('/create', defectValidators, defectControllers.createController);

// PATCH Protected JWT Web Token http://localhost:5000/api/defect/update/:id
router.patch(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    defectValidators,
    defectControllers.updateController,
);

// GET Protected JWT Web Token http://localhost:5000/api/defect/getById/:id
router.get(
    '/getById/:id',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getByIdController,
);

// GET Protected JWT Web Token http://localhost:5000/api/defect/all
router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getAllController,
);

// GET http://localhost:5000/api/defect/getByDate?status=DefectStatus&start=StartDate&end=EndDate
router.get('/getByDate', defectControllers.getByDateController);

// GET Protected JWT Web Token http://localhost:5000/api/defect/getByStatus?status=DefectStatus
router.get(
    '/getByStatus',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getByStatusController,
);

// GET Protected JWT Web Token http://localhost:5000/api/defect/:userId
router.get(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getByUserController,
);

module.exports = router;
