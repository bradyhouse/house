![Imgur](https://i.imgur.com/9awJmtb.png) 


EC2 Placement Groups
======

3 minute lecture on EC2 Placement Groups.


## Video Link

[![Imgur](https://i.imgur.com/H4EIz9g.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/placement-groups/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is an EC2 Placement Group?

A `Placement Group` is a logical grouping of instances within a single Availability Zone.  Using placement
groups enables applications to participate in a low-latency, 10 Gbps network. Placement groups are 
recommended for applications that benefit from low network latency, high network throughput, or both.


## What do we need to know?

* Placement group can't span multiple Availability Zones
* The name you specify for a placement group must be unique within your AWS account
* Only certain types of instances can be launched in a placement group (Compute Optimized, GPU, 
  Memory Optimized, Storage Optimized)
* AWS recommended homogeneous instances within placement groups
  * instances of the same size and family
* You can't merge placement groups
* You can't move an existing instance into a placement group. You can create an AMI from your
  existing instance, and then launch a new instance from the AMI into a placement group


## Review Questions

1.  What is a Placement Group?
2.  When do you use a Placement Group?
3.  What are 2 real life scenarios where you would use a placement group?
4.  What is considered high network throughput?
5.  Can Placement Group span availability zones?
6.  What are homogeneous instances?
7.  Can you move existing instances into a placement group?
8.  How do you move an existing instance into a placement group?
9.  Can you merge instance groups?


## Answers

1.  A logical grouping of EC2 instances in a single availability zone
2.  When you want low network latency and high network throughput
3.  Grid Computing -- [hadoop cluster](https://en.wikipedia.org/wiki/Apache_Hadoop); NoSQL
    database -- [cassandra](https://en.wikipedia.org/wiki/Apache_Cassandra)
4.  10 Gbps
5.  No
6.  Same instance family and size
7.  No
8.  Create an AMI of the instance
9.  No


##

**[Previous Lab/Lecture](ec2-auto-scaling-groups-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-placement-groups.md)** 
