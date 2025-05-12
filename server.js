const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Dress = require('./models/dress');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/fashion_boutique', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    const newDress = new Dress(req.body);
    await newDress.save();
    res.redirect('/all_dresses');
});

app.get('/all_dresses', async (req, res) => {
    const dresses = await Dress.find();
    res.render('all_dresses', { dresses: dresses.map(dress => dress.toObject({ virtuals: true })) });
});

app.get('/all_dresses', async (req, res) => {
    const dresses = await Dress.find();
    res.render('all_dresses', { dresses });
});

app.get('/all_dresses', async (req, res) => {
    const dresses = await Dress.find();
    res.render('all_dresses', { dresses: dresses.map(dress => dress.toObject({ virtuals: true })) });
});

app.get('/update/:id', async (req, res) => {
    const dress = await Dress.findById(req.params.id);
    res.render('update', { dress });
});

app.post('/update/:id', async (req, res) => {
    await Dress.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/all_dresses');
});

app.get('/delete/:id', async (req, res) => {
    await Dress.findByIdAndDelete(req.params.id);
    res.redirect('/all_dresses');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});