const router = require('express').Router()
var mongo = require('mongodb');

//get '/' means get all employees
router.get('/', async (req, res) => {

    let dbo = await res.db;
    let results = await dbo.collection('dept').find({}).toArray();
    res.end(JSON.stringify(results));

})

router.post('/', async (req, res, next) => {
    let dbo = await res.db;
    //Create the Object to be inserted
    let dept_obj = {
        dept_name: req.body.dept_name,
        location: req.body.location || "Undefined"
    }
    // Insert the Object
    dbo.collection('dept')
        .insertOne(dept_obj, (err, result) => {  //Callback
            res.status(201).json(result.insertedId)
        })
})

module.exports = router