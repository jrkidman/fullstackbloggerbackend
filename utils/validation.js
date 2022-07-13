const serverCheckBlogIsValid = (reqBody) => {
    if (
        !reqBody.hasOwnProperty("title") &&
        !typeof reqBody.title === String &&
        reqBody.title < 1
    ) {
        return false;
    }

    if (
        !reqBody.hasOwnProperty("text") ||
        !typeof reqBody.text === String ||
        reqBody.text < 1
    ) {
        return false;
    }

    if (
        !reqBody.hasOwnProperty("author") ||
        !typeof reqBody.author === String ||
        reqBody.author < 1
    ) {
        return false;
    }

    if (
        !reqBody.hasOwnProperty("category") ||
        !typeof reqBody.category === String ||
        reqBody.category < 1
    ) {
        return false;
    }

    return true;
};


// const serverValidateBlogUpdate = (updateBlog, ogBlog) => {
//     const blogTitle = updateBlog.title ? updateBlog.title : ogBlog.title;
//     const blogText = updateBlog.text ? updateBlog.text : ogBlog.text;
//     const blogAuthor = updateBlog.author ? updateBlog.author : ogBlog.author;
//     const blogCategory = updateBlog.category ? updateBlog.category : ogBlog.category;

//     updateBlog = {
//         ...ogBlog,
//         lastModified: new Date(),
//         title: blogTitle,
//         text: blogText,
//         author: blogAuthor,
//         category: blogCategory,
//     };
//     return updateBlog;

// 
// }



module.exports = {
    serverCheckBlogIsValid,
    // serverValidateBlogUpdate
};