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

router.get('/picture/:userid', async (req, res) => {
    try {
        await dbClient.connect();
        let user_db = dbClient.db('performancereview');
        let users_collection = user_db.collection('results');
        
        // Find the user document by userid
        let user = await users_collection.findOne({ userid: req.params.userid });
        
        // Check if the user exists and has a profile picture
        if (!user || !user.pfpID) {
            return res.status(404).json({ message: 'User or profile picture not found.' });
        }

        const profilePictureId = user.pfpID;

        // Create a GridFSBucket instance
        const bucket = new GridFSBucket(user_db, { bucketName: 'uploads' });

        // Check if the profilePictureId is a valid ObjectId
        let fileId;
        try {
            fileId = new ObjectId(profilePictureId); // Try converting it to ObjectId
        } catch (error) {
            // If it's not a valid ObjectId, treat it as a string
            console.error('Invalid ObjectId:', error);
            return res.status(400).json({ message: 'Invalid profile picture ID.' });
        }

        // Open a download stream for the profile picture
        const downloadStream = bucket.openDownloadStream(fileId);

        // Set the appropriate content type (assuming it's PNG)
        res.set('Content-Type', 'image/png');

        // Pipe the download stream directly to the response
        downloadStream.pipe(res);

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

router.patch('/picture/:userid', async (req, res) => {
    try {
        // Connect to the database
        await dbClient.connect();
        let users_db = dbClient.db('performancereview');
        let users_collection = users_db.collection('results');
        
        // Find the user by userid and update the profile picture ID
        const query = { userid: req.params.userid };
        const updates = {
            $set: { pfpID: req.body.pfpID }
        };
        
        let result = await users_collection.updateOne(query, updates);

        // Check if the user was found and updated
        if (result.matchedCount === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "Profile picture updated successfully" });
        }
    } catch (error) {
        // Log the error and return a server error response
        console.error('Error updating profile picture:', error);
        res.status(500).json({ message: "Update error" });
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
/*                 const result = users_db.collection('images').insertOne({
                    userid: req.params.userid, 
                    profilePictureId: uploadStream.id,
                }); */
                res.status(200).json({
                    message: uploadStream.id
                });
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

router.delete('/picture/:currProfilePictureID', async (req, res) => {
    try {
        await dbClient.connect();
        let users_db = dbClient.db('performancereview');

        // Create a GridFS bucket instance
        const bucket = new GridFSBucket(users_db, {bucketName: 'uploads'});
        //let users_collection = users_db.collection('images');
        
        // Get the profile picture ID from request parameters
        const profileID = req.params.currProfilePictureID;
        const fileId = new ObjectId(profileID);

        // Delete the file from GridFS
        await bucket.delete(fileId);

        // Also delete the image metadata from the 'images' collection
        //await users_collection.deleteOne({ profilePictureId: fileId });

        // Send success response
        res.status(200).json({ message: "Profile picture deleted successfully" });
    } catch (error) {
        console.error('Error deleting profile picture:', error);
        res.status(500).json({ message: 'Error deleting profile picture' });
    }
});


router.patch('/picture/:userid', async (req, res) => {
    try {
        // Connect to the database
        await dbClient.connect();
        let users_db = dbClient.db('performancereview');
        let users_collection = users_db.collection('results');
        
        // Find the user by userid and update the profile picture ID
        const query = { userid: req.params.userid };
        const updates = {
            $set: { pfpID: req.body.pfpID }
        };
        
        let result = await users_collection.updateOne(query, updates);

        // Check if the user was found and updated
        if (result.matchedCount === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "Profile picture updated successfully" });
        }
    } catch (error) {
        // Log the error and return a server error response
        console.error('Error updating profile picture:', error);
        res.status(500).json({ message: "Update error" });
    }
});

export { router as profileRouter }