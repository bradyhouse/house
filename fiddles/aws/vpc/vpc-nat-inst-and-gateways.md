<img src="https://i.imgur.com/4x1VSb6.png" height="100" title="AWS VPC" />


VPC NAT Instances & NAT Gateways
======

14 Minute lecture introducing NAT Instances and NAT Gateways.  More specifically, its the third part of the VPC lab 
outlining how to enable internet access on an EC2 instance residing in a private subnet first using a NAT Instance and
then a NAT Gateway.  For this one, I simply listened to the lecture, completed the steps and documented the relevant
Exam details.


## Video Link

[![acloud.guru lecture](https://i.imgur.com/6JDEV9M.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/vpc/network-address-translation/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


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

**[Previous Lab/Lecture](vpc-lab-part-2.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](vpc-nat-inst-and-gateways.md)**










