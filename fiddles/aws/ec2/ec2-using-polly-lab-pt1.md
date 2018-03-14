![AWS Elastic Compute Cloud](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/7MCFLgi.png" height="100" title="API Gateway" /> <img src="https://i.imgur.com/Zjwx7ca.png" height="100" title="AWS Lambda" />
  <img src="https://i.imgur.com/nu0DYWn.png" height="100" title="AWS Polly" />


Using Polly To Pass Your Exam Lab (Part 1)
======

This is a `2 parter`.  In part 1, 3 Lambda functions are created.  Two functions are used to read and write to a 
DynamoDB table.  The third function is used to invoke the Polly service to generate MP3 files and write (or save) them 
to an S3 bucket.  

*Note, although this is a great lab for gaining experience with AWS, it is beyond the scope of the Exam.  In other 
words, there are no Exam Tips (or Exam related notes) resulting from the the completion of this lab.*


## Video Link

[![acloud.guru lecture link](https://i.imgur.com/xkCy5Ve.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/dbb8603d-1ccf-0bda-f1d3-46d1a92718c3/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Big Picture

![Imgur](https://i.imgur.com/iJJnnrb.png)


## Prerequisites

*   Mac configured with [iTerm](https://iterm2.com/) and [BBEdit](http://www.barebones.com/products/bbedit/)
*   AWS Console free-tier account
*   Complete the [EC2 Serverless Webpage Lab](ec2-serverless-webpage-lab.md)
     

## Steps

### Create DynamoDB Table

1.  Log into the AWS Console
2.  Under `Database` click `DynamoDB`
3.  On the `DynamoDB` Dashboard page, click the `Create table`
4.  On the `Create DynamoDB table`, set the `Table name` to `posts`
5.  Set the `Primary key` to `id`
6.  Click the `Create` button

![Imgur](https://i.imgur.com/HNxFlsi.png)


### S3: Create the Static Website Bucket

1.  Under `Services > Storage` click `S3`
2.  Click the `Create bucket` button
3.  In the `Create bucket` pop-up, set the `Bucket name` to `mp3-writer.<username>.ninja` -- for example, `mp3-writer.bradyhouse.ninja`
4.  Click the `Create` button


### S3: Create the MP3 File Bucket

5.  Under `Services > Storage` click `S3`
6.  Click the `Create bucket` button
7.  In the `Create bucket` pop-up, set the `Bucket name` to `mp3.<username>.ninja` -- for example, `mp3.bradyhouse.ninja`
8.  Click the `Create` button


### SNS: Create a Notification

9.  Under `Services > Application Integration` click `Simple Notification Service`
10. On the `SNS dashboard` dashboard page, click the `Create topic` button
11. In the `Create new topic` pop-up, set the `Topic name` to `new_posts`
12. Set the `Display name` to `New Posts`
13. Click the `Create topic` button


![Imgur](https://i.imgur.com/5Eq684i.png)


14. Copy the `Topic ARN` and paste to temporary location -- aka notepad


### IAM: Create Lambda Role

15. Under `Services > Security, Identity & Compliance` click `IAM`
16. In the `IAM` sidebar, click `Roles`
17. On the `Roles` page, click the `Create role` button
18. On the `Create Role` page, select `AWS Service`
19. Under the `Choose the service that will use this role` section, click the `Lambda` link
20. Click the `Next Permissions` button
21. On the `Create role > Attach permissions policies` page, click the `Create policy` button
    *Note - This will open the `Create policy ...` page in a secondary browser window*
22. On the `Create policy ...` page, click the `JSON` tab
23. Paste the following JSON into the text editor:

      ```{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                         "polly:SynthesizeSpeech",
                         "dynamodb:Query",
                         "dynamodb:Scan",
                         "dynamodb:PutItem",
                         "dynamodb:UpdateItem",
                         "sns:Publish",
                         "s3:PutObject",
                         "s3:PutObjectAcl",
                         "s3:GetBucketLocation",
                         "logs:CreateLogGroup",
                         "logs:CreateLogStream",
                         "logs:PutLogEvents"
                    ],
                    "Resource": [
                        "*"
                    ]
                }
            ]
         }```

24. Click the `Review policy` button
25. In the `Create policy > Review policy` page, set the `Name` and `Description` to `LambdaPollyPolicy`
26. Click the `Create policy` button


![Imgur](https://i.imgur.com/2tz8cxu.png)


27. Close the secondary browser window (step 21)
28. On the `Create role > Attach permissions policies` page, click the `Refresh` button
29. In the `Filter` field enter `LambdaPollyPolicy`
30. Select the `LambdaPollyPolicy`
31. Click the `Next: Review` button
32. On the `Create role > Review` page, set the `Role name` and `Description` to `LambdaRoleForPolly`
33. Click the `Create role` button 


![Imgur](https://i.imgur.com/FdWPT5v.png)


### Lambda: PostReader_NewPosts Function

34. Under `Services > Compute` click `Lambda`
35. Click the `Create function` button
36. On the `Create function` page, select `Author from scratch`
37. Under `Author from scratch` section, set the `Name` to `PostReader_NewPosts`
38. Set the `Runtime` to `Python 2.7`
39. Set the `Role` to `Choose an existing role`
40. Set the `Existing role` to `LambdaRoleForPolly`
41. Click the `Create function` button
 
 
![Imgur](https://i.imgur.com/KoD5nQP.png)


42. Scroll down to the `Function code` section, paste the following into the Text Editor (aka Cloud9 IDE):

    ```import boto3
       import os
       import uuid
       
       def lambda_handler(event, context):
           
           recordId = str(uuid.uuid4())
           voice = event["voice"]
           text = event["text"]
       
           print('Generating new DynamoDB record, with ID: ' + recordId)
           print('Input Text: ' + text)
           print('Selected voice: ' + voice)
           
           #Creating new record in DynamoDB table
           dynamodb = boto3.resource('dynamodb')
           table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
           table.put_item(
               Item={
                   'id' : recordId,
                   'text' : text,
                   'voice' : voice,
                   'status' : 'PROCESSING'
               }
           )
           
           #Sending notification about new post to SNS
           client = boto3.client('sns')
           client.publish(
               TopicArn = os.environ['SNS_TOPIC'],
               Message = recordId
           )
           
           return recordId```


43. Scroll down to the `Environment variable` section
44. Add a variable called `DB_TABLE_NAME` and set the value to `posts`
45. Add a variable called `SNS_TOPIC` and set the value to the `Topic ARN #` (step 14) 
46. Scroll down to the `Basic settings` section and set the `Description` to 
    `This function writes to the DynamoDB posts table`
47. Click the `Save` button 


### Lambda: PostReader_ConvertToAudio Function

48. Under `Services > Compute` click `Lambda`
49. In the `Lambda` sidebar, click `Functions`
50. On the `Lambda > Functions` page, click the `Create function` button
51. On the `Create function` page, set the `Name` to `PostReader_ConvertToAudio` 
52. Set the `Runtime` to `Python 2.7`
53. Set the `Role` to `Choose an existing role`
54. Set the `Existing Role` to `LambdaRoleForPolly`
55. Click the `Create function` button
56. On the `PostReader_ConvertToAudio` page in the `Designer` section add an `SNS` trigger
57. Scroll down to the `Configure triggers` section
58. Set the `SNS topic` to `new_posts`
59. Click the `Add` button
60. Click the `Save` button and then refresh the page
61. Scroll down to the `Function code` section
62. Paste the following python code into the the text editor (aka Cloud9 IDE):

    ```import boto3
       import os
       from contextlib import closing
       from boto3.dynamodb.conditions import Key, Attr
       
       def lambda_handler(event, context):
       
           postId = event["Records"][0]["Sns"]["Message"]
           
           print "Text to Speech function. Post ID in DynamoDB: " + postId
           
           #Retrieving information about the post from DynamoDB table
           dynamodb = boto3.resource('dynamodb')
           table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
           postItem = table.query(
               KeyConditionExpression=Key('id').eq(postId)
           )
           
       
           text = postItem["Items"][0]["text"]
           voice = postItem["Items"][0]["voice"] 
           
           rest = text
           
           #Because single invocation of the polly synthesize_speech api can 
           # transform text with about 1,500 characters, we are dividing the 
           # post into blocks of approximately 1,000 characters.
           textBlocks = []
           while (len(rest) > 1100):
               begin = 0
               end = rest.find(".", 1000)
       
               if (end == -1):
                   end = rest.find(" ", 1000)
                   
               textBlock = rest[begin:end]
               rest = rest[end:]
               textBlocks.append(textBlock)
           textBlocks.append(rest)            
       
           #For each block, invoke Polly API, which will transform text into audio
           polly = boto3.client('polly')
           for textBlock in textBlocks: 
               response = polly.synthesize_speech(
                   OutputFormat='mp3',
                   Text = textBlock,
                   VoiceId = voice
               )
               
               #Save the audio stream returned by Amazon Polly on Lambda's temp 
               # directory. If there are multiple text blocks, the audio stream
               # will be combined into a single file.
               if "AudioStream" in response:
                   with closing(response["AudioStream"]) as stream:
                       output = os.path.join("/tmp/", postId)
                       with open(output, "a") as file:
                           file.write(stream.read())
       
       
       
           s3 = boto3.client('s3')
           s3.upload_file('/tmp/' + postId, 
             os.environ['BUCKET_NAME'], 
             postId + ".mp3")
           s3.put_object_acl(ACL='public-read', 
             Bucket=os.environ['BUCKET_NAME'], 
             Key= postId + ".mp3")
       
           location = s3.get_bucket_location(Bucket=os.environ['BUCKET_NAME'])
           region = location['LocationConstraint']
           
           if region is None:
               url_begining = "https://s3.amazonaws.com/"
           else:
               url_begining = "https://s3-" + str(region) + ".amazonaws.com/" \
           
           url = url_begining \
                   + str(os.environ['BUCKET_NAME']) \
                   + "/" \
                   + str(postId) \
                   + ".mp3"
       
           #Updating the item in DynamoDB
           response = table.update_item(
               Key={'id':postId},
                 UpdateExpression=
                   "SET #statusAtt = :statusValue, #urlAtt = :urlValue",                   
                 ExpressionAttributeValues=
                   {':statusValue': 'UPDATED', ':urlValue': url},
               ExpressionAttributeNames=
                 {'#statusAtt': 'status', '#urlAtt': 'url'},
           )
               
           return```

63. Click the `Save` button
64. Scroll down to the `Environment variables` section
65. Add the variable `DB_TABLE_NAME` and set the value to `posts`
66. Add the variable `BUCKET_NAME` and set the value to S3 MP3 bucket name (step 7) -- for example, `mp3.bradyhouse.ninja1 
67. Click the `Save` button
68. Scroll down to the `Basic settings` section
69. Set the `Description` to `This function invokes Polly to convert text input to MP3 files.`
70. Set the `Timeout` to `5` min / `0` sec
71. Click the `Save` button


### Lambda: PostReader_GetPosts Function

72. Under `Services > Compute` click `Lambda`
73. In the `Lambda` sidebar, click `Functions`
74. On the `Lambda > Functions` page, click the `Create function` button
75. On the `Create function` page, select `Author from scratch`
76. Set the `Name` to `PostReader_GetPosts`
77. Set the `Runtime` to `Python 2.7`
78. Set the `Role` to `Choose an existing role`
79. Set the `Existing role` to `LambdaRoleForPolly`
80. Click the `Create function` button
81. On the `PostReader_GetPosts` page, scroll down to the `Function code` section
82. Paste the following python code into the text editor (aka Cloud9 IDE):

    ```import boto3
       import os
       from boto3.dynamodb.conditions import Key, Attr
       
       def lambda_handler(event, context):
           
           postId = event["postId"]
           
           dynamodb = boto3.resource('dynamodb')
           table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
           
           if postId=="*":
               items = table.scan()
           else:
               items = table.query(
                   KeyConditionExpression=Key('id').eq(postId)
               )
           
           return items["Items"]```


83. Click the `Save` button
84. Scroll down to the `Environment variable` section
85. Add the variable `DB_TABLE_NAME` and set the value to `posts`
86. Click the `Save` button
87. Scroll down to the `Basic Settings` section 
88. Set the `Description` to `This functions gets all items in the DynamoDB posts table`
89. Click the `Save` button


![Imgur](https://i.imgur.com/DokVkrh.png)


90. THE END => [Continue to Part 2](ec2-using-polly-lab-pt2.md)



##

**[Previous Lab/Lecture](ec2-serverless-webpage-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-using-polly-lab-pt2.md)** 
