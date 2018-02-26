![Imgur](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/CcwL2Ph.png" width="100" title="source: imgur.com" />


EC2 CloudWatch Lab
======

Lab detailing how to configure a dashboard and alarm in CloudWatch to monitor CPU Utilization of an EC2 instance.


## Video Link

[![Imgur](https://i.imgur.com/7HFLiJe.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/cloudwatch/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   Mac configured with iTerm
*   AWS Console free-tier account
*   *Complete the [EC2 Instance Lab](ec2-instance-lab.md)*


## Steps

### Create a Dashboard

 1.   Log into the AWS Console and note your region -- Example `US East (N. Virginia)`
 2.   Click `Services > Storage > EC2`
 3.   In the EC2 sidebar, click `INSTANCES > Instances`
 4.   Select the `MyWebServer` instance
 5.   If it is not running, then click `Actions > Instance State > Start` and in the `Start Instance` pop-up click
      the `Yes, Start` button   
 6.   Click `Services > Management Tools > CloudWatch`
 7.   In the CloudWatch sidebar, click `Dashboards`
 8.   Click `Create Dashboard`
 9.   In the pop-up, enter the name `MyWebServer` and click the `Create Dashboard`
 10.  Select the `Text` widget and click the `Configure` button
 
  ![Imgur](https://i.imgur.com/qABzEmO.png)
    
 11.  In the `New Text widget` form, enter the the following:
 
  ![Imgur](https://i.imgur.com/H1sSVpK.png)
 
 12.  Click the `Create widget` button
 13.  In the `Dashboards > MyWebServer` click the `Add widget` button
 14.  In the `Add to this dashboard` pop-up, select the `Line` widget and click the `Configure` button
 15.  In the `All metrics` tab click the `EC2` button
 16.  Click the `Per-Instance Metrics` button
 17.  Select the `CPUUtilization` metric for `MyWebServer`
 
  ![Imgur](https://i.imgur.com/7CQ04JV.png)
    
 18.  Click the `Create widget` button
 19.  In the `Dashboards > MyWebServer` click the `Add widget` button
 20.  In the `Add to this dashboard` pop-up, select the `Stacked Area` widget and click the `Configure` button
 21.  In the `All metrics` tab click the `EC2` button
 22.  Click the `Per-Instance Metrics` button
 23.  Select the `CPUUtilization` metric for `MyWebServer`
 24.  Select the `CPUCreditUsage` metric for `MyWebServer`
 25.  Click the `Create widget` button
 26.  In the `Dashboards > MyWebServer` click the `Add widget` button
 27.  In the `Add to this dashboard` pop-up, select the `Number` widget and click the `Configure` button 
 28.  In the `All metrics` tab click the `EC2` button
 29.  Click the `Per-Instance Metrics` button
 30.  Select the `CPUUtilization` metric for `MyWebServer`
 31.  Click the `Create widget` button
 
  ![Imgur](https://i.imgur.com/7qbBSjg.png)
    
 
 ### Create an Alarm
 
 32.  In the CloudWatch sidebar, click `Alarms`
 33.  Click the `Create Alarm` button
 34.  In the `Create Alarm` popup, under `EC2 Metrics` click the `Per-Instance Metrics` link
 35.  In the `EC2 > Per-Instance Metrics` list, select the `CPUUtilization` metric for `MyWebServer`  
   
  ![Imgur](https://i.imgur.com/3Z92WzA.png)
 
 36.  Click the `next` button
 37.  Set the name to `CPUUtilization`
 38.  Set the description to `My CPU is going over 80%` 
 39.  Set `>=` value to `80`
 40.  Under the `Send notification to` drop-down click the `New list` link
 41.  Set the `topic` to `CPUUtilization`
 42.  In the `Email list` enter your email
 
  ![Imgur](https://i.imgur.com/VYA5572.png)
 
 43.  Click the `Create Alarm` button
 
  ![Imgur](https://i.imgur.com/l0RZDe5.png)
 
 44.  Log into your email
 45.  Open the `AWS Notification - Subscription Confirmation` message and click the `Confirm Subscription` link
 46.  Return to the AWS Console window
 47.  In the `Confirm new email addresses` pop-up click the `View alarm` button
 
  ![Imgur](https://i.imgur.com/r4BBD25.png)
    
 48.  The end 
 
 
 ### Clean Up
 
 49. Go into EC2 instances and stop `MyWebServer`
  
   
## Exam Tips

What did we learn?

* Standard monitoring = 5 Minutes
* Detailed monitoring = 1 Minute
* What can you do with Cloudwatch?
  * `Dashboards` - Creates awesome dashboards to see what is happening with your AWS environment
  * `Alarms` - Allows you to set Alarms that notify you when particular thresholds are hit
  * `Events` - CloudWatch Events helps you to respond to state changes in your AWS resources
  * `Logs` - CloudWatch Logs helps you to aggregate, monitor, and store logs


### Review Questions

1.  What the difference between CloudWatch and CloudTrail?
2.  What is the standard monitoring time interval?
3.  What is the detailed monitoring time interval?
4.  What are the four types of monitors offered by CloudWatch?


### Answers

1.  CloudWatch is for monitoring. CloudTrail is for auditing.
2.  5 minutes
3.  1 minute
4.  Dashobards, Alarms, Events and Logs


##

**[Previous Lab/Lecture](ec2-elastic-load-balancer-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-commandline-lab.md)** 
