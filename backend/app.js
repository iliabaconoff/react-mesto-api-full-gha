const express = require('express');
const mongoose = require('mongoose');

const app = express();
const helmet = require('helmet'); // https://expressjs.com/ru/advanced/best-practice-security.html
const { errors } = require('celebrate');
const { PORT, MONGO_DB } = require('./utils/config');
const { login, createUser } = require('./controllers/users');
const authMiddleware = require('./middlewares/auth');
const responseHandler = require('./middlewares/responseHandler');
const { validateLogin, validateRegistration } = require('./utils/validationConfig');
const NotFound = require('./utils/responsesWithError/NotFound');
const {requestLogger, errorLogger} = require("./middlewares/logger");
const router = require("./routes");

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true, // make this also true
});

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(requestLogger);
app.use('/users', authMiddleware, require('./routes/user'));
app.use('/cards', authMiddleware, require('./routes/card'));

app.use('/signin', validateLogin, login);
app.use('/signup', validateRegistration, createUser);

app.use('*', (req, res, next) => {
  next(new NotFound('Указанный путь не найден.'));
});

app.use(errorLogger);

app.use(router);

app.use(errors());
app.use(responseHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Server started on port:', PORT));
