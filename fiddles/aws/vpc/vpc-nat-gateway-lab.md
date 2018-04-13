<img src="https://i.imgur.com/4x1VSb6.png" height="100" title="AWS VPC" />


VPC NAT Instances & NAT Gateway Lab
======

14 Minute lecture introducing NAT Instances and NAT Gateways.  More specifically, its the third part of the VPC lab 
outlining how to enable internet access on an EC2 instance residing in a private subnet first using a NAT Instance and
then a NAT Gateway.  

## Video Link

[![acloud.guru lecture](https://i.imgur.com/6JDEV9M.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/vpc/network-address-translation/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   AWS Console free-tier account
*   **Completed [EC2 Instance Lab](../ec2/ec2-instance-lab.md)**
*   **Completed [VPC Lab Part 1](vpc-lab-part-1.md)**
*   **Completed [VPC Lab Part 2](vpc-lab-part-2.md)**


## Configure a NAT Instance

### Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/FNyl0I9.png" height="250" title="Big Picture" />
</td>
</tr>
</table>
    

### Create an EC2 NAT Instance

1.  Under `Services > Compute` click `EC2`
2.  On the EC2 Dashboard page in the sidebar, under `INSTANCES` click `Instances`
3.  Click the `Launch Instance` button
4.  On the `Step 1: Choose an Amazon Machine Image (AMI)` page, click the `Community AMIs` tab
5.  On the `Community AMIs` page in the search field, enter `NAT` and press `Enter`
6.  Select the `VPC NAT HVM EBS` AMI (top of the list)
7.  Select the `General purpose` `t2.micro` (default)
8.  Click the `Next: Configure Instance Details` button
9.  On the `Step 3: Configure Instance Details` page, set `Network` to `... | MyVPC`
10. Set the `Subnet` to `... | 10.0.1.0 us-east-1a`
11. Click the `Next: Add Storage` button
12. Click the `Next: Add Tags` button
13. On the `Step 5: Add Tags` page, click the `Add Tag` button
14. Set the `Key` to `Name` 
15. Set the `Value` to `NATServer01`
16. Click the `Next: Configure Security Groups`
17. On the `Step 6: Configure Security Group` page, set `Assign a security group` to `Select existing security group`
18. Select the `MyWebDMZ` security group (See [VPC Lab Part 1](vpc-lab-part-1.md))
19. Click the `Review and Launch` button
20. On the `Step 7: Review Instance Launch` page, click the `Launch` button
21. In the `Select an existing key pair or create a new key pair` pop-up, select `Choose an existing key pair`
22. Set the `Select a key pair` to `MyEC2KeyPair` (See the [EC2 Instance Lab](../ec2/ec2-instance-lab.md))
23. Click the `I acknowledge that I have access to the selected private key ...`  checkbox
24. Click the `Launch Instances` button
25. In the `Launch Status` page, click the `View Instances` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/nvIKiFD.png" height="250" title="Big Picture" />
</td>
</tr>
</table>


### Disable Source/Dest Check

1.  Under `Services > Compute` click `EC2`
2.  On the EC2 Dashboard page in the sidebar, under `INSTANCES` click `Instances`
3.  Select the `NATServer01` instance
4.  Click `Actions > Networking > Change Source/Dest. Check`
5.  In the `Enable Source/Destination Check` pop-up, click the `Yes, Disable`


<table>
<tr>
<td>
 <img src="https://i.imgur.com/CJHpqlg.png" height="250" title="Big Picture" />
</td>
</tr>
</table>


### Add Route 

1.  Click `Services > Networking & Content Delivery > VPC`
2.  On the VPC Dashboard page in the sidebar, click `Route Tables`
3.  Select the default (no name) route table for `... | myVPC`
4.  In the details section, click the `Routes` tab
5.  Click the `Edit` button
6.  Click the `Add another route` button
7.  Set the `Destination` to `0.0.0.0/0`
8.  Set the `Target` to `... | NATServer01` 
9.  Click the `Save` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/4tpRTXK.png" height="250" title="Big Picture" />
</td>
</tr>
</table>


### Cleanup

1.  Under `Services > Compute` click `EC2`
2.  On the EC2 Dashboard page in the sidebar, under `INSTANCES` click `Instances`
3.  Select the `NATServer01` instance
4.  Click `Actions > Instance State > Terminate`
5.  In the `Terminate Instances` pop-up, click the `Yes, Terminate` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/BBLlJua.png" height="250" title="Big Picture" />
</td>
</tr>
</table>

    
## Configure a NAT Gateway

### Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/DINgETN.png" height="250" title="Big Picture" />
</td>
</tr>
</table>


### Create a NAT Gateway

1.  Click `Services > Networking & Content Delivery > VPC`
2.  On the VPC Dashboard page in the sidebar, click `NAT Gateways`
3.  Click the `Create NAT Gateway` button
4.  On the `Create NAT Gateway` page, set the `Subnet` to `10.0.1.0-us-east-1a` (See [VPC Lab Part 1](vpc-lab-part-1.md))
5.  Click the `Create New EIP` button
6.  Click the `Create a NAT Gateway` button
7.  On the `Create NAT Gateway` confirmation page, click the `close` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/xpDAzWy.png" height="250" title="Big Picture" />
</td>
</tr>
</table>


8.  Wait for 10-15 minutes until the status of your new gateway changes to `available`


### Add Route 

1.  Click `Services > Networking & Content Delivery > VPC`
2.  On the VPC Dashboard page in the sidebar, click `Route Tables`
3.  Select the default (no name) route table for `... | myVPC`
4.  In the details section, click the `Routes` tab
5.  Click the `Edit` button
8.  Set the `Target` of the `0.0.0.0/0` of the entry to `nat-...` 
9.  Click the `Save` button


<table>
<tr>
<td>
 <img src="https://i.imgur.com/AsNmuE9.png" height="250" title="Big Picture" />
</td>
</tr>
</table>

      

## Exam Tips

What did we learn?

    TBW
    
    
## Review Questions

1.  What is a NAT Instance?
2.  When must you disable source/destination checks on a NAT instance?
3.  What's the problem with NAT Instances--ie why did AWS introduce NAT Gateways?
4.  How do you create a NAT Instance?
5.  What subnet should a NAT Instance reside in?
6.  What security group should a NAT Instance belong to?
7.  After you add a NAT Instance to your VPC, what the next step(s) to enable Internet Access to a private subnet?
8.  Do all EC2 instance perform source/destination checks by default? (T/F)
9.  How do you create a NAT Gateway?
10. Can a NAT Gateway be used for IPv6 traffic?
11. What is a `Blackhole` route?
12. Can a NAT Gateway be used as a bastion server?
        

### Answers

1.  Network address translation (NAT) instance. _You can use a network address translation (NAT) instance in a 
    public subnet in your VPC to enable instances in the private subnet to initiate outbound IPv4 traffic to the 
    Internet or other AWS services, but prevent the instances from receiving inbound traffic initiated by someone 
    on the Internet._
2.  When the source or destination is not itself.
3.  Single point of failure -- can get really complicated.
4.  Launch EC2 Instance; Goto Community AMIs; Filter for "nat" 
5.  Public
6.  One with SSH, HTTP, and HTTPS traffic enabled -- aka `MyWebDMZ`
7.  (1) Disable Source/Destination Checks; (2) Add a rule to your VPC's default Route Table to direct `0.0.0.0/0` 
    (internet) traffic to the instance 
8.  True
9.  Network & Content Delivery > VPC > NAT Gateways > Create NAT Gateway
10. No. You must use an `Egress Only Internet Gateway` (to be covered later)
11. Routing table entry that points to a terminated EC2 instance -- ie it goes to nowhere.
12. No
 

## 

**[Previous Lab/Lecture](vpc-lab-part-2.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](vpc-nat-gateway-lab.md)**








