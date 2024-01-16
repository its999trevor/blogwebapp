// adminController.js
const Post = require("../models/post");
module.exports = {
    getDashboard: async (req, res) => {
        const role = req.session.role;

        if (role === 'admin') {
            const pendingPosts = await Post.find({ status: 'pending' }).populate("author.id").exec();
            res.render("dashboard", { pendingPosts });
        } else {
            res.status(403).send("Permission denied");
        }
    },

    approvePost: async (req, res) => {
        const postId = req.params.postId;
        const role = req.session.role;

        if (role === 'admin') {
            const post = await Post.findByIdAndUpdate(postId, { status: 'approved' }, { new: true });

            if (!post) {
                return res.status(404).send("Post not found");
            }

            res.redirect("/admin/dashboard");
        } else {
            res.status(403).send("Permission denied");
        }
    },

    rejectPost: async (req, res) => {
        const postId = req.params.postId;
        const role = req.session.role;

        if (role === 'admin') {
            const post = await Post.findByIdAndDelete(postId);

            if (!post) {
                return res.status(404).send("Post not found");
            }

            res.redirect("/admin/dashboard");
        } else {
            res.status(403).send("Permission denied");
        }
    },
};


