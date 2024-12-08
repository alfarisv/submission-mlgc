const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getData = require('../services/getData');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    /* if (!image || image.length > 1000000) {
        return h
            .response({
                status: 'fail',
                message: 'Payload content length greater than maximum allowed: 1000000'
            })
        .code(413);
    } */

    const { label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        "id": id,
        "result": label,
        "suggestion": suggestion,
        "createdAt": createdAt
    }

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })
    response.code(201);
    return response;
}

async function postPredictAllHandler(request, h) {
    const allData = await getData();

    const formatData = [];
    allData.forEach(doc => {
        const data = doc.data();
        formatData.push({
            id: doc.id,
            history: {
                result: data.result,
                createdAt: data.createdAt,
                suggestion: data.suggestion,
                id: doc.id
            }
        });
    });

    const response = h.response({
        status: 'success',
        data: formatData
    })
    response.code(200);
    return response;
}

module.exports = { postPredictHandler, postPredictAllHandler };