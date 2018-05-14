<img src="https://i.imgur.com/O74efH0.png" height="100" title="WordPress" />

WordPress CloudFront Lab
======

20 minute lab building on the [WordPress EC2 Lab](wp-ec2-lab.md). In this lab, WordPress is updated to use the CloudFront
distribution URL for uploaded media files. This configuration change makes media links published by the site fault tolerant. 
Should the WordPress EC2 instance go down, external web pages having links to media from the site, will continue to work.
  
   
## Video Link

[![acloud.guru lecture](https://i.imgur.com/PgXiikM.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/wordpress/0d8346ce-76eb-6b3a-72ff-dfc7bc8ef4d2/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   AWS Console free-tier account
*   Mac configured with iTerm
*   Complete the [WordPress EC2 Lab](wp-ec2-lab.md)

 
## Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/ytDNe6P.png" width="300" title="Big Picture" />
</td>
</tr>
</table>


## S3: Backup /var/www/html

1.  Using iterm, ssh into your EC2 instance
2.  Copy the contents of the `/var/www/html` directory to the s3 `<domain name>-wp-2018` bucket, which
    was created as part of the [WordPress Setup Lab](wp-setup-lab.md). For example --
    
    ````
    aws s3 cp --recursive /var/www/html s3://icurmt-wp-2018
    ````

    
## S3: Sync /var/www/html/wp-content/uploads

1.  Login into `<domain name>/wp-admin`
2.  Goto Posts
3.  Edit (or create) the `Hello World` post and attach an image
4.  Using iterm, ssh into the EC2 instance
5.  Copy the contents of the `/var/www/html/wp-content/uploads` directory to the 
    `<domain name>-wp-media-2018` s3 bucket, which was created as part of the 
    [WordPress Setup Lab](wp-setup-lab.md). For example --
    
    ````
    aws s3 cp --recursive /var/www/html/wp-content/uploads s3://icurmt-wp-media-2018
    ````
    
6.  Sync the contents of the `/var/www/html/wp-content/uploads` directory with the 
    `<domain name>-wp-media-2018` s3 bucket, which was created as part of the 
    [WordPress Setup Lab](wp-setup-lab.md). For example --
    
    ````
    aws s3 sync --delete /var/www/html/wp-content/uploads s3://icurmt-wp-media-2018

    ````
 
 
 ## WP: Configure URL Rewrites
 
 1. Log into the AWS Console
 2. Under `Network & Content Delivery` click `CloudFront`
 3. In the `CloudFront Distributions` dashboard, copy the domain name of the distribution that was created as part 
    of the [WordPress Setup Lab](wp-setup-lab.md). For example --
    
    
  <table>
  <tr>
  <td>
  <img src="https://i.imgur.com/BftrrUJ.png" width="300" title="cloudfront distribution domain" />
  </td>
  </tr>
  </table>
  
    
 4. Using iterm, ssh into the EC2 instance
 5. Navigate to the `/var/www/html`
 6. Create a file called `.htaccess` and paste in the following contents. Update `<cloudfront distribution url>` based
    on the domain copied earlier (3) 
 
    ````
    Options +FollowSymlinks
    RewriteEngine on
    rewriterule ^wp-content/uploads/(.*)$ http://<cloudfront distribution url>/$1 [r=301,nc]
    
    # BEGIN WordPress
    
    # END WordPress
  
    ````
 
 7. Restart the httpd service
 
    ````
    service httpd restart

    ````


## Linux: Add S3 Sync Cron Jobs

1.  Using iterm, ssh into the EC2 instance
2.  Evaluate priveleges -- `sudo su`
3.  Navigate to the `etc` directory
4.  Modify the crontab -- `nano crontab`
5.  Add the following commands, replacing the `<domain name>` variable
  
    ````
    */5 * * * * root aws s3 sync --delete /var/www/html/wp-content/uploads s3://<domain name>-wp-media-2018
    */5 * * * * root aws s3 sync --delete /var/www/html s3://<domain name>-wp-2018

    ````
6.  Save your changes and exit the nano editor
7.  Restart the cron service -- `service crond restart`


## Exam Tips

What did we learn?

    N/A
    

### Review Questions

1.  From an EC2 instance with S3 access, what is the command to list all s3 buckets?
2.  From an EC2 instance with S3 access, what is the command to recursively copy the contents of
    the `/var/www/html` directory to a bucket named `icurmt-wp-2018`?
3.  From an EC2 instance with S3 access, what is the command to view the contents of a bucket named
    `icurmt-wp-2018`?
4.  From an EC2 instance with S3 access, what is the command to synchronize the contents of a bucket named
    `s3://icurmt-wp-media-2018` with the directory `/var/www/html/wp-content/uploads`
5.  On an EC2 instance configured with the Amazon Linux AMI, how do you add a new job to the crontab?
6.  On an EC2 instance configured with the Amazon Linux AMI, how do restart all cron jobs?


### Answers

1.  `aws s3 ls`
2.  `aws s3 cp --recursive /var/www/html s3://icurmt-wp-2018`
3.  `aws s3 ls s3://icurmt-wp-2018`
4.  `aws s3 sync --delete /var/www/html/wp-content/uploads s3://icurmt-wp-media-2018`
5.  `cd /etc`; `nano crontab`
6.  `service crond restart`

## 

**[Previous Lab/Lecture](wp-ec2-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](wp-ami-lab.md)**
