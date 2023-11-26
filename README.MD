# How to use
This project uses npm

### Docker
Install docker 
[Mac](https://docs.docker.com/desktop/install/mac-install/), 
[Windows](https://docs.docker.com/desktop/install/windows-install/), 
[Linux](https://docs.docker.com/desktop/install/linux-install/) 

If desired, you can install and use only Docker Engine in [WSL](https://docs.docker.com/engine/install/ubuntu/). 

### AWS
Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

Then run
```
aws configure --profile serverless-basic
```
AWS Access Key ID: fakeMyKeyId

AWS Secret Access Key: fakeSecretAccessKey

Default region name: eu-west-1

Default output format: json

### DynamoDb admin
To install the local table viewer/editor, run `npm install -g dynamodb-admin`

### Start project
You will need three terminals
1. To start Dynamo DB locally, run `npm run dynamodb-local`
2. To start Dynamodb-admin, run `npm run dynamodb-admin`
3. To start serverless offline, run `npm start`
