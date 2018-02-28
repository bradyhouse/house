![Imgur](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/M32RGmj.png" height="100" title="source: imgur.com" /> <img src="https://i.imgur.com/GRo5Rud.png" height="100" title="source: imgur.com" />


EC2 S3 CLI and Regions Lab
======

Short lab detailing how the command line changes when interacting with S3 buckets residing in 3 different regions. 
Specifically, this lab demonstrates why you should always include `--region` flag when using the `aws s3 cp ...`
command.  Lab video is 8 minutes, documenting all these steps took like 2 hours--_doh!_.


## Video Link

[![Imgur](https://i.imgur.com/8M5pikA.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/ab0c35c2-107a-ef34-d433-4ec0f9acdbec/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   Mac configured with iTerm
*   AWS Console free-tier account
*   *Complete the [EC2 Instance Lab](ec2-instance-lab.md)*


## Steps


### Create an EC2 Instance

1.  Login into the aws console
2.  Choose a region that is closest to you
3.  Under `Services > Compute` click `EC2`
4.  Click the `Launch Instance` button
5.  At top of the list, click the `Select` button for the `Amazon AMI Instance`

  ![Imgur](https://i.imgur.com/FDxjhpz.png)
  
6.  Select the `General purpose` `t2.micro` (default)
7.  Click the `Next: Configure Instance Details` button
8.  Click the `Next: Add Storage` button
9.  In the `Step 4: Add Storage` page, click the `Next: Add Tags` button
10. In the `Step 5: Add Tags` page, add the following tags:

  ![Imgur](https://i.imgur.com/drJBlp0.png)
  
11. Click the `Next: Configure Security Group` button
12. In the `Step 6: Configure Security Group` page, select `Select an existing security group` option
13. Select the `MyWebDMZ` security group (See the [EC2 Instance Lab](ec2-instance-lab.md))
14. Click the `Review and Launch` button
15. In the `Step 7: Review Instance Launch` page, click the `Launch` button
16. In the `Select an existing key pair or create a new key pair` pop-up, select `Choose an existing key pair`
17. Set the `Select a key pair` to `MyEC2KeyPair` (See the [EC2 Instance Lab](ec2-instance-lab.md))
18. Click the `I acknowledge that I have access to the selected private key ...`  checkbox
19. Click the `Launch Instances` button
20. In the `Launch Status` page, click the `View Instances` button

  ![Imgur](https://i.imgur.com/QuZtmiX.png)


### Create S3 Buckets 

21. Under `Services > Storage` click `S3`
22. Click the `Create bucket` button
23. In the `Create bucket`, set the name to `<login>-useast1`. For example, `bradyhouse-useast1`
24. Set the region to `US East (N. Virginia)`
25. Click the `Create` button
26. Click the `Create bucket` button
27. In the `Create bucket`, set the name to `<login>-euwest2`. For example, `bradyhouse-euwest2`
28. Set the region to `EU (London)`
29. Click the `Create` button
30. Click the `Create bucket` button
31. In the `Create bucket`, set the name to `<login>-apsoutheast2`. For example, `bradyhouse-apsoutheast2`
32. Set the region to `Asia Pacific (Sydney)`
33. Click the `Create` button
34. Download (`Ctrl + Right Click > Save As ...`) the following image and upload it to the `<login>-useast1` bucket (23)
    
    <img src="https://images-na.ssl-images-amazon.com/images/I/A1sU+Yf+V9L._RI_SX300_.jpg" height="100" />
    
35. Download (`Ctrl + Right Click > Save As ...`) the following image and upload it to the `<login>-euwest2` bucket (27)

    <img src="https://images-na.ssl-images-amazon.com/images/I/91zVdTOnQFL._RI_SX300_.jpg" height="100" />
    
36. Download (`Ctrl + Right Click > Save As ...`) the following image and upload it to the `<login>-apsoutheast2` bucket (31)

    <img src="https://images-na.ssl-images-amazon.com/images/I/91dvLZoDtfL._RI_SX300_.jpg" height="100" />


### Create a new IAM Role

37. Under `Services > Security, Identity & Compliance` click `IAM`
38. In the `IAM` sidebar click `Roles`
39. Click the `Create role` button
40. Under the `AWS Service EC2, Lambda and Others` category, click the `EC2` link
41. Under `Select your use case`, select `EC2` and click the `Next: Permissions` button
42. In the `Permissions` page, enter `S3` in the search criteria field
43. Select the `AmazonS3FullAccess` policy and click the `Next: Review` button
44. In the `Review` page, set the `Role Name` to `MyS3AdminAccess` and click the `Create role` button

  ![Imgur](https://i.imgur.com/wRjo7fT.png)


### Configure EC2 instance with IAM Role

45. Under `Services > Compute` click `EC2`
46. In the EC2 sidebar click `INSTANCES > Instances`
47. Select the `IAMEC2-Instance` instance
48. Click `Actions > Instance Settings > Attach/Replace IAM Role`
49. On the `Attach/Replace IAM Role` page, in the `IAM Role` drop-down select `MyS3AdminRole`
50. Click the `Apply` button and then `close` button

  ![Imgur](https://i.imgur.com/gawUbCm.png)


### Terminal Fun

51. Under `Services > Compute` click `EC2`
52. In the EC2 sidebar click `INSTANCES > Instances`
53. Select the `IAMEC2-Instance` instance
54. Copy the `Public IP` address
55. Launch iTerm
56.  Navigate to your Downloads directory

  ```cd ~/Downloads```

57. Goto into the SSH directory (created in steps 33-37 of the [EC2 Instance Lab](ec2-instance-lab.md))

  ```cd SSH```
  
58. Go back to the terminal window and initiate the ssh session to the <IP Address>

  ```ssh ec2-user@<IP Address> -i MyEC2KeyPair.pem```
  
59. When prompted with the message `The authenticity of host ... can't be established...` type
    `yes` and hit `Enter`

  ![Imgur](https://i.imgur.com/nSvTcn3.png)  

60. At the ssh prompt, upgrade your privileges by changing user to `su`

  ```sudo su```

61. Test your AWS access to S3

  ```aws s3 ls```

  ![Imgur](https://i.imgur.com/s27pzps.png)    
 
62. Copy the contents of the `<login>-useast1` bucket to the `ec2-user` home directory

  ```aws s3 cp --recursive s3://<login>-useast1 /home/ec2-user```

  ![Imgur](https://i.imgur.com/LKRR72f.png)
    
63. Copy the contents of the `<login>-euwest2` bucket to the `ec2-user` home directory

  ```aws s3 cp --recursive s3://<login>-euwest2 /home/ec2-user```

  ![Imgur](https://i.imgur.com/9V743b3.png)
    
64. If you got the above error, then repeat the command using the `--region` flag    
    
  ```aws s3 cp --recursive s3://<login>-euwest2 /home/ec2-user --region eu-west-2```
    
65. Copy the contents of the `<login>-apsoutheast2` bucket to the `ec2-user` home directory without
    the region flag
   
  ```aws s3 cp --recursive s3://<login>-apsoutheast2 /home/ec2-user```  
   
    
### Clean Up

66. Quit out of iTerm and return to the AWS Console
67. Under `Services > Security, Identity & Compliance` click `IAM`
68. In the IAM sidebar click `Roles`
69. Select the `MyS3AdminAccess` role
70. Click the `Delete role` button
71. In the `Delete role` confirmation pop-up, click the `Yes, delete` button
72. Under `Services > Compute` click `EC2`
73. In the EC2 sidebar click `INSTANCES > Instances`
74. Select the `IAMEC2-Instance` instance
75. Click `Actions > Instance State > Terminate`
76. In the `Terminate Instances` pop-up click the `Yes, Terminate` button


## Exam Tips

    N/A
    
## Review Questions

1.  What is the aws s3 copy command?
2.  What is the aws s3 list command?
3.  Why should you always use the region flag?
    
    
## Answers

1.  `aws s3 ls`
2.  `aws s3 cp --recursive s3://<bucket-name> --region <region name>`
3.  If you do not include the region flag you cannot be guaranteed that the s3 cp will work
    
    
##

**[Previous Lab/Lecture](ec2-iam-roles-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-bash-scripting-lab.md)** 



