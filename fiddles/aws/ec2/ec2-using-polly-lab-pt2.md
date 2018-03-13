![AWS Elastic Compute Cloud](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/7MCFLgi.png" height="100" title="API Gateway" /> <img src="https://i.imgur.com/Zjwx7ca.png" height="100" title="AWS Lambda" />
  <img src="https://i.imgur.com/nu0DYWn.png" height="100" title="AWS Polly" />


Using Polly To Pass Your Exam Lab (Part 2)
======

This is a `2 parter`.  In [part 1](ec2-using-polly-lab-pt1.md), 3 Lambda functions were created.  Two functions are used
to read and write to a DynamoDB table.  The third function is used to invoke the Polly service to generate MP3 files 
and write (or save) them to an S3 bucket.

In part 2, the API Gateway service is used to establish the API pieces (GET/POST/CORS config) necessary to 
enable a static website hosted on S3 to communicate with the Lambda functions created in part 1.  

*Note, although this is a great lab for gaining experience with AWS, it is beyond the scope of the Exam.  In other 
words, there are no Exam Tips (or Exam related notes) resulting from the the completion of this lab.*



## Video Link

[![acloud.guru lecture link](https://i.imgur.com/QohY9up.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/8bd39cd5-9f90-58fe-4ea4-0720964751f6/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Big Picture

![Imgur](https://i.imgur.com/iJJnnrb.png)


## Prerequisites

*   Mac configured with [iTerm](https://iterm2.com/) and [BBEdit](http://www.barebones.com/products/bbedit/)
*   AWS Console free-tier account
*   Complete [Using Polly To Pass Your Exam Lab (Part 1)](ec2-using-polly-lab-pt1.md)
     

## Steps

### API Gateway:  Create PostReaderAPI

1.  Log into the AWS Console and select the `N. Virginia` region
2.  Under `Services > Network & Content Delivery` click `API Gateway`
3.  On the `APIs` page, click the `Create API` button
4.  On the `Create new API` page, set the `API name` to `PostReaderAPI`
5.  Set the `Description` to `post reader api`
6.  Click the `Create API` button


### API Gateway:  Add GET Method

7.  Under `Services > Network & Content Delivery` click `API Gateway
8.  Select the `PostReaderAPI`
9.  On the `APIs > PostReaderAPI > Resources` page, click `Actions > Create Method`
10. Select `GET` and click the checkmark confirmation button
11. On the `GET - Setup` page, set the `Integration type` to `Lambda Function`
12. Check the `Use Lambda Proxy Integration` option
13. Set the `Lambda Region` to `us-east-1`
14. Set the `Lambda Function` to `PostReader_GetPosts`
15. Click the `Save` button
16. In the `Add Permission to the Lambda Function` pop-up, click the `OK` button


![Imgur](https://i.imgur.com/PqVDFgG.png)


### API Gateway: Add POST Method

17. Under `Services > Network & Content Delivery` click `API Gateway
18. Select the `PostReaderAPI`
19. On the `APIs > PostReaderAPI > Resources` page, click `Actions > Create Method`
20. Select `POST` and click the checkmark confirmation button
21. On the `POST - Setup` page, set the `Integration type` to `Lambda Function`
22. Check the `Use Lambda Proxy Integration` option
23. Set the `Lambda Region` to `us-east-1`
24. Set the `Lambda Function` to `PostReader_NewPosts`
25. Click the `Save` button
26. In the `Add Permission to the Lambda Function` pop-up, click the `OK` button

![Imgur](https://i.imgur.com/yswm78M.png)


    TBW



##

**[Previous Lab/Lecture](ec2-serverless-webpage-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-using-polly-lab-pt2.md)** 
