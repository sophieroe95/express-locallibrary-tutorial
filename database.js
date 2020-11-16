// // Use ES6 Imports for mongodb and our mongo client
// // import mongodb from 'mongodb';
// const mongodb = require('mongodb')
// const mongoClient = mongodb.MongoClient;
// // ************************************************
// // HEY YOU! REPLACE "andys_db" below with the name of your database!!!!
// // ************************************************
// let dbName = "sophies_db";
// // connection string
// // const uri = "mongodb+srv://testuser:password1234@cluster0.edpyc.mongodb.net?retryWrites=true&w=majority";
// // const uri = "mongodb+srv://new-user-26:password1234@cluster0.tj1ms.mongodb.net/data?retryWrites=true&w=majority";
// const uri = "mongodb+srv://new-user-26:password1234@cluster0.tj1ms.mongodb.net/data?retryWrites=true&w=majority";
// const createCollectionDocument= async (collectionName) => {
//     // Connect to our database / open our connection
//     const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
//     // Retrieve our collection
//     const dataCollection = await mongo.db(dbName).collection(collectionName).find({}).toArray();
//     // Close our connection
//     mongo.close();
//     return dataCollection;
// }
// module.exports = createCollectionDocument();
// const updateCollectionDocument = async (collectionName, data) => {
//     // Connect to our database / open our connection
//     const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
//     // Create our document
//     if (!data._id) {
//         data._id = new mongodb.ObjectID().toString();
//         await mongo.db(dbName).collection(collectionName).insertOne(data)
//     } else {
//         updateCollectionDocument(collectionName, data);
//     }
//     // Close our connection
//     mongo.close();
// }
// module.exports = updateCollectionDocument();
// const getCollectionDocument = async (collectionName, data) => {
//     // Connect to our database / open our connection
//     const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
//     // Retrieve our collection
//     var myquery = { _id: new mongodb.ObjectID(data._id) };
//     var newvalues = { $set: data };
//     await mongo.db(dbName).collection(collectionName).replaceOne(
//         { _id : data._id },
//         data, 
//         { upsert: true} 
//      );
//     // Close our connection
//     mongo.close();
// }

// module.exports = getCollectionDocument();
// const deleteCollectionDocument = async (collectionName, data) => {
//     // Connect to our database / open our connection
//     const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
//     // Retrieve our collection
//     await mongo.db(dbName).collection(collectionName).deleteOne(
//         { _id : data._id }
//      );
//     // Close our connection
//     mongo.close();
// }

// module.exports = deleteCollectionDocument();

// Use ES6 Imports for mongodb and our mongo client
import mongodb from 'mongodb';
const mongoClient = mongodb.MongoClient;
// ************************************************
// HEY YOU! REPLACE "andys_db" below with the name of your database!!!!
// ************************************************
let dbName = "sophies_db";
// connection string
// const uri = "mongodb+srv://new-user-26:password1234@cluster0.tj1ms.mongodb.net/sophies_db?retryWrites=true&w=majority";
var dev_db_url = "mongodb+srv://new-user-26:password1234@cluster0.tj1ms.mongodb.net/sophies_db?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
export const getCollectionDocuments = async (collectionName) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    const dataCollection = await mongo.db(dbName).collection(collectionName).find({}).toArray();
    // Close our connection
    mongo.close();
    return dataCollection;
}
export const createCollectionDocument = async (collectionName, data) => {
    try {
        // Connect to our database / open our connection
        const mongo = await mongoClient.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
          })
        // Create our document
        if (!data._id) {
            data._id = new mongodb.ObjectID().toString();
            await mongo.db(dbName).collection(collectionName).insertOne(data)
        } else {
            updateCollectionDocument(collectionName, data);
        }
        // Close our connection
        mongo.close();
    } catch (e) {
        console.log("HERE IS THE ERROR WE NEED TO LOOK AT...")
        console.log(e);
    }
}
export const updateCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    var myquery = { _id: new mongodb.ObjectID(data._id) };
    var newvalues = { $set: data };
    await mongo.db(dbName).collection(collectionName).replaceOne(
        { _id : data._id },
        data, 
        { upsert: true} 
     );
    // Close our connection
    mongo.close();
}
export const deleteCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    await mongo.db(dbName).collection(collectionName).deleteOne(
        { _id : data._id }
     );
    // Close our connection
    mongo.close();
}