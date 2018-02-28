![Imgur](https://i.imgur.com/9awJmtb.png) 


EC2 Command Line Lab
======

Short lab detailing how to access the AWS CLI within an EC2 instance to self-destruct
that instance. For this one, I just watched the video and completed the steps.  **Note -
this lab is actually an example of something you shouldn't do.**


## Video Link

[![Imgur](https://i.imgur.com/vcduBiF.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/cli/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Review Questions

1.  Why shouldn't you store AWS Credential keys on an EC2 instance?
2.  What's the alternative to storing credentials locally?
3.  What is the aws command to enter credentials?
4.  What is the aws command to list all ec2 instances?
5.  What is the aws command line ec2 self destruct command?
6.  Where is the aws local config stored?

## Answers

1.  If the instance is hacked, then your AWS account is compromised
2.  IAM roles
3.  `aws configure`
4.  `aws ec2 describe-instances`
5.  `aws ec2 terminate-instances --instance-ids <instance-id>`
6.  The `.aws` directory in the current user's home directory


##

**[Previous Lab/Lecture](ec2-cloudwatch-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-iam-roles-lab.md)** 
