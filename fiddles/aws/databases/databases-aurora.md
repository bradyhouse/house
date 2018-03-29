  <img src="https://i.imgur.com/ytVeZB4.png" height="100" title="AWS Aurora" />

Aurora
======

15 minute lecture introducing the features of Amazon's Aurora RDS database engine.


## Video Link

[![acloud.guru lecture link](https://i.imgur.com/vJqYkjt.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/databases/aurora/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is Aurora?

Amazon Aurora is a MySQL-compatible, relational database engine that combines the speed and availability of 
high-end commercial databases with the simplicity and cost-effectiveness of open source databases. Amazon
Aurora provides up to five times better performance than MySQL at a price point one tenth that of a
commercial database while delivering similar performance and availability.


## Scaling

* `Storage Autoscaling` - You start with 10 Gb. It then automatically scales in 10 Gb increments up to 64 Tb
* Compute resources can scale up to `32vCPU's` and 244 GB of memory
* 2 copies of your data is contained in each availability zone, with minimum of 3 availability zones-- 6 copies
  of your data
* Aurora is designed to transparently handle the loss of up to two copies of data without affecting database
  write availability and up to three copies without affecting read availability
* Aurora storage is also self-healing. Data blocks and disks are continuously scanned for errors and
  repaired automatically


## Replicas

There are two types of replicas:

* Aurora Replicas (currently 15)
* MySQL Read Replicas (currently 5)


## Exam Tips

What did we learn?

    N/A

    
## Review Questions

1.  What is Aurora?
2.  How does Aurora Scale?    
3.  Why is Aurora described as `self-healing`?
4.  How does Aurora failover work?
5.  What the difference between Aurora and MySQL replicas?
6.  Is Aurora a part of free-tier access? Why not?
7.  Is Multi-AZ deployment automatic?
8.  What is the highest failover priority?
9.  Does it support encryption?
10. How do you establish a failover replica?
11. What Address do you use for your connection strings?
12. Why shouldn't you use failover relica instance DNS URLs for your connection strings?

## Answers

1.  Amazon's MySQL compatible answer to Oracle and Microsoft SQL Server
2.  Automatically
3.  Disks are continuously scanned for errors and repaired automatically
4.  Automatically
5.  If you loss your primary Aurora database failover occurs automatically
6.  Nope; Can't run on t-micro
7.  No, it must be configured -- aka a selected option
8.  0
9.  Yes
10. Create a replica set the source to the target database (or replica) and specify a lower priority
11. Cluster DNS URL
12. Because the Cluster DNS URL automatically fails overs (or redirects) based on priority to the configured instance 
    DNS URL

## 

**[Previous Lab/Lecture](databases-elasticache.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](databases-exam-tips.md)**










