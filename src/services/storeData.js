const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
    const db = new Firestore({
        projectId: 'submissionmlgc-alfarisv'
    });
   
    const predictCollection = db.collection('prediction');

    try {
        await predictCollection.doc(id).set(data);
        console.log('Document Saved!');
    } catch (error) {
        console.error('Error: Unable to write document')
        throw error;
    }

    return predictCollection.doc(id).set(data);
}

module.exports = storeData;