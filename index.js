const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const github = require('@actions/github');

try {
  const inputBucket = core.getInput('bucket');
  const inputPath = core.getInput('path');
  const inputKey = core.getInput('key');

  core.info(github.context.payload.repository.full_name);

  const key = path.join(
    github.context.payload.repository.full_name,
    github.context.sha,
    inputKey,
  );

  const stream = fs.createReadStream(inputPath);

  AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' });
  s3 = new AWS.S3({ apiVersion: process.env.AWS_API_VERISON || '2006-03-01' });

  s3.upload({ Bucket: inputBucket, Key: key, Body: stream }, (err, data) => {
    if (err) {
      throw err;
    }
    core.info(`Uploaded ${inputPath} to ${data.Location}`);
  });
} catch (error) {
  core.setFailed(error.message);
}
