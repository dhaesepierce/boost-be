// src/index.js
const express = require('express');
const dotenv = require('dotenv');
const onChain = require('./chain')
const api = require('./api')
const db = require('./db.js')
dotenv.config();

const app = express();
const port = 3000;

app.post('/events', async (req, res) => {
    BigInt.prototype["toJSON"] = function () {
        return this.toString();
    };
    let dbData = []
    const events = await onChain.getData(req.query.start,req.query.end)
    for(i=0;i<events.length;i++){
        const apiData = await api.getBoost(events[i].questId)
        const dbObj = api.getDbObj(apiData.data)
        dbData.push(dbObj)
    }
    db.postData(dbData)
    res.send('success')
})
app.get('/events', async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    return res.send(await db.getData(req.query.name))
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});