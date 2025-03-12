import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';



// create L3 bucket

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'MyL3Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expiration)
      }],
    });
  }
}


export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // Create an S3 bucket 3 ways - L1
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 2,
          status: 'Enabled',
        }]
      },
      bucketName: 'my-l1-bucket',
    });




    // 1. Using the CDK Construct - L2
    new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(2),
      }],
    });


    // 2. Using the CDK Construct - L3
    new L3Bucket(this, 'MyL3Bucket', 3);

  }
}
