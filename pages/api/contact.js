import {MongoClient, ServerApiVersion} from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {email, name, message} = req.body;

        if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            res.status(422).json({message: 'Invalid input.'});
            return;
        }

        // Store it in a database

        const newMessage = {
            email,
            name,
            message
        };
        console.log(newMessage);

        // const uri = "mongodb+srv://sameer:sameer123@cluster0.qu93y6r.mongodb.net/?retryWrites=true&w=majority";

        const uri = `mongodb+srv://${process.env.mongoUsername}:${process.env.mongoPassword}@${process.env.mongoCluster}.qu93y6r.mongodb.net/?retryWrites=true&w=majority`;

        const client = new MongoClient(uri, {
            useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1
        });

        try {
            await client.connect()
                .then((client) => {
                    const db = client.db(process.env.mongoDatabase);
                    const messagesCollection = db.collection('messages');
                    return messagesCollection.insertOne(newMessage);
                })
                .then((result) => {
                    newMessage._id = result.insertedId;
                    return client.connect()
                });
        } catch (e) {
            res.status(500).json({message: 'Storing message failed!'});
        }


        res.status(201).json({
            msg: 'Successfully stored message!',
            message: newMessage
        });
    }

}