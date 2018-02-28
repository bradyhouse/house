![Imgur](https://i.imgur.com/9awJmtb.png)


EC2 Bash Scripting Lab
======

15 minute lab demonstrating how to create an EC2 instance and automatically provision it using a series of bash commands. 
As part of these provisioning steps, a static website is created by copying an html file directly from an S3 bucket.
Since there are no explicit `Exam Tips`, I just watched the video and followed the steps.


## Video Link

[![Imgur](https://i.imgur.com/Ih2VVFd.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/bootstrap-scripts/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Exam Tips

    N/A

### Review Questions

1.  On a t2.micro loaded with the Amazon linux AMI, what is the command to install all security updates?
2.  What is the command to install apache?
3.  What is the command to start apache?
4.  What is the command to insure that apache is automatically started?
5.  What is the root path of the apache web server--i.e. where do static html files live?
6.  When creating an EC2 instance, where are staging bash script commands entered?
7.  When creating an EC2 instance, how is S3 access granted to the instance?


### Answers

1.  `yum update -y`
2.  `yum install httpd -y`
3.  `service httpd start`
4.  `chkconfig httpd on`
5.  /var/www/html
6.  Configure Instance Details > Advanced Details > User data
7.  Configure Instance Details > IAM Role

##

**[Previous Lab/Lecture](ec2-s3-regions-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-bash-scripting-lab.md)** 
