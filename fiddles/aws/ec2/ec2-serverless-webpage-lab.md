![AWS Elastic Compute Cloud](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/7MCFLgi.png" height="100" title="API Gateway" /> <img src="https://i.imgur.com/Zjwx7ca.png" height="100" title="AWS Lambda" />


EC2 Serverless Webpage Lab
======

18 minute lab detailing how to host a web page using API Gateway and Lambda. 


## Video Link

[![Imgur](https://i.imgur.com/aCrjbbn.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/e4d57fc6-3a48-c827-fe30-aed6c1bc6051/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Big Picture

![Imgur](https://i.imgur.com/VXo5zzI.png)


## Prerequisites

*   Mac configured with [iTerm](https://iterm2.com/) and [BBEdit](http://www.barebones.com/products/bbedit/)
*   AWS Console free-tier account

    

## Steps

### Create a Lambda Function

1.  Log into the AWS Console
2.  Under `Services > Compute` click `Lambda`
3.  Click the `Create function` button
4.  On the `Create function` page, set the `Name` to `myServerlessWebpage`
5.  Set `Runtime` to `Python 3.6`
6.  Under `Role` select `Create a new role from template(s)` 
7.  Set the `Role Name` to `myLambdaExeRole`
8.  Under `Policy templates` select `Simple Microservice permissions`
9.  Click the `Create function` button
10. In the `myServelessWebpage` Configuration page, scroll down to `Function code` section
11. Paste the following code block into the `lambda_function.py` editor

      ```def lambda_handler(event, context):
             print("In lambda handler")
             
             resp = {
                 "statusCode": 200,
                 "headers": {
                     "Access-Control-Allow-Origin": "*",
                 },
                 "body": "fiddle.sh"
             }
             
             return resp```

12. Click the `Save` button
13. Under `Add triggers` select `API Gateway`
14. Under `Configure triggers > API` select `Create a new API`
15. Set `API Name` to `LambdaMicroservice`
16. Set `Deployment stage` to `prod`
17. Set `Security` to `AWS IAM`
18. Click the `Add` button
19. Click the `Save` button


![Imgur](https://i.imgur.com/Jccr0tU.png)


### API Gateway: Create GET Method

20. Under `API Gateway` click the `LambdaMicroservice` link
21. On the `API Gateway > APIs>LambdaMicroservice (kzkypxmyr5)>Resources>/myServerlessWebpage > ANY` page,  
    click `Actions > Delete Method`
22. In the `Delete Method` pop-up, click the `Delete` button
23. Click `Actons > Create Method`, select `GET` and click the checkmark button
24. Set the `Integration type` to `Lambda Function`
25. Check the `Use Lambda Proxy integration` flag
26. Set the `Lambda region` to match your current region -- for example, if you are N. Virginia, select `us-east-1`
27. Set the `Lambda function` to `myServerlessWebpage`
28. Leave the `Use Default Timeout` flag checked (default)
29. Click the `Save` button
30. In the `Add Permission to Lambda Function` pop-up, click the `OK` button 


![Imgur](https://i.imgur.com/hS6MuJM.png)


### API Gateway: Deploy API

31. On the `API Gateway > APIs>LambdaMicroservice (kzkypxmyr5)>Resources>/myServerlessWebpage > GET` page,
    click `Actions > Deploy API`
32. In the `Deploy API` pop-up, set the `Deployment stage` to `prod`
33. Set the `Deployment description` to `Hello world deployment` 
34. Click the `Deploy` button
35. In the `Stages` tree, expand the `/myServerlessWebpage` and select `GET` method
36. Copy the `Invoke URL` link address 
  * _Note - You will need for this later. So you may want to paste to a temporary location_
37. Open a new tab in your web browser and paste the address
38. Verify that the page loads and displays the text `fiddle.sh`


![Imgur](https://i.imgur.com/0mWM67F.png)


### Create a Web Page

39. Open a new file in BBEdit and paste in the following html

    ```<!DOCTYPE html>
       <html lang="en">
       <head>
       	<meta charset="utf-8">
       	<meta http-equiv="X-UA-Compatible" content="IE=edge">
       	<meta name="viewport" content="width=device-width, initial-scale=1">
       	<title>AWS Serverless Webpage</title>
       	<link href="https://bootswatch.com/4/darkly/bootstrap.min.css" rel="stylesheet">
       	<script>
       
       function getRequest() {
       	let urlField = document.getElementById('urlTextBox'),
       		url = urlField.value,
       		xhttp;
       	
       	if (url) {
       		xhttp = new XMLHttpRequest();
           	xhttp.onreadystatechange = function() {
               	if (this.readyState == 4 && this.status == 200) {
               	document.getElementById("responseText").innerHTML = this.responseText;
               	}
       	    };
           	xhttp.open("GET", url, true);
           	xhttp.send();
       	} else {
       		window.alert('Please enter an URL');
       	}
       }
       
       </script>
       
       </head>
       <body>
       <div class="jumbotron">
         <h1 class="display-3">Hello Serverless!</h1>
         <p class="lead">Enter your API's GET Method URL and click Test</p>
         <hr class="my-4">
         <input type="text" class="form-control" id="urlTextBox" placeholder="GET URL">
         <hr class="my-4">
         <p class="lead">
       	<button type="button" onclick="getRequest()" class="btn btn-primary">Test</button>
         </p>
       </div>
       
       <hr/>
       
       <pre id="responseText"></pre>
       
       
       </body>
       </html>
    ```
    
38. Save the file as `index.html`
39. Exit BBEdit


### S3: Create a Bucket

40. Go back to the AWS Console
41. Under `Services > Storage` click `S3`
42. Click the `Create bucket` button
43. Set the `Bucket name` to `<username>-serverless-website` -- for example: `bradyhouse-serverless-website`
44. Leave everything else default and click the `Create` button
45. On the S3 page, click the `<username>-serverless-website` link for the new bucket
46. Click the `Upload` button
47. In the `Upload` pop-up, click the `Add files` button and select the newly created `index.html` file
48. Click the `Next` button
49. Set the `Manage public permissions` to `Grant public read access to this object(s)`
50. Click the `Upload` button


![Imgur](https://i.imgur.com/8anP3ZP.png)
    

### Test it Out

51. On the `S3 > <username>-serverless-website` page, select the `index.html` file
52. In the properties panel click the public `Link` 


![Imgur](https://i.imgur.com/wFnuMmT.png)


53. In the `GET URL` textbox, paste the `API Gateway GET Method` URL you saved earlier (step 36)
54. Click the `Test` button
55. Verify that the title of the page changes to `fiddle.sh`


![Imgur](https://i.imgur.com/UIG5rLh.png)


## Exam Tips

What did we learn? 

    TBW
    

### Review Questions

1.  Why does a lambda function require a security role?
2.  In API Gateway, why should you delete the default `ANY` method?
    

### Answers

1.  Rule of least permissions
2.  Violates the rule of least permissions for HTTP request--ie `ANY` are allowed


##

**[Previous Lab/Lecture](ec2-lambda.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-serverless-webpage-lab.md)** 
