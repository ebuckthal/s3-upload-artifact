const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const github = require('@actions/github');

AWS.config.update({ region: 'us-east-1' });

try {
  const inputBucket = core.getInput('bucket');
  const inputPath = core.getInput('path');
  const inputKey = core.getInput('key');
  const key = path.join(github.ref, inputKey);

  const stream = fs.createReadStream(inputPath);

  s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  s3.upload({ Bucket: inputBucket, Key: key, Body: stream }, (err, data) => {
    if (err) {
      throw err;
    }
    core.info(`Uploaded ${inputPath} to ${data.Location}`);
  });
} catch (error) {
  core.setFailed(error.message);
}
