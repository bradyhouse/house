![Imgur](https://i.imgur.com/9awJmtb.png)


EC2 Summary & Exam Tips
======

18 minute lecture summarizing what you need to know about EC2 for the exam.


## Video Link

[![Imgur](https://i.imgur.com/rNHv4sJ.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/summary/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Additional Reading

* [New – Encrypted EBS Boot Volumes](https://aws.amazon.com/blogs/aws/new-encrypted-ebs-boot-volumes/)
* [Changing the Root Volume of a Running Instance to Persist Using the Command Line](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html#delete-on-termination-running-instance)
* [For question 5 why not use all AZ for the first answer](https://acloud.guru/forums/aws-certified-solutions-architect-associate/discussion/-KFIeaB-fySmPO6lHppl/for-question-5-why-not-use-all-az-for-the-first-answer)
* [Hardest Quiz Question Discussion](https://acloud.guru/course/aws-certified-solutions-architect-associate/discuss/-KFAnKuYopjjH3LCNdwN/ec2-quiz-qestion)
* [EC2 FAQ](https://aws.amazon.com/ec2/faqs/)

## Exam Tips

What did we need to know?

### Pricing Models

* Know the difference between the different pricing models:
  * On Demand
  * Spot
  * Reserved
  * Dedicated Host
* Remember with spot instances:
  * If you terminate the instance, you pay for the hour
  * _BUT_-- If AWS terminates the spot instance, you get the hour for free
      * For instance, if the spot price exceeds the bid (or market) price


### EC2 Instance Types

![Imgur](https://i.imgur.com/XO09jj1.png)

* `D` - for Density
* `R` - for RAM
* `M` - for Main choice -- aka general purpose apps
* `C` - for Compute
* `G` - for Graphics
* `I` - for IOPS
* `F` - for FPGA
* `T` - for T2 Micro -- aka cheap general purpose
* `P` - for Pics -- aka Graphics
* `X` - for Extreme Memory


### EBS

* See the [EC2 EBS Volumes Lab](ec2-ebs-volumes-lab.md)
* It consists of:
  * SSD, General Purpose - GP2 - (Up to 10,000 IOPS)
  * SSD, Provisioned IOPS - IO1 - (More than 10,000 IOPS)
  * HDD, Throughput Optimized - ST1 - frequently accessed workloads
  * HDD, Cold - SC1 - less frequently accessed data
  * HDD, Magnetic - Standard - cheap, infrequently accessed storage
* You cannot mount 1 EBS volume to multiple EC2 instances, instead use EFS


#### What did we learn in the labs?

* Termination Protection is turned off by default, you must turn it on
* On an EBS-backed instance, the default action is for the root EBS volume to be deleted when the instance is terminated
* Root volumes cannot be encrypted by default, you a third party tool (such as bit locker, etc) to encrypt the root volume
* Additional volumes can be encrypted


#### Volumes vs Snapshots

* Volumes exist on EBS
  * Virtual Hard Disk
* Snapshots exist on S3
* You can take a snapshot of a volume, this will store that volume on S3
* Snapshots are point in time copies of volumes
* Snapshots are incremental, this means that only the blocks that have changed since your last snapshot are moved to S3
  * This means that the first snapshot is the longest, subsequent snapshots are quicker and only
    includes changes


#### Security

* Snapshots of encrypted volumes are encrypted automatically
* Volumes restored from encrypted snapshots are encrypted automatically
* You can share snapshots, but only if they are unencrypted
  * These snapshots can be shared with other AWS accounts or made public


#### Snapshots of Root Devices

* To create a snapshot for Amazon EBS volumes that serve as root devices, you should stop the instance before 
  taking the snapshot
  
  
#### EBS vs Instance Store

* Instance store volumes are sometimes called Ephemeral Storage
* Instance store volumes cannot be stopped. If the underlying host fails, you will lose your data
* EBS backed instances can be stopped. You will not lose the data on this instance if it is stopped
* You can reboot both without losing your data
* By default, both ROOT volumes will be deleted on termination, however with EBS volumes, you can tell 
  AWS to keep the root device volume
    

#### How can I take a Snapshot of a RAID Array?

* Problem - Take a snapshot, the snapshot excludes data held in the cache by applications and the OS. This
  tends not to matter on a single volume, however using multiple volumes in a RAID array, this can be a
  problem due to interdependencies of the array
  * Solution - Take an application consistent snapshot
    * Stop the application from writing to disk
    * Flush all caches to the disk
      * How can we do this?
        * Freeze the file system
        * Unmount the RAID Array
        * Easiest Approach: Shut down the associated EC2 instance


### Amazon Machine Images

* See the [EC2 AMI Types Lecture](ec2-ami-types.md)
* AMI's are regional  
  * You can only launch an AMI from the region in which it is stored 
  * However you can copy AMI's to other regions using the console, command line or the Amazon EC2 API
  
  
### CloudWatch

* See the [EC2 CloudWatch Lab](ec2-cloudwatch-lab.md)
* Used for performance monitoring
* Standard Monitoring
  * 5 minute interval
  * Enabled by default on EC2 instances
* Detailed Monitoring
  * 1 minute interval
  * Cost extra
* Do not confuse with CloudTrail which is for auditing


#### What can you do with CloudWatch?

* `Dashboards` - You can quickly (and easily) create dashboard pages tied to the performance of your EC2 instances
* `Alarms` - Send emails based on Threshold and Auto Scaling rules
* `Events` - Respond to changes in the state of your AWS Resources
* `Logs` - Aggregate, monitor and store logs


### Roles Lab

* See the [EC2 IAM Roles Lab](ec2-iam-roles-lab.md)
* Roles are more secure than storing access key and secret access key on individual EC2 instances
* Roles are easier to manage
* Roles can be assigned to an EC2 instance AFTER it has been provisioned  using both the command line and the console
* Role policy changes occur in real time
* Roles are universal--apply to all regions


### Instance Metadata

* See the [EC2 Instance Metadata Lab](ec2-instance-metadata.md)
* Used to get information about an instance (such as a public ip)
* curl http://169.254.169.254/latest/metadata


### EFS Features

* See the [EC2 EFS Lab](ec2-efs-lab.md)
* Supports the Network File System version 4 (NFSv4) protocol
* You only pay for the storage that you use (no pre-provisioning required)
  * 0.30$ per GB
* Can scale up to petabytes
* Can support thousands of concurrent NFS connections
* Data is stored across multiple AZ's within a region
* Read after Write Consistency
 

### What is Lambda

* See the [EC2 Lambda Lecture](ec2-lambda.md)
* _AWS Lambda is a compute service where you can upload your code and create a Lambda function. 
  It takes care of provisioning and managing the servers that you use to run the code. You don't have to worry about 
  operating systems, patching, scaling, etc. You can use Lambda in the following ways._
  * _As an event-driven compute service where AWS Lambda runs your code in response to events. These events could be 
      changes to data in an Amazon S3 bucket or an Amazon DynamoDB table._ 
  * _As a compute service to run your code in response to HTTP requests using Amazon API Gateway or API calls made using
      AWS SDKs._
 
    
### Review Questions

    TBW  
    
### Answers

    TBW

## 
**[Previous Lab/Lecture](ec2-alexa-skill-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](../route53/route53-dns-101.md)**










