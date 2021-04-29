const router = require('express').Router()
var mongo = require('mongodb');

//get '/' means get all employees
router.get('/', async (req, res) => {

    let dbo = await res.db;
    let results = await dbo.collection('emp').find({}).toArray();
    res.end(JSON.stringify(results));

})

// get '/:id' means employee with given id
router.get('/id/:id', async (req, res, next) => {
    let dbo = await res.db;
    if (req.params && req.params.id) {
        try {
            let id = mongo.ObjectID(req.params.id)
            let results = await dbo.collection('emp').find({ "_id": id }).toArray();
            res.json(results[0]);
        } catch (err) {
            console.log(err);
            next(err);
        }
    } else {
        const err = new Error('Invalid UserId');
        err.status = 404;
        next(err);
    }
})

// get '/:dept' means employee with given id
router.get('/dept/:dept', async (req, res, next) => {       //code#1
    let dbo = await res.db;
    if (req.params && req.params.dept) {
        try {
            let dept = req.params.dept              //req.params hold the parameters accordingly given in code#1
            let results = await dbo.collection('emp').find({ "Dept": dept }).toArray();
            res.end(JSON.stringify(results));
        } catch (err) {
            console.log(err);
            next(err);
        }
    } else {
        const err = new Error('Invalid Department');
        err.status = 404;
        next(err);
    }
})
//POST request are usually used to add data
router.post('/', async (req, res, next) => {
    let dbo = await res.db;

    // Validation can be done like this
    if (req.body.mobile.toString().length != 10) {
        let err = new Error('Invalid Mobile Number');
        err.status = 400;
        next(err)
        return;
    }

    //Create the Object to be inserted
    let emp_obj = {
        emp_name: req.body.emp_name,
        salary: req.body.salary || 0,       //Setting Default Value
        Dept: req.body.Dept,
        mobile: req.body.mobile || "",
        Gender: req.body.Gender
    }
    // Insert the Object
    dbo.collection('emp')
        .insertOne(emp_obj, (err, result) => {  //Callback
            res.status(201).json(result.insertedId)
        })
})
//DELETE requests are usually used to delete data
router.delete('/id/:id', async (req, res, next) => {
    let dbo = await res.db;

    let id = mongo.ObjectID(req.params.id);
    dbo.collection('emp').deleteOne({ "_id": id }, (err, result) => {
        res.json(true)
    })
})

module.exports = router