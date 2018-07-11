Well Architected Framework (Reliability)
======

11 minute lecture  on the Reliability section of the [AWS Well Architected Framework (68 Pages)](https://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf) White Paper.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/ZmrStAg.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/223c8538-772d-867a-a3c9-52f71df9e637/d12d3e1c-d7f0-b2e2-23a9-e97168606985/watch?backUrl=%2Fcourses)

*Note - You will need an [acloud.guru](acloud.guru) account.*


The reliability pillar covers the ability of a system to recover from service or infrastructure outages/disruptions as 
well as the ability to dynamically acquire computing resources to meet demand.


### Design Principles

There are four principles of `Reliability` design:

* Test recovery procedures ([NetFlix Simian Army](https://github.com/Netflix/SimianArmy))
* Automatically recover from failure
* Scale horizontally to increase aggregate system availability
* Stop guessing capacity


### Definition

Reliability in the cloud consists of 3 areas:

* Foundations
* Change Management
* Failure Management


#### Foundation

Before building a house, you always make sure the foundation are in place before you lay the first brick. Similarly
before architecting any system, you need to sure you have the prerequisite foundations. In traditional IT one of
the first things you should consider is the size of the communications link between your HQ and your data center. If 
you mis-provision this link, it can take 3-6 months to upgrade which can cause a huge disruption to your 
traditional IT estate.

With AWS, they handle most of the foundation for you. The cloud is designed to be essentially limitless meaning that
AWS handle the networking and compute requirements themselves. However, they do set service limits to stop 
customers from accidentally over-provisioning resources. See [AWS Service Limits](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).
Service Limits on individual accounts, however, can be raised.  Customers simply need to contact Amazon to change
a specific limit on their account.


##### Questions

As an architect, you should ask the following questions when evaluating the `foundation` of system `reliability`:

1.  __How are you managing AWS service limits for your account?__ _Is there someone in charge of that? Is there a 
    change control process? Are you even aware of the service limits? Are you hitting them?_
2.  __How are you planning your network topology on AWS?__ _What is the physical or logical layout of a network?_
3.  __Do you have an escalation path to deal with technical issues?__ _Do you have a technical account manager? And
    if not, should you upgrade your level of service with AWS to have a technical account manager?_    


#### Change Management

You need to be aware of how change affects a system so that you can plan proactively around it. Monitoring allows you 
to detect any changes to your environment and react. In traditional systems, change control is done manually and
are carefully coordinated with auditing.

With AWS things are a lot easier, you can use CloudWatch to monitor your environment and services such as autoscaling
to automate change in response to changes on your production environment.


##### Questions

As an architect, you should ask the following questions when establishing `reliable change management` in a new system:

1.  How does your system adapt to change in demand?
2.  How are you monitoring AWS resources?
3.  How are you executing change management?


#### Failure Management

With cloud, you should always architect your systems with the assumptions that failures will occur. You should become
aware of these failures, how they have occurred, how to respond to them and then plan on how to prevent these from 
happening again.


##### Questions

As an architect, you should ask the following questions when establishing `reliable failure management` in a new system:

1.  How are you backing up your data?
2.  How does your system withstand component failures?
3.  How are you planning for recovery?


### Key AWS Services

By area, architecting `reliability` into a new systems involves the following services.

* `Foundation` - Security > IAM, Networking > VPC
* `Change Management` - Management > Cloud Trail
* `Failure Management` - Management > Cloud Formation


## Exam Tips

Know the 3 areas of reliability and the questions associated with each.

 
### Review Questions

1.  What is the reliability pillar?
2.  What is a real world example of testing recovery procedures? 
3.  What is a common failure of on-premise systems? 
4.  What is the downside of under provisioning? 
5.  What is the downside of over provisioning? 
6.  What are the 4 design principles of `reliability`? 
7.  What are the 3 areas that define `reliability` in the cloud? 
8.  In traditional IT what is foundation of system `reliability`?
9.  In the cloud, how does the foundation of system `reliability` change? 
10. Why are there limits in the cloud?
11. As an architect, what 3 questions should ask when evaluating the `foundation` of system `reliability`?
12. In traditional IT, how is `change management` handled?
13. How is `change management` simplified in the cloud?
14. What is a real world example of how `change management` is simplified in the cloud?
15. As an architect, what 3 questions should you ask in order to establish `reliable change management`?
16. How does Netflix implement `Failure Management` in their systems?
17. What assumption must be made in order to insure that `Failure Managment` is factored into the `reliability` of
    a new system?
18. As an architect, what 3 questions should you ask in order to establish `reliable failure management`?
19. What 2 services are used to build a `reliable foundation` for a new cloud based system?
20. What service is used to insure `reliable change management`?
21. What service is used to insure `reliable failure management`?


### Answers

1.  The reliability pillar covers the ability of a system to recover from service or infrastructure outages/disruptions as 
    well as the ability to dynamically acquire computing resources to meet demand.
2.  Netflix Simian Army => https://github.com/Netflix/SimianArmy
3.  You have to guess capacity
4.  Outage
5.  Unused resources
6.  (1) Test recovery procedures; (2) Automatically recover from failure; (3) Scale horizontally to increase aggregate 
    system availability; (4) Stop guessing capacity
7.  (1) Foundation; (2) Change Management; (3) Failure Management
8.  bandwidth-- aka the size of the com link (`pipe`) between your data center and HQ
9.  Although there are limits, the cloud is designed to be essentially limitless meaning that AWS handle the networking 
    and compute requirements themselves.
10. To prevent customers from over-provisioning resources.
11. (1) How are you managing AWS service limits for your account? (2) How are you planning your network topology on AWS?
    (3) Do you have an escalation path to deal with technical issues?
12. In traditional systems, change control is done manually and are carefully coordinated with auditing.
13. CloudWatch; AutoScaling
14. Adding more memory to a database server. In the cloud you could change the machine type of your system to one that
    is memory optimized.
15. (1) How does your system adapt to change in demand? (2) How are you monitoring AWS resources? (3) How are you 
    executing change management?
16. They deliberately introduce failure into their production environment
17. Failure have and will occur
18. (1) How are you backing up your data? (2) How are you monitoring AWS resources? (3) How are you planning for recovery?
19. Security > IAM; Networking > VPC 
20. Management > Cloud Trail
21. Management > Cloud Formation


### Well Architected Framework Reliability Flash Card Deck
  
 To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  
  <table>
  <tr>
  <td>
  <b><a href="whitepapers-waf-reliability-flashcards.txt" download="whitepapers-waf-relability-flashcards.txt">Well Architected Framework Reliability - Flash Card Deck</a></b>
  </td>
  </tr>
  </table>
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](whitepapers-waf-security.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](whitepapers-waf-perf-efficiency.md)**
