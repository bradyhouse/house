![Imgur](https://i.imgur.com/8J9RMdt.png)


Storage Gateway
=====

Introductory lecture about Storage Gateway.


## Video Link

[![Imgur](https://i.imgur.com/pcEFrzP.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/storage/storage-gateway/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is Storage Gateway?

Storage Gateway is an "S3" product. The service can be used to connect an on-premise virtual gateway directly with 
S3 enabling an organizations to securely store data in the cloud using a `scalable, cost-effective approach`.

Programmatically, the product is a `virtual machine image` that is mounted via a hyper-visor client (VMWare ESXi or 
Microsoft Hyper-V) running on-premise. This local gateway is then used to propagate (or asynchronous replicate) data 
to S3. The virtual machine can be configured to establish one of 3 types of storage work flows:

  * File Gateway
  * Volume Gateway
  * Tape Gateway


## File Gateways

This type of gateway is intended for flat file storage. Files are stored as objects in your S3 buckets, 
accessed through a Network File System (NFS) mount point. Ownership, permissions, and timestamps are durably stored 
in S3 in the user-metadata of the object associated with the file. Once objects are transferred to S3, they can be 
managed as native S3 objects, and bucket policies such as versioning, lifecycle management, and cross-region 
replication apply directly to objects stored in your bucket.  In practise, the workflow (or network diagram) looks
something like this:


![Imgur](https://i.imgur.com/XH55twX.png)


## Volume Gateway

This type of gateway is intended for `block` storage. Think operating system or database server. Essentially, an 
organization has an application or database server that they want to backup using the cloud.  With this goal in
mind, Amazon offer two configuration options: 

  * Stored Volume Gateway
  * Cached Volume Gateway


### Stored Volume Gateway

Stored volume gateways allows the enterprise to store the volume locally, while asynchronously backing it up to S3. Using
this approach, the gateway provides on-premise applications with low-latency access to the entire dataset, while providing
durable off-site backups. Storage volumes can be created and mounted as iSCSI devices via on-premise
application servers. Data written to the volumes is then stored using on-premise storage hardware. This data is then 
asynchronously backed up to S3 in the form of Amazon Elastic Block Store (EBS) snapshots. Individual volumes can range
in size from 1 GB to 16TB. In practise, the network diagram would looks something like this:
    

![Imgur](https://i.imgur.com/T37FLbP.png)



### Cached Volume Gateway

Cached volume gateways allow an organization to use S3 as the primary data storage while retaining frequently 
accessed data locally in their storage gateway. This approach minimize the need to scale on-premises storage 
infrastructure, while still providing applications with low-latency access frequently accessed data. Individual storage
volumes can be up to 32 TB in size, which is twice the capacity offered by the Stored volume configuration. Again, 
volumes are created and mounted as iSCSI devices via on-premise application servers. But in this configuration, the 
gateway stores the data in S3 and only retain recently read data in an on-premises cache and upload buffer.  
In practise, it's complicated, but the big picture looks something like this:
    

![Imgur](https://i.imgur.com/je2OFhY.png)



## Tape Gateway (VTL)

Tape (or Virtual Tape Library (VTL)) architecture is a durable, cost-effective solution to archive data in S3 using
a tape archival approach. The VTL interface allows an organization to leverage their existing tape-based backup 
application infrastructure to store data on virtual tape cartridges that they create using the on-premise gateway
interface. The gateway is preconfigured with media changer and tape drives. These are then made available to their 
existing client backup applications as iSCSI devices.  Tape cartridges are then added as needed. This approach
can be used in concert with a variety tape backup software clients including NetBackup and Backup Exec Veeam. In 
practise the network (or storage) diagram looks something like this:
    

![Imgur](https://i.imgur.com/CLipMpR.png)



## Review Questions

Here is what you should know for the exam.

1.  What is Storage Gateway?
2.  How does it work?
3.  How is it installed? What formats are offered?
4.  What interface is used to manage storage gateway options?
5.  What are the four types of gateways?
6.  What is File Gateway?
7.  What is Volumes Gateway? What is snapshot?
8.  What would use Volume Gateway to store?
9.  How many types of Volume Gateways are there?
10. What are Gateway Stored Volumes -- aka "Stored Volumes"?
11. What is the minimum size of a Stored Volume snapshot? Maximum size?
12. What are Gateway Cached Volumes -- aka "Cached Volumes"? 
13. What is the minimum size of Cached Volumes? Maximum size?
14. What does VTL stand for?
15. What is Gateway VTL-- aka "Tape Storage"?


## Answers

1.  An "S3 product" enterprise solution for using S3 to store or archive data.
2.  Storage gateway is a "virtual appliance" you install into a hyper-visor running in your data center.  And then
    that virtual appliance will then propagate (or asynchronous replicate) your information up to AWS and in
    particular S3 and potentially Glacier.
3.  You download a virtual machine image that you install on a host in your data center. It supports either
    VMWare ESXi or Microsoft Hyper-V.
4.  AWS Management Console
5.  File Gateway (NFS), Volume Gateway (iSCSI), Tape Gateway (VTL)
6.  Files are stored as objects in your S3 buckets, accessed through a Network File System (NFS) mount point. 
7.  Presents your application with disk volumes using iSCSI block protocol. Data is then asynchronously backed up as 
    point-in-time snapshots of volumes, and stored in S3 as Amazon Elastic Block Store (EBS) snapshots. 
    Snapshots are incremental backups that capture only changed blocks. All snapshot storage is also compressed 
    to minimize storage changes.
8.  An operating system or database server.
9.  2
10. Stored volumes let you store your primary data locally, while asynchronously backing up your data to AWS. 
11. 1 GB. 16 TB.
12. Cached volumes let you use S3 as the primary data storage while retaining frequently accessed data locally.
13. 1 GB / 32 TB.
14. Virtual Tape Library (VTL)
15. Lets you leverage your existing tape-based backup application infrastructure to store data on virtual tape 
    cartridges that are then asynchronously written to S3. Supported by NetBackup, Backup Exec Veeam etc.
    

## 

**[Previous Lab/Lecture](../s3/s3-encryption.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](storage-gateway-exam-tips.md)**

    


