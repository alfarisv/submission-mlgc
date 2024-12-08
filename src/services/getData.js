const { Firestore } = require('@google-cloud/firestore');

async function getData() {
    const db = new Firestore({
        projectId: 'submissionmlgc-alfarisv',
    });
    const predictCollection = db.collection('predictions');
    
    const data = await predictCollection.get();
    return data;
}

module.exports = getData;