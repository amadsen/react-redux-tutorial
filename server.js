/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const staticRouter = express.Router();
const apiRouter = express.Router();

const COMMENTS_FILE = path.join(__dirname, 'comments.json');
const INDEX = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), {encoding: 'utf8'});
app.set('port', (process.env.PORT || 4000));

const notFound = (req, res, next) => {
  res.status(404).send(`${req.originalUrl} Not Found.`);
};

const errorHandler = (err, req, res, next) => {
  res.status(500).send('Server error');
};

staticRouter.use('/', express.static(path.join(__dirname, 'public')));
staticRouter.use(/^\/(css|scripts)/, notFound);

apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({
    extended: true
}));

apiRouter.get('/comments', (req, res) =>
    fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    })
);

apiRouter.post('/comments', (req, res) =>
    fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        let comments = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        const newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };
        comments = comments.concat(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), err => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.setHeader('Cache-Control', 'no-cache');
            res.json(newComment);
        });
    })
);

apiRouter.get('/authors/:author', (req, res) => {
    console.log('author: ', req.params.author);
    fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.setHeader('Cache-Control', 'no-cache');
        res.json(
            JSON.parse(data).filter(comment => comment.author === req.params.author)
        );
    });
});

apiRouter.use(notFound);

app.use('/', staticRouter);
app.use('/api', apiRouter);

app.use('/', (req, res) => {
    res.send(INDEX)
});

app.use('/', errorHandler);


app.listen(app.get('port'), function() {
    console.log(`Server started: http://localhost:${app.get('port')}/`);
});
