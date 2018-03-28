<img src="https://i.imgur.com/5F1xBGa.png" height="100" title="AWS Elastic Cache" />  

Elastic Cache
======

4 minute lecture introducing the features of Amazon's ElastiCache service.


## Video Link

[![acloud.guru lecture link](https://i.imgur.com/dsRv9yZ.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/databases/elasticache/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is ElastiCache?

ElastiCache is a web service that makes it easy to deploy, operate and scale in-memory cache in the cloud. The
service improves the performance of web applications by allowing you retrieve information from fast,
managed, in-memory caches, instead of relying entirely on slower disk-based databases.

It can be used significantly improve latency and throughput for many read-heavy application workloads (such as
social networking, gaming, media sharing and Q&A portals) or compute-intensive workloads (such as a recommendation
engine).

Caching improves application performance by storing critical pieces of data in memory for low-latency access. Cached
information may include the results of I/O-intensive database queries or the results of computationally-intensive
calculations.


## Types of Elastic Cache


### Memcached

[Memcached](https://www.memcached.org/) is a widely adopted in-memory object caching system. ElastiCache is
protocol compliant with Memcached.  This means that popular tools that you use today with existing Memcached
environments will work seamlessly with the service.


### Redis

[Redis](https://redis.io/) is a popular open-source in-memory key-value store that supports data structures
such as sorted sets and lists. ElastiCache supports Master / Slave replication and Multi-AZ which can be 
used to achieve cross AZ redundancy.


Exam Tips

What did we learn?

* Typically you will be given a scenario where a particular database is under a lot of stress/load. You may
  be asked which service you should use to alleviate this
* ElastiCache is a good choice if your database is particularly read heavy and not prone to frequent changing
* Redshift is a good answer if the reason your database is feeling stress is because management keep
  running OLAP transactions on it etc. 

    
## Review Questions

1.  What is Elastic Cache?
2.  What type of applications can benefit from Elastic Cache?
3.  What are the two supported engines?
4.  What additional feature does Redis offer? How?


## Answers

1.  Scaleable in-memory cache in the cloud.
2.  Web applications with read-heavy workloads -- social networking, gaming, media sharing ... etc. 
3.  Memcached / Redis
4.  Cross AZ redundancy; Master / Slave replication + Multi-AZ
  
  
## 

**[Previous Lab/Lecture](databases-redshift.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](databases-elastic-cache.md)**










