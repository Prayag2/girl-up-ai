require('dotenv').configDotenv({
	path: './.env',
});

const verifyToken = require('./middleware/auth');
const { consola } = require('consola');
const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const { login, signup } = require('./controllers/auth');
const {
	commentOnBlog,
	addNewBlog,
	getAllBlogs,
	getBlog,
	likeBlogPost,
} = require('./controllers/blog');
const cors = require('cors');

const port = 4002 || process.env.API_PORT;

app.use(cors());

app.post('/register', signup);

app.post('/login', login);

app.post('/comment-on-blog/:id', verifyToken, commentOnBlog);

app.get('/blogs', getAllBlogs);

app.get('/blogs/:id', getBlog);

app.post('/add-blog', verifyToken, addNewBlog);

app.post('/like-blog/:id', verifyToken, likeBlogPost);

server.listen(port, () => {
	consola.success(`Server running on port ${port}.`);
});
