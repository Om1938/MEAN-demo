var express = require('express');
var cors = require('cors')
var MongoClient = require('mongodb').MongoClient
var app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Added to host angular on node
app.get('*.*', express.static('public/emp', {maxAge: '1y'}));


const uri = "mongodb://localhost:27017";
var db = (async function () {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        console.log("Connecting to mongo");
        await client.connect();
        console.log("connected to mongo");
        return client.db('emp')
    } catch (err) {
        console.log("Not connected", err.message);
    }
})();

app.use((req, res, next) => {
    res.db = db;
    next()
})

//Middleware  1
// app.post('/', async (req, res, next) => {
//     let dbo = await db;
//     dbo.collection('emp')
//         .insertOne(
//             {
//                 "emp_name": req.body.emp_name,
//                 "salary": req.body.salary
//             }, (err, result) => {
//                 if (err)
//                     console.error(err);
//                 console.log(result.insertedCount, " Documents Inserted");
//             }
//         );
//     res.end(req.body.name);
// })

// app.get('/', async (req, res, next) => {
//     // console.log(db.collection('emp'));
//     let dbo = await db;
//     let results = await dbo.collection('emp').find({}).toArray();
//     res.end(JSON.stringify(results));
// })

app.use('/api/emp', require('./controllers/emp/empAPI'));
app.use('/api/dept', require('./controllers/department/deptAPI'));

// app.use('', (req, res, next) => {
//     res.sendFile('index.html', { root: __dirname + '/public/emp' });
// })

//Serve for other routes
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: 'public/emp'});
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.json({ message: err.message, error: err })
});
app.listen(3000, (req, res) => {
    console.log("Server running on 3000");
})