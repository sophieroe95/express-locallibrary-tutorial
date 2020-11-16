import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { getCollectionDocuments, createCollectionDocument, deleteCollectionDocument } from './database.js';
const app = express();
app.use(cors());
app.use(bodyParser.json())
let destinations = [];
// GET endpoint which returns/sends all our users in the response
app.get('/', async (request, response) => {
    const destinations = await getCollectionDocuments('data')
    response.send(destinations);
})
// POST endpoint which takes the user from the request body and saves it...
app.post('/create', async (request, response) => {
    const newDestination = request.body;
    console.log("Why is this undefined.....")
    console.log(newDestination)
    await createCollectionDocument('data', newDestination);
    response.send({message: "We created this destination...."})
})
// DELETE endpoint which deletes the user which is sent in the request body...
app.delete('/delete', async (request, response) => {
    const destinationToDelete = request.body;
    await deleteCollectionDocument('data', destinationToDelete);
    response.send({message: "We deleted this destination...."})
});
// Finally! Listen on Port 8080
app.listen(8081);


