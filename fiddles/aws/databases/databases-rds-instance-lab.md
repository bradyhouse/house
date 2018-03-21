<img src="https://i.imgur.com/ytVeZB4.png" height="100" title="AWS RDS Service" /> <img src="https://i.imgur.com/9awJmtb.png" height="50" title="AWS EC2" />  


Database RDS Instance Lab
======

12 minute lab outlining how to create a MySQL database instance and then connect to it from EC2 instance.

## Video Link

[![Imgur](https://i.imgur.com/N0NISWA.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/databases/launching-rds/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

* Mac configured with [iTerm](https://iterm2.com/) and [BBEdit](http://www.barebones.com/products/bbedit/)
* AWS Console free-tier account
* **Complete the [EC2 Instance lab](ec2-instance-lab.md)**


## Steps

### RDS: Create an MySQL Database

1.  Log into the AWS Console
2.  Under `Services > Database`, click the `Relational Database Service` link
3.  On the `Amazon RDS` page in the sidebar, click the `Instances` link
4.  On the `Instances` page, click the `Launch DB instance` button
5.  On the `Select engine` page, select `MySQL`
6.  Click the `Next` button
7.  On the `Choose use case` page, select `Dev/Test MySQL`
8.  Click the `Next` button
9.  On the `Specify DB details` page, set the `DB instance class` to `db.t2.micro--1 vCPU, 1 GiB RAM`
10. Set `Multi-AZ deployment` to `No` (default)
11. Scroll down to the `Settings` section
12. Set the `DB instance identifier` to `mysqlfiddle`
13. Set the `Master username` to `mysqlfiddle`
14. Set the `Master password` to `mysqlfiddle`
15. Set the `Confirm password` to `mysqlfiddle`
16. Click the `Next` button
17. On the `Configure advanced settings` page, under `Public accessibility` select `No`
18. Scroll down to the `Database options` section
20. Set the `Database name` to `mysqlfiddle`
21. Click the `Launch DB instance` button

<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/g2s3Wvh.png" height="150" title="Create Db Instance Status page" />
    </td>
  </tr>
</table>

22. On the `Status` page, click the `View DB Instance details` button.  Wait for the `DB instance status` to change to 
    `available`. Once it is available, scroll down to the `Details` section. Under `Security and network` copy the 
    `Endpoint` address URL and paste the value to Notepad-- **this address is needed for later step in the lab**.

### EC2: Create a Web Server

23. Under `Services > Compute` click `EC2`
24. Click the `Launch Instance` button
25. At top of the list, click the `Select` button for the `Amazon AMI Instance`

  ![Imgur](https://i.imgur.com/FDxjhpz.png)
  
26. Select the `General purpose` `t2.micro` (default)
27. Click the `Next: Configure Instance Details` button
28. In the `Step 3: Configure Instance Details` page, expand the `Advanced Details` section
29. Set the `User data` to:

    ```#!/bin/bash
       yum install httpd php php-mysql -y
       yum update -y
       chkconfig httpd on
       service httpd start
       echo "<?php phpinfo();?>" > /var/www/html/index.php
       cd /var/www/html
       wget https://s3.us-east-1.amazonaws.com/mysqlfiddle/connect.php
    ```

30. click the `Next: Add Storage` button
31. In the `Step 4: Add Storage` page, click the `Next: Add Tags` button
32. In the `Step 5: Add Tags` page, click the `Next: Configure Security Group` button
33. In the `Step 6: Configure Security Group` page, select `Select an existing Security Group` option 
34. Select the `MyWebDMZ` security, which you should have created as part of the [EC2 Instance lab](ec2-instance-lab.md)
35. Click the `Review and Launch` button
36. On the `Step 7: Review Instance Launch` page, click the `Launch` button
37. In the `Select an existing key pair or create a new key pair` pop-up, select your existing key pair, which you 
    should have created and downloaded as part of the [EC2 Instance lab](ec2-instance-lab.md)
38. Check the `I acknowledge ...` flag
39. Click the `Launch Instance` button


<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/XNVADRB.png" height="150" title="Create EC2 Instance Status page" />
    </td>
  </tr>
</table>


40. On `Launch Status` page, click the `View Instances` button
41. Wait for your EC2 instance status to update to `running`
42. In the details pane, copy the public IP address to your clip board


### iTerm: Connect to your EC2 Instance
  
43. On your local machine, startup a terminal window (launch iTerm)
44. Navigate to your Downloads/SSH sub-directory which you should have created as part of the 
    [EC2 Instance lab](ec2-instance-lab.md)

  ```cd ~/Downloads/SSH```

45. Initiate the ssh session to the <IP Address> you copied earlier (step 42)

  ```ssh ec2-user@<IP Address> -i MyEC2KeyPair.pem```
  
46. When prompted with the message `The authenticity of host ... can't be established...` type
    `yes` and hit `Enter`


<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/nSvTcn3.png" height="150" title="EC2 SSH connection" />
    </td>
  </tr>
</table>

    
47. At the ssh prompt, change user to `su`

    ```sudo su```

48. Verify that apache was installed and started

    ```service httpd status```
    
49. Navigate to the apache root html directory

    ```cd /var/www/html```

50. Verify that this directory contains the index.php and connect.php files

    ```ls -la```
    
51. Open the connect.php using nano

    ```nano connect.php```
    
52. Replace the value of the `$hostname` variable with the mySQL Database endpoint URL copied earlier (step 22)

  
<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/2AQ4ova.png" height="150" title="connect.php edit" />
    </td>
  </tr>
</table>


53. Press `CTRL + X` 
54. Enter `Y` and press `Enter` to save your changes to the `connect.php` file and exit `nano`
55. Quit out `iTerm`


### VPC: Configure Database Security Group

56. In the AWS Console under `Services > Network & Content Delivery` click `VPC`
57. On the `VPC Dashboard` page in the sidebar under `Security`, click `Security Groups`
58. On the `Security groups` page, select the `rds-launch-wizard` group
59. In the details pane, click the `Inbound Rules` tab
60. Click the `Edit` button
61. Click the `Add another rule` button
62. Set the `Type` to `MySQL/Aurora (3306)`
63. Set the `Source` to the `Group ID` of your `MyWebDMZ` Security Group -- _Note, this value should be visible in the
    Security Group list_ 
64. Click the `Save` button


### Test it Out

65. Open a new web browser tab, and paste in the URL `<EC2 Instance IP>/connect.php`


<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/PtrHv3D.png" height="150" title="connect.php test" />
    </td>
  </tr>
</table>


### Clean Up

66. Terminate your EC2 instance


## Exam Tips

### Review Questions

1.  What is the database port for MySQL? Aurora?
2.  Is Database encryption supported on t2.Micro?
3.  In order for an EC2 instance to connect to an RDS database instance what security configuration is required?     

### Answers

1.  3306; 3306
2.  No    
3.  You need add an inbound rule to the security group of the RDS database instance that has as it's source the group
    id of the security group that the EC2 instance belongs too.
    
  
## 

**[Previous Lab/Lecture](databases-101.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](databases-rds-instance-lab.md)**










