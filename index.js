import express from 'express';
import routes from './routes/routes.js';
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server activo en el puerto localhost:${PORT}`);
})