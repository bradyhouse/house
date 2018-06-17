<img src="https://i.imgur.com/O74efH0.png" height="100" title="WordPress" />

WordPress AMI  Lab
======

  
   
## Video Link

[![acloud.guru lecture](https://i.imgur.com/A9am9uq.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/wordpress/e4b323c8-5870-53e0-c9c4-81b71dc3806b/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   AWS Console free-tier account
*   Mac configured with iTerm
*   Complete the [WordPress CloudFront Lab](wp-cloudfront-lab.md)

 
## Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/ytDNe6P.png" width="300" title="Big Picture" />
</td>
</tr>
</table>


## ALB: Remove MyEC2WebServer from Target Group

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `LOAD BALANCING`, click the `Target Groups` link
4.  Select the `MyELB` target group
5.  In the `Targets` tab, click the `Edit` button
6.  Select the `MyEC2WebServer` EC2 instance
7.  Click the `Remove` button
8.  Click the `Save` button


## ELB: Create Write Load Balancer

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `LOAD BALANCING`, click the `Load Balancers` link
4.  Click the `Create Load Balancer` button
5.  Under the `Classic Load Balancer`, click the `Create` button
6.  Configure the load balancer with the following customized properties:

  * Load Balancer Name:   `WP-WRITE-ELB`
  * Security Group:       `WEB-DMZ`
  * Interval:             6
  * Healthy threshold:    3
  * EC2 Instance:         `MyEC2WebServer`
  * Tags > Name:          `WP-WRITE-ELB`


## Route53: Create Write Alias Record Set

1.  Log into the AWS Console
2.  Under `Networking & Content Delivery`, click the `Route 53` link
3.  In the `Route53` sidebar, click the `Hosted Zones` link
4.  Click the `<domain name>`, which was created in the [WordPress Setup Lab](wp-setup-lab.md)
5.  Click the `Create Record Set` button
6.  Configure the record set with the following custom properties:

  * Name:                 `write`
  * Alias:                `Yes`
  * Alias Target:         `dualstack.WP-WRITE-ELB-*.us-east-1.elb.amazonaws.com`


## EC2: Stop the WP Server Instance

1.  Log into the AWS Console
2.  Under `Compute`, click the `EC2` link
3.  In the EC2 sidebar under `INSTANCES` click the `Instances` link
4.  Select the `MyEC2WebServer` instance and stop it


## AMI: Create a WP Write Image

1.  Log into the AWS Console
2.  Under `Compute`, click the `EC2` link
3.  In the EC2 sidebar under `INSTANCES` click the `Instances` link
4.  Select the `MyEC2WebServer` instance 
5.  Click `Actions > Image > Create Image`
6.  Configure the Image with the following custom properties:

  * Image Name:           `WP-IMAGE`
  * Image Description:    `WP-IMAGE`
  

## EC2: Rename and start the Write Instance

1.  Log into the AWS Console
2.  Under `Compute`, click the `EC2` link
3.  In the EC2 sidebar under `INSTANCES` click the `Instances` link
4.  Rename the `MyEC2WebServer` instance `WRITE.<DOMAIN NAME>`
5.  Start the instance


## WP: Update URL Settings

1.  Log into your word press app -- <domain name>/wp-login.php
2.  In the Admin sidebar click `Settings`
3.  Set the `WordPress Address (URL)` to `write.<domain name>`
4.  Set the `Site Address (URL)` to `<domain name>`
5.  Click the `Save Changes` button


## ALB: Remove the Write EC2 Instance

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `LOAD BALANCING`, click the `Target Groups` link
4.  Select the `MyELB` target group
5.  In the `Targets` tab, click the `Edit` button
6.  Select the `WRITE.<DOMAIN NAME>` EC2 instance
7.  Click the `remove` button
8.  Click the `Save` button


## Web Browser: Verify Write Domain

1.  Open a web a browser and navigate to `write.<domain name>.com`

<table>
<tr>
<td>
 <img src="https://i.imgur.com/wf9GygS.png" width="300" title="write domain test" />
</td>
</tr>
</table>


## AMI: Launch Primary Image

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `IMAGES`, click the `AMIs` link
4.  Select the `WP-WRITE-IMAGE` AMI
5.  Click the `Launch` button
6.  Configure the following EC2 options:

  * Instance Type:  t2.micro
  * IAM Role:       MyS3AdminAccess
  * Name:           <DOMAIN NAME> (for example `ICURMT.COM`)
  * Security Group: WEB-DMZ


## SSH: Configure Primary Instance Cron Jobs

1.  SSH into the new EC2 instance, for example `ICURMT.COM`
2.  Open the `/etc/crontabs` and remove the following lines:

    ````
    */5 * * * * root aws s3 sync --delete /var/www/html/wp-content/uploads s3://<domain name>-wp-media-2018
    */5 * * * * root aws s3 sync --delete /var/www/html s3://<domain name>-wp-2018

    ````
3.  Add the following lines:

    ````
    */5 * * * * root aws s3 sync --delete s3://<domain name>-wp-media-2018 /var/www/html/wp-content/uploads 
    */5 * * * * root aws s3 sync --delete s3://<domain name>-wp-2018 /var/www/html

    ````
4.  Restart the crond service:

    service crond restart


## ALB: Add Primary Instance to Target Group

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `LOAD BALANCING`, click the `Target Groups` link
4.  Select the `MyELB` target group
5.  In the `Targets` tab, click the `Edit` button
6.  Select the `<DOMAIN NAME>` EC2 instance
7.  Click the `Add to registered` button
8.  Click the `Save` button


## WP: Image Upload Test

1.  Navigate to `write.<DOMAIN NAME>.com/wp-login.php` and enter your credentials
2.  Upload an image to the hello world post and save the changes
3.  Navigate to the `<DOMAIN NAME>`, scroll down and verify that the change is reflected
4.  Right-click the image and select `Open Image in new tab`
5.  Verify that the URL is targeting cloud front

<table>
<tr>
<td>
 <img src="https://i.imgur.com/NSRuPOV.png" title="cloud formation URLS" />
</td>
</tr>
</table>

**Note - This point of this lab. If this works, then you did it correctly**


## AMI: Create a Snapshot of the Primary Instance

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `INSTANCES` click the `Instances` link
4.  Stop the `<DOMAIN NAME>` instance
5.  Once it's status has changed to `Stopped`, click `Actions > Image > Create Image`
6.  Customize the Image attributes as follows:

    * Name:   `<DOMAIN NAME>-IMAGE`
    * Description: `<DOMAIN NAME>-IMAGE`

7.  Restart the `<DOMAIN NAME>` Instance
8.  The End


## Cleanup

1. If you are not continuing to the next lesson, then be sure and stop both EC2 instances

    
## Exam Tips

What did we learn?

* Using AWS to host WP isn't simple
* Multi-AZ even with a development RDS server, will incur costs
* This lab doesn't explain how to configure plugins or themes

    
### Review Questions

1.  Why would you create a Load Balancer for a single EC2 instance? What is the alternative?
2.  What does AMI stand for?
3.  How do you delete an AMI?
4.  Why is having a valid health check page important?
5.  On an Amazon AMI, where is the crontab?
6.  When creating a snapshot, do you have to first stop the target instance?
7.  When you stop a web server targeted by an ALB what happens in the browser?
8.  When you stop a web server targeted by an ELB what happens in the browser?


### Answers

1.  In order to establish a DNS alias that won't change; create an elastic IP.
2.  Amazon Machine Image.
3.  Deregister the image.
4.  Based on this lab, if your health check points to an invalid page, then DNS (Route53) routing may 
    not work correctly. Additionally, monitoring details will not be recorded.
5.  `/etc/crontab`
6.  Yes
7.  You get an 503 Service Temporarily Unavailable error page.
8.  You get an 503 Service Temporarily Unavailable error, but without an error page.


## 

**[Previous Lab/Lecture](wp-cloudfront-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](wp-ami-lab.md)**
