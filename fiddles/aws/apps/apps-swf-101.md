<img src="https://i.imgur.com/p4Fd1bv.png" height="100" title="AWS SWF" />


Simple Workflow Service 101
======

8 Minute Lecture introducing Simple Workflow Service (SWF). 
 
  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/gPIWah5.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/application-services/swf/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is SWF?

Amazon Simple Workflow Service (Amazon SWF) is a web service that makes it easy to coordinate work across distributed 
application components. It enables applications for a range of use cases, including media processing, web
application back-ends, business process workflows, and analytics pipelines, to be designed as a 
coordination of tasks.

Tasks represent invocations of various processing steps in an application which can be performed by executable code,
web service calls, human actions, and scripts.


## Order Fulfillment Example

<table>
<tr>
<td>
 <img src="https://i.imgur.com/pxBwQRa.png" height="250" title="SWF Example" />
</td>
</tr>
</table>


## Workers & Deciders

Workers are programs that interact with SWF to get tasks, process received tasks, and return the results. Deciders are 
programs that control the coordination of tasks--i.e. their ordering, concurrency, and scheduling according to 
application logic.

The workers and deciders can run on cloud infrastructure, such as Amazon EC2, or on machines behind firewalls. SWF
brokers the interactions between workers and the deciders. It allows the decider to get consistent views into the 
progress of tasks and to initiate new tasks in an ongoing manner. 

At the same time, SWF stores tasks, assign them to workers when they are ready, and monitor their progress. It ensures
that a task is assigned only once and is never duplicated. Since SWF maintains the application's state durably, 
workers and deciders don't have to keep track of execution state. They can run independently, and scale quickly.


## SWF Domains

Your workflow and activity types and the workflow execution itself are all scoped to a domain. Domains isolate a set
of types, executions, and task lists from others within the same account. You can register a domain by using the
AWS Management Console or by using the RegisterDomain action in the SWF API.


## How Long for Workflows?

Maximum Workflow can be 1 year and the value is always measured in seconds.


## SWF vs SQS

* SWF presents a task-oriented API, whereas SQS offers a message-oriented API
* SWF ensures that a task is assigned only once and is never duplicated. With SQS, you to handle duplicated messages
  and may also need to ensure that a message is processed only once
* SWF keeps track of all tasks and events in an application. With SQS you need to implement your own application-level
  tracking, especially if your application uses multiple queues

     
## Exam Tips

What did we learn?

* SWF will probably come up in 1 or 2 questions
* Remember
  * If the question involves human interaction, use SWF
  * If the question involves `domains` use SWF
  * If the question describes a process longer than 12 hours, then its SWF

     
### Review Questions

1.  What is SWF?
2.  What are 4 use cases that SWF can be used for?
3.  Where does Amazon use SWF (internally)?
4.  What is a worker? What does it do? (3)
5.  What is a decider? What does it do? (3)
6.  Are workers and deciders limited to cloud infrastructure?
7.  What is the main difference between SQS and SWF?
8.  What is an SWF domain?
9.  How do register a domain?
10. What is maximum allowed duration of a Workflow?
11. What unit of time is workflow durration measured in?
12. How are the SWF and SQS API's different in orientation?


### Answers

1.  Simple Workflow Service. Web service for coordinating work across distributed application components.
2.  Media processing; web application back-ends; business process workflows; analytic pipelines
3.  Fulfillment warehouses
4.  A program that interacts with SWF; (1) get tasks, (2) process received tasks, (3) returns results
5.  A program that controls the coordination of tasks; (1) orders tasks, (2) controls concurrency of tasks, 
    (3) schedules tasks
6.  No.
7.  SWF tasks are only assigned once and it is never duplicated. SQS does have a task visibility timeout but tasks
    can assigned multiple times as well as duplicated.
8.  Its a `container` which isolates a set of types, executions, and task lists from others within the same account
9.  RegisterDomain action in the SWF API
10. 1 year
11. seconds
12. The SWF API is task oriented; the SQS API is message oriented

 
## 

**[Previous Lab/Lecture](apps-sqs-101.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](apps-sns-101.md)**








