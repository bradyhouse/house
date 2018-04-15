<img src="https://i.imgur.com/4x1VSb6.png" height="100" title="AWS VPC" />


VPC NAT vs Bastion Servers
======

4 minute lecture on the difference between NAT and Bastions Servers.  For this one, I just took notes.
 
  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/KntQnsY.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/vpc/760c4cd4-a710-9ec3-0e4b-c3b02cfb4ef5/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/wgMcc5z.png" height="250" title="NAT vs Bastion Server" />
</td>
</tr>
</table>
  

## Exam Tips

What did we learn?

* A NAT is used to provide internet traffic to EC2 instances in private subnets
* A Bastion is used to securely administer EC2 instances (using SSH or RDP) in private subnets. In Australia we call 
  them Jump boxes

     
   
### Review Questions

1.  What is a Bastion Server?
2.  What is a NAT Instance?  What is it used for?
3.  What Subnet do Bastion and NAT Instances reside in?


### Answers

1.  Jump Box
2.  Network address translation (NAT) instance. Its used to provide Internet Access to Private Subnets
3.  Public


 
## 

**[Previous Lab/Lecture](vpc-flow-logs-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](vpc-nat-vs-bastion.md)**








