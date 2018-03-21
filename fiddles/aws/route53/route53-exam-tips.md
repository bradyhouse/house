![Route53](https://i.imgur.com/vG67Qx0.png) 


Route 53 Exam Tips
======

5 minute lecture summarizing what you need to know about Route 53 for the exam.


## Video Link

[![acloud.guru lecture link](https://i.imgur.com/ae8Zg8x.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/route53/c4d0f49f-625b-21d3-1df6-4b91cdccd8ce/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## CleanUp

* Be sure and delete all your EC2 instances and ELBs setup for these labs
  * **Remember ELBs cost money too**


## Exam Tips

What did we learn?

* ELB's do not have pre-defined IPv4 addresses, you resolve them using DNS names
* Understand the difference between a CNAME and an Alias Record
* If you are given the choice, always choose an Alias Record over a CNAME
* Remember the different routing policies and their use cases
  * Simple
  * Weighted
  * Latency
  * Failover
  * Geolocation


### Review Questions

1.  Route 53 is so named because _____?
2.  Does Route 53 support MX Records?
3.  Route 53 is Amazon's DNS service? T/F
4.  Route 53 does not support zone apex records (naked domain names)? T/F
5.  There is a limit to the number of domain names that you can manage using Route 53? T/F


## Answers

1.  The DNS Port is on Port 53 and Route 53 is a DNS service
2.  Yes
3.  True
4.  False
5.  True and False. With Route 53, there is a default limit of 50 domain names. However, this limit can be 
    increased by contacting AWS support.


## 

**[Previous Lab/Lecture](route53-geolocation-routing-policy-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](route53-exam-tips.md)**










