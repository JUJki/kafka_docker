const {serverlessHandler} = require('serverless-provider-handler');
const {sendToKafka} = require('post-json-to-kafka');
const {processKryptonopolis} = require ('./')
const R = require('ramda');
const {startConsumer} = require('./consumer-starter');

const fakeKrypto_ = model =>
    R.pipe(
        R.of,
        sendToKafka('Kryptonopolis', 'train')
    )(model);

startConsumer('Kryptonopolis', processKryptonopolis);

const fakeKrypto = serverlessHandler(fakeKrypto_);

module.exports = {fakeKrypto};
