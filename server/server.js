const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/adminUser'));


app.listen(4000, () => {

    try {
        console.log('SERVIDOR CORRIENDO PUERTO 4000 IN http://localhost:4000')
    } catch (error) {
        console.log('SE HA PRODUCIDO UN ERROR', error)
    }
})