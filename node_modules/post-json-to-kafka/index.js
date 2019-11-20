const {KafkaClient, Producer} = require('kafka-node');
const R = require('ramda');
const debug = require('debug')('post-json-to-kafka:debug');
const trace = require('debug')('post-json-to-kafka:trace');

const sendToKafka = R.curry(
  (topic, to, messages) =>
    new Promise(resolve => {
      trace('Topic : ', topic);
      trace('to : ', to);
      trace('messages : ', messages);
      const client = new KafkaClient({kafkaHost: process.env.KAFKA_URL});
      const producer = new Producer(client);

      const payload = R.pipe(
        R.map(
          R.pipe(
            R.assoc('to', to),
            JSON.stringify
          )
        ),
        R.objOf('messages'),
        R.assoc('topic', topic),
        R.of,
        R.tap(debug)
      )(messages);

      producer.on('ready', () => {
        debug('Producer ready');
        producer.send(payload, () => {
          debug('Payload sent');
          client.close(resolve);
        });
      });
    })
);

module.exports = {sendToKafka};
