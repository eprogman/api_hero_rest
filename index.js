const express = require('express');
const superhero = require('./superhero.json')

const app = express();
app.use(express.json())
app.disable('x-powered-by');

// Use the router in the app
app.get('/superhero', (req, res) => {

    //const origin = req.header('origin')
    //res.header('Access-Control-Allow-Origin', origin)
    //res.header('Access-Control-Allow-Origin', 'https://leohero.netlify')

    const { page } = req.query
    const { limit } = req.query
    const { alineacion } = req.query

    if (page && limit) {
        const pageI = parseInt(page) || 1
        const pageInt = pageI < 39 ? pageI : 38
        const limitInt = parseInt(limit) || 15
        const skip = (pageInt - 1) * limitInt
        const items = superhero.slice(skip, skip + limitInt)
        return res.json(items)
    }

    if (alineacion) {
        const align = superhero.filter(pub => pub.biography.alignment === alineacion)
        return res.json(align)
    }
    res.json(superhero.slice(0, 15))
});

app.get('/superhero/:name', (req, res) => {

    //const origin = req.header('origin')
    //res.header('Access-Control-Allow-Origin', origin)

    //res.header('Access-Control-Allow-Origin', 'https://leohero.netlify')

    const { name } = req.params
    const superh = superhero.filter(hero => hero.name.toLowerCase().match(name.toLowerCase()))
    if (superh) return res.json(superh)
    res.status(404).json({ message: 'Supehero not found' })
});


const databaseUrl = process.env.DATABASE_URL ?? 3000


// Start the server
app.listen(databaseUrl, () => {
    console.log(`Server is running on http://localhost:${databaseUrl}`);
});
