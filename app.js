const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const AuthorizationRouter = require('./routes/authorization.routes');
const AdminRouter = require('./routes/admin.routes');
const UserRouter = require('./routes/user.routes');
const DefectRouter = require('./routes/defect.routes');
const errorHandler = require('./middleware/errors.middleware');

const app = express();

app.use(passport.initialize());
require('./middleware/passport.middleware')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use('/api/authorization', AuthorizationRouter);
app.use('/api/user', UserRouter);
app.use('/api/defect', DefectRouter);
app.use('/api/admin', AdminRouter);
app.use(errorHandler);

module.exports = app;
