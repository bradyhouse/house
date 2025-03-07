![Imgur](https://i.imgur.com/GRo5Rud.png)


Lab 102 - Creating a Billing Alarm
======

The following lab outlines how to create a billing alarm when charges on your
AWS account exceed 10$/month.  It can come up on the exams, but more then that
it is a practical concern.  AWS charges can accrue when you least expect them to,
therefore this one is a necessary precaution--**Just do it!**


## Video Link

[![Imgur](https://i.imgur.com/4Meb3zL.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/iam/e2984b70-613a-6801-3d80-6b4d4d86cd73/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.* 


### Steps

1.  login into the AWS Console
2.  Under your name (top right), click "My Billing Dashboard"
3.  Scroll down to "Alerts and Notifications"
4.  Click the "Monitor your estimated charges. Enable Now ..." link
5.  Under "Preferences" select the "Receive Billing Alerts" option
6.  Click "Save Preferences"
7.  Under Services, select "CloudWatch"
8.  In the left hand menu, select "Billing"
9.  Click the "Create Alarm" button
10. Set the "exceed" amount to 10
11. Set the "send a notification to" to your email address
12. Open your email and click the "confirm subscription" link in the AWS Notification message
13. After a minute or two, the "CloudWatch > Billing" dashboard should show your new "BillingAlarm"


## 

**[Previous Lab/Lecture](iam.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](../s3/s3.md)**

