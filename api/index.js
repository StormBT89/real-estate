import express from 'express';

const app = express();


app.get('/', (req, res) => {
    res.send("Ova e toa");
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

