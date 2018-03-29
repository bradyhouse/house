![Imgur](https://i.imgur.com/9awJmtb.png)


Databases Summary & Exam Tips
======

7 minute lecture summarizing what you need to know about Databases for the exam.


## Video Link

[![Imgur](https://i.imgur.com/rNHv4sJ.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/summary/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Additional Reading

* [Creating a DB Snapshot](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html)
* [Backing Up and Restoring Amazon RDS DB Instances](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html)
* [Amazon RDS Security Groups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.RDSSecurityGroups.html)
* [Storage for Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html)

  
## Database Types

* RDS - OLTP
  * SQL
  * MySQL
  * PostgreSQL
  * Oracle
  * Aurora
  * MariaDB
* DynamoDB - No SQL
* RedShift - OLAP
* Elasticache - In Memory Caching
  * Memcached
  * Redis
  

## What is a Multi-AZ?

<table>
  <tr>
    <td>
    <img src="https://i.imgur.com/2AwaPVk.png" height="150" title="Multi-AZ" />
    </td>
  </tr>
</table>


## What is a Read Replica?

<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/UvuKvLQ.png" height="150" title="Read Replica #1" />
    </td>
    <td>
      <img src="https://i.imgur.com/IvxRBJs.png" height="150" title="Read Replica #2" />
    </td>
    <td>
        <img src="https://i.imgur.com/EhLJHsx.png" height="150" title="Read Replica #3" />
    </td>
  </tr>
</table>


## Aurora Scaling

* 2 copies of your data is contained in each availability zone, with a minimum of 3 availability zones or 6 copies of 
  your data
* Aurora is designed to transparently handle the loss of up to two copies of data without affecting database write
  availability and up to three copies without affecting read availability 
* Aurora storage is also self-healing. Data blocks and disks are continously scanned for errors and repaired
  automatically
  

## Aurora Replicas

* 2 types of Replicas available
  * Aurora Replica (currently up to 15 are allowed)
  * MySQl Read Replicas (currently up to 5 are allowed)
  

## DynamoDB

* Stored on SSD Storage
* Spread across 3 geographically distinct data centres
* Offers two consistency models
  * Eventual Consistent Reads (Default)
  * Strongly Consistent Reads
* `Consistency` = `How fast do you need access to the data after writing it`
  * For under one second, use `Strongly Consistent Reads`. Otherwise, use Eventual Consistent Read


### DynamoDB vs RDS

* DynamoDB offers "push button" scaling, meaning that you can scale your database on the fly, without any downtime
* RDS is not so easy -- you usually have to use a bigger instance size or add a read replica


## Redshift Configuration

* Single Node (160Gb)
* Multi-Node
  * `Leader Node` - manages client connections and receives queries
  * `Compute Node` - store data, perform queries and computation; Up to 128 Compute Nodes
  
  
## What is Elasticache?

ElastiCache is a web service that makes it easy to deploy, operate and scale in-memory cache in the cloud. The
service improves the performance of web applications by allowing you retrieve information from fast,
managed, in-memory caches, instead of relying entirely on slower disk-based databases. ElastiCache supports two
open-source in-memory caching engines:

* Memcached
* Redis

    
## Review Questions

1.  Which of the following AWS services is a non-relational database? RDS / DynamoDB / ElastiCache / Redshift
2.  Amazon's ElastiCache uses which two engines?
3.  Which AWS service is ideal for Business Intelligence Tools/Data Warehousing?
4.  When you have deployed an RDS database into multiple availability zones, can you use the 
    secondary database as an independent read node?
5.  Which AWS DB platform is most suitable for OLTP?
6.  What happens to the I/O operations of a single-AZ RDS instance during a database snapshot or backup?
7.  What data transfer charge is incurred when replicating data from your primary RDS instance to your 
    secondary RDS instance?
8.  When you add a rule to an RDS security group, you must specify a port number or protocol (T/F)
9.  If you are using Amazon RDS Provisioned IOPS storage with a MySQL or Oracle database engine, what is the maximum 
    size RDS volume you can have by default?
    
    
### Answers

1.  DynamoDB
2.  Memcached / Redis
3.  Redshift
4.  No
5.  RDS
6.  I/O may be briefly suspended while the backup process initializes (typically under a few seconds), and you may 
    experience a brief period of elevated latency.
7.  There is no charge associated with this action.
8.  False
9.  6TB


## 
**[Previous Lab/Lecture](databases-aurora.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](../readme.adoc)**










