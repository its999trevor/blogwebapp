const Post = require("../models/post");
const User = require("../models/user");
const SibApiV3Sdk = require('sib-api-v3-sdk'); //sendinblue




  function sendApprovalEmail(post,currentUser) {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = "enter you api key here";
  
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = 'New Post Approval';
    sendSmtpEmail.htmlContent = `A new post "${post.name}" has been added by <b>"${currentUser.username}"</b> and needs your approval.   <p>Click <a href="http://localhost:3333/">here</a> to go to your application.</p>`;
    sendSmtpEmail.sender = { name: 'BlogSpot', email: 'noreply@blogspotbee.com' };
    sendSmtpEmail.to = [{ email: 'youemailid@gmail.com' }]; 
  
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
            console.log('Email sent successfully. Returned data: ', data);
        },
        function (error) {
            console.error('Error sending email:', error);
        }
    );
  }

  module.exports={
    getAllPosts: async(req,res)=>{
        try {
            const allPosts = await Post.find({ status: 'approved' });
            res.render("posts/index", {
              posts: allPosts.reverse(),
              currentUser: req.user,
              userLoggedIn: req.session.isLoggedIn,
            });
          } catch (err) {
            console.log("Error in find");
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
    },
    getPostsByCategory:async (req, res) => {
        try {
            const { category } = req.params;
            const posts = await Post.find({ category, status: 'approved' }).sort({ name: 'asc' });
            const categories = await Post.distinct("category");
    
            res.render("posts/index", {
                posts: posts.reverse(),
                currentUser: req.user,
                categories,
                selectedCategory: category,
            });
        } catch (err) {
            console.log("Error in find");
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    },
    filterByCategory:async (req, res) => {
        try {
            const selectedCategory = req.body.categoryFilter;
            if (selectedCategory) {
                return res.redirect(`/posts/category/${selectedCategory}`);
            } else {
                return res.redirect("/posts");  
            }
        } catch (err) {
            console.log("Error in category filter");
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    },
    addNewPost:async (req, res) => {
        try {
            const { name, image, description, category } = req.body;
            const currentUser = req.session.user;
            const role = req.session.role;
            
            if (!currentUser || !currentUser._id || !currentUser.username) {
                console.error("Invalid user data");
                return res.status(500).send("Internal Server Error");
            }
    
           
            const newPost = new Post({
                name,
                image,
                description,
                category,
                author: {
                    id: currentUser._id, 
                },
            });
            if (role === 'admin') {
                newPost.status = 'approved';
              } else {
                newPost.status = 'pending';
              }
          
            await newPost.save();
            if (role !== 'admin') {
              sendApprovalEmail(newPost,currentUser);
            }
            res.redirect("/posts");
        } catch (error) {
            console.error("Error creating new post:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    renderNewPostForm: (req, res) => {
        res.render("posts/new");
      },
      renderPostById:async (req, res) => {
        try {
          const foundPost = await Post.findById(req.params.id).populate("author.id").exec();
          console.log(foundPost.author.id.username);
          res.render("posts/show", { post: foundPost });
        } catch (err) {
          console.log("Error occurred in finding ID");
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      },
      renderEditForm:async (req, res) => {
        try {
          const foundPost = await Post.findById(req.params.id);
          res.render("Posts/edit", { post: foundPost });
        } catch (err) {
          console.log("Error occurred in finding ID");
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      },
      updatePost:async (req, res) => {
        try {
            const { id } = req.params;
            const { name, image, description,category } = req.body.post || req.body; 
            console.log("ID:", id);
            console.log("Name:", name);
            console.log("Image:", image);
            console.log("Description:", description);
            console.log("Category:", category);
            let post = await Post.findOne({ _id: id });
    
            if (!post) {
                return res.status(404).send("Post not found");
            }
    
            post.name = name;
            post.image = image;
            post.description = description;
            post.category = category;
    
            await post.save();
            res.redirect(`/posts/${id}`);
        } catch (error) {
            console.error("Error updating post:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    deletePost:async (req, res) => {
        try {
            const deletedPost = await Post.findByIdAndDelete(req.params.id);
            if (!deletedPost) {
                return res.status(404).send("Post not found");
            }
            res.redirect("/posts");
        } catch (error) {
            console.error("Error deleting post:", error);
            res.status(500).send("Internal Server Error");
        }
    }
  }