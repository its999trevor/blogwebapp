const express = require("express");
const router = express.Router({ mergeParams: true });
const postController = require("../controller/posts");
const Post = require("../models/post");
const admin = require("../controller/admin");

function checkIfLoggedIn(req,res,next){
  if(req.session.isLoggedIn){
      return next();
  }else{
      res.redirect("/login");
  }
}
const isAuthor = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const currentUser = req.session.user;

    if (!currentUser || (!currentUser._id && !currentUser.role==="admin")) {
      return res.status(403).send("Unauthorized");
    }

   
    if (post.author.id.equals(currentUser._id) || currentUser.role==="admin") {
      next();
    } else {
      res.status(403).send("Unauthorized");
    }
  } catch (error) {
    console.error("Error in isAuthor middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

//to render all posts
router.get("/",postController.getAllPosts);
router.get("/category/:category",postController.getPostsByCategory);
router.post("/filterByCategory",postController.filterByCategory);
// add a new post
  router.post("/",checkIfLoggedIn,postController.addNewPost);
//show new post
router.get("/publish",checkIfLoggedIn,postController.renderNewPostForm);
// show post by id
router.get("/:id",postController.renderPostById);
//edit post
router.get("/:id/edit",isAuthor,postController.renderEditForm);   
// Update post
router.post("/:id", isAuthor,postController.updatePost);
//delete post
router.post("/:id/delete",isAuthor,postController.deletePost);
module.exports = router;