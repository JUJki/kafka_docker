> Publish list of object to kafka

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Install
```bash
yarn add post-json-to-kafka

# or

npm install --save post-json-to-kafka
```

## Configuring
The location of kafka can be set by the environment variable:
```bash
KAFKA_URL=localhost:9092 # default
```

## Example usage

```js
const {sendToKafka} = require('post-json-to-kafka');

const exampleFunction = async () => {
  const somethingToAddInsideEachMessage = 'what you want string, object, list, number';
  const listOfJSON = [
    {key: 'value', key2: 'value2'},
    {key: 'value', something: 'value'}
  ];
  
   
  await sendToKafka('topic', somethingToAddInsideEachMessage, listOfJSON)
};

exampleFunction().then(() => {console.log('Everything is sent')});
```

## Debugging
This package uses the [debug package](https://www.npmjs.com/package/debug).
You can configure it with environment variables:
```bash
DEBUG=post-json-to-kafka:debug # only debug messages
DEBUG=post-json-to-kafka:trace # only trace messages
DEBUG=post-json-to-kafka:*     # every messages
```
