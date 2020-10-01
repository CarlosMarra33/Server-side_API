require("dotenv").config()

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const BookRoute = require('./routes/bookRoute')

const app = express();

// Settings
    // Cors
    app.use(cors())
    // Body Parser
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
// Mongo
mongoose.connect(process.env.MONGO_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log(`Connection error: ${err}`);
})
// Routes
app.use('/', BookRoute)
app.use('/books', BookRoute)

const port = 3333
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})