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

* Mac configured with [iTerm](https://iterm2.com/) and [BBEdit](http://www.barebones.com/products/bbedit/)
* AWS Console free-tier account
* Complete [Using Polly To Pass Your Exam Lab (Part 1)](ec2-using-polly-lab-pt1.md)
* Complete [Serverless Webpage Lab](ec2-serverless-webpage-lab.md)       

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
59. Select the `mp3-writer.<username>.ninja` bucket, which was created in [part 1](ec2-using-polly-lab-pt1.md2)
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
       
  *Replace the BUCKET_NAME with the name of your bucket. For example `mp3-writer.bradyhouse.ninja`* 

63. Click the `Save` button
64. Click the `Amazon S3` link
65. Verify that the `mp3-writer.<username>.ninja` bucket is now listed as `public`

![Imgur](https://i.imgur.com/maKJEBl.png)


### S3: Modify and Upload the index.html

66. Open a new file using BBEdit
67. Paste the following HTML into the editor:

      ```<html>
           <head><title>MP3 Writer</title>
             <script language="javascript">var API_ENDPOINT = "API GATEWAY DEV URL";</script>
         	 <link rel="stylesheet" href="https://bootswatch.com/4/sketchy/bootstrap.min.css">
           </head>
           <body>
           	<div class="jumbotron">
         		<h1 id="headline" class="display-3">MP3 Writer</h1>
         		  <hr class="my-4">
         
           <div class="form-group">
               <label for="postText">Input Text:</label>
               <textarea id="postText" class="form-control" style="width: 100%; height: 10em;"></textarea>
               <span id="postIDreturned"></span>
           	  <span id="charCounter" style="float:right;">Characters: 0</span>
         	</div>
         	  Voice:
         
               <select id="voiceSelected" class="form-control"  >
                 <option value="Ivy">Ivy [English - American]</option>
                 <option value="Joanna">Joanna [English - American]</option>
                 <option value="Joey">Joey [English - American]</option>
                 <option value="Justin">Justin [English - American]</option>
                 <option value="Kendra">Kendra [English - American]</option> 
                 <option value="Kimberly">Kimberly [English - American]</option>
                 <option value="Salli">Salli [English - American]</option>
                 <option value="Nicole">Nicole [English - Australian]</option>
                 <option value="Russell">Russell [English - Australian]</option>
                 <option value="Emma">Emma [English - British]</option>
                 <option value="Brian">Brian [English - British]</option>
                 <option value="Amy">Amy [English - British]</option>
                 <option value="Raveena">Raveena [English - Indian]</option>        
                 <option value="Geraint">Geraint [English - Welsh]</option>
                 <option value="Ricardo">Ricardo [Brazilian Portuguese]</option>
                 <option value="Vitoria">Vitoria [Brazilian Portuguese]</option>
                 <option value="Lotte">Lotte [Dutch]</option>
                 <option value="Ruben">Ruben [Dutch]</option>
                 <option value="Mathieu">Mathieu [French]</option>
                 <option value="Celine">Celine [French]</option>
                 <option value="Chantal">Chantal [Canadian French]</option>
                 <option value="Marlene">Marlene [German]</option>
             	<option value="Dora">Dora [Icelandic]</option>
             	<option value="Karl">Karl [Icelandic]</option>
                 <option value="Carla">Carla [Italian]</option>
                 <option value="Giorgio">Giorgio [Italian]</option>
                 <option value="Mizuki">Mizuki [Japanese]</option>
                 <option value="Liv">Liv [Norwegian]</option>
                 <option value="Maja">Maja [Polish]</option>
                 <option value="Jan">Jan [Polish]</option>
             	<option value="Ewa">Ewa [Polish]</option>
             	<option value="Cristiano">Cristiano [Portuquese]</option>
                 <option value="Ines">Ines [Portuquese]</option>
                 <option value="Carmen">Carmen [Romanian]</option>
                 <option value="Maxim">Maxim [Russian]</option>
                 <option value="Tatyana">Tatyana [Russian]</option>
                 <option value="Enrique">Enrique [Spanish]</option>
                 <option value="Penelope">Penelope [US Spanish]</option>
                 <option value="Enrique">Miguel [US Spanish]</option>
                 <option value="Conchita">Conchita [Castilian Spanish]</option>
                 <option value="Astrid">Astrid [Swedish]</option>
                 <option value="Filiz">Filiz [Turkish]</option>
                 <option value="Gwyneth">Gwyneth [Welsh]</option>
         
                 
               </select>
         	  <br />	
               <input type="submit" value="Create MP3" id="sayButton" class="btn btn-secondary">
         	 
         	 		  <hr class="my-4">
         
         	 <div class="form-group">
               <label for="postId">Id:</label>
               <input type="text" class="form-control" id="postId" placeholder="*" value="*" > 
               <br />
               <input type="submit" class="btn btn-secondary right" value="Search" id="searchButton">
             </div>
         
         
               <table id="posts" class="table table-hover">
                 <colgroup>
                   <col style="width:10%">
                   <col style="width:7%">
                   <col style="width:45%">
                   <col style="width:8%">
                   <col style="width:30%">
                 </colgroup>
                 <tbody>
                   <tr class="table-active">
                     <th>Post ID</th>
                     <th>Voice</th>
                     <th>Post</th>
                     <th>Status</th>
                     <th>Player</th>
                   </tr>
                 </tbody>
               </table>
         	</div>
             <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js"></script>    
             <script language="javascript">
             	$(document).ready(function () {
         
         			var onSearch = function() {
         		let postId = $('#postId').val();
         		$.ajax({
         				url: API_ENDPOINT + '?postId='+postId,
         				type: 'GET',
         				success: function (response) {
         
         					$('#posts tr').slice(1).remove();
         
         	        jQuery.each(response, function(i,data) {
         
         						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"
         
         						if (typeof data['url'] === "undefined") {
         	    				var player = ""
         						}
         
         						$("#posts").append("<tr> \
         								<td>" + data['id'] + "</td> \
         								<td>" + data['voice'] + "</td> \
         								<td>" + data['text'] + "</td> \
         								<td>" + data['status'] + "</td> \
         								<td>" + player + "</td> \
         								</tr>");
         	        });
         				},
         				error: function () {
         						alert("error");
         				}
         		});
         	};
         
         			document.getElementById("sayButton").onclick = function(){
         
         	var inputData = {
         		"voice": $('#voiceSelected option:selected').val(),
         		"text" : $('#postText').val()
         	};
         
         	$.ajax({
         	      url: API_ENDPOINT,
         	      type: 'POST',
         	      data:  JSON.stringify(inputData)  ,
         	      contentType: 'application/json; charset=utf-8',
         	      success: function (response) {
         					document.getElementById("postIDreturned").textContent="Post ID: " + response;
         					document.getElementById("postId").value=response;
         					window.setTimeout(() => {
         						onSearch();
         					}, 1000);
         	      },
         	      error: function () {
         	          alert("error");
         	      }
         	  });
         };
         
         
         			document.getElementById("searchButton").onclick = function(){
         	onSearch()
         };
         
         			document.getElementById("postText").onkeyup = function(){
         	var length = $(postText).val().length;
         	document.getElementById("charCounter").textContent="Characters: " + length;
         };
         			
         			window.setTimeout(()=>{
         				onSearch();
         			}, 1000);
         	    });    
             </script>
         	<script src="https://bootswatch.com/_vendor/bootstrap/dist/js/bootstrap.min.js"></script>
           </body>
         </html>
      ```
      
67. In line 3 of this, update the `API GATEWAY DEV URL` value with the API `Invoke URL` recorded earlier (step 53)
68. Save the file as `index.html` and close BBEdit
69. Return to the AWS Console
70. Under `Services > Storage` click `S3`
71. Select the `mp3-writer.<username>.ninja` bucket, which was created in [part 1](ec2-using-polly-lab-pt1.md2)
72. Click the `Upload` button
73. In the `Upload` pop-up, select the `index.html` file 
74. Click the `upload` button


![Imgur](https://i.imgur.com/UEQt4nt.png)


### S3: Configure as a Static Website

75. Under `Services > Storage` click `S3`
76. Select the `mp3-writer.<username>.ninja` bucket, which was created in [part 1](ec2-using-polly-lab-pt1.md2)
77. On the `Amazon S3 > mp3-writer.<user-name>.ninja` page, click the `Properties` tab
78. On the `Properties` page, click the `Static website hosting` option
79. In the `Static website hosting` pop-up, set the `Index document` to `index.html`
80. Set the `Error document` to `index.html`
81. Click the `Save` button


![Imgur](https://i.imgur.com/7oPqIEv.png)


### Route 53: Create a Record Set

82. Under `Services > Network & Content Delivery` click `Route 53`
83. On the `Route 53` dashboard page in the sidebar, click the `Hosted zones` link
84. On the `Route 53` hosted zone page, select `<username>.ninja` domain, which was created in the [Severless Webpage Lab](ec2-serverless-webpage-lab.md)
85. On the `Record Set` details page, click the `Create Record Set` button
86. In the `Create Record Set` panel, set the Name to `mp3-writer.<user-name>.ninja`. 
    For example: `mp3-writer.bradyhouse.ninja`    
87. Set the `Alias` option to `Yes`
88. In the `Alias Target` field, select `mp3-writer.<username>.ninja` bucket


![Imgur](https://i.imgur.com/BQBbhuq.png)


89. Click the `Create` button


### Moment of Truth -- Test Drive

90. Open a new browser tab, and navigate to `mp3-writer.<user-name>.ninja`. If everything worked
    correctly, it should look like this:
    
    
![Imgur](https://i.imgur.com/woo54Pu.png)  
    

##

**[Previous Lab/Lecture](ec2-serverless-webpage-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-using-polly-lab-pt2.md)** 
