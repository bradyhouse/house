<img src="https://i.imgur.com/ytVeZB4.png" height="100" title="AWS RDS Service" /> 

Databases Backups, Multi-AZ & Read Replicas
======

16 minute lecture on differences between `Backups`, `Multi-AZ`, and `Read Replicas`. _Note, this topic is important 
no matter what exam you take. It comes up on all of them_.


## Video Link

[![Imgur](https://i.imgur.com/hD15fea.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/databases/abbd9cdd-d1b1-4ded-a726-df282da7f7df/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Backups

AWS offers two types of database backups: `Automated` and `Snapshots`.


### Automated Backups

Allow you to recover your database to any point in time within a `retention period`. The retention period can be 
between 1 and 35 days. Automated backups will take a full daily snapshot and will also store transaction logs 
throughout the day. When you do a recovery, AWS will first choose the most recent daily back up, and then
apply transaction logs relevant to that day. This allows you to do a point in time recovery down to a second, 
within the retention period.

Automated backups are enabled by default. The backup data is stored in S3 and you get free storage space equal to 
the size of your database. So if you have an RDS instance of 10Gb, you will get 10Gb worth of storage.

Backups are taken within a defined window. During the backup window, storage I/O may be suspended while your data
is being backed up and you may experience elevated latency.


### Snapshots

DB Snapshots are done manually (ie they are user initiated). They are stored even after you delete the original RDS 
instance, unlike automated backups.


## Restoring Backups

Whenever you restore either an Automatic Backup or a manual Snapshot, the restored version of of the database will be
a new RDS instance with a new RDS endpoint.


## Encryption

Encryption at rest is supported for MySQL, Oracle, SQL Server, PostgreSQL, MariaDB & Aurora. Encryption is done using
AWS Key Management Service (KMS) service. Once your RDS instance is encrypted, the data stored at rest in the 
underlying storage is encrypted, as are its automated backups, read replicas, and snapshots.

At the present time, encrypting an existing DB instance is not supported. To use Amazon RDS encryption for an existing
databse, you must first create a snapshot, make a copy of that snapshot and encrypt the copy.


## What ia a Multi-AZ?

<table>
  <tr>
    <td>
    <img src="https://i.imgur.com/2AwaPVk.png" height="150" title="Multi-AZ" />
    </td>
  </tr>
</table>

Multi-AZ allows you to have an exact copy of your production database in another Availability Zone. AWS handles the 
replication for you, so when your production database is written to, this write will automatically be synchronized
to the stand by database.

In the event of planned database maintenance, DB Instance failure, or an Availability Zone failure, Amazon RDS will
automatically failover to the standby so that database operations can resume quickly without administrative 
intervention.

**Multi-AZ is for disaster recovery only**. It is not primarly used for improving performance. For performance 
improvement you need Read Replicas.

Multi-AZ databases are available for SQL Server, Oracle, MySQL Server, PostgreSQL, MariaDB.  For Aurora its built into
the database design.


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

Read replicas allow you to have a read-only copy of your production database. This is achieved by using
**asynchronous replication** from the primary RDS instance to the read replica. You use read replicas primarily
for very read-heavy database workloads. Read replicas are available for MySQL Server, PostgreSQL, MariaDB and Aurora.

* They are used for scaling, not DR  
* Must have automatic backups turned on in order to deploy a read replica
* You can have up to 5 read replica copies of any database
* You can have read replicas of read replicas (but watch out for latency)
* Each read replica will have its own DNS end point
* You can have read replicas that have Multi-AZ
* You can create read replicas of Multi-AZ source databases
* Read replicas can be promoted to their own databases. This breaks the replication
* You can have a read replica in a second region


## Exam Tips

What did we learn?

    N/A


### Review Questions
 
1.  What are the two types of backups offered by AWS? How do they differ?
2.  What is the retention period range possible for Automated backups?
3.  How do you encrypt an existing database instance?
4.  What is Multi-AZ?
5.  What is Read Replicas?
6.  What database types support Multi-AZ?
7.  What database type support Read Replicas?


### Answers

1.  Automated and snapshots; Snapshots are manual.
2.  1 to 35 days
3.  Create a snapshot, copy and encrypt the snapshot. Finally, from the encrypted copy deploy a new instance.
4.  Synchronously maintained DR copy of a database maintained in a different AZ
5.  Asynchronously maintained copy of a database intended for performance scaling
6.  SPAMMO
7.  PAMM

  
## 

**[Previous Lab/Lecture](databases-rds-instance-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](databases-dynamodb.md)**










