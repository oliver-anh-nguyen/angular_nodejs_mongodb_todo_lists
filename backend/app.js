const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true});

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use('/todos', require('./todoRouter'));

app.use((err, req, res, next) => {
    res.status(500).json({error: err});
})

app.listen(3000, () => console.log('Listen on port 3000'));