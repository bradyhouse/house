<img src="https://i.imgur.com/O74efH0.png" height="100" title="WordPress" />

WordPress Setup Lab
======

12 minute lab detailing the `non-EC2 Instance` setup steps for configuring a Word Press blog / website on AWS. 
  
 
## Video Link

[![acloud.guru lecture](https://i.imgur.com/MJI0eMb.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/wordpress/c384c88d-f29d-5a6b-301f-a1dd09aadbfa/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   AWS Console free-tier account
*   Complete all [Route53 lectures / labs](../route53)
*   Complete all [EC2 lectures / labs](../ec2)
*   Complete all [S3 lectures / labs](../s3)
*   Complete all [VPC lectures / labs](../vpc)
*   Complete all [IAM lectures / labs](../iam)
*   Complete all [Database lectures / labs](../databases)
*   Complete all [CloudFront lectures / labs](../cloudfront)

 
## Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/ytDNe6P.png" width="300" title="Big Picture" />
</td>
</tr>
</table>


In this lab, we configure everything in AWS minus the 2 EC2 instances (depicted above).  This includes:

  * Route53 domain name
  * 1 IAM Role 
  * 2 VPC Security Groups
  * Application Load Balancer
  * 2 S3 buckets
  * 1 CloudFront Web Distribution
  * 1 RDS Database instance


## Login: US East 1 

1.  Log into the AWS console
2.  Change your region to `US East 1 - N. Virginia` 


## Route53: Create a Domain

1. Under `Networking & Content Delivery`, click `Route53`
2. Register the domain name for your website, for example `icurmt.com`


## IAM: Create S3 Admin Access Role

1. Under `Security, Identity & Compliance`, click `IAM`
2. Create a new role called `MyS3AdminAccess`, it should include the `AmazonS3FullAccess` policy 


## VPC: Create Security Groups

1.  Under `Network & Content Delivery`, click `VPC`
2.  Create a new security group in your default VPC called `MyWebDMZ`, it should include:
    
    * HTTP Port 80 / Source 0.0.0.0/0
    * SSH Port 22 / Source 0.0.0.0/0

3.  Create a new security group in your default VPC called `MyRdsSG`, it should include:
    
    * MySQL/Aurora Port 3306 / Source MyWebDMZ
    

## EC2: Configure Elastic Load Balancer

1.  Under `Compute`, click `EC2`
2.  In the EC2 sidebar under `LOAD BALANCING` click `Load Balancers`
3.  Create an `Application Load Balancer` with the following customized properties:

    * Name:                 MyELB
    * Scheme:               internet-facing
    * Protocol:             HTTP
    * AZ's:                 Select All 
    * VPC:                  default
    * Security Group:       MyWebDMZ
    * Health Check > Path:  healthy.html
    * Target Group > Name:  MyWebServers
    

## S3: Create WordPress Code Bucket

1.  Under `Storage`, click `S3`
2.  Create a new bucket called `<domain name>-wp-2018`. For example, `icurmt-wp-2018`
3.  Create a new bucket called `<domain name>-wp-media-2018`. For example, `icurmt-wp-media-2018`


## CloudFront: Create Web CDN Distribution

1.  Under `Network & Content Delivery`, click `CloudFront`
2.  Create a new Web Distribution with the following customized settings:
  
    * Origin Domain Name: `<domain name>-wp-media-2018.s3.amazonaws.com`
    * Restrict Bucket Access: Yes
    * Origin Access Identity: Create a New Identity
    * Grant Permissions on Bucket: Yes, Update Bucket Policy
    

## RDS: Create MySQL Database

1.  Under `Databases`, click `RDS`
2.  Create a MySQL database with the following customized settings:

    * Use Case: Production - MySQL (Use Multi-AZ Deployment)
    * DB Instance Class: db.t2.micro
    * Multi-AZ Deployment: Create replica in different zone
    * DB Instance Identifier: <domain name> (for example, `icurmt`)
    * Master Username: <domain name> (for example, `icurmt`)
    * Master Password: <domain name>.com (for example, `icurmt.com`)
    * Publicly Accessible: No
    * VPC Security Group: MyRdsSG
    * Database Name: icurmt


## Exam Tips

What did we learn?

    N/A   

### Review Questions

1.  How do you reset (or recreate) a given region's default VPC?
2.  If you delete and RDS Db, and then the default VPC it resided in, what remnant of the deleted RDS DB will you
    also need to delete?  


### Answers

1.  (a) Delete everything from the VPC; (b) Delete the VPC; (c) Execute the `VPC > Create Default VPC` command
2.  The RDS Default Subnet


## 

**[Previous Lab/Lecture](../apps/apps-exam-tips.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](wp-ec2-lab.md)**
