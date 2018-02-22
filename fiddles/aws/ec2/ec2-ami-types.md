![Imgur](https://i.imgur.com/9awJmtb.png)


EC2 AMI Types: EBS vs Instance Store
======

## Video Link

[![Imgur](https://i.imgur.com/euQwwz0.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/ebs-vs-is/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Notes

You can select AMIs based on the following criteria:
  * Region
  * OS
  * Architecture -- 32 or 64 bit
  * Launch permission
  * Root device type and/or storage capacity

All AMI's are categorized as either backed by Amazon EBS or backed by instance store.


### EBS Backed

The root device for an instance launched from the AMI is an Amazon EBS volume created from an Amazon EBS snapshot.


### Instance Store Backed

The root device for an instance launched from the AMI is an instance store volume created from a template stored in
Amazon S3. For this reason, provisioning can often take longer than it would with an EBS backed volume.


### Exam Tips

* Instance store volumes are sometimes called `Ephemeral Storage` -- aka `lasting a short time`  
* Instance store volumes cannot be stopped.  If the underlying host fails, you will loss your data
* EBS backed instances can be stopped. You will not loss the data on the instance if it is stopped
* You can reboot both, you will loss your data
* By default, both ROOT volumes will be deleted on termination
  * However, with EBS volumes, you can tell AWS to keep the root device volume
  

## 

**[Previous Lab/Lecture](ec2-encrypted-root-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-ami-types.md)** 
 
