![AWS Elastic Compute Cloud](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/Zjwx7ca.png" height="100" title="AWS Lambda" />


EC2 Lambda
======

    TBW

## Video Link

[![Imgur](https://i.imgur.com/DO4JBkm.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/lambda/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Cloud History (in 2 minutes)

![History of Cloud](https://i.imgur.com/hQHw2U8.png)


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

      TBW


## Exam Tips

What did we learn? 

    TBW


### Review Questions

    TBW


### Answers

    TBW


##

**[Previous Lab/Lecture](ec2-efs-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-lambda.md)** 
