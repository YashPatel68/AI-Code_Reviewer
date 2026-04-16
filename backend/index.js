let express = require('express');
let mongoose = require('mongoose');
let feedbackRouter = require('./App/routing/web/feedbackRoutes')
let app = express();
let cors = require('cors');
app.use(express.json());
require('dotenv').config();
app.use(cors());

//web api
app.use('/ai/code-reviewer' ,feedbackRouter );

//connecting mongodb
mongoose.connect(process.env.DBurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('db connected')
    app.listen(process.env.PORT , ()=>{
        console.log("Server is running on PORT:", process.env.PORT);
    });
}).catch(err => console.log("DB error:", err));

