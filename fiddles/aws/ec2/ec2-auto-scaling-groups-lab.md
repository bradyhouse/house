![Imgur](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/xyOQXiL.png" height="100" title="source: imgur.com" />


EC2 Auto Scaling Groups Lab
======

20 minute lab detailing how to create multiple EC2 instance using Auto Scaling groups.


## Video Link

[![Imgur](https://i.imgur.com/94d3P7i.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/autoscaling/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   Mac configured with [iTerm](https://iterm2.com/) and [BBEdit](http://www.barebones.com/products/bbedit/)
*   AWS Console free-tier account
*   **Complete the [EC2 Instance lab](ec2-instance-lab.md)**
*   **Complete the [EC2 Elastic Load Balancer lab](ec2-elastic-load-balancer-lab.md)**
*   **Complete the [EC2 Bash Scripting lab](ec2-instance-metadata.md)**


## Steps

### Create Health Check page

1.  Open a new file in BBEdit and paste in the following html

    ```<!DOCTYPE html>
       <html>
       <head>
         <script src="https://unpkg.com/jquery@3.1.0/dist/jquery.min.js"></script>
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/paper/bootstrap.min.css"/>
         <script>
           function load() {
             $(".time").text(new Date());
             $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function (data) {
               $(".json").text(JSON.stringify(data, null, 2));
             });
           }
       
         </script>
       </head>
       <body style="padding: 1em; background-color: #484848;" onload="load()">
       <div style="padding: 1em;" class="jumbotron">
         <h1 class="display-3">Health Check!</h1>
         <p class="lead"> The time is:&nbsp;&nbsp;<span class="time"></span></p>
         <p class="lead"><a href="http://gd.geobytes.com/GetCityDetails" target="_blank">gd.geobytes.com Get City Details</a>
           says:</p> $
         <pre class="json"></pre>
       </div>
       </body>
       </html>```

2.  Save the file as `healthcheck.html`
3.  Log into the aws console
4.  Under `Services > Storage` click `S3`
5.  Upload the `healthcheck.html` file to the website bucket you should have created as part of the [EC2 Bash Scripting lab](ec2-instance-metadata.md)


### Auto Scaling: Create Launch Configuration

6.  Under `Services > Compute` click `EC2`
7.  In the EC2 sidebar, under `AUTOSCALING` click `Launch Configurations`
8.  Click the `Create Auto Scaling group` button
9.  On the `Create Auto Scaling Group` page, click the `Create Launch configuration` button
10. On the `1. Choose AMI` page, select `Amazon Linux AMI 2017.09.1 (HVM), SSD Volume Type - ami-97785bed` 
11. On the `2. Choose Instance Type` page, select `t2.micro` (default)
12. Click the `Next: Configure details` button
13. On the `3. Configure details` page, set the `Name` field to `MyAutoScalingGroup`
14. Set the `IAM Role` field to `S3-Admin-Access`, which was created as part of the [EC2 Bash Scripting lab](ec2-instance-metadata.md)
15. Under `Advanced Details` add the following bash commands to the `User data` field

    ```#!/bin/bash
       yum update -y
       yum install httpd -y
       aws s3 cp s3://<WEBSITE BUCKET NAME> /var/www/html/ --recursive
       service httpd start
       chkconfig httpd on```
       
  **Note - If you are not paying attention, update the _<WEBSITE BUCKET NAME>_ in this block**

16. Click the `Next: Add Storage` button
17. On the `4. Add Storage` page, click the `Next: Configure Security Group` button
18. On the `5. Configure Security Group` page, select the existing `MyWebDMZ` security group, which was created as 
    part of the [EC2 Instance lab](ec2-instance-lab.md)
19. Click the `Review` button
20. On the `6. Review` page, click the `Create launch configuration` button
21. Set the `Select a key pair` to `MyEC2KeyPair` (See the [EC2 Instance Lab](ec2-instance-lab.md))
22. Click the `I acknowledge that I have access to the selected private key ...`  checkbox
23. Click the `Create launch configuration` button


### Auto Scaling: Create Auto Scaling Group

24. On the `1. Configuring Auto Scaling group details` page, set the `Group name` to `MyAutoScalingGroup`
25. Set `Group size Start with` to `3`
26. In the `Subnet` drop-down select all of listed availability zones
27. Under `Advanced Details > Load Balancing` check the `Receive traffic from Elastic Load Balancers`
28. Set the `Classic Load Balancer` field to `MyClassicELB` load balancer, which was created as 
    part of the [EC2 Elastic Load Balancer lab](ec2-elastic-load-balancer-lab.md)
29. Set the `Health Check Type` to `ELB`
30. Set the `Health Check Grace Period` to `150`

  ![Imgur](https://i.imgur.com/5z3AnSZ.png)

  
31. Click the `Next: Configure scaling policies` button
32. On the `2. Configure scaling policies` page, select `Use scaling policies to adjust the capacity of this group` option
33. Set the `Scale between range` to `1` and `5`
34. Under `Scale Group Size` click the `Scale the Auto Scaling group using step or simple scaling policies` link
35. Beside the `Execute Policy when` field click the `Add new alarm` link
36. In the `Create Alarm` pop-up, de-select the `Send a notification to ...` option
37. Set the `CPU Utilization >=` limit  to `90` percent

  ![Imgur](https://i.imgur.com/M3QkvXw.png)
  

38. Click the `Create Alarm` button
39. Under `Scale Group Size`, set the `Take the action` to `Add 1 instances`
40. Set `Instances need` to `300` 
41. Now, disable these options by selecting the `Keep this group at its initial size` flag (_doh!_)   
42. Click the `Next: Configure Notifications` button
43. On the `3. Configure Notifications` page, set the `Send a notification to` field to `SystemOpsTeam`
44. Set the `With these recipients` to your personal email address
45. Click the `Next: Configure Tags` button
46. Enter two tags -- For example `StaffId 123445`, `Department DevTeam`
47. Click the `Review` button
48. On the `5. Review` page click the `Create Auto Scaling group` button and then the `close` button

  ![Imgur](https://i.imgur.com/jWOU1R3.png)


### Get the Public DNS Name

49. Under `Services > Compute` click `EC2`
50. In the `EC2` sidebar, under `LOAD BALANCING` click `Load Balancers`
51. Select the `MyClassicELB` load balancer
52. In the description tab, copy the `DNS Name` address

  ![Imgur](https://i.imgur.com/PU00kfF.png)

53. Open a new tab in your web browser and paste in the address + `/healthcheck.html`

  ![Imgur](https://i.imgur.com/wcBTGGX.png)
  

### Simulate Zone Failure

54. Under `Services > Compute` click `EC2` 
53. In the `EC2` sidebar, under `INSTANCES` click `Instances`
54. Select 2 of the instances
55. Click `Actions > Instances State > Terminate`
56. In the `Terminate Instances` pop-up click the `Yes, Terminate` button
57. Go back to the `healthcheck` page (tab), and reload the page -- no disruption in service
58. Go back to the `EC2` instances dashboard and watch what happens after 10 minutes


### Clean Up

59. Under `Services > Compute` click `EC2` 
60. In the `EC2` sidebar, under `AUTO SCALING` click `Auto Scaling Groups`
61. Select the `MyAutoScalingGroup` group
62. Click `Actions > Delete`
63. In the `Delete Auto Scaling group` pop-up, click the `Yes, Delete` button
64. The End 


## Exam Tips

What did we learn? _N/A_ The lecture did not include any `Exam Tip` bullets. However, here is
`what I learned`:

* One EC2 instance just won't do because Availability Zones can go down
* To create an auto scaling group, you begin with a launch configuration
  * A Launch configuration is your template EC2 instance for the group
* A subnet is an availability zone
* When configuring an autoscaling group, always select all available subnets
* An S3 bucket and several bash commands is all you need to automate the instance provisioning process
* An auto scaling group cannot be deleted by simply terminating the instances
  * Terminating the instances simulate a zone failure and triggers the creation of new instances


### Review Questions

1.  Why shouldn't you use a single EC2 instance to host a website?
2.  What is a launch configuration?
3.  What is necessary to configure an AutoScaling group with elastic load balancing 
    that is provisioned via S3 bucket to host a static website?
4.  After configuring and auto scaling group with elastic load balancing, how do you obtain
    the public DNS address?
5.  Why can't you delete an auto scaling group by simply terminating all of the instances?


### Answers

1.  Because availability zones can go down
2.  An Auto Scaling group's EC2 configuration template
3.  (1) an S3 bucket containing the index.html; (2) S3 IAM Access Role;
    (3) Elastic Load balancing group, (4) bash provisioning routine; (5) Security Group defining inbound
    traffic rules
4.  `Services > Compute > EC2 > LOAD BALANCING > Load Balancers`
5.  It simulates an availability zone failure resulting in the creation of more instances

##

**[Previous Lab/Lecture](ec2-instance-metadata.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-auto-scaling-groups-lab.md)** 
