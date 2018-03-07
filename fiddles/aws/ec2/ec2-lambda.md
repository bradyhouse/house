![AWS Elastic Compute Cloud](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/Zjwx7ca.png" height="100" title="AWS Lambda" />


EC2 Lambda
======

Introductory / Overview lecture on the Amazon Lambda service.


## Video Link

[![EC2 Lambda Lecture](https://i.imgur.com/DO4JBkm.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/lambda/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Cloud History (in 2 minutes)

![2 minute history of cloud](https://i.imgur.com/ljKuvQk.png)


* Developers hate hardware
* We have spent the last few decades building layers of abstraction over 
  layers of abstractions to isolate ourselves from having to deal with
  hardware directly
* Prior 2006 this really meant `Data Centers` 
  * Put all the hardware in one physical location and have someone else deal with it
  * But this wasn't easy -- you still had to use the phone to get someone to
    to provision the machines
* And then in 2006 EC2 is launched and `Infrastructure As A Service (IAAS)` is born
  * Still there are issues -- you are still dealing with virtual (and/or physical) machines
  * You still have to manage the operating system (windows / linux)
* Elastic Bean Stalk soon followed and `Platform As A Service (PAAS)` is born
  * Essentially, you upload your code, and Amazon handles the machine and operating
    system provisioning
  * Same problem as IAAS only now there is a third party
* And then came Containers-- aka docker
  * That's another topic (to be discussed later)
  * There are still worries -- ie you still have to worry about keeping your containers running
* 2015 Lambda is born and Serverless computing is born
  * No more worries-- you don't have to worry about Infrastructure, Platforms or Containers


## What is Lambda?

Formal Definition:  _AWS Lambda is a compute service where you can upload your code and create a Lambda function. 
It takes care of provisioning and managing the servers that you use to run the code. You don't have to worry about 
operating systems, patching, scaling, etc. You can use Lambda in the following ways._

* _As an event-driven compute service where AWS Lambda runs your code in response to events. These events could be 
  changes to data in an Amazon S3 bucket or an Amazon DynamoDB table._

* _As a compute service to run your code in response to HTTP requests using Amazon API Gateway or API calls made using
  AWS SDKs._

  
### What does this mean?

* Data Centres
* Hardware
* Assembly Code / Protocols
* High Level Language
* Operating Systems
* Application Layer / AWS APIs


### What Languages are supported?

* Node.js
* Java
* Python
* C#


### How is Lambda Priced?

* First 1 million requests are free. $0.20 per 1 million requests thereafter
* Duration
  * Duration is calculated from the time your code begins executing until it returns or otherwise terminates, rounded
    up to the nearest 100ms. The price depends on the amount of memory you allocate to your function. You ar charged
    $0.00001667 for every GB-second used
    

### Why Is Lambda Cool?

* No servers
* Continous scaling
* Super cheap
    

## Exam Tips

What did we learn? 

* Lambda scales out (not up) automatically
* Lambda functions are independent, 1 event = 1 function
* Lambda is serverless
* Know what services are serverless
  * S3, API Gateway, Lambda, DynamoDB ... etc.
  * EC2 is not serverless
* Lambda can trigger other lambda functions, 1 event can = x functions if functions trigger other functions
* Architectures can get extremely complicated, AWS X-ray allows you to debug what is happening
* Lambda can do things globally, you can use it to back up S3 buckets to other S3 buckets etc
* Know your triggers
  * API Gateway
  * Alexa Skill Kit
  * CloudFront
  * CloudWatch Events
  * CloudWatch Logs 
  * DynamoDB
  * S3
  * SNS
  * Kinesis 
* Know what languages are supported
* Lambda supports a maximum duration of 5 minutes


### Review Questions

1.  What is scaling up?
2.  What is scaling out?
3.  How can Lambda functions be used to service HTTP requests?
4.  If a million users hit an API Gatway configured to call Lambda how many functions are invoked?
5.  What languages are supported?  
6.  What is the maximum duration threshold of a Lambda function call?
7.  What triggers are supported by Lambda?
8.  What are some examples of serverless AWS services?
9.  What are some of examples of `server based` AWS services?


### Answers

1.  Increasing instance resources
2.  More instances
3.  Via API Gateway
4.  million
5.  Node.js, Java, Python, C#
6.  5 mins
7.  API Gateway, IoT, Alexa Skill Kit, CloudFront, CloudWatch Events, CloudWatch Logs, DynamoDB, S3, SNS, Kinesis 
8.  API Gateway, CloudFront, CloudWatch
9.  EC2, Auto Scaling, EFS

  
##

**[Previous Lab/Lecture](ec2-efs-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-serverless-webpage-lab.md)** 
