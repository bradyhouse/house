<img src="https://i.imgur.com/4x1VSb6.png" height="100" title="AWS VPC" />


VPC Lab Part 2
======

5 minute lab that builds on [VPC Lab Part 1](vpc-lab-part-1.md).  Specifically, in this lab, the private EC2 instance 
is prepped for use as a Database Server by the public EC2 instance.


## Video Link

[![acloud.guru lecture](https://i.imgur.com/mvnYRYE.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/vpc/cb031635-1d64-fa7c-cd5a-6885e443d58a/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   Mac configured with [iTerm](https://iterm2.com/)
*   AWS Console free-tier account
*   **Completed the [EC2 Instance Lab](../ec2/ec2-instance-lab.md)**
*   **Completed [VPC Lab Part 1](vpc-lab-part-1.md)**


## Rename the Private EC2 Instance

1.  Under `Services > Compute` click `EC2`
2.  In the EC2 sidebar, under `INSTANCES` click `Instances`
3.  Select the `MyPrivateServer` EC2 instance
4.  Click  `Pen` icon to right of the name field
5.  Set the name to `MySQLServer01`
6.  Click the `Checkmark` icon to save the change


<table>
<tr>
<td>
 <img src="https://i.imgur.com/BDXT1M0.png" height="200" title="Create a 2nd EC2 Instance" />
</td>
</tr>
</table>


## Add an RDS Security Group

1.  Under `Services > Compute` click `EC2`
2.  In the EC2 sidebar, under `NETWORK & SECURITY` click `Security Groups`
3.  Click the `Create Security Group` button
4.  In the `Create Security Group` pop-up, set the `Security group name` to `MyDbDMZ`
5.  Set `Description` to `MyDbDMZ`
6.  Set `VPC` to `... | MyVPC`
7.  Use the `Add Rule` button to add `SSH`, `MySQL/Aurora`, `HTTP`, `HTTPS`, `All ICMP - IPv4` 
8.  Se the `Source` for all of the rules to `10.0.1.0/24`


<table>
<tr>
<td>
 <img src="https://i.imgur.com/oQp5jT3.png" height="200" title="Create a 2nd EC2 Instance" />
</td>
</tr>
</table>


9. Click the `Create` button


## Add Instance to the Security Group

1.  Under `Services > Compute` click `EC2`
2.  In the EC2 sidebar, under `INSTANCES` click `Instances`
3.  Select the `MySQLServer01` instance
4.  Click `Actions > Networking > Change Security Group`
5.  In the `Change Security Groups` pop-up, deselect the `default` security group
6.  Select the `MyDbDMZ` security group


<table>
<tr>
<td>
 <img src="https://i.imgur.com/cOt3cjs.png" height="200" title="Create a 2nd EC2 Instance" />
</td>
</tr>
</table>


7.  Click the `Assign Security Group` button
8.  `The End`, continue to the [next lab](vpc-nat-inst-and-gateways.md)


## Clean Up

If you are not continuing to the next lecture, then stop both running EC2 instances


## Exam Tips

What did we learn?

    N/A
    
    
## Review Questions

1.  What security group access rule is required to ping a private EC2 instance from a public one?
2.  What security group access rules are required to use an private EC2 instance as an RDS server
    accessible from a public one?
3.  What is a bastion server?
    

### Answers

1.  `All ICMP - IPv4`
2.  `SSH`, `MySQL/Aurora`, `HTTP`, `HTTPS`, `All ICMP - IPv4`  
3.  Server that acts as gateway between your public and private servers (not covered yet)


## 

**[Previous Lab/Lecture](vpc-lab-part-1.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](vpc-nat-gateway-lab.md)**










