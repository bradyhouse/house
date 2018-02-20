![Imgur](https://i.imgur.com/9awJmtb.png)


EC2 EBS Volumes Lab
======

This lab explores the EC2 `Volumes` page.  I watched the lab and simply made notes of the
the exam related info discussed.  In other words, nothing mention happened. I am not
going to `hyper-document` this one.


## Exam Tips

What did we learn?

* Volumes exists on EBS
  * Virtual Hard disk
* Snapshots exist on S3
* Snapshots are point in time copies of Volumes
* Snapshots are incremental
  * This means that only the blocks that have changed since your last snapshot are moved to S3
* If this is your first snapshot, then it may take some to create
* To create a snapshot for Amazon EBS volumes that serve as root devices, you should stop the instance before taking
  the snapshot
  * However, you can take a snap while the instance is running
* You can create AMI's from both Volumes and Snapshots
* You can change EBS volume sizes on the fly, including changing the size and storage type
* Volumes will ALWAYS be in the same availability zone as the EC2 instance
* To move an EC2 volume from one AZ/Region to another, take a snap or/and image of it and then copy it to
  the new AZ/Region
* Snapshots of encrypted volumes are encrypted automatically
* Volumes restored from encrypted snapshots are encrypted automatically
* You can share snapshots, but only if they are unencrypted
  * These snapshots can be shared with other AWS accounts or made public


### Review Questions

1.  Can you have an EC2 instance in one availability zone and EBS volume in another AZ?
2.  How can you tell which EBS volume is the root device?
3.  Which EBS volume type cannot you not modify on the fly?
4.  How do we migrate EC2 instances between regions?
5.  Where do volumes exist?
6.  Where do snapshots exist?
7.  What are snapshots?
8.  What does the statement `Snapshots are incremental` mean?
9.  Can you take a snapshot while the EC2 is running? Should you?
10. Can you change EBS volume sizes and storage type on the fly? Should you?
11. Are snapshots of encrypted volumes encrypted?
12. What type of snapshots cannot you not share with other people?


### Answers

1.  No. EC2 instances and EBS volumes must be in the same AZ
2.  The root device has a snapshot
3.  Standard
4.  take a snap or/and image of it and then copy it to the new AZ/Region
5.  EBS
6.  S3
7.  Point in time copies of volumes
8.  It means that `only the blocks that have changed since your last snapshot are moved to S3`
9.  Yes. No.
10. Yes. Probably not. You should probably stop the EC2 instance first.
11. Yes automatically.
12. Encrypted snapshots.


[Previous Lab/Lecture](ec2-security-groups-lab.md) | [AWS (Root)](../readme.adoc) 
