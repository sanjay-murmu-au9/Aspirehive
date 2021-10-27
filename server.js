const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' });
const express = require('express');
const connectDatabase = require("./config/database");
const errorHandler = require('./middlewares/error');

console.log('hi there');


//connected DB
connectDatabase();


const app = express();

//middleware that allow data from body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

//errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1))
});