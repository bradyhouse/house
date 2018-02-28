![Imgur](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/GRo5Rud.png" height="100" title="source: imgur.com" />


EC2 IAM Roles Lab
======

Lab outlining how to configure an EC2 instance with S3 service access using an IAM Role.


## Video Link

[![Imgur](https://i.imgur.com/tErMrRY.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/iam-roles-ec2/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   Mac configured with iTerm
*   AWS Console free-tier account


## Steps

### Create an IAM Role

1.  Log into the AWS Console
2.  Click `Services > Security, Identity & Compliance > IAM`
3.  In the `IAM` sidebar click `Roles`
4.  Click the `Create role` button
5.  Under the `AWS Service EC2, Lambda and Others` category, click the `EC2` link
6.  Under `Select your use case`, select `EC2` and click the `Next: Permissions` button
7.  In the `Permissions` page, enter `S3` in the search criteria field
8.  Select the `AmazonS3FullAccess` policy and click the `Next: Review` button
9.  In the `Review` page, set the `Role Name` to `S3-Admin-Access` and click the `Create role` button

  ![Imgur](https://i.imgur.com/F55hUPs.png)


### Create an EC2 instance

10. Follow the steps outlined in the [EC2 Instance Lab](ec2-instance-lab.md) to create a new EC2 instance
    
    ** NOTE - In Step 3, set the IAM Role to `S3-Admin-Access`**
    
11.  Once the instance's status changes to `running`, copy the Public IP of your running EC2 instance
    
  ![Imgur](https://i.imgur.com/I59pebl.png)
      
12.  Launch iTerm
13.  Navigate to your Downloads directory

  ```cd ~/Downloads```

14. Goto into the SSH directory (created in steps 33-37 of the [EC2 Instance Lab](ec2-instance-lab.md))

  ```cd SSH```
  
15. Go back to the terminal window and initiate the ssh session to the <IP Address>

  ```ssh ec2-user@<IP Address> -i MyEC2KeyPair.pem```
  
16. When prompted with the message `The authenticity of host ... can't be established...` type
    `yes` and hit `Enter`

  ![Imgur](https://i.imgur.com/nSvTcn3.png)  

17. At the ssh prompt, upgrade your privileges by changing user to `su`

    ```sudo su```

18. Test your AWS access to S3

    ```aws s3 ls```

  ![Imgur](https://i.imgur.com/PTYKyZf.png)
  

19. The End
 

### Clean Up
  
21. Under `Services > Security, Identity & Compliance` click `IAM`
22. In the IAM sidebar click `Roles`
23. Select the `S3-Admin-Access` role
24. Click the `Delete role` button
25. In the `Delete role` confirmation pop-up, click the `Yes, delete` button
26. Under `Services > Compute` click `EC2`
27. In the EC2 sidebar click `INSTANCES > Instances`
28. Select the `MyWebServer` instance
29. Click `Actions > Instance State > Stop`


## Exam Tips

What did we learn?

* IAM Roles are global
* Using IAM roles, there is no need to download (and/or configure) actual AWS command line credentials


### Review Questions

1.  Do you have to create a new role in a new region?
2.  Is it possible to change roles on a running EC2 instance?
3.  For an EC2 instance, how do you configure programmatic AWS access without explicit credentials?


### Answers

1.  No, roles are global
2.  It is, but this is a recent enhancement. As far as the exams are concerned, the answer is no
3.  Define an IAM Role and assign it to the instance


##

**[Previous Lab/Lecture](ec2-commandline-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-s3-regions-lab.md)** 
