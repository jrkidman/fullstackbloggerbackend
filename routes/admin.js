var express = require("express");
const { restart } = require("nodemon");
var router = express.Router();
const { blogsDB } = require("../mongo");
const { serverCheckBlogIsValid } = require("../utils/validation");

// * This route should return an array of blog posts, but only with the following fields: [title, author, createdAt, lastModified]. 
//       * Hint: The mongodb method.projection({}) can be chained onto a.find({}) to retrieve only the specified fields from the database.
//       * Note: The idea here is to leave out fields the administrator does not need to see, such as text, in order to reduce the amount of data sent between the client and the server.

router.get("/blog-list", async function (req, res, next) {
    try {
        const collection = await blogsDB().collection("blogs50")
        const blogs50 = await collection.find({}).projection({
            title: 1,
            author: 1,
            createdAt: 1,
            lastModified: 1,
            id: 1
        }).toArray();
        res.status(200).json({ message: "Success.", success: true })
    }
    catch (e) {
        res.status(500).json({ message: "Error fetching posts.", success: false })
    }
})



router.put('/edit-blog', async function (req, res) {
    try {
        // const collection = await blogsDB().collection('blogs50');
        // const blogId = Number(req.body.id);
        // const ogBlog = await collection.findOne({ id: blogID });

        // if (!ogBlog) {
        //     res.status(204).json({ message: "Cannot find blog.", success: false });
        // } else {
        const updateBlogIsValid = serverCheckBlogIsValid(req.body);
        if (!updateBlogIsValid) {
            res.status(400).jason({ message: "Blog update is not valid.", success: false })
        }
        const newPostData = req.body;
        const date = new Date();
        const updateBlog = { ...newPostData, lastModified: date };

        await collection.updateOne({ id: req.body.id }, { $set: { ...updateBlog } });
        res.status(200).json({ message: "Blog updated successfully.", message: true });
        // }

    } catch (error) {
        res.status(500).send("Error updating blog." + error);
    }
});

router.delete("delete-blog/:blogId", async (req, res) => {
    try {
        const collection = await blogsDB().collection('blogs50');
        const blogId = Number(req.params.blogId);
        const blogToDelete = await collection.deleteOne({ id: blogId });
        if (blogToDelete.deletedCount === 1) {
            res.status(200).json({ message: "Successfully deleted.", message: true });
        } else {
            res.status(204).json({ message: "Delete unsuccessful.", success: false });
        }

    } catch (error) {
        res.status(500).json({ message: "Error" + error, success: false });
    }
})
