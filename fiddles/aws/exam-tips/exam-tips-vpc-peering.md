
Exam Tips - VPC Peering
======

4 Minute Lecture detailing what you need to know about VPC Peering for the exam. For this one, I just watched and 
captured the pertinent review questions.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/rbI9Kqi.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/additional-exam-tips/vpc-peering/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*

   
### Review Questions

1.  What is VPC peering?
2.  What are the types of VPC Peering Connections? (2)
3.  Can VPC peering connections cross regions?
4.  What infrastructure is used by AWS to create a VPC peering connection? What is the benefit?
5.  Is a VPC Peering connection a `Gateway`?
6.  Is a VPC Peering connection a `VPN Connection`?
7.  Are VPC Peering connections `CIDR` block dependent? 
8.  If the CIDR block IP address range of peer connected VPCs overlap, will the connection work?
9.  What is `Transitive Peering`? Is it supported?
10. What are the 3 VPC Peering Limitations?


### Answers

1.  Connection between two VPC's that enables you to route traffic between them using private IP addresses. Instances
    in either VPC can communicate with each other as if they are in the same network.
2.  Between your own VPCs, or with a VPC in another AWS account within a single region.
3.  (Currently) no.
4.  AWS uses the existing infrastructure of a VPC to create a VPC peering connection. It is neither a gateway nor 
    a VPN connection, and does not rely on a separate piece of physical hardware. There is no single point of failure
    for communication or a bandwidth bottleneck.
5.  No
6.  No
7.  Yes, they cannot overlap
8.  No
9.  If A is peered to B and B is peered to C, then A is peered C; No
10. (1) You cannot create a VPC peering connection between VPCs that have matching or overlapping CIDR blocks;
    (2) You cannot create a VPC peering connection between VPCs in different regions; 
    (3) VPC peering does not support transitive peering relationships


### Flash Cards
  
To download the review flash card deck for this lecture, right click the following link and select
`Save Link As`. 


<table>
 <tr>
 <td>
 <b><a href="exam-tips-vpc-peering.txt" download="exam-tips-vpc-peering.txt">Exam Tips VPC Peering - Flash Card Deck</a></b>
 </td>
 </tr>
 </table>  
 
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](exam-tips-resource-groups.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](exam-tips-vpc-peering.md)**
