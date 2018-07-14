Well Architected Framework (Operational Excellence)
======

14 minute lecture on the Operational Excellence section of the [AWS Well Architected Framework (68 Pages)](https://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf) White Paper.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/G4ZK8es.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/223c8538-772d-867a-a3c9-52f71df9e637/3559e34f-ec6a-fc29-c58e-3ff21d8859b7/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Operational Excellence Pillar

The operational excellence pillar includes operational practices and procedures used to manage production workloads.
This includes how planned changes are executed, as well as responses to unexpected operational events. Change
execution and responses should be automated. All processes and procedures of operational excellence should be
documented, tested, and regularly reviewed.


### Design Principles

Six principles comprise `operational excellence` design:

* Perform operations with code
* Align operations processes to business objectives
* Make regular, small, incremental changes
* Test for responses to unexpected events
* Learn from operational events and failures
* Keep operations procedures current


### Definition

There are three best practice areas for `operational excellence` in the cloud:

* Preparation
* Operation
* Response


#### Preparation

Effective preparation is required to drive operational excellence. Operations checklists will ensure that workloads
are ready for production operation, and prevent unintentional production promotion without effective preparation.
Workloads should have:

* `Runbooks` - Operations guidance that operations teams can refer to so they can perform normal daily tasks
* `Playbooks` - Guidance for responding to unexpected operational events. Playbooks should include response plans, as
  well as escalation paths and stakeholder notifications.
  
In AWS there are several methods, services, and features that can be used to support operational readiness, and the
ability to prepare for normal day-to-day operations as well as unexpected operational events. `CloudFormation` can
be used to ensure that environments contain all required resources when deployed in production, and that the 
configuration of the environment is based on tested best practices, which reduces the opportunity for human
error.

Implementing `Auto Scaling`, or other automated scaling mechanisms, will allow workloads to automatically respond when 
business-related events affect operational needs.

Services like `AWS Config` with the AWS Config rules feature create mechanisms to automatically track and respond to 
changes in your AWS workloads and environments.

It is also important to use features like `tagging` to make sure all resources in a workload can be easily identified
when needed during operations and responses.

Be sure that documentation does not become stale or out of date as procedures change. Also make sure that is 
thorough. Documentation includes:

* application designs
* environment configurations
* resource configurations
* response plans
* mitigation plans

Without all of this detail, documentation is not complete. If documentation is not updated and tested regularly, it will
not be useful when unexpected operational events occur. If workloads are not reviewed before production, operations
will be affected when undetected issues occur. If resources are not documented, when operational events occur, 
determining how to respond will be more difficult while the correct resources are identified.


##### Questions

As an architect, you should ask the following questions to insure effective `preparation`:

* What best practices for cloud operations are you using?
* How are you doing configuration management for your workload?


#### Operations

Operations should be standardized and manageable on a routine basis. The focus should be:
 
* automation
* small frequent changes
* regular quality assurance testing
* defined mechanisms to track, audit, roll back, and review changes
 
Operational change should not be:

* large and infrequent
* require scheduled downtime
* require manual execution 

A wide range of logs and metrics that are based on key operational indicators for a workload should be collected 
and reviewed to ensure continuous operations.


##### Real World Example

Microsoft Windows 10 is an example of manageable operational change. Prior to its release, new versions of Windows 
were large. For example, remember the fun of going from Windows 3.x to Windows 95. From Windows 10 onward, Microsoft 
simply pushes out small incremental changes. 


##### CI/CD Pipeline

In AWS you can setup a `Continuous Integration / Continuous Deployment` (CI/CD) pipeline consisting of:

* Source Code Repository
* Build Systems
* Deployment 
* Testing Automation


##### Release Management

Release management processes should be:

* Tested (manual or automated)
* Based on small incremental changes
* Based on tracked versions
* In the face of `operational issues`, able to be reverted without causing `operational impact`

Routine operations, as well as responses to unplanned events, should be automated. Manual process should be avoided 
for:

* Deployment
* Release Management
* Changes
* Rollbacks

Releases should not be large batches that are done infrequently. Rollbacks are more difficult in large changes, and
failing to have a rollback plan, or the ability to mitigate failure impacts, will prevent continuity of operations.

Align monitoring to business needs, so that the responses are effective at maintaining business continuity. Monitoring
that is ad hoc and not centralized, with responses that are manual, will cause more impact to operations during 
unexpected events.


##### Questions

The following questions focus on operations considerations for operational excellence:

* How are evolving your workload while minimizing the impact of change?
* How do you monitor your workload to ensure it is operating as expected?


#### Responses

Responses to unexpected operational events should be automated. This is not just for alerting, but also for mitigation,
remediation, rollback, and recovery. Alerts should be timely, and should invoke escalations when responses are not
adequate to mitigate the impact of operational events. Quality assurance mechanisms should be in place to automatically
roll back failed deployments. Responses should follow a pre-defined playbook that includes stakeholders, the 
escalation process, and procedures. Escalation paths should be defined and include both functional and hierarchical 
escalation capabilities. Hierarchical escalation should be automated, and escalate priority should result in
stakeholder notifications.

In AWS there are several mechanisms to ensure both appropriate alerting and notification in response to unplanned 
operational events, as well as automated responses


##### Questions

The following questions should be asked/answered to insure effective operational `responses`:

* How do you respond to unplanned operational events?
* How is escalation managed when responding to unplanned operational events?


### Key AWS Services

By area, `operational excellence` architecture targets the following services:

* `Preparation` - __AWS Config__ provides a detailed inventory of your AWS resources and configuration, and 
  continuously records configuration changes. __Service Catalog__ helps to create a standardized set of 
  service offerings that are aligned to best practices. Designing workloads that use automation with services
  like Auto Scaling, and __SQS__, are good methods to ensure continuous operations in the event of 
  unexpected operational events.
* `Operations` - __CodeCommit__, __CodeDeploy__, and __CodePipeline__ can be used to manage and automate code
  changes to AWS workloads. Use AWS SDKs or third-party libraries to automate operational changes. Use
  __CloudTrail__ to audit and track changes made to AWS environments.
* `Responses` - Take advantage of all of the __CloudWatch__ service features for effective and automated
  responses. CloudWatch alarms can be used to set thresholds for alerting and notification, and CloudWatch 
  events can trigger notifications and automated responses.
  
 

## Exam Tips

Know the 3 areas of `operational excellence` and the questions associated with each.

 
### Review Questions

1.  What is the `operational excellence` pillar?
2.  What 6 principles comprise `operational excellence` design?
3.  What are the 3 best practice areas of `operational excellence` in the cloud?
4.  What is a Runbook?
5.  What is a Playbook?
6.  What is an Operations checklist?
7.  What 4 services/features that can be used to achieve `operational excellence`? How?
8.  What are 5 types of documentation?
9.  Why must you insure that documentation does not become stale or out of date as procedures change?
10. What happens if resources are not documented?
11. As an architect, what 2 questions should you ask to insure effective `preparation`?
12. What are the two characteristics that should define `operations`?
13. What are the 4 focuses to insure effective `operations`?
14. What should `operational change` not be? (3)
15. How do you ensure continous operations?
16. What is an example of manageable operational change?
17. What is a `CI/CD Pipeline`? What are its 4 component parts?
18. What should release management processes be? (4) 
19. Routine operations, as well as responses to unplanned events, should be ____.
20. With regard to Release Management, where should manual processes be avoided? (4)
21. What will prevent continuity of operations? (2)
22. Why should monitoring be aligned to business needs?
23. Monitoring that is ad hoc and not centralized, with responses that are manual, will cause ____.
24. Responses to unexpected operational events should be ____.
25. Hierarchical escalation should be ____, and escalate priority should result in ____ ____.
26. As an architect, what 2 questions should you ask to insure effective operational `responses`?
27. What are the key services used for `Preparation`?
28. What are the key services used for `Operations`?
29. What are the key services used for `Responses`?

 
### Answers

1.  The operational excellence pillar includes operational practices and procedures used to manage production workloads.
    This includes how planned changes are executed, as well as responses to unexpected operational events. Change
    execution and responses should be automated. All processes and procedures of operational excellence should be
    documented, tested, and regularly reviewed.
2.  (1) Perform operations with code; (2) Align operations processes to business objectives; (3) Make regular, small, 
    incremental changes; (4) Test for responses to unexpected events; (5) Learn from operational events and failures;
    (6) Keep operations procedures current
3.  (1) Preparation; (2) Operation; (3) Response
4.  Operations guidance that operations teams can refer to so they can perform normal daily tasks
5.  Guidance for responding to unexpected operational events. Playbooks should include response plans, as well as 
    escalation paths and stakeholder notifications.
6.  Operations checklists will ensure that workloads are ready for production operation, and prevent unintentional 
    production promotion without effective preparation.
7.  Cloud Formation, Autoscaling, AWS Config, Tagging; `CloudFormation` can be used to ensure that environments contain 
    all required resources when deployed in production, and that the configuration of the environment is based on tested 
    best practices, which reduces the opportunity for human error. Implementing `Auto Scaling`, or other automated 
    scaling mechanisms, will allow workloads to automatically respond when business-related events affect operational 
    needs. Services like `AWS Config` with the AWS Config rules feature create mechanisms to automatically track and 
    respond to changes in your AWS workloads and environments. It is also important to use features like `tagging` 
    to make sure all resources in a workload can be easily identified when needed during operations and responses.
8.  (1) Application designs; (2) Environment configurations; (3) Resource configurations; (4) Response plans;
    (5) Mitigation plans
9.  If documentation is not updated and tested regularly, it will not be useful when unexpected operational events 
    occur.
10. If resources are not documented, when operational events occur, determining how to respond will be more difficult 
    while the correct resources are identified.
11. (1) What best practices for cloud operations are you using? (2) How are you doing configuration management for 
    your workload?
12. Standardized and manageable
13. (1) Automation; (2) Small frequent changes; (3) Regular quality assurance testing; (4) Defined mechanisms to 
    track, audit, roll back, and review changes
14. (1) Large and infrequent; (2) Require scheduled downtime; (3) Require manual execution
15. A wide range of logs and metrics that are based on key operational indicators for a workload should be collected 
    and reviewed to ensure continuous operations.
16. Microsoft Windows 10 is an example of manageable operational change. Prior to its release, new versions of Windows 
    were large. For example, remember the fun of going from Windows 3.x to Windows 95. From Windows 10 onward, Microsoft 
    simply pushes out small incremental changes.
17. Continuous Integration / Continuous Deployment; (1) Source Code Repository; (2) Build Systems; 
    (3) Deployment; (4) Testing Automation
18. (1) Tested (manual or automated); (2) Based on small incremental changes; (3) Based on tracked versions;
    (4) In the face of `operational issues`, able to be reverted without causing `operational impact`
19. Automated.
20. (1) Deployment; (2) Release Management; (3) Changes; (4) Rollbacks
21. (1) Failing to have a rollback plan; (2) The ability to mitigate failure impacts
22. So that the responses are effective at maintaining business continuity
23. More impact to operations during unexpected events.
24. Automated.
25. Automated; Stakeholder notifications
26. (1) How do you respond to unplanned operational events? (2) How is escalation managed when responding to 
    unplanned operational events?
27. Management > Config; Management > Service Catalog; Application > SQS
28. Developer Tools > CodeCommit; Developer Tools > CodeDeploy; Developer Tools > CodePipeline; 
    Management Tools > CloudTrail
29. Management Tools > CloudWatch
 

### Well Architected Framework Operational Excellence Flash Card Deck
  
 To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  

  <table>
   <tr>
   <td>
   <b><a href="whitepapers-waf-ops-excellence-flashcards.txt" download="whitepapers-waf-ops-excellence-flashcards.txt">Well Architected Framework Operation Excellence - Flash Card Deck</a></b>
   </td>
   </tr>
   </table>
     
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](whitepapers-waf-cost-optimization.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](whitepapers-waf-ops-excellence.md)**
