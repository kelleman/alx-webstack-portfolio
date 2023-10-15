const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/api/v1', userRoutes);
app.set('view engine', 'ejs')

// routes prefix
app.use('/', require('./routes/apiRoutes'));


const port = process.env.PORT || 3030;
app.listen(port, ()=>{
    console.log(`listening to: http://localhost:${port}`)
})
