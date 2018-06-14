<img src="https://i.imgur.com/O74efH0.png" height="100" title="WordPress" />

WordPress EC2 Lab
======

20 minute lab detailing how to configure 2 EC2 instances to host a Word Press blog / website on AWS. 
  
   
## Video Link

[![acloud.guru lecture](https://i.imgur.com/jJl6MPM.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/wordpress/ff12ea0d-9039-253f-1ea3-8473ee72ac15/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   AWS Console free-tier account
*   Complete the [WordPress Setup Lab](wp-setup-lab.md)

 
## Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/ytDNe6P.png" width="300" title="Big Picture" />
</td>
</tr>
</table>


In this lab, we complete the setup of the first EC2 instance and connect it to the domain registered as part of the 
[WordPress Setup Lab](wp-setup-lab.md) via our Application Load Balancer.  Once up and running, we then complete
the WordPress install process by point our web browser at the new domain.


## Login: US East 1 

1.  Log into the AWS console
2.  Change your region to `US East 1 - N. Virginia` 


## Route53: Create Zone Apex Record

1.  Under `Network & Content Delivery` click the `Route53` link
2.  In the Route53 sidebar, click the `Hosted zones` link
3.  Click domain you registered as part of the [WordPress Setup Lab](wp-setup-lab.md)
4.  Create a record set with the following customized settings:

    * Alias: Yes
    * Alias Target: `dualstack.MyALB-***.us-east-1.elb.amazonaws.com`
    

## EC2: Create Web Server

1.  Under `Compute`, click the `EC2` link
2.  Create a new EC2 instance with the following customized settings:

    * Machine AMI:    Amazon Linux AMI
    * Instance Type:  t2.micro
    * IAM Role:       MyS3AdminAccess
    * User Data:
    
          #!/bin/bash
          yum update -y
          yum install httpd php php-mysql stress -y
          cd /etc/httpd/conf
          cp httpd.conf httpdconfbackup.conf
          rm -rf httpd.conf
          wget https://s3-eu-west-1.amazonaws.com/acloudguru-wp/httpd.conf
          cd /var/www/html
          echo "healthy" > healthy.html
          wget https://wordpress.org/latest.tar.gz
          tar -xzf latest.tar.gz
          cp -r wordpress/* /var/www/html/
          rm -rf wordpress
          rm -rf latest.tar.gz
          chmod -R 755 wp-content
          chown -R apache:apache wp-content
          service httpd start
          chkconfig httpd on
    
    * Name Tag:       MyEC2WebServer
    * Security Group: MyWebDMZ


## Load Balancer: Configure Target Groups

1.  Under `Compute` click the `EC2` link
2.  In the EC2 sidebar under `LOAD BALANCING` click `Target Groups` link


### Configure Health Check Settings

1.  Customize the health check settings as follows:

    * Healthy threshold:    2
    * Unhealthy threshold:  2
    * Timeout:              5
    * Interval:             6


### Register a Target EC2 Instance 

1.  Register `MyEC2WebServer` as the target EC2 instance     


## WP: Complete Setup

1.  In your web browser, navigate to the domain name you registered as a part of the [WordPress Setup Lab](wp-setup-lab.md)
2.  Click the `Let's Go` button, and enter the database connections settings as follows:
    
    * For `Database Name`, `Username` and `Password` refer to the [WordPress Setup Lab](wp-setup-lab.md)
    * Set the `Database Host` to the endpoint address of your RDS instance

3.  Click the `Submit` button
4.  On the `wp-admin/setup-config.php?step=2` page, copy the contents of the `wp-config.php` script to your clip board
5.  SSH to your `MyEC2WebServer`
6.  Navigate to the `var/www/html` directory
7.  Using nano create a wp-config.php file and paste in the contents
8.  Go back to the web browser, and click the `Run Installation` button
9.  Fill out the installation form
10. Click the `Install WordPress` button
11. The End :)


<table>
<tr>
<td>
 <img src="https://i.imgur.com/mBoD4Uo.png" width="300" title="WordPress Up and Running" />
</td>
</tr>
</table>


## Exam Tips

What did we learn?

    N/A
    

### Review Questions

1.  What does PEM stand for? What does a *.PEM file contain?
2.  Are Private Keys region specific?
3.  What is the ec2 ssh command? 
4.  What is a `Zone Apex Record`?  
5.  Once you registered a domain, how you connect it to an EC2 instance? (2)
6.  How do you regenerate your key files for a region?
7.  On an EC2 instance configured with the Amazon Linux AMI, what is command to update all libraries?
8.  What is the command to install apache?
9.  What is the path of apache?
10. What do you need to install to run WordPress on an Amazon Linux AMI EC2 instance?
11. Inorder to connect an Apache server instance to a Cloudfront CDN, what configuration change must be made?
12. On an Amazon Linux AMI EC2 instance configured with apache, what is path to the root web server?
13. On an Amazon Linux AMI EC2 instance, what command is used for FTP file download?
14. On an Amazon Linux AMI EC2 instance, what command is used to unzip a `*.gz` archive?
15. When do you use `chmod -R 755`?
16. On an Amazon Linux AMI EC2 instance configured with apache, what is the command to start apache?
17. On an Amazon Linux AMI EC2 instance configured with apache, what is the command to make apache a startup service?
    What does this mean?
    

### Answers

1.  Private Enhanced Mail (PEM); Failed version of secure email. But the format lives on. The file contains your
    RSA Private Key
2.  Yes
3.  `ssh ec2-user@<Public IP Address> -i <PEM file>`
4.  Naked domain name. For example `icurmt.com`
5.  (1) Create a Load Balancer; (2) In Route53 create a Zone Apex Record Set that points to the Load Balancer
6.  Go to EC2 Dashboard > Key Pair > Create Key Pair
7.  `yum update`
8.  `yum install httpd`
9.  `/etc/httpd`
10. `yum install php php-mysql httpd stress -y`
11. You must enable `Allow URL Rewrites`; In the `etc/httpd/conf/httpd.conf` file set 
    the `AllowOverride` flag to `All`
12. `/var/www/html`  
13. `wget`
14. `tar -xzf <file name>.tar.gz` 
15. When you want to grant everyone to read and execute access to all files in a directory. 
16. `httpd start`
17. `chkconfig httpd on`; if the EC2 instance reboots, apache is restarted



## 

**[Previous Lab/Lecture](wp-setup-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](wp-cloudfront-lab.md)**
