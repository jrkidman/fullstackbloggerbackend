var express = require('express');
var router = express.Router();

// const { Db } = require('mongodb');
const { blogsDB } = require("../mongo");


router.get('/hello-blogs', (req, res) => {
    res.json({ message: 'hello from express' })
});


router.get("/all-blogs", async function (req, res, next) {
    try {
        const collection = await blogsDB().collection("blogs50")
        const blogs50 = await collection.find({}).toArray();
        res.json(blogs50);
    }
    catch (e) {
        res.status(500).send("Error fetching posts.")
    }
})

// router.get('/all-blogs', async function (req, res, next) {
//     try {
//         let sortField = req.query.sortField;
//         let sort = req.query.sort;

//         if (sort === "asc") {
//             sort = 1;
//         }
//         if (sort === "desc") {
//             sort = -1;
//         }
//         const collection = await blogsDB().collection("blogs50")
//         const blogs50 = await collection.find({}).sort({ [sortField]: sort }).toArray();
//         console.log("hit here");
//         res.json(blogs50);
//     }
//     catch (e) {
//         res.status(500).send("Error fetching posts.")
//     }
// });



module.exports = router;