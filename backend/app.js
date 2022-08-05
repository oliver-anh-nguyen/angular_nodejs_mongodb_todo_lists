const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const checkToken = require('./middlewares/checkToken')
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true});

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/todos', checkToken, require('./routers/todoRouter'));
app.use('/users', require('./routers/userRouter'));

app.use((req, res, next) => {
    next(new Error('Route not found'));
})

app.use((err, req, res, next) => {
    res.status(500).json({error: err});
})

app.listen(process.env.PORT || 5000)