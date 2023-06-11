require("dotenv").configDotenv({
    path: "./.env",
});

const verifyToken = require("./middleware/auth");
const { consola } = require("consola");
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const { login, signup } = require("./controllers/auth");
const {
    commentOnBlog,
    addNewBlog,
    getAllBlogs,
    getBlog,
    likeBlogPost,
} = require("./controllers/blog");
const cors = require("cors");

const port = 5000;

app.use(
    cors({
        origin: "*",
    })
);

app.post("/comment-on-blog/:id", verifyToken, commentOnBlog);

app.post("/add-blog", verifyToken, addNewBlog);

app.post("/like-blog", verifyToken, likeBlogPost);

app.post("/register", signup);

app.post("/login", login);

app.get("/blogs", getAllBlogs);

app.get("/blogs/:id", getBlog);

server.listen(port, () => {
    consola.success(`Server running on port ${port}.`);
});
