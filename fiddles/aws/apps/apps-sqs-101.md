<img src="https://i.imgur.com/jDVKrPq.png" height="100" title="AWS SQS" />


Application Services: Simple Que Services 101
======

13 Minute Lecture introducing Simple Queue Service (SQS). 
 
  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/HUEkJcw.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/application-services/sqs/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is SQS?

Amazon SQS is a web service that gives you access to a message queue that can be used to store messages while
waiting for a computer to process them.  It is a distributed queue system that enables web service applications
to quickly and reliably queue messages that one component in the application generates to be consumed by another
component. A queue is a temporary repository for messages that are awaiting processing.


### MEME Website Example

<table>
<tr>
<td>
 <img src="https://i.imgur.com/UPj7JT4.png" height="250" title="SQS Meme Example" />
</td>
</tr>
</table>


Using SQS, you can decouple the components of an application so they run independently, with SQS easing message
management between components. Any component of a distributed application can store messages in a fail-safe
queue. Messages can contain up to 256 KB of text in any format. Any component can later retrieve the
messages programmatically using the SQS API.

The queue acts as a buffer between the component producing and saving data, and the component receiving the data
for processing. This means the queue resolves issues that arise if the producer is producing work faster than
the consumer can process it, or if the producer or consumer are only intermittently connected to the network.

There are two types of Queues: 

* Standard Queues (default)
* Fifo Queues


### Standard Queues

    TBW

 
### Fifo Queues

    TBW
    
     
## Exam Tips

What did we learn?

    TBW

     
### Review Questions

1.  What type (think "direction") of messaging service is SQS? What is the alternative?
2.  What is the `visibility timeout`? 
3.  What is the size and format constraints of SQS messages? 
4.  How does SQS introduce `elasticity` to applications?
5.  What are the two types of Queues?


### Answers

1.  Poll Service; Simple Notification Service (SNS)
2.  Period of time before a processed message is returned to the queue (made visible) and can be reprocessed
3.  256 KB; text
4.  Autoscaling integration based on queue state
5.  Standard (default) and Fifo
 
## 

**[Previous Lab/Lecture](../vpc/vpc-exam-tips.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](apps-sqs-101.md)**








