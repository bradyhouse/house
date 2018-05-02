<img src="https://i.imgur.com/jDVKrPq.png" height="100" title="AWS SQS" />&nbsp;
<img src="https://i.imgur.com/p4Fd1bv.png" height="100" title="AWS SWF" />&nbsp;
<img src="https://i.imgur.com/XylaLYv.png" height="100" title="AWS SNS" />&nbsp;
<img src="https://i.imgur.com/CXndVd9.png" height="100" title="AWS Elastic Transcoder" />&nbsp;
<img src="https://i.imgur.com/65Y0F0D.png" height="100" title="AWS API Gateway" />&nbsp;
<img src="https://i.imgur.com/uwXHG63.png" height="100" title="AWS Kinesis" />


Apps Exam Tips
======

10 minute lecture summarizing what you need to know about Amazon's collection of application services for the exam. This
includes `SNS`, `SQS`, `SWF`, `Elastic Transcode`, `API Gateway`, and `Kinesis` for the exam.
 
  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/h9v81Hg.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/application-services/summary/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is SQS?

Amazon SQS is a web service that gives you access to a message queue that can be used to store messages while waiting
for a computer to process them.


### SQS - Exam Tips

* SQS is pull based, not pushed base
* Messages are 256 KB in size
* Messages can be kept in the queue from 1 minute to 14 days. The default is 4 days
* Visibility Time Out is the amount of time that the message is invisible in the SQS queue after a reader picks up
  that message. Provided the job is processed before the visibility time out expires, the message will then be
  deleted from the queue. If the job is not processed within that time, the message will become visible again and
  another reader will process it. This could result in the same message being delivered twice.
* Visibility time out maximum is 12 hours


#### SQS - Key Facts

* SQS guarantees that your messages will be processed at least once
* Amazon SQS long polling is a way to retrieve messages from your Amazon SQS queues. While the regular short polling
  returns immediately, even if the message queue being polled is empty, long polling doesn't return a response
  until a message arrives in the message queue, or the long poll times out.
* Queue's can either be standard or FIFO


## SWF vs SQS

* SQS has a retention period of 14 days. SWF offers up to 1 year for workflow execution
* Amazon SWF presents a task-oriented API, whereas Amazon SQS offers a message-oriented API
* Amazon SWF ensures that a task is assigned only once and is never duplicated. With Amazon SQS, you need to handle
  duplicated messages and may also need to ensure that a message is processed only once
* Amazon SWF keeps track of all the tasks and events in an application. With Amazon SQS, you need to implement your
  own application-level tracking, especially if your application uses multiple queues
  
  
### SWF Actors

* `Workflow Starters` - An application that can initiate (start) a workflow. Could be your e-commerce website when
  placing an order or a mobile app searching for bus times
* `Deciders` - Control the flow of activity tasks in a workflow execution. If something has finished in a workflow
  (or fails) a Decider decides what to do next
* `Activity Workers` - Carry out the activity tasks. This can a human worker or an EC2 instance


## SNS Subscribers

* HTTP
* HTTPS
* Email
* Email-JSON
* SQS
* Application
* Lambda


### SNS vs SQS

* Both are Messaging Services in AWS
* SNS - Push
* SQS - Polls (Pulls)


## What is Elastic Transcoder?

* Media Transcoder in the cloud
* Convert media files from their original source format in to different formats that will play on smartphones,
  tablets, PC's etc
* Provides transcoding presets for popular output formats, which means that you don't need to guess about which settings
  work best on particular devices
* Pay based on the minutes and resolution transcoded


## What are the core Kinesis Services?

* Streams
* Firehose
* Analytics


### Stream Architecture

<table>
 <tr>
 <td>
  <img src="https://i.imgur.com/xtqZPom.png" height="250" title="Kenisis Streams Example" />
 </td>
 </tr>
</table>


### Firehose Architecture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/C9X1HG9.png" height="250" title="Kenisis Firehose Redshift Configuration" />
</td>
</tr>
</table>


### Analytics Architecture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/J0eY5bM.png" height="250" title="Kenisis Analytics Architecture" />
</td>
</tr>
</table>


### Exam Tips

* Know the difference between Kinesis Streams and Kinesis Firehose. You will be given scenario questions and you must
  choose the most relevant service
* Understand what Kinesis Analytics is      


## 

**[Previous Lab/Lecture](apps-kinesis-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](apps-exam-tips.md)**
