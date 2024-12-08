const { postPredictHandler, postPredictAllHandler } = require('../server/handler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000,
        parse: 'true',
        output: 'stream'
      }
    }
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: postPredictAllHandler
  }
]
 
module.exports = routes;