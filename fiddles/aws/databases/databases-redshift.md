<img src="https://i.imgur.com/N8u3ppG.png" height="100" title="AWS Redshift" />  

Redshift
======

8 minute lecture introducing the features of Redshift.


## Video Link

[![acloud.guru lecture link](https://i.imgur.com/DGnYvau.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/databases/redshift/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is Redshift?

Amazon Redshift is a fast and powerful, fully managed, petabyte-scale data warehouse service in the cloud. Customers
can start small for just $0.25 / hour with no commitments or upfront costs and scale to a petabyte or more for
$1,000 per terabyte per year, less than a tenth of most other data warehousing solutions.


### OLAP Example

To get `Net Profit for EMEA and Pacific for the Digital Radio product`, an OLAP query pulls in a large number of 
records. You then need to:

* Sum up the number of radios sold in EMEA
* Sum up the number of radios sold in Pacific
* Calculate the unit cost of each radio in each region
* Calculate the sales price of each radio
* And then subtract the cost from the price

And doing all this processing puts a lot of strain on your database. In other words, databases that support OLAP 
queries, aka `Data Warehousing` databases, are very different from a database and infrastructure layer perspective 
when compared to databases that simply support OLTP queries.


## Redshift Configurations

* Single Node (160Gb)
* Multi-Node
  * `Leader Node` - manages client connections and receives queries
  * `Compute Nodes` - store data and perform queries and computations
    * Up to 128 Compute Nodes
    

## Features    
      
### Columnar Data Storage

Instead of storing data in a series of rows, Amazon Redshift organizes the data by columns. Unlike row-based systems,
which are ideal for transaction processing, column-based systems are ideal for data warehousing and analytics, 
where queries often involve aggregates performed over large data sets. Since only the columns involved in the
queries are processed columnar data is stored sequentially on the storage media, column-based systems require
far fewer I/Os, greatly improving query performance.  As a result of this architecture, Redshift can be as 
much as 10 times faster than normal RDS.


### Advanced Compression

Columnar data stores can be compressed much more than row-based data stores because similar data is stored 
sequentially on disk. Amazon Redshift employs multiple compression techniques and can often achieve significant
compression relative to traditional relational data stores. In addition, Amazon Redshift doesn't require indexes
or materialized views and so uses less space than traditional relational database systems. When loading data
into an empty table, Amazon Redshift automatically samples your data and selects the most appropriate 
compression scheme.


### Massive Parallel Processing (MPP)

Amazon Redshift automatically distributes data and query load across all nodes. Amazon Redshift makes it easy to
add nodes to your data warehouse and enables you to maintain fast query performance as your data warehouse
grows.


## Pricing

It's based on three things: 

* Compute Node Hours
* Backup
* Data transfer (only within a VPC, not outside it)


### Compute Node Hours

Total number of hours you run across all your compute nodes for the billing period. You are billed for 1 unit
per node per hour, so as a 3-node data warehouse cluster running persistently for an entire month would incur
2,160 instance hours. You will not be charged for leader node hours; only compute nodes will incur charges.


## Security

* Encrypted in transit using SSL
* Encrypted at rest using AES-256 encryption
* By default RedShfit takes care of key management
  * You can manage your own keys through HSM
  * AWS Key Management Service
  

## Availability

* Currently only available in 1 AZ
* Can restore snapshots to new AZ's in the event of an outage

 
## Exam Tips

What have we learned?

* Redshift is Amazon's Data Warehousing 
* It really fast and cheap
* One of Amazon's best selling services when launched
* It achieves its speed through columnar storage
* Data is stored sequentially on disk. This means that when you access these large columns of data, it
  actually only needs to go to one specific location of the disk
* Its extremely efficient architectural both at the infrastructure and software layers

    
### Review Questions

    TBW

### Answers

    TBW
    
  
## 

**[Previous Lab/Lecture](databases-dynamodb.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](databases-elasticache.md)**










