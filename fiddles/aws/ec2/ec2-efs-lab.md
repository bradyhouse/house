![AWS Elastic Compute Cloud](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/0xGqSmp.png" height="100" title="AWS Elastic File System" />


EC2 Elastic File System (EFS) Lab
======

15 minute lecture and lab. The lecture provides a brief overview of EFS and its features.  The lab details how to 
create 2 EC2 instances and then establish a shared mount point for the apache html root directory using EFS. 


## Video Link

[![Imgur](https://i.imgur.com/PC7zmSK.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/elastic-file-system-lab/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is EFS?

_Elastic File System (EFS) is a file storage service for Elastic Compute Cloud (EC2).  It is easy to use and provides
a simple interface that allows you to create and configure file systems quickly and easily. With EFS, storage
capacity is elastic, growing and shrinking automatically as you add and remove files, so your applications have
the storage they need, when they need it._ Practically speaking, you can't mount an EBS volume to two EC2 instances 
at once, and that's what EFS allows you to do.


### Features of EFS

* Supports `Network File System version 4` (NFSv4) protocol
* You only pay for the storage you use (no pre-provisioning required)
  * 30 cents / GB
* Can scale up to [petabytes](https://en.wikipedia.org/wiki/Petabyte)
* Can support thousands of concurrent NFS connections
* Data is stored across multiple AZ's within a region
  * No durability rating because the service is quite new
* Read after Write Consistency
* Block Based Storage not Object Based Storage


## Prerequisites

*   Mac configured with [iTerm](https://iterm2.com/)
*   AWS Console free-tier account
*   **Complete the [EC2 Instance lab](ec2-instance-lab.md)**
*   **Complete the [EC2 Elastic Load Balancer lab](ec2-elastic-load-balancer-lab.md)**


## Steps


### Create EFS Mount Targets

1.  Log into the AWS Console
2.  Under `Services > Storage` click `EFS`
3.  If EFS isn't offered in your current region, then select the closest region listed
4.  Click the `Create file system` button
5.  Leave everything default, and click the `Next Step` button
6.  On the `Configure optional settings` page under `Add tags` set the `Name` to `MyEFS`
7.  Click the `Next Step` button
8.  On the `Review and create` page, click the `Create File System` button


![Imgur](https://i.imgur.com/ekw6eXi.png)


### Create EC2 Instances

9.  Under `Services > Storage` click `EC2`
10. Click the `Launch Instance` button
11. On the `Step 1` page, select the `Amazon Linux AMI 2017.09.1 (HVM), SSD Volume Type` 
12. On the `Step 2` page, click the `Next: Configure Instance Details` button
13. On the `Step 3` page, set the `subnet` to a specific zone -- for example `us-east-1c`
14. Click the `Next: Add Storage` button
15. On the `Step 4` page, click the `Next: Add Tags` button
16. On the `Step 5` page, add a `Name` tag based on the subnet selected in step 13 -- for example `UsEast1c`
17. Click the `Next: Configure Security Group` button
18. On the `Step 6` page, select the existing `MyWebDMZ` security group, which was created as 
    part of the [EC2 Instance lab](ec2-instance-lab.md)
19. Click the `Review and Launch` button
20. On the `Step 7` page, click the `Launch` button
21. In the `Select an existing key pair or create a new key pair` popup, in the `Select a key pair` dropdown, select
    `MyEC2KeyPair` (See the [EC2 Instance Lab](ec2-instance-lab.md))
22. Click the `I acknowledge that I have access to the selected private key ...`  checkbox
23. Click the `Launch configuration` button
24. On the `Launch Status` page, click the `View Instances` button
25. Repeat steps 9-24, changing the subnet -- for example `us-east-1d`


![Imgur](https://i.imgur.com/ptQtHx6.png)


### Create a Load Balancer

26. Under `Services > Storage` click `EC2`
27. In the EC2 sidebar under `LOAD BALANCING` click `Load Balancers`
28. Click the `Create Load Balancer` button
29. On the `Select load balancer type` page under `Classic Load Balancer`, click the `Create` button
30. On the `Step 1` page, set the `Name` to `MyProdLB`
31. Click the `Next: Assign Security Groups` button
32. On the `Step 2` page, select the `MyWebDMZ` group, which was created as part of the [EC2 Elastic Load Balancer lab](ec2-elastic-load-balancer-lab.md)
33. Click the `Next: Configure Security Settings` button
34. On the `Step 3` page, click the `Next: Configure Health Check` button
35. On the `Step 4` page, set the `Health Check Interval` to `10`
36. set the `Healthy Threshold` to `3`
37. Click the `Next: Add EC2 Instances` button
38. On the `Step 5` page, select both of the EC2 instances created earlier
39. Click the `Next: Add Tags` button
40. On the `Step 6` page, click the `Review and Create` button
41. On the `Step 7` page, click the `Create` button
42. On the `Status` page, click the `Close` button


![Imgur](https://i.imgur.com/Ds9XHsE.png)


### Verify Security Groups

43. Under `Services > Storage` click `EC2`
44. Select the first instance 
45. Click `Actions > Networking > Change Security Groups`
46. In `Change Security Groups` pop-up, select the `default` and `MyWebDMZ` groups
47. Click the `Assign Security Groups` button
48. Select the second instance and repeat steps 45-47

![Imgur](https://i.imgur.com/VfhLrvp.png)


### Two Terminal Windows

49. On your Mac launch iTerm and ssh into the first instance 
50. Open a second terminal window and ssh into the second 

![Imgur](https://i.imgur.com/3hPD1zx.png)

Note - If you have not done this before and want the detailed steps, please refer to the [EC2 Instance lab](ec2-instance-lab.md)

51. On both instances (or in each terminal window), run the following
    series of commands
    
      ```
        sudo su
        yum update -y
        yum install httpd -y
        service httpd start
      ```


### EFS EC2 Mount Instructions

52. Go back to the AWS Console
53. Under `Services > Storage` click `EFS`
54. Select `MyEFS` file system
55. Click the `Amazon EC2 mount instructions` link
56. Scroll to the bottom of the pop-up, copy the command listed under step 3

![Imgur](https://i.imgur.com/1HkOMoc.png)

57. Paste the command into the first terminal window, but change target directory to `/var/www/html`

  * For example --
  
        sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 fs-7f8d7337.efs.us-east-1.amazonaws.com:/ /var/www/html

58. Repeat step 57 in the second terminal


### Create an HTML page

59. In the first terminal window navigate to the `/var/www/html` directory

        ```cd /var/wwww/html```

60. Create an `index.html` file using nano

        ```nano index.html```

61. Paste the following html into the nano editor window

        ```<html xmlns="http://www.w3.org/1999/xhtml">
           <head>
             <title>EC2 EFS LAB</title>
             <meta name="viewport" content="width=device-width, initial-scale=1">
             <meta name="description" content="EC2 EFS Lab">
             <meta name="author" content="bradyhouse@gmail.com">
             <script src="https://unpkg.com/jquery@3.1.0/dist/jquery.min.js"></script>
             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/paper/bootstrap.min.css"/>
           
             <script>
               function signalError() {
                 document.getElementById('body').setAttribute("class", "invalid");
               }
           
               $(document).ready(function () {
                 $('#canvas').height(window.innerHeight);
               });
             </script>
           </head>
           <body id="body">
           <svg id="canvas" xmlns="http://www.w3.org/2000/svg" version="1.1"
                width="100%" style="background-color: black;" preserveAspectRatio="none">
             <defs>
               <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M10 0 L0 0 L0 10" fill='none' stroke='magenta' stroke-width='0.25'>
                 </path>
               </pattern>
             </defs>
             <g id="layer1">
               <rect id="grid" width="100%" height="100%" x="0" y="0"
                     stroke='gray' stroke-width='0.25' fill='url(#gridPattern)'>
               </rect>
             </g>
             <linearGradient id="horizontal" gradientTransform="rotate(90,.5,.5)">
               <stop offset=".10" stop-color="magenta">
                 <animate attributeName="offset" dur="20s" values=".10;.05;.09" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".20" stop-color="cyan">
                 <animate attributeName="offset" dur="20s" values=".20;.15;.19" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".30" stop-color="cyan">
                 <animate attributeName="offset" dur="20s" values=".30;.25;;.29" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".40" stop-color="magenta">
                 <animate attributeName="offset" dur="20s" values=".40;.35;.39" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".50" stop-color="cyan" stop-opacity="0">
                 <animate attributeName="offset" dur="20s" values=".50;.45;.49" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".60" stop-color="cyan" stop-opacity="0">
                 <animate attributeName="offset" dur="20s" values=".60;.55;.59" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".70" stop-color="magenta">
                 <animate attributeName="offset" dur="20s" values=".70;.65;.69" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".80" stop-color="cyan" stop-opacity="0">
                 <animate attributeName="offset" dur="20s" values=".80;.75;.79" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".90" stop-color="cyan" stop-opacity="0">
                 <animate attributeName="offset" dur="20s" values=".90;.85;.89" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset="1" stop-color="magenta">
                 <animate attributeName="offset" dur="20s" values="1;.95;.99" repeatCount="indefinite">
                 </animate>
               </stop>
             </linearGradient>
             <linearGradient id="vertical">
               <stop offset=".10" stop-color="cyan">
                 <animate attributeName="offset" dur="20s" values=".10;.05;.09" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".20" stop-color="magenta">
                 <animate attributeName="offset" dur="20s" values=".20;.15;.19" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".30" stop-color="magenta">
                 <animate attributeName="offset" dur="20s" values=".30;.25;.29" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".40" stop-color="cyan">
                 <animate attributeName="offset" dur="20s" values=".40;.35;.39" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".50" stop-color="magenta" stop-opacity="0">
                 <animate attributeName="offset" dur="20s" values=".50;.45;.49" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".60" stop-color="magenta" stop-opacity="0">
                 <animate attributeName="offset" dur="20s" values=".60;.55;.59" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".70" stop-color="cyan">
                 <animate attributeName="offset" dur="20s" values=".70;.65;.69" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".80" stop-color="magenta" stop-opacity="0">
                 <animate attributeName="offset" dur="20s" values=".80;.75;.79" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset=".90" stop-color="magenta" stop-opacity="0">
                 <animate attributeName="offset" dur="20s" values=".90;.85;.89" repeatCount="indefinite">
                 </animate>
               </stop>
               <stop offset="1" stop-color="cyan">
                 <animate attributeName="offset" dur="20s" values="1;.95;.99" repeatCount="indefinite">
                 </animate>
               </stop>
             </linearGradient>
           
             <rect x="0" y="0" height="100%" width="100%" fill-opacity=".5" fill="url(#horizontal)">
               <animate attributeName="width" dur="20s"
                        values="10%;20%;30%;40%;50%;60%;70%;80%;90%;100%;90%;80%;70%;60%;50%;40%;30%;20%;10%"
                        repeatCount="indefinite">
               </animate>
             </rect>
             <rect x="0" y="0" height="100%" width="100%" fill-opacity=".5" fill="url(#vertical)">
               <animate attributeName="height" dur="20s"
                        values="10%;20%;30%;40%;50%;60%;70%;80%;90%;100%;90%;80%;70%;60%;50%;40%;30%;20%;10%"
                        repeatCount="indefinite">
               </animate>
             </rect>
           </svg>
           </body>
           </html>
        ```

62. Press `CTRL + X` 
63. Enter `Y` and press `Enter` to save your changes to the `index.html` file to exit `nano`
64. In terminal 2, navigate to the `/var/www/html` directory
    
        ```cd /var/wwww/html```

65. Verify that the `index.html` created on the other EC2 instance is now visible

        ``` ls -ls ```

![Imgur](https://i.imgur.com/YTrLVKL.png)


### Test the Load Balancer DNS

66. Go back to the AWS Console
67. Under `Services > Storage` click `EC2`
68. In the EC2 sidebar, click `LOAD BALANCING > Load Balancers`
69. Select the `MyProdLB` load balancer
70. In the detail tab, copy the `DNS name` url, for example `MyProdLB-715298576.us-east-1.elb.amazonaws.com`
71. Open a new tab in Chrome and paste in the URL


![Imgur](https://i.imgur.com/iU4xcrk.png)


### Clean Up

72. Quit out of iTerm
73. Go back to the AWS Console
73. Under `Services > Storage` click `EC2`
74. Select both instances
75. Click `Actions > Instance State > Terminate`
76. In the `Terminate Instances` pop-up, click the `Yes, Terminate` button
77. _THE END_ OMG!


## Exam Tips

What did we learn? 

* The primary use case for EFS is as a shared file server
* Simplest way to share files across EC2 instances
* User level and directory level permissions can be applied to EFS
  * You can restrict access at a file level and at a directory level
* EFS allows multiple EC2 instance to connect to it
* Whereas EBS only allows single instance access 


### Review Questions

1.  What is the primary Use Case for EFS?
2.  When would you use EBS instead of EFS?


### Answers

1.  EC2 instance shared file server--i.e. when you need share files across instance use EFS
2.  EBS is used when you only files to be accessed by a single EC2 instance


##

**[Previous Lab/Lecture](ec2-placement-groups.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-lambda.md)** 
