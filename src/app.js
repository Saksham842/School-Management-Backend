const express = require('express');
const cors = require('cors');
require('dotenv').config();

const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'School Management API is running!',
        version: '1.0.0',
        endpoints: {
            addSchool: 'POST /addSchool',
            listSchools: 'GET /listSchools?latitude={lat}&longitude={lon}'
        }
    });
});

app.use('/', schoolRoutes);

app.listen(PORT, () => {
    console.log(`\nServer running at: http://localhost:${PORT}`);
    console.log(`Add School   → POST http://localhost:${PORT}/addSchool`);
    console.log(`List Schools → GET  http://localhost:${PORT}/listSchools?latitude=28.6&longitude=77.2\n`);
});

module.exports = app;
