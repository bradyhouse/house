<img src="https://i.imgur.com/4x1VSb6.png" height="100" title="AWS VPC" />


VPC Network ACL Lab
======

18 minute lecture / lab outlining how to create a custom Network ACL.  For this one, I simply 
watched and noted the relevant exam material as review questions. 
 

## Video Link

[![acloud.guru lecture](https://i.imgur.com/1YktPCW.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/vpc/acl/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Exam Tips

What did we learn?

* Your VPC automatically comes with a default network ACL and by default it allows all outbound and inbound traffic
* You can create a custom network ACL. By default, each custom network ACL denies all inbound and outbound traffic 
  until you add rules
* Each subnet in your VPC must be associated with a network ACL. If you don't explicitly associate a subnet with
  a network ACL, the subnet is automatically associated with the default network ACL
* You can associate a network ACL with multiple subnets; however, a subnet can be associated with only one network
  ACL at a time. When you associate a network ACL with a subnet, the previous association is removed
* A network ACL contains a numbered list of rules that is evaluated in order, starting with the lowest numbered rule
* A network ACL has separate inbound and outbound rules, and each rule can either allow or deny traffic
* Network ACLs are stateless; responses to allowed inbound traffic are subject to the rules for outbound traffic 
  (and vice versa)
* Block IP Addresses using network ACL's not Security Groups
 
  
### Review Questions

1.  What level do security groups operate at?
2.  What level do NACLs operate at?
3.  What kind of rules can be configured for a Security Group? 
4.  What kind of rules can be configured for a Network Access Control List? 
5.  Are Security Groups stateful? What does that mean?
6.  Are Network Access Control Lists stateful?
7.  How are Security Group rules applied?
8.  How are Network Access Control Lists rules applied?
9.  When you create a VPC does the default Network ACL allow inbound and outbound traffic?
10. How many Network ACLs can a subnet be associated with?
11. What is an ephemeral port?
12. What ephemeral port range must be added as a Custom TCP rule to enable internet access to a Web Server?
13. Given a route table having an inbound rule and outbound rule, #100, granting HTTP requests for 0.0.0.0/0 how would 
    you block access for the IP address 136.30.8.132?   
14. Can you block a specific IP using a security group rule?
15. Can you have a subnet not associated with any network ACL? Why?

### Answers

1.  Instance level
2.  Subnet
3.  You can only configure "allow" rules
4.  You can only configure "allow" and "deny" rules
5.  Yes, Inbound and Outbound traffic is automatic.
6.  No, Inbound and Outbound access must be defined explicitly.
7.  All rules are applied before access is granted
8.  Rules are processed in number order when deciding whether to allow traffic
9.  Yes
10. 1
11. An ephemeral port is a short-lived transport protocol port for Internet Protocol (IP) communications
12. 1024-65535 
13. Add an inbound rule, #99, blocking HTTP requests from 136.30.8.132/32.
14. No. Subnets are automatically associated with the default network ACL

 
## 

**[Previous Lab/Lecture](vpc-nat-gateway-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](vpc-load-balancer-lab.md)**








