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
 <img src="https://i.imgur.com/KHmrefk.png" height="250" title="Big Picture" />
</td>
</tr>
</table>
    

### Create an EC2 NAT Instance

 1.  Under `Services > Compute` click `EC2`
 2.  Click the `Launch Instance` button
 3.  On the `Step 1: Choose an Amazon Machine Image (AMI)` page, click the `Community AMIs` tab
 4.  On the `Community AMIs` page in the search field, enter `NAT` and press `Enter`
 5.  Select the `VPC NAT HVM EBS` AMI (top of the list)
 6.  Select the `General purpose` `t2.micro` (default)
 7.  Click the `Next: Configure Instance Details` button
 8.  On the `Step 3: Configure Instance Details` page, set `Network` to `... | MyVPC`
 9.  Set the `Subnet` to `... | 10.0.1.0 us-east-1a`
 10. Click the `Next: Add Storage` button
 11. Click the `Next: Add Tags` button
 12. On the `Step 5: Add Tags` page, click the `Add Tag` button
 11. Set the `Key` to `Name` 
 12. Set the `Value` to `NATServer01`
 13. Click the `Next: Configure Security Groups`
 14. On the `Step 6: Configure Security Group` page, set `Assign a security group` to `Select existing security group`
 15. Select the `MyWebDMZ` security group (See [VPC Lab Part 1](vpc-lab-part-1.md))
 20. Click the `Review and Launch` button
 21. On the `Step 7: Review Instance Launch` page, click the `Launch` button
 22. In the `Select an existing key pair or create a new key pair` pop-up, select `Choose an existing key pair`
 23. Set the `Select a key pair` to `MyEC2KeyPair` (See the [EC2 Instance Lab](../ec2/ec2-instance-lab.md))
 24. Click the `I acknowledge that I have access to the selected private key ...`  checkbox
 25. Click the `Launch Instances` button
 26. In the `Launch Status` page, click the `View Instances` button



### Disable Source/Target Validation

    TBW


### Add Route Table Entry

    TBW


### Cleanup

    TBW
    

## Configure a NAT Gateway

### Big Picture

    TBW


### Create a NAT Gateway

      

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
 

## 

**[Previous Lab/Lecture](vpc-lab-part-2.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](vpc-nat-gateway-lab.md)**








