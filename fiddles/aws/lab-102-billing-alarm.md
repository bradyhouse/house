Lab 102 - Creating a Billing Alarm
======

The following lab outlines how to create a billing alarm when charges on your
AWS account exceed 10$/month.  It is not part of certification exam prep.  However,
as AWS charges can accrue when you least expect them to, the exercise is a necessary
precaution--**Just do it!**


Recipe
====

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


