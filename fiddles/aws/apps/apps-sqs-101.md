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

<table>
<tr>
<td>
 <img src="https://i.imgur.com/GH21rQD.png" height="150" title="Standard Queue Pattern" />
</td>
</tr>
</table>


Amazon SQS offers standard as the the default queue type. A standard queue let you have a nearly-unlimited number    
of transactions per second. They guarantee that a message is delivered at least once. However, occasionally (because 
of highly-distributed architecture that allows high throughput), more than one copy of a message might be delivered  
out of order. Standard queues provide best-effort ordering which ensures that messages are generally delivered       
in the same order as they are sent.                                                                                  
                                                                                                                     
 
### FIFO Queues

<table>
<tr>
<td>
 <img src="https://i.imgur.com/YxEc70C.png" height="100" title="FIFO Queue Pattern" />
</td>
</tr>
</table>


First In First Out (FIFO) Queues compliment the standard queue. The most important feature of this queue type is
FIFO delivery and exactly once processing: The order in which messages are sent and received is strictly preserved
and a message is delivered once and remains available until a consumer processes and deletes it; duplicates are
not introduced into the queue. FIFO queues also support message groups that allow multiple ordered message groups
within a single queue. FIFO queues are limited to 300 transactions per second (TPS), but have all the capabilities
of a standard queue.


     
## Exam Tips

What did we learn?

* SQS is pull based, not push based
* Messages are 256 KB is size
* Messages can be kept in the queue from 1 minute to 14 days. The default is 4 days
* Visibility Time Out is the amount of time that the message is invisible in the SQS queue after a reader picks up
  that message. Provided the job is processed before the visibility time out expires, the message is then deleted
  from the queue. If the job is not processed within that time, the message will become visible again and another
  reader will process it. This could result in the same message being delivered twice
* Visibility timeout maximum is 12 hours
* SQS guarantees that your messages will be processed at least once
* Amazon SQS long polling is a way to retrieve messages from your Amazon SQS queue. While the regular short polling
  returns immediately, even if the message queue being polled is empty, long polling doesn't return a response until
  a message arrives in the message queue, or the long polling times out
  

     
### Review Questions

1.  What type (think "direction") of messaging service is SQS? What is the alternative?
2.  What is the `visibility timeout`? 
3.  What is the size and format constraints of SQS messages? 
4.  How does SQS introduce `elasticity` to applications?
5.  What are the two types of Queues? 
6.  What is per second limit for messages sent via a standard queue?
7.  In what order are messages sent in a standard queue? Is this guaranteed-- why or why not?
8.  If order is not guaranteed, then how is it described?
9.  What is guaranteed about a standard queue?
10. What is the most important feature of a FIFO Queue? (2)
11. Can duplicate messages be added to a FIFO Queue? To a Standard Queue?
12. What is TPS?
13. What is the TPS of a standard Queue? FIFO Queue? 
14. What other feature do FIFO Queue provide?
15. Despite their TPS, do FIFO Queue offer all the capabilities of a Standard Queue?
16. Are FIFO Queues covered on the exam?
17. Is SQS push or pull?
18. What is the max, min, average time that a message can remain in SQS?
19. If a message processing job does not complete within the configured timeout what happens?
20. What is the maximum visibility timeout?
21. What does SQS guarantee?
22. What is SQS long polling?


### Answers

1.  Pull Service; Simple Notification Service (SNS)
2.  Period of time before a processed message is returned to the queue (made visible) and can be reprocessed
3.  256 KB; text
4.  Auto-scaling integration based on queue state
5.  Standard (default) and Fifo
6.  Nearly unlimited
7.  Order in which they are received; no. Highly-distributed architecture, which allows for high throughput, can result
    in more than one copy of a message might be delivered out of order
8.  "best-effort ordering which ensures that messages are generally delivered in the same order as they are sent."
9.  Every message is delivered at least once
10. FIFO; exactly once processing
11. No; Yes
12. Transactions Per Second
13. Nearly Unlimited; 300
14. Message groups that allow multiple ordered message groups within a single queue
15. Yes
16. Probably not -- too new
17. Pull
18. 14 days; 1 minute; 4 days
19. The message remains in the queue and can be delivered to another reader
20. 12 hours
21. Your message is processed at least once
22. A way to retrieve messages from your Amazon SQS queue that doesn't return a response until a message arrives in 
    the message queue, or the long polling times out

 
## 

**[Previous Lab/Lecture](../vpc/vpc-exam-tips.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](aps-swf-101.md)**








