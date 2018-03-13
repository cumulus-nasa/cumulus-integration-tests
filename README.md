#  Cumulus Integration Test Project

[![CircleCI](https://circleci.com/gh/cumulus-nasa/cumulus-integration-tests.svg?style=svg)](https://circleci.com/gh/cumulus-nasa/cumulus-integration-tests)

## What is Cumulus?

Cumulus is a cloud-based data ingest, archive, distribution and management
prototype for NASA's future Earth science data streams.

Read the [Cumulus Documentation](https://cumulus-nasa.github.io/)

## Installation

```bash
nvm use
npm install
```

## Running tests locally

These tests run against AWS, so a Cumulus deployment is needed. Set up the deployment using the configurations in this repository. Deployment instructions are located [here](https://cumulus-nasa.github.io/docs/deployment.html). The dashboard is not needed for these tests.

### How to configure your test stack

Your default AWS credentials should be the same credentials used for the deployment.

To use a different stack name, update `app/config.yml`, `iam/config.yml` and `deployer/config.yml`.

When tests run, by default tests will use the configuration defined in `spec/config.yml` to try and execute a workflow. These variables are required for tests to run on CircleCI.

Configuration can be overriden in your own `spec/config.override.yml`. If you are getting setup for the first time:

```
cp spec/config.yml spec/config.override.yml
```

And then edit `spec/config.override.yml`.

Using an override file is required if using a stack other than the `test-cumulus` stack in the `cumulus-sndbx` AWS account. If you want to switch back to the default `spec/config.yml` file, you can specify `USE_DEFAULT_CONFIG=true` when running tests. E.g.:

```
USE_DEFAULT_CONFIG=true AWS_ACCOUNT_ID=<cumulus-sndbx-account-id> jasmine spec/ingestGranule/IngestGranuleSuccessSpec.js
```

NOTE: For this to work you need your default credentials to be credentials for the `cumulus-sndbx` AWS account.

### Access to test data

To access test data in `s3://cumulus-data-shared`, which is required by all specs except helloWorld, the lambda processing role for your deployment must have access to this bucket. This can be done by redeploying your IAM stack using the cloudformation template in the `iam/` directory. This IAM deployment creates a reference to `SharedBucketName` as `cumulus-data-shared` and adds `cumulus-data-shared` as part of the access policy for `LambdaProcessingRole`.

### Run all tests

Tests are written and run with [jasmine](https://jasmine.github.io/setup/nodejs.html).

To run all of the tests, run `jasmine` in the top level of the repository.

When running tests locally, include the `AWS_ACCOUNT_ID` of your deployment, e.g.:

```bash
AWS_ACCOUNT_ID=000000000000 jasmine
```

### Run tests for an individual test file

To run an individual test file, include a path to the spec file, i.e. `jasmine spec/helloWorld/HelloWorldSuccessSpec.js`.

## Adding tests

### Adding tests for an existing workflow

Workflow tests are located in the `/spec/<workflow-name>` folder. Any tests and supporting JSON files can go in there. 

### Adding a new test workflow

The workflow should be configured as it would be for a normal Cumulus deployment in `workflows.yml`. It must be deployed to the current deployment if testing locally.

A new folder should be added in the `/spec` folder for the workflow and the tests should go into that folder with the input JSON files. 
