<img src="https://i.imgur.com/4x1VSb6.png" height="100" title="AWS VPC" />


VPC Lab Part 1
======

18 minute lab detailing how to create a VPC with a private and public subnet.


## Video Link

[![acloud.guru lecture](https://i.imgur.com/6LBB7Uv.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/vpc/build-custom-vpc/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/L4xBzK2.png" height="250" title="Big Picture" />
</td>
</tr>
</table>


## Prerequisites

*   Mac configured with [iTerm](https://iterm2.com/)
*   AWS Console free-tier account
*   **Completed [EC2 Instance Lab](../ec2/ec2-instance-lab.md)**



## Create a VPC

1.  Login to the AWS Console
2.  Click `Services > Networking & Content Delivery > VPC`
3.  In the `VPC Dashboard` sidebar, click `Your VPCs`
4.  Click the `Create VPC` button
5.  In the `Create VPC` pop-up, set the `Name tag` to `myVPC`
6.  Set the `IPv4 CIDR block` to `10.0.0.0/16`
7.  Set the `IPv6 CIDR block` to `Amazon provided IPv6 CIDR block`
8.  Click the `Yes, create` button


## Create a Subnet

1.  Click `Services > Networking & Content Delivery > VPC`
2.  In the `VPC Dashboard` sidebar, click `Subnets`
3.  Click the `Create Subnet` button
4.  In the `Create Subnet` pop-up, set the `Name tag` to `10.0.1.0-us-east-1a`
5.  Set `VPC` to `... | myVPC`
6.  Set `Availability Zone` to `us-east-1a`
7.  Set `IPv4 CIDR block` to `10.0.1.0/24`
8.  Click the `Yes, Create` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/rwmvEXI.png" height="200" title="VPC Create Subnet" />
</td>
</tr>
</table>


## Create a Second Subnet

1.  Click `Services > Networking & Content Delivery > VPC`
2.  In the `VPC Dashboard` sidebar, click `Subnets`
3.  Click the `Create Subnet` button
4.  In the `Create Subnet` pop-up, set the `Name tag` to `10.0.2.0-us-east-1b`
5.  Set `VPC` to `... | myVPC`
6.  Set `Availability Zone` to `us-east-1b`
7.  Set `IPv4 CIDR block` to `10.0.2.0/24`
8.  Click the `Yes, Create` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/iQPagRF.png" height="200" title="VPC Create Internet Gateway" />
</td>
</tr>
</table>


## Create an Internet Gateway

1.  Click `Services > Networking & Content Delivery > VPC`
2.  In the `VPC Dashboard` sidebar, click `Internet Gateways`
3.  Click the `Create Internet Gateway` button
4.  On the `Create internet gateway` page, set the `Name Tag` to `MyIGw`
5.  Click the `Create` button
6.  Click the `Close` button
7.  In the `Internet Gateway` dashboard, select the `MyIGW' gateway
8.  Click `Actions > Attach VPC`
9.  In the `Attach VPC` page, set `VPC` to `myVPC`
10. Click the `Attach` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/fFV6JXv.png" height="200" title="VPC Create Subnet 2" />
</td>
</tr>
</table>


## Create an Internet Accessible Route Table

1.  Click `Services > Networking & Content Delivery > VPC`
2.  In the `VPC Dashboard` sidebar, click `Route Tables`
3.  Click the `Create Route Table` button
4.  In the `Create Route Table` pop-up, set the `Name tag` to my `myInternetRoutes`
5.  Set the `VPC` to `... | MyVPC`
6.  Click the `Yes, Create` button
7.  In the `Route Tables` dashboard, select the `myInternetRoutes` table
8.  In the details section, click the `Routes` tab
9.  Click the `Edit` button
10. Click the `Add another route` button
11. Set the `Destination` to `0.0.0.0/0`
12. Set the `Target` to `... | MyIGW`
13. Click the `Add another route` button
14. Set the `Destination` to `::/0`
15. Set the `Target` to `... | MyIGW`
16. Click the `Save` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/pnlyJrt.png" height="200" title="Create Route Table" />
</td>
</tr>
</table>


17. Click the `Subnet Associations` tab
18. Click the `Edit` button
19. Select `... | 10.0.0.1.0-us-east-1a`
20. Click `Save`


<table>
<tr>
<td>
 <img src="https://i.imgur.com/hlbejx7.png" height="200" title="Associate a Subnet" />
</td>
</tr>
</table>


## Enable Auto Assign IP

1.  Click `Services > Networking & Content Delivery > VPC`
2.  In the `VPC Dashboard` sidebar, click `Subnets`
3.  In the dashboard grid, select `10.0.1.0-us-east-1a`
4.  Click `Subnet Actions > Modify auto-assign IP settings`
5.  In the `Modify auto-assign IP settings` pop-up, set `Auto-assign IPs` to `Enable auto-assign public IPv4 address`


<table>
<tr>
<td>
 <img src="https://i.imgur.com/cpt9PKj.png" height="200" title="Enable Auto IP" />
</td>
</tr>
</table>


6.  Click the `Save` button
7.  Click the `Close` button


## Create a Public EC2 Instance

1.  Under `Services > Compute` click `EC2`
2.  Click the `Launch Instance` button
3.  At top of the list, click the `Select` button for the `Amazon AMI Instance`
4.  Select the `General purpose` `t2.micro` (default)
5.  Click the `Next: Configure Instance Details` button
6.  On the `Step 3: Configure Instance Details` page, set `Network` to `... | MyVPC`
7.  Set the `Subnet` to `... | 10.0.1.0 us-east-1a`
8.  Click the `Next: Add Storage` button
9.  Click the `Next: Add Tags` button
10. On the `Step 5: Add Tags` page, click the `Add Tag` button
11. Set the `Key` to `Name` 
12. Set the `Value` to `WebServer01`
13. Click the `Next: Configure Security Groups`
14. On the `Step 6: Configure Security Group` page, set `Assign a security group` to `Create a new security group`
15. Set the `Security group name` to `MyWebDMZ`
16. Click the `Add Rule` button
17. Set the `Type` to `HTTP`
18. Click the `Add Rule` button
19. Set the `Type` to `HTTPS`
20. Click the `Review and Launch` button
21. On the `Step 7: Review Instance Launch` page, click the `Launch` button
22. In the `Select an existing key pair or create a new key pair` pop-up, select `Choose an existing key pair`
23. Set the `Select a key pair` to `MyEC2KeyPair` (See the [EC2 Instance Lab](../ec2/ec2-instance-lab.md))
24. Click the `I acknowledge that I have access to the selected private key ...`  checkbox
25. Click the `Launch Instances` button
26. In the `Launch Status` page, click the `View Instances` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/8X3uodd.png" height="200" title="Create EC2 Instance" />
</td>
</tr>
</table>


## Create a Private EC2 Instance

1.  Under `Services > Compute` click `EC2`
2.  Click the `Launch Instance` button
3.  At top of the list, click the `Select` button for the `Amazon AMI Instance`
4.  Select the `General purpose` `t2.micro` (default)
5.  Click the `Next: Configure Instance Details` button
6.  On the `Step 3: Configure Instance Details` page, set `Network` to `... | MyVPC`
7.  Set the `Subnet` to `... | 10.0.2.0 us-east-1b`
8.  Click the `Next: Add Storage` button
9.  Click the `Next: Add Tags` button
10. On the `Step 5: Add Tags` page, click the `Add Tag` button
11. Set the `Key` to `Name` 
12. Set the `Value` to `MyPrivateServer`
13. Click the `Next: Configure Security Groups`
14. On the `Step 6: Configure Security Group` page, set `Select an existing security group`
15. Select the `default` security group
16. Click the `Review and Launch` button
17. On the `Step 7: Review Instance Launch` page, click the `Launch` button
18. In the `Select an existing key pair or create a new key pair` pop-up, select `Choose an existing key pair`
19. Set the `Select a key pair` to `MyEC2KeyPair` (See the [EC2 Instance Lab](../ec2/ec2-instance-lab.md))
20. Click the `I acknowledge that I have access to the selected private key ...`  checkbox
21. Click the `Launch Instances` button
22. In the `Launch Status` page, click the `View Instances` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/jM4ZkFm.png" height="200" title="Create a 2nd EC2 Instance" />
</td>
</tr>
</table>


### Terminal Fun

1.  Under `Services > Compute` click `EC2`
2.  In the EC2 sidebar click `INSTANCES > Instances`
3.  Select the `WebServer01` instance
4.  Copy the `Public IP` address
5.  Launch iTerm
6.  Navigate to your Downloads directory

    ```cd ~/Downloads```

7.  Goto into the SSH directory (created in steps 33-37 of the [EC2 Instance Lab](ec2-instance-lab.md))

    ```cd SSH```
  
8.  Go back to the terminal window and initiate the ssh session to the <IP Address>

    ```ssh ec2-user@<IP Address> -i MyEC2KeyPair.pem```
  
9.  When prompted with the message `The authenticity of host ... can't be established...` type
    `yes` and hit `Enter`

10. At the ssh prompt, change user to `su`

      ```sudo su```
    
11. Install all security updates 

      ```yum update -y```

12. The End, continue to the [next lab](vpc-lab-part-2.md)


## Exam Tips

What did we learn?

    N/A
    
    
## Review Questions

1.  What happens if you set the `tenancy` to `dedicated`?
2.  When you create a VPC, what else is created?
3.  When create a VPC is a default subnet created?
4.  How many IP addresses do you loss every time you provision a subnet?
5.  How many internet gateways can be attached to a VPC?
6.  What routing table entry enabled internet accessibility for IPv4?
7.  What routing table entry enabled internet accessibility for IPv6?
8.  Do `Security Groups` span VPC's?


### Answers

1.  Your VPC is setup on dedicated (or isolated) hardware, which incurs cost.
2.  Default Network ACL, default security group, and a default route table
3.  No
4.  5
5.  1
6.  0.0.0.0/0
7.  ::/0
8.  No
    

## 

**[Previous Lab/Lecture](vpc-101.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](vpc-lab-part-2.md)**










