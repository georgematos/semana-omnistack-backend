const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://georgematos:oOvGkpxLYNuqy3SZ@cluster0-tftmc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); // Express passará a entender requisições enviadas como json
app.use(routes);

app.listen(3333);
