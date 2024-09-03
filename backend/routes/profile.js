import express from 'express';
import dbClient from "../config/db_connection.js"
import multer from 'multer';
import { GridFSBucket, ObjectId } from 'mongodb'

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

//fetches all user data
router.get('/', async (req, res) => {
    try {
        await dbClient.connect();
        //console.log("Connected to MongoDB Atlas! Let's fetch data");
        let users_db = dbClient.db('performancereview');
        let users_collection = users_db.collection('results');
        let users_data = await users_collection.find().toArray();
        res.status(200).send(users_data);
    } catch (error) {
        res.status(500).send("Connection Error!");
    }
});

//fetches the data of the specific user
router.get('/:userid', async (req, res) => {
    try {
        await dbClient.connect();
        //console.log("Connected to MongoDB Atlas! Let's fetch data");
        let users_db = dbClient.db('performancereview');
        let users_collection = users_db.collection('results');
        let query = {userid: req.params.userid};
        let result = await users_collection.findOne(query);

        if (!result) {
            res.status(404).send({errormsg:"Not found"});
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send("Connection Error!");
    }
});

router.get('/picture/:profilePictureId', async (req, res) => {
    const profilePictureId = req.params.profilePictureId;
    
    try {
        await dbClient.connect();
        let user_db = dbClient.db('performancereview');
        const bucket = new GridFSBucket(user_db, { bucketName: 'uploads' });
        const downloadStream = bucket.openDownloadStream(new ObjectId(profilePictureId));

        res.set('Content-Type', 'image/png');

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('error', (error) => {
            console.error('Error downloading file from GridFS:', error);
            res.status(500).json({ message: 'Error downloading file.' });
        });

        downloadStream.on('end', () => {
            res.end();
        });

    } catch (error) {
        console.error('Error retrieving file:', error);
        res.status(500).json({ message: 'Server side error.' });
    }
});

//updates username of the user object with the given user id
router.patch('/:userid', async (req, res) => {
    try {
        await dbClient.connect();
        //console.log("Connected to MongoDB Atlas! Let's fetch data");
        let users_db = dbClient.db('performancereview');
        let users_collection = users_db.collection('results');

        const query = { userid: req.params.userid };
        const updates = {
            $set: {username: req.body.username}
        };
        let result = await users_collection.updateOne(query, updates);
        if (result.matchedCount === 0) {
            res.status(404).send("User not found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send("Update Error!");
    }
});

router.post('/picture/:userid', upload.single('profile'), async (req, res) => {
    console.log('Request received at /profile/picture/:userid');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request params:', req.params);

    try {
        await dbClient.connect();
        const file = req.file;
        if (!file) {
            return res.status(400).json({message: "Error"});
        }

        let users_db = dbClient.db('performancereview');
        const bucket = new GridFSBucket(users_db, { bucketName: 'uploads'});

        const uploadStream = bucket.openUploadStream(file.originalname, {
            metadata: {
                userid: req.params.userid,
            },
        });

        uploadStream.end(file.buffer);

        uploadStream.on('finish', async () => {
            try {
                const result = users_db.collection('images').insertOne({
                    userid: req.params.userid, 
                    profilePictureId: uploadStream.id,
                });
                res.status(200).json({message: "Success"});
            } catch (error) {
                console.error('Error creating user profile:', error);
                res.status(500).json({message: "Error creating user profile."}); 
            }
        });

        uploadStream.on('error', (error) => {
            console.error('Error uploading file to GridFS:', error);
            res.status(500).json({message: "Error uploading file."});
        }); 
    } catch (error) {
        console.error('Request error:', error);
        res.status(500).json({message: 'Server side error.'});
    }
});


export { router as profileRouter }