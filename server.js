const express = require('express');
const morgan = require('morgan');
const cores = require('cors');
const path = require('path');
require('dotenv').config();
const feedbackRoutes = require('./routes/feedback');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cores());
app.use(express.static(path.join(__dirname, './client/build')));
app.use('/api', feedbackRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is runing on port ${port}`));
