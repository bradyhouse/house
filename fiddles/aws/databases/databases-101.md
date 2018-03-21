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

 
### OLTP vs OLAP

Online Transaction Processing (OLTP) differs from OLAP, Online Analytics Processing in the types of queries that are
run.


#### OLTP Example

To get `Order number 2120121`, an OLTP query pulls up a row of data such as Name, Date, Delivery Address, 
Delivery Status ... etc. Think standard SQL query -- `SELECT * FROM Orders where id = 2120121`.


#### OLAP Example

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


     TBW

 
  

## Exam Tips

What did we learn?

    TBW


### Review Questions

    TBW


### Answers

    TBW
      
  
## 

**[Previous Lab/Lecture](../route53/route53-exam-tips.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](databases-101.md)**










