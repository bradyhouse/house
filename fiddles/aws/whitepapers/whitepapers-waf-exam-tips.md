Well Architected Framework (Exam Tips)
======

8 minute lecture summarizing what you need know from the [AWS Well Architected Framework (68 Pages)](https://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf) White Paper
in prep for the Exam.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/PPpkRie.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/223c8538-772d-867a-a3c9-52f71df9e637/4a191506-ab5d-029f-57b3-a7ba15fdfc1b/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*
 

## Exam Tips

The Well-Architected Framework consists of 5 pillars:

* Security
* Reliability
* Performance efficiency
* Cost optimization
* Operational excellence


### Security

`Security` in the cloud consists of 4 areas:

* Data protection
* Privilege management
* Infrastructure protection
* Detective controls


#### Questions

* Data protection
  1.  How are you encrypting and protecting your data at rest?
  2.  How are you encrypting and protecting your data in transit? (SSL)
* Privilege management
  1.  How are you protecting access to and use of the AWS root account credentials?
  2.  How are you defining roles and responsibilities of system users to control human access to the AWS Management
      Console and APIs?
  3.  How are you limiting automated access (such as from applications, scripts or third party tools or services) to
      AWS resources?
  4.  How are you managing keys and credentials?    
* Infrastructure protection
  1.  How are you enforcing network and host-level boundary protection?
  2.  How are you enforcing AWS service level protection?
  3.  How are you protecting the integrity of the operating systems on your Amazon EC2 instances?
* Detective controls
  1.  How are you capturing and analyzing your AWS logs?
  

### Reliability

`Reliability` in the cloud consists of 3 areas:

* Foundations
* Change management
* Failure management


#### Questions

* Foundations
  1.  How are you managing AWS service limits for your account?
  2.  How are you planning your network topology on AWS?
  3.  Do you have an escalation path to deal with technical issues?
* Change management
  1.  How does your system adapt to change in demand?
  2.  How are you monitoring AWS resources?
  3.  How are you executing change management?
* Failure management
  1.  How are you backing up your data?
  2.  How does your system withstand component failures?
  3.  How are you planning for recovery?
  
 
### Performance efficiency
 
`Performance efficiency` in the cloud consists of 4 areas:
 
* Compute
* Storage
* Database
* Space-time trade-off
  

#### Questions

* Compute
  1.  How do you select the appropriate instance type for your system?
  2.  How do you ensure that you continue to have the most appropriate instance type as new instance types and 
      features are introduced?
  3.  How do you monitor your instances post launch to ensure they are performing as expected?
  4.  How do you ensure that the quantity of your instances match the demand?
* Storage
  1.  How do you select the appropriate storage solution for your system?
  2.  How do you ensure that you continue to have the most appropriate storage solution as new storage solutions and
      features are launched?
  3.  How do you monitor your storage solution to ensure it is performing as expected?
  4.  How do you ensure that the capacity and throughput of your storage solutions matches demand?
* Database
  1.  How do you select the appropriate database solution for your system?
  2.  How do you ensure that you continue to have the most appropriate database solution and features as new database
      solution and features are launched?
  3.  How do you monitor your databases to ensure performance is as expected?
  4.  How do you ensure the capacity and throughput of your databases matches demand?
* Space-time trade-off
  1.  How do you select the appropriate proximity and caching solution for your system?
  2.  How do you ensure that you continue to have the most appropriate proximity and caching solutions as new solutions are
      launched?
  3.  How do you monitor your proximity and caching solutions to ensure performance is as expected?
  4.  How do you ensure that the proximity and caching solutions you have matches demand?
  

### Cost Optimization

`Cost optimization` in the cloud consists of 4 areas:

* Matched supply and demand
* Cost-effective resources
* Expenditure awareness
* Optimizing over time


#### Questions

* Matched supply and demand
  1.  How do you make sure your capacity matches but does not substantially exceed what you need?
  2.  How are you optimizing your usage of AWS services?
* Cost-effective resources
  1.  Have you selected the appropriate resource types to meet your cost targets?
  2.  Have you selected the appropriate pricing model to meet your cost targets?
  3.  Are there managed services (higher-level services than Amazon EC2, Amazon EBS, and Amazon S3) that you can use to
      improve your ROI?
* Expenditure awareness
  1.  What access controls and procedures do you have in place to govern AWS costs?
  2.  How are you monitoring usage and spending?
  3.  How do you decommission resources that you no longer need, or stop resources that are temporarily not needed?
  4.  How do you consider data-transfer charges when designing your architecture?
* Optimizing over time
  1.  How do you manage and/or consider the adoption of new services?
  

### Operation Excellence

`Operational excellence` in the cloud consists of 3 areas:

* Preparation
* Operation
* Response


#### Questions

* Preparation
  1.  What best practices for cloud operations are you using?
  2.  How are you doing configuration management for your workload?
* Operation
  1.  How are evolving your workload while minimizing the impact of change?
  2.  How do you monitor your workload to ensure it is operating as expected?
* Response
  1.  How do you respond to unplanned operational events?
  2.  How is escalation managed when responding to unplanned operational events?
 
 
### Review Questions

1.  What are the 5 pillars?
2.  What 4 areas does `Security` consist of?
3.  As an architect, what two questions should you ask about `Data Protection`?
4.  As an architect, what 4 questions should you ask about `Privilege Management` when building a new system? 
5.  As an architect, what 3 questions should you ask about `Infrastructure Protection`?
6.  As an architect, what 1 question should you ask about `Detective Controls`?
7.  What 3 areas does `Reliability` consist of?
8.  As an architect, what 3 questions should ask when evaluating the `foundation` of system `reliability`?
9.  As an architect, what 3 questions should you ask in order to establish `reliable change management`?
10. As an architect, what 3 questions should you ask in order to establish `reliable failure management`?
11. What 4 areas does `Performance Efficiency` in the cloud consist of?
12. As an architect, what 4 questions should ask when evaluating the `compute performance efficiency`?
13. As an architect, what 4 questions should ask when evaluating the `storage performance efficiency`?
14. As an architect, what 4 questions should ask when evaluating the `database performance efficiency`?
15. As an architect, what 4 questions should ask when evaluating `latency performance efficiency`?
16. What 4 areas define `Cost Optimization` in the cloud?
17. As an architect, what 2 questions should you ask when evaluating the `cost optimization of supply and demand`?
18. As an architect, what 3 questions should you ask when evaluating `resource cost optimization`?
19. As an architect, what 4 questions should you ask when evaluating `expenditure awareness optimization`?
20. As an architect, what 1 question should you ask when evaluating `optimization overtime`?
21. What are the 3 best practice areas of `operational excellence` in the cloud?
22. As an architect, what 2 questions should you ask to insure effective `preparation`?
23. As an architect, what 2 questions should you ask to insure effective `operation`?
24. As an architect, what 2 questions should you ask to insure effective operational `responses`?


### Answers

1.  (1) Security; (2) Reliability; (3) Performance efficiency; (4) Cost optimization; (5) Operational excellence
2.  (1) Data protection; (2) Privilege management; (3) Infrastructure protection; (4) Detective controls
3.  (1) How are you encrypting and protecting your data at rest? (2) How are you encrypting and protecting your data in 
    transit? (SSL)
4.  (1) How are you protecting access to and use of the AWS root account credentials? (2) How are you defining roles 
    and responsibilities of system users to control human access to the AWS Management Console and APIs? (3) How are 
    you limiting automated access (such as from applications, scripts, or third-party tools or services) to AWS 
    resources? (4) How are you managing keys and credentials?
5.  (1) How are you enforcing network and host-level boundary protection? (2) How are you enforcing AWS service level 
    protection? (3) How are you protecting the integrity of the operating systems on your EC2 instances?
6.  How are you capturing and analyzing AWS logs?
7.  (1) Foundations; (2) Change management; (3) Failure management
8.  (1) How are you managing AWS service limits for your account? (2) How are you planning your network topology on AWS?
    (3) Do you have an escalation path to deal with technical issues?
9.  (1) How does your system adapt to change in demand? (2) How are you monitoring AWS resources? (3) How are you 
    executing change management?
10. (1) How are you backing up your data? (2) How are you monitoring AWS resources? (3) How are you planning for 
    recovery?
11. (1) Compute; (2) Storage; (3) Database; (4) Space-Time Trade-off
12. (1) How do you select the appropriate instance type for your system? (2) How do you ensure that you 
    continue to have the most appropriate instance type as new instance types and features are introduced?
    (3) How do you monitor your instances post launch to ensure they are performing as expected? (4) How do you ensure 
    that the quantity of your instances match the demand?
13. (1) How do you select the appropriate storage solution for your system? (2) How do you ensure that you continue to 
    have the most appropriate storage solution as new storage solutions and features are launched? (3) How do you 
    monitor your storage solution to ensure it is performing as expected? (4) How do you ensure that the capacity and 
    throughput of your storage solutions matches demand?
14. (1) How do you select the appropriate database solution for your system? (2) How do you ensure that you continue to 
    have the most appropriate database solution and features as new database solution and features are launched?
    (3) How do you monitor your databases to ensure performance is as expected? (4) How do you ensure the capacity and 
    throughput of your databases matches demand?
15. (1) How do you select the appropriate proximity and caching solution for your system? (2) How do you ensure that you
    continue to have the most appropriate proximity and caching solutions as new solutions are launched? (3) How do you 
    monitor your proximity and caching solutions to ensure performance is as expected? (4) How do you ensure that the 
    proximity and caching solutions you have matches demand?
16. (1) Matched supply and demand; (2) Cost-effecive resources; (3) Expenditure awareness; (4) Optimizing over time
17. (1) How do you make sure your capacity matches but does not substantially exceed what you need? (2) How are you 
    optimizing your usage of AWS services?
18. (1) Have you selected the appropriate resource types to meet your cost targets? (2) Have you selected the 
    appropriate pricing model to meet your cost targets? (3) Are there managed services (higher-level services than 
    Amazon EC2, Amazon EBS, and Amazon S3) that you can use to improve your ROI?
19. (1) What access controls and procedures do you have in place to govern AWS costs? (2) How are you monitoring usage 
    and spending? (3) How do you decommission resources that you no longer need, or stop resources that are temporarily 
    not needed? (4) How do you consider data-transfer charges when designing your architecture?
20. How do you manage and/or consider the adoption of new services?
21. (1) Preparation; (2) Operation; (3) Response
22. (1) What best practices for cloud operations are you using? (2) How are you doing configuration management for 
    your workload?
23. (1) How are evolving your workload while minimizing the impact of change? (2) How do you monitor your workload to 
    ensure it is operating as expected?
24. (1) How do you respond to unplanned operational events? (2) How is escalation managed when responding to 
    unplanned operational events?  


### Well Architected Framework Exam Tips Flash Card Deck
  
 To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  
   <table>
   <tr>
   <td>
   <b><a href="whitepapers-waf-exam-tips-flashcards.txt" download="whitepapers-waf-exam-tips-flashcards.txt">Well Architected Framework Exam Tips - Flash Card Deck</a></b>
   </td>
   </tr>
   </table>
     
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](whitepapers-waf-ops-excellence.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](../exam-tips/exam-tips-feedback.md)**
