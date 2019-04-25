const aws = require('aws-sdk');
const fs = require('fs');
const uuid = require('uuid/v1');
const config = JSON.parse(fs.readFileSync('config.json'));

aws.config.update(config.awsUpdate);
let sqs = new aws.SQS(config.apiVersion);

const sendMessage = (message) => {
  
  let params = {
    DelaySeconds: config.delaySeconds,
    MessageGroupId: config.messageGroupId,
    MessageDeduplicationId: uuid(),
    MessageBody: message,
    QueueUrl: config.queueUrl
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) console.log("Error", err);
    else console.log("Success", data.MessageId);
  });
}

sendMessage('YOUR_MESSAGE');

