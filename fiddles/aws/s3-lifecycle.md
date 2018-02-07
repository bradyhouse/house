![Imgur](https://i.imgur.com/M32RGmj.png)


S3 Life Cycle Management
======

How to configure lifecycle rules on an S3 bucket.


### Steps

1.  Log into the AWS console
2.  Navigate to S3 
3.  Create a new bucket called "<yourname>-lifecycle" with versioning enabled and default permissions
4.  In the S3 dashboard, select the new bucket
5.  Goto the management tab
6.  Click the "Add lifecycle rule" button
7.  Set the name to "MyLifecycleRule"
8.  Click the "Next" button
9.  Under "Configure transition", select "Current version"
10. Click the "Add Transition" link
11. Under "Object creation", select "Transition to Standard-IA after"
12. Under "Days after object creation" enter "30" (default)
13. Click the "Add Transition" link
14. Under "Object creation", select "Transition to Amazon Glacier after"
15. Under "Days after object creation", enter "60" (default)
16. Under "Configure transition", select "Previous Version
17. Scroll down to the "For previous versions of an object" section
18. Repeat steps 10-15

![Imgur](https://i.imgur.com/ieBnrDQ.png)

19. Click "Next" button
20. Under "Configure expiration", select "Current version" and "Previous version"
21. Select "Expire current version of Object" and set the "After" field to 425 days (default)
22. Select "Permanently delete previous version" and set the "After" field to 425 days (default)

![Imgur](https://i.imgur.com/iKl0LpA.png)

23. Click "Next"
24. Click "Save"


### Review Questions

1.  Is Glacier available in every region?
2.  What is the minimum file size in order for it to "transition"?
3.  What does S3-IA stand for?
4.  What is the default transition time from S3 to S3-IA?
5.  What is the default transition time from S3-IA to Glacier?
6.  What is the default expiration period for current and previous versions?
7.  Can lifecycle management be used in conjunction with versioning?
8.  What versions of an object can life cycle management rules be applied to?
9.  What 3 actions can be established using life cycle management rules?
10. What is the minimum time period for configuring a transition?


### Answers

1.  No.
2.  More than 128K
3.  Simple Storage Service Infrequently Accessed
4.  30 days
5.  60 days
6.  425 days
7.  Yes
8.  Current and Previous versions
9.  Transition to IA,  Transition to Glacier, Permanently delete
10. 30 days to IA, and 30 days to Glacier after IA (if relevant)

  
  
     
