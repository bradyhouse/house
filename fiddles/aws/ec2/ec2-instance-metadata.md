![Imgur](https://i.imgur.com/9awJmtb.png) 


EC2 Instance Metadata
======

4 minute lecture about how to access metadata from within an EC2 instance. Simply watched
this one and completed the steps outlined.


## Video Link

[![Imgur](https://i.imgur.com/0RKUs7k.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/instance-metadata/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Exam Tips

What did we learn?

* You must know (remember) the web address `http://169.254.169.254/latest/metadata` for the exam. This IP can be used from within an EC2 instance to quickly get metadata about the
  instance using curl.


### Review Questions

1.  What is the metadata ip/URL?
2.  How is accessed from an EC2 instance?
3.  How do you get the public IP of a running EC2 instance from within the instance?


### Answers

1.  `http://169.254.169.254/latest/meta-data/`
2.  curl
3.  `curl 169.254.169.254/latest/meta-data/public-ipv4`     


##

**[Previous Lab/Lecture](ec2-bash-scripting-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-auto-scaling-groups-lab.md)** 
