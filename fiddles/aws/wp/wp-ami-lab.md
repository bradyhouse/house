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


## Load Balancer: Remove MyEC2WebServer from Target Group

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `LOAD BALANCING`, click the `Target Groups` link
4.  Select the `MyELB` target group
5.  In the `Targets` tab, click the `Edit` button
6.  Select the `MyEC2WebServer` EC2 instance
7.  Click the `Remove` button
8.  Click the `Save` button


## Load Balancer: Create Write ELB

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


## EC2: Create an AMI

1.  Log into the AWS Console
2.  Under `Compute`, click the `EC2` link
3.  In the EC2 sidebar under `INSTANCES` click the `Instances` link
4.  Select the `MyEC2WebServer` instance 
5.  Click `Actions > Image > Create Image`
6.  Configure the Image with the following custom properties:

  * Image Name:           `WP-WRITE-IMAGE`
  * Image Description:    `WP-WRITE-IMAGE`
  

## EC2: Rename and start the Write Instance

1.  Log into the AWS Console
2.  Under `Compute`, click the `EC2` link
3.  In the EC2 sidebar under `INSTANCES` click the `Instances` link
4.  Rename the `MyEC2WebServer` instance `WRITE.<DOMAIN NAME>`
5.  Start the instance


## Load Balancer: Add EC2 Instance back to Target Group

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `LOAD BALANCING`, click the `Target Groups` link
4.  Select the `MyELB` target group
5.  In the `Targets` tab, click the `Edit` button
6.  Select the `WRITE.<DOMAIN NAME>` EC2 instance
7.  Click the `Add to registered` button
8.  Click the `Save` button


## WP: Update URL Settings

1.  Log into your word press app -- <domain name>/wp-login.php
2.  In the Admin sidebar click `Settings`
3.  Set the `WordPress Address (URL)` to `write.<domain name>`
4.  Set the `Site Address (URL)` to `write.<domain name>`
5.  Click the `Save Changes` button


    TBW


## Exam Tips

What did we learn?

    TBW
    

### Review Questions

    TBW


### Answers

    TBW
    

## 

**[Previous Lab/Lecture](wp-cloudfront-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](wp-ami-lab.md)**
