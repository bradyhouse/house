<img src="https://i.imgur.com/uwXHG63.png" height="100" title="AWS Kinesis" />


Kinesis 101
======

10 Minute Lecture introducing Amazon Kinesis Service. 
 
  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/p9PZ3XJ.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/application-services/59e1b34d-b686-0bcd-551b-218034c94f09/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is Streaming data?

`Streaming data` is data generated continuously by thousand of data sources, which typically send in the data records
simultaneously, and in small sizes (order of Kilobytes). This could be:

* Purchases from online stores (aka amazon.com)
* Stock Prices
* Game data (as gamers play)
* Social network data
* Geospatial data (think uber.com)
* iOT sensor data


## Given that context, what is Kinesis?

Kinesis is a platform on AWS to send streaming data too. Kinesis makes it easy to load and analyze streaming data. It
also provides the ability for you to build your own custom applications for your business needs.  There are three
core Kinesis services.


### Kinesis Streams

* Kinesis streams consist of shards
  * 5 transactions per second for reads, up to a maximum total data read rate of 2 MBs per second and up to 1,000
    records per second for writes, up to a maximum total data write rate of 1 MB per second (including partition keys)
* The data capacity of your stream is a function of the number of shards that you specify for the stream. The total
  capacity of the stream  is the sum of the capacities of its shards
 
 
 ### Basic Configuration
 
 <table>
 <tr>
 <td>
  <img src="https://i.imgur.com/xtqZPom.png" height="250" title="Kenisis Streams Example" />
 </td>
 </tr>
 </table>
 

### Kinesis Firehose

Firehose simplifies the architecture through automation. It eliminates the need shard, consumers and
data retention policies. There are two configuration options.


### Redshift Configuration

<table>
<tr>
<td>
 <img src="https://i.imgur.com/C9X1HG9.png" height="250" title="Kenisis Firehose Redshift Configuration" />
</td>
</tr>
</table>


### Elastic Search Cluster Configuration

<table>
<tr>
<td>
 <img src="https://i.imgur.com/dRUq2tE.png" height="250" title="Kenisis Firehose Elastic Search Configuration" />
</td>
</tr>
</table>


### Kinesis Analytics

Analytics allows you to run SQL types queries against data processed via Streams or Firehose.  The results of these
queries can then be processed (or stored) using other AWS services.


### Basic Configuration

<table>
<tr>
<td>
 <img src="https://i.imgur.com/J0eY5bM.png" height="250" title="Kenisis Analytics Architecture" />
</td>
</tr>
</table>



    

## Exam Tips

What did we learn?

* Know the difference between Streams and Firehose. You will be given scenario questions and you must choose the most
  relevant service
* Understand at a high level what Kinesis Analytics is
    
         
### Review Questions

1.  What does the word `kinesis` mean?
2.  What is streaming data?
3.  What is Amazon Kinesis?
4.  What are the three core services offered by the AWS Kinesis platform?
5.  What do Kinesis streams consist of?
6.  How do you calculate the capacity of a Kinesis stream?
7.  How many swim lanes comprise a Kinesis stream application?
8.  What are contents of the swim lanes of a Kinesis Stream app? (4)
9.  What is the min/max data retention period offered by Kenisis Streams?
10. Where is data stored in a Kinesis firehose application? (2)
11. How many swim lanes comprise a Kinesis firehose application?
12. What are contents of the swim lanes of a Kinesis firehose app? (3)
13. What is the purpose of Kinesis Analytics?
14. How many swim lanes comprise a Kinesis analytics application?
15. What are contents of the swim lanes of a Kinesis Analytics app? (3)
      

### Answers

1.  `Movement or activity of an organism in response to a stimulus such as light 
    (The American Heritage® Dictionary of the English Language, 4th Edition)`
2.  Continous data generated simultaneously by thousands of data sources
3.  A platform on AWS to send streaming data too
4.  Streams, Firehose, Analytics
5.  Shards
6.  Sum the capacity of shards
7.  4
8.  (1) Producers: EC2, Mobile Devices, Website ... etc; (2) Kinesis Streams: Shards; Consumers: EC2 Instances;
    (4) S3, Redshift, DynamoDB ... etc.
9.  24 hours; 7 days
10. S3; Elastic Search Cluster
11. 3
12. (1) Producers: EC2, Mobile Devices, Website ... etc; (2) Kinesis Firehose; (3) S3 or Elastic Search Cluster
13. Allows you perform SQL style queries of Kinesis Firehose and Streams Application data
14. 3
15. (1) Producers: EC2, Mobile Devices, Website ... etc; (2) Kinesis Streams or Firehose; (3) S3 or Redshift or Elastic
    Search Cluster


## 

**[Previous Lab/Lecture](apps-api-gateway-101.mdp) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](apps-kinesis-101.md)**
