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
12. Do *not* check the `Use Lambda Proxy Integration` option
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


### API Gateway: Enable GET/POST CORS
 
27. Under `Services > Network & Content Delivery` click `API Gateway
28. Select the `PostReaderAPI`
29. On the `APIs > PostReaderAPI > Resources` page, click `Actions > Enable CORS`
30. On the `Enable CORS` page click the `Enable CORS and replace existing CORS headers` button
31. In the `Confirm method changes` pop-up, click the `Yes, replace existing values` button


![Imgur](https://i.imgur.com/ZD2tKG0.png)


### API Gateway: GET Method QueryString

32. Under `Services > Network & Content Delivery` click `API Gateway
33. Select the `PostReaderAPI`
34. On the `APIs > PostReaderAPI > Resources` page, click `GET`
35. In the `GET - Method Execution` panel, click the `Method Request` link
36. In the `URL Query String Parameters` section, click the `Add query string` link
37. In the `Name` field enter `postId` and click the checkmark button to save the parameter
38. In the `Resource` tree, click `OPTIONS` and then `GET`
39. In the `GET - Method Execution` panel, click the `Integration Request` link
40. Expand the `Body Mapping Templates` section
41. Change the `Request body passthrough` to `When there are no templates defined (recommended)`
42. Under `Content-Type` click the `Add mapping template` link
43. In the `Content-Type` field enter `application/json` and click the checkmark button to confirm the change
44. In the `Generate template` text editor, enter the following JSON:

      ```{
             "postId" : "$input.params('postId')"
         }```

45. Click the `Save` button


### API Gateway: Deploy the API

46. Under `Services > Network & Content Delivery` click `API Gateway
47. Select the `PostReaderAPI`
48. On the `APIs > PostReaderAPI > Resources` page, click `/`
49. Click `Actions > Deploy API`
50. In the `Deploy API` pop-up, set the `Deployment stage` to `[New Stage]`
51. Set the `Stage name`, `Stage description`, and `Deployment description` to `dev`
52. Click the `Deploy` button


### API Gateway: Copy the DEV Endpoint URL

53. Under `Services > Network & Content Delivery` click `API Gateway
54. Select the `PostReaderAPI`
55. On the `APIs > PostReaderAPI > Resources` page in the sidebar panel, click `Stages`
56. In the `Stages` tree, click `dev`
57. In the `dev Stage editor` panel, copy the `Invoke URL` address and paste to notepad--ie *save for later*


### S3: Make the Website Bucket Public

58. Under `Services > Storage` click `S3`
59. Select the `aws.<username>.ninja` bucket, which was created in [part 1](ec2-using-polly-lab-pt1.md2)
60. Click the `Permissions` tab
61. On the `Permissions` page, click the `Bucket Policy` button
62. Paste the following JSON into the Bucket policy editor:

    ```{
       	"Version": "2012-10-17",
       	"Statement": [
       		{
       			"Sid": "PublicReadGetObject",
       			"Effect": "Allow",
       			"Principal": "*",
       			"Action": [
       				"s3:GetObject"
       			],
       			"Resource": [
       				"arn:aws:s3:::BUCKET_NAME/*"
       			]
       		}
       	]
       }``` 
       
  *Replace the BUCKET_NAME with the name of your bucket. For example `aws.bradyhouse.ninja`* 

63. Click the `Save` button
64. Click the `Amazon S3` link
65. Verify that the `aws.<username>.ninja` bucket is now listed as `public`

![Imgur](https://i.imgur.com/maKJEBl.png)


### S3: Upload the Static Site Files


    TBW
    




##

**[Previous Lab/Lecture](ec2-serverless-webpage-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-using-polly-lab-pt2.md)** 
