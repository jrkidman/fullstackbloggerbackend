var express = require('express');
var router = express.Router();

// const { Db } = require('mongodb');
const { blogsDB } = require("../mongo");


router.get('/hello-blogs', (req, res) => {
    res.json({ message: 'hello from express' })
});


router.get("/all-blogs", async function (req, res, next) {
    try {
        console.log(req.query.filterValue);
        const collection = await blogsDB().collection("blogs50")
        const limit = Number(req.query.limit)
        const skip = Number(req.query.limit) * (Number(req.query.page) - 1)
        const sortField = req.query.sortField
        const sortOrder = req.query.sortOrder === "ASC" ? 1 : -1;
        const filterField = req.query.filterField
        const filterValue = req.query.filterValue

        let filterObj = {}
        if (filterField && filterValue) {
            filterObj = { [filterField]: filterValue }
        }
        let sortObj = {}
        if (sortField && sortOrder) {
            sortObj = { [sortField]: sortOrder }
        }

        const blogs50 = await collection
            .find(filterObj)
            .sort(sortObj)
            .limit(limit)
            .skip(skip)
            .toArray();
        res.json({ message: blogs50 });
    }
    catch (e) {
        res.status(500).send("Error fetching posts.")
    }
})

router.post('/blog-submit', async function (req, res, next) {
    try {
        console.log("testing before blogPost creation")
        const collection = await blogsDB().collection("blogs50");
        // console.log("after collection")

        const sortedBlogArray = await collection.find({}).sort({ id: 1 }).toArray();
        // console.log("after sortedBlogArray");

        const lastBlog = sortedBlogArray[sortedBlogArray.length - 1]
        // console.log("lastBlog");
        console.log("req body", req.body)//returns undefined

        const title = req.body.title
        console.log("title", title);//returns undefined

        const text = req.body.text
        console.log("text", req.body.text)

        const author = req.body.author
        const category = req.body.category

        const blogPost = {
            title: title,
            text: text,
            author: author,
            category: category,
            createdAt: new Date(),
            id: Number(lastBlog.id + 1),
            lastModified: new Date()
        };
        console.log(blogPost)

        await collection.insertOne(blogPost);
        // res.status(200).send("Post submitted");
    }
    catch (e) {
        res.status(500).send("Error fetching posts." + e)
    }
});





module.exports = router;