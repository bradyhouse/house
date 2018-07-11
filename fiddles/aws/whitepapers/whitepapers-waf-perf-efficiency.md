Well Architected Framework (Performance Efficiency)
======

18 minute lecture  on the Performance Efficiency section of the [AWS Well Architected Framework (68 Pages)](https://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf) White Paper.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/9n1zbax.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/223c8538-772d-867a-a3c9-52f71df9e637/95bd542b-4a82-9b9c-fc9b-518c82b24221/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## The Performance Efficiency Pillar

The Performance Efficiency pillar focuses on how to use computing resources efficiently to meet your 
requirements and how to maintain that efficiency as demand changes and technology evolves.


### Design Principles

There are four principles of `Performance Efficiency` design:

* __Democratize advanced technologies__ _Rather than having your IT team learn and host a new technology,
  they can simply consume it as a service. For example, things like a NOSQL Database, Media 
  Transcoder, or Machine Learning. These are all technologies that require expertise that is not
  evenly dispersed across the technical community. But in the cloud these technologies can become
  services that your team can consume. So that they can focus on product development rather than
  resource provisioning and management._
* __Go global in minutes__ _Think Cloud Formation templates... etc_
* __Use server-less architecture__ _Think Lambda + S3 ... etc_
* __Experiment more often__ _With virtual machines and automated resources, you can quickly carry out 
  comparative testing using different types of instances, storage or configuration._
  

### Definition

`Performance Efficiency` in the cloud consists of 4 areas:

* Compute
* Storage
* Database
* Space-time trade-off


#### Compute

When architecting your system it is important to choose the right kind of server. Some applications require
heavy CPU utilization, some require memory utilization etc. With AWS, servers are virtualized and at a click
of a button (or API call) you can change the type of server in which your environment is running on.  You 
can even switch to running with no servers at all and use AWS Lambda.


##### Questions

As an architect, you should ask the following questions when evaluating `compute performance efficiency`:

* How do you select the appropriate instance type for your system?
* How do you ensure that you continue to have the most appropriate instance type as new instance types and 
  features are introduced?
* How do you monitor your instances post launch to ensure they are performing as expected?
* How do you ensure that the quantity of your instances match the demand?


#### Storage

The optimal storage solutions for your environment depends on a number of factors. For example:

* `Access Method` - Block, File or Object
* `Pattern of Access` - Random or Sequential
* `Throughput Required`
* `Frequency of Access` - Online, Offline or Archival
* `Frequency of Update` - Worm, Dynamic
* `Availability Constraints`
* `Durability Constraints`

At AWS the storage is virtualized.  With S3 you can have 11 x 9's durability, Cross Region Replication etc. With EBS
you can choose between different storage mediums (such as SSD, Magnetic, PIOPS etc). You can also easily move volumes
between the different type of storage mediums.


##### Questions

As an architect, you should ask the following questions when evaluating `storage performance efficiency`:

* How do you select the appropriate storage solution for your system?
* How do you ensure that you continue to have the most appropriate storage solution as new storage solutions and
  features are launched?
* How do you monitor your storage solution to ensure it is performing as expected?
* How do you ensure that the capacity and throughput of your storage solutions matches demand?


#### Database

The optimal database solution depends on a number of factors. Do you need database consistency, do you need high
availability, do you need No-SQL, do you need DR etc? With AWS, you get a LOT of options. RDS, DynamoDB, RedShift etc.


##### Questions

As an architect, you should ask the following questions when evaluating `database performance efficiency`:

* How do you select the appropriate database solution for your system?
* How do you ensure that you continue to have the most appropriate database solution and features as new database
  solution and features are launched?
* How do you monitor your databases to ensure performance is as expected?
* How do you ensure the capacity and throughput of your databases matches demand?


#### Space-Time trade-off

Using AWS you can use services such as RDS to add read replicas, reducing the load on your database and creating
multiple copies of the database. This helps to lower latency. You can use Direct Connect to provide predictable
latency between your HQ and AWS. You can use the global infrastructure to have multiple copies of your environment,
in regions that is closest to your customer base. You can also use caching services such as ElastiCache or CloudFront
to reduce latency.


##### Questions

As an architect, you should ask the following questions when evaluating `Space-Time trade-off performance efficiency` aka
`latency performance efficiency`:

* How do you select the appropriate proximity and caching solution for your system?
* How do you ensure that you continue to have the most appropriate proximity and caching solutions as new solutions are
  launched?
* How do you monitor your proximity and caching solutions to ensure performance is as expected?
* How do you ensure that the proximity and caching solutions you have matches demand?


### Key AWS Services

* `Compute` - Autoscaling
* `Storage` - EBS, S3, Glacier
* `Database` - RDS, DynamoDB, Redshift
* `Space-Time Trade-Off` - CloudFront, ElastiCache, Direct Connect, RDS Read Replicas etc


## Exam Tips

Know the 4 areas of reliability and the questions associated with each.

 
### Review Questions

1.  What is the `Performance Efficiency` pillar?
2.  Why should you democratize advanced technology?
3.  What are the four design principles of `Performance Efficiency`?
4.  What four areas does `Performance Efficiency` in the cloud consist of?
5.  Why is it important to choose the right kind of server?
6.  In cloud how do you change the type of a server?
7.  How do you switch to running with no servers at all?
8.  What is the cost model for server-less?
9.  What comes after `DevOps`--ie what is the next big thing? Why?
10. As an architect, what 4 questions should ask when evaluating the `compute performance efficiency`?
11. What are 7 factors of `storage performance efficiency`?
12. As an architect, what 4 questions should ask when evaluating the `storage performance efficiency`?
13. What are 3 factors of `database performance efficiency`?
14. As an architect, what 4 questions should ask when evaluating the `database performance efficiency`?
15. What is the number 1 factor of `Space-Time trade-off performance efficiency`?
16. How do you lower latency of an RDS Instance?
17. How do you lower latency between HQ and AWS?
18. How do you lower network latency?
19. As an architect, what 4 questions should ask when evaluating `latency performance efficiency`?
20. What service feature is used to insure `compute performance efficiency`?
21. What 3 services are used to insure `storage performance efficiency`?
22. What 4 services are used to insure `Space-Time Trade-Off performance efficiency`?


### Answers

1.  The Performance Efficiency pillar focuses on how to use computing resources efficiently to meet your 
    requirements and how to maintain that efficiency as demand changes and technology evolves.
2.  To avoid learning new stuff; Flatten the learning curve.
3.  (1) Democratize Advanced Technology; (2) Go global in minutes; (3) Use server-less architecture;
    (4) Experiment more often
4.  (1) Compute; (2) Storage; (3) Database; (4) Space-Time Trade-off
5.  Some applications require heavy CPU utilization; some require heavy memory utilization
6.  Press a button
7.  AWS Lambda
8.  Content Consumption; You pay for execution time
9.  Server-less; You don't have to pay for System Admins or keeping resources online all the time. You only
    pay for execution.
10. (1) How do you select the appropriate instance type for your system? (2) How do you ensure that you 
    continue to have the most appropriate instance type as new instance types and features are introduced?
    (3) How do you monitor your instances post launch to ensure they are performing as expected? (4) How do you ensure 
    that the quantity of your instances match the demand?
11. (1) Access Method; (2) Patterns of Access; (3) Throughput Required; (4) Frequency of Access; (5) Frequency of Update;
    (6) Availability Constraints; (7) Durability Constraints
12. (1) How do you select the appropriate storage solution for your system? (2) How do you ensure that you continue to 
    have the most appropriate storage solution as new storage solutions and features are launched? (3) How do you 
    monitor your storage solution to ensure it is performing as expected? (4) How do you ensure that the capacity and 
    throughput of your storage solutions matches demand?
13. The optimal database solution depends on a number of factors. Do you need database consistency, do you need high
    availability, do you need No-SQL, do you need DR etc? With AWS, you get a LOT of options. RDS, DynamoDB, 
    RedShift etc.
14. (1) How do you select the appropriate database solution for your system? (2) How do you ensure that you continue to 
    have the most appropriate database solution and features as new database solution and features are launched?
    (3) How do you monitor your databases to ensure performance is as expected? (4) How do you ensure the capacity and 
    throughput of your databases matches demand?
15. Latency - how long does it take your system or a component in your system to respond to a request from a specific
    location.
16. Add read replicas
17. Use Direct Connect
18. Use ElastiCache or CloudFront
19. (1) How do you select the appropriate proximity and caching solution for your system? (2) How do you ensure that you
    continue to have the most appropriate proximity and caching solutions as new solutions are launched? (3) How do you 
    monitor your proximity and caching solutions to ensure performance is as expected? (4) How do you ensure that the 
    proximity and caching solutions you have matches demand?
20. Compute > EC2 > Autoscaling
21. (1) Compute > EBS; (2) Storage > Glacier; (3) Storage > S3
22. (1) Network > CloudFront; (2) Database > ElastiCache; (3) Network > Direct Connect; (4) Database > RDS Read Replicas


### Well Architected Framework Performance Efficiency Flash Card Deck
  
 To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  
  <table>
  <tr>
  <td>
  <b><a href="whitepapers-waf-perf-efficiency-flashcards.txt" download="whitepapers-waf-perf-efficiency-flashcards.txt">Well Architected Framework Performance Efficiency - Flash Card Deck</a></b>
  </td>
  </tr>
  </table>
  
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](whitepapers-waf-reliability.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](whitepapers-waf-cost-optimization.md)**
