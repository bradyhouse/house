![Imgur](https://i.imgur.com/VcdZTNZ.png)


CloudFront - Create a Distribution
======

Lab outlining how to use AWS to create a CloudFront "distribution" (aka CDN) from an S3 bucket.


## Video Link

[![Imgur](https://i.imgur.com/ZB4PgKp.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/storage/cloudfront-create-cdn/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


### Steps

1.  Login to the AWS console
2.  Note your region - "N. Virginia"
3.  Open S3
4.  Click the "Create bucket" button
5.  Set the "Name" to "{username}-distant-dist"
6.  Set the "Region" to the farthest possible region from your current. For example, "Asia Pacific (Sydney)"
7.  Click "Create" 
8.  Select the newly created bucket and upload an image and enable public read permissions
  * Note the name of the file, for example "aws-overview.png"
9.  Click "Services"
10. Under "Networking and Content Delivery", click "CloudFront"
11. Click the "Create Distribution" button
12. Under "Web" click the "Get Started" button
13. In the "Create Distribution" set the "Origin Domain Name" to "{username}-distant-dist.s3.amazonaws.com"
14. Leave the "Origin Path" blank
15. Set the "Origin Id" to "S3-{username}-distant-dist" (default)
16. Set "Restrict Bucket Access" to "Yes"
17. Set "Origin Access Identity" to "Create a New Identity" (default)
18. Set "Grant Read Permissions on Bucket" to "Yes, Update Bucket Policy"
19. Scroll down to the "Default Cache Behavior Settings" section
20. Set "Viewer Protocol Policy" to "Redirect HTTP to HTTPS"
21. Leave everything else default
22. Scroll to the bottom and click "Create Distribution"
23. Click the "Distrubtions" link in the left sidebar

![Imgur](https://i.imgur.com/i4zkNdv.png)

24. Wait (15-20 mins) for the "status" to change to "Deployed"
25. Open S3
26. Open the "{username}-distant-dist"
27. Click on the uploaded image
28. Click the "Permissions" tab
29. Under "Public Access" click "Everyone"
30. Deselect "Read object" and click "Save"

![Imgur](https://i.imgur.com/KItd6wT.png)

31. Click the "Overview" tab
32. Click the link for the Image file
33. Verify that you get an error

![Imgur](https://i.imgur.com/kmvg5Pv.png)

34. Open CloudFront
35. Click the ID link for the new distribution
36. Copy the domain name and add the name of your uploaded image (8)
37. Open a new web browser window and paste the URL (36) into address field
38. Verify that the image is accessible via CloudFront
39. In CloudFront, select the new distribution and click "Disable"
40. Wait (15-20 mins) until the status changes to "Disabled"
41. Select the distribution and click "Delete"


### Review Questions

1.  What are the 2 types of distributions?
2.  What is the Origin Path used for?
3.  Why would you "Restrict Bucket Access" on a distribution?
4.  Why should you create an "Origin Access Identity" and allow Bucket Policy update for a new distribution?
5.  If you set the "Viewer Protocol Policy" to "HTTPS Only" what happens to "HTTP" users?
6.  What HTTP methods does CloudFront allow?
7.  What unit of time is TTL measured in?
8.  What is the default Maximum TTL?
9.  What is the default Minimum TTL?
10. What is the default "Default TTL"?
11. **Exam Question**: How do you secure CloudFront?
12. What does WAF stand for? Is covered on any exam?
13. Is the ID of a distribution different from the "Domain Name"?
14. Can a distribution have multiple origins?
15. **Exam Question**: What are two types of Geo-Restrictions can you configure on a distribution?
16. How do you remove files from a distribution?
17. What is an alternative approach to invalidation for S3 bucket origins?


### Answers

1.  Web and RTMP
2.  To point to a subdirectory within your S3 bucket
3.  To prevent people from accessing the S3 bucket directly
4.  You will have to manually update the Bucket's Policy
5.  They get an error
6.  GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
7.  seconds
8.  365 days (31536000 s)
9.  0
10. 24 hours (86400 s)
11. Signed Urls or Signed Cookies 
12. Web Application Firewall, No
13. Yes
14. Yes
15. White List or Black List
16. Create an Invalidation
17. Versioning


##

**[Previous Lab/Lecture](cloudfront.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](cloudfront-exam-tips.md)** 
