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
    
  </tr>
</table>




## Exam Tips

### Review Questions

 1. How do you encrypt an existing database instance?

### Answers

 1. Create a snapshot, copy and encrypt the snapshot. Finally, from the encrypted copy deploy a new instance.
  
## 

**[Previous Lab/Lecture](databases-rds-instance-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](databases-rds-backups-replicas.md)**










