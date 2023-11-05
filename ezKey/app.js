const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const accessCodeRoutes = require('./routes/accessCodeRoutes');
const uiRoutes = require('./routes/uiRoutes');
require('dotenv').config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set the 'views' directory as the location for templates
app.set('views', 'views');



// routes prefix
app.use('/api/v1', userRoutes);
app.use('/api/v1', accessCodeRoutes);
app.use('/', uiRoutes);
app.set('view engine', 'ejs')


// app.use('/', require('./routes/userRoutes'));


const port = process.env.PORT || 3030;
app.listen(port, ()=>{
    console.log(`listening to: http://localhost:${port}`)
})
