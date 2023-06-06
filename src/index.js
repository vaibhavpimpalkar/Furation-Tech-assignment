const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();
let port = process.env.PORT || 3000;
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://vaibhav_:DP5cPU2UQSOB14RT@cluster0.27uy03s.mongodb.net/furation-tech?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(port, function () {
    console.log('Express app running on port ' + (port))
});