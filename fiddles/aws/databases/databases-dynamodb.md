<img src="https://i.imgur.com/hBlcmbB.png" height="100" title="AWS Dynamo DB" />

DynamoDB
======

12 minute lecture introducing the features of DynamoDB.


## Video Link

[![acloud.guru lecture link](https://i.imgur.com/SrryIwM.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/databases/dynamodb/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is DynamoDB?

Amazon DynamoDB is a fast and flexible NoSQL database service for all applications that need consistent, single-digit
millisecond latency at any scale. It is a fully managed database and supports both document key-valued data models.
Its flexible data model and reliable performance make it a great fit for mobile, web, gaming, ad-tech, IoT and
many other applications. All data is written to SSD storage and spread across 3 geographically distinct data centers.


### Eventual consistent reads (Default)

Consistency across all copies of data is usually reached within a second. Repeating a read after a short time should
return updated data. (Best Read Performance)


### Strongly consistent reads

A strongly consistent read returns a result that reflects all writes that received a successful response prior to 
the read.


## Pricing

* Provisioned throughput capacity:
  * Write throughput $0.0065 per hour for every 10 units
  * Read throughput $0.0065 per hour for every 50 units
* Storage costs of $0.25Gb per month


### Pricing Example

Let's assume that your application needs to perform 1 million writes and 1 million reads per day, while storing 3 GB
of data.

First, you need to calculate how many writes and reads per second you need. Given 1 million evenly spread writes per 
day is equivalent to 11.6 writes / second. This can be calculated as follows:

    1M (writes) / 24 (hours) / 60 (minutes) / 60 (seconds) = 11.6 writes per second  

A dynamoDB Write Capacity Unit can handle 1 write per second, so you need 12 Write Capacity Units. Similarly, to 
handle 1 million strongly consistent reads per day, you need 12 Read Capacity Units.

With Read Capacity Units, you are billed in blocks of 50, with Write Capacity Units you are billed in blocks of 10.

To calculate Write Capacity Units = (0.0065/10) x 12 x 24 = $0.1872
To calculate Read Capacity Units = (0.0065/50) x 12 x 24 = $0.0374


## Exam Tips

    N/A
    
### Review Questions

1.  Why is DynamoDB so scalable?
2.  Why would you use DynamoDB over RDS?
3.  What is the basis of DynamoDB pricing?
4.  What is cheaper reads or writes to DynamoDB?


### Answers

1.  Because it offers `push button scaling`
2.  Because of `push button scaling`
3.  Provisioned Throughput Capacity
4.  Reads

  
## 

**[Previous Lab/Lecture](databases-rds-backups-replicas.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](databases-dynamodb.md)**










