import express from 'express';
import JWTService from './services/JWTService.js';

const app = express();
app.use(express.json());
const PORT = 4001;

// login route
app.post('/login', (req, res) => {
  // Create user
  const newUser = req.body;

  // Generate JWT
  const jWTService = new JWTService();
  const jwt = jWTService.generateJWT(newUser);
  res.status(200).send(jwt);
});

// Verify token middleware
app.use((req, res, next) => {
  // Get JWT
  const authHeader = req.headers.authorization;
  const jwt = authHeader?.split('Bearer ')[1];

  // Get user from JWT
  const jWTService = new JWTService();
  const user = jWTService.decodeJWT(jwt);

  // Attach user to locals
  res.locals.user = user;
  next();
});

// protected route
app.get('/protected', (req, res) => {
  const user = res.locals.user;
  res.send(user);
});

// Custom error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(403).send('Invalid token!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});