<table>
<tr>
<td>
  <img src="https://i.imgur.com/ytVeZB4.png" height="100" title="AWS RDS Service" />
</td>
<td>
 <img src="https://i.imgur.com/hBlcmbB.png" height="100" title="AWS Dynamo DB" />
</td>
<td>
  <img src="https://i.imgur.com/N8u3ppG.png" height="100" title="AWS Redshift" />  
</td>
<td>
  <img src="https://i.imgur.com/5F1xBGa.png" height="100" title="AWS Elastic Cache" />  
</td>
</tr>
</table>


Databases 101
======

Introduction to AWS Database services.

## Video Link

[![acloud.guru lecture link](https://i.imgur.com/kWikM0v.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/databases/overview/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is a relational database?

Relational databases are what most of us are all used to. They have been around since the 70's.  Think of a traditional
spreadsheet:

  * Database
  * Tables
  * Row
  * Field (Columns)
  
 
### What Relational Database Types are supported?
 
 
<img src="https://i.imgur.com/UtxmhtP.png" height="150" title="RDS types supported by AWS" />

 
 Amazon's RDS service supports the following six database types:
 
 *  SQL Server
 *  Oracle
 *  MySQL Server (open source)
 *  PostgreSQL
 *  Aurora
 *  MariaDB
 
 
## What is a Non-Relational Database?


<img src="https://i.imgur.com/f1SgwLl.png" height="150" title="Structure of a non-relational DB" />


## What is Data Warehousing?

Used for business intelligence. Tools like Cognos, Jaspersoft, SQL Server Reporting Services, Oracle Hyperion,
SAP NetWeaver. It is used to pull in very large and complex data sets. Usually, used by management to do queries
on data (such as current perfomance vs targets etc).

 
## OLTP vs OLAP

Online Transaction Processing (OLTP) differs from OLAP, Online Analytics Processing in the types of queries that are
run.


### OLTP Example

To get `Order number 2120121`, an OLTP query pulls up a row of data such as Name, Date, Delivery Address, 
Delivery Status ... etc. Think standard SQL query -- `SELECT * FROM Orders where id = 2120121`.


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
 

## What is Elastic Cache?

Elastic Cache is a web service that makes it easy to deploy, operate and scale in-memory cache in the cloud. The service
improves the performance of web applications by allowing you retrieve information from fast, managed, in-memory
caches, instead of relying entirely on slower disk-based databases.

The service supports two open-source in-memory caching engines:

* [Memcached](https://www.memcached.org/) 
* [Redis](https://redis.io/)


## Exam Tips

What did we learn?

* RDS - OLTP
  *  SQL Server
  *  Oracle
  *  MySQL Server (open source)
  *  PostgreSQL
  *  Aurora
  *  MariaDB
* DynamoDB - No SQL
* Redshift - OLAP
* Elasticache - In Memory Caching


### Review Questions

1.  What six databases are supported by AWS RDS service?
2.  What does OLTP stand for? What is the associated AWS Service offering?
3.  What does OLAP stand for? What is the associated AWS Service offering?  
4.  What is Amazons No SQL database service? 
5.  What is a use case for Elastic Cache?
6.  What Amazon's prefered RDS Database type?


### Answers

1.  S P A M M O
2.  Online Transaction Processing; RDS
3.  Online Analytic Processing; RedShift
4.  DynamoDB
5.  Shoe retail website that display their 10 top selling products on their home page. Although this data could be
    retrieved via OLTP query, Elastic Cache could be used instead.
6.  Aurora
      
  
## 

**[Previous Lab/Lecture](../route53/route53-exam-tips.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](databases-rds-instance-lab.md)**










