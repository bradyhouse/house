<img src="https://i.imgur.com/XylaLYv.png" height="100" title="AWS SNS" />


Application Services: Simple Notification Service 101
======

5 Minute Lecture introducing Simple Notification Service (SNS). 
 
  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/slGkpl1.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/application-services/sns/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is SNS?

Simple Notification Service (SNS) is a web service that makes it easy to setup, operate, and send notification from
the cloud. It provides developers with a highly scalable, flexible, and cost-effective capability to publish 
messages from an application and immediately deliver them to subscribers or other applications. 

It follows the `publish-subscribe` (pub-sub) messaging paradigm, with notifications being delivered to clients using
a `push` mechanism that eliminates the need to periodically check or `poll` for new information and updates. 

With simple APIs requiring minimal up-front development effort, no maintenance or management overhead and 
pay-as-you-go pricing, SNS gives developers an easy mechanism to incorporate a powerful notification system
with their applications. Push notification can be sent to Apple, Google, Fire OS, and Window devices, as well as Android 
devices in China with Baidu Cloud Push.

Besides pushing cloud notifications directly to mobile devices, SNS can also deliver notifications by SMS text
message or email, to Amazon Simple Queue Service (SQS) queues, or to any HTTP endpoint.  To prevent messages from
being lost, all messages published to Amazon SNS are stored redundantly across multiple availability zones.


## SNS Topics

SNS allows you to group multiple recipients using topics. A topic is an `access point` for allowing recipients to 
dynamically subscribe for identical copies of the same notification. One topic can support deliveries to multiple end
points-- for example, you can group together iOS, Android, and SMS recipients. When you publish once to a topic,
SNS delivers appropriately formatted copies of your messages to each subscriber.


## SNS Benefits

* Instantaneous, push-based delivery (no polling)
* Simple API and easy integration with applications
* Flexible message delivery over multiple transports
* Inexpensive, pay-as-you-go model with no up-front costs
* Web-based AWS Management Console offers the simplicity of a point-and-click interface


## SNS Pricing

* Users pay $0.50 per 1 million SNS request
* $0.06 per 100,000 notification deliveries over HTTP
* $0.75 per 100,000 notification deliveries over SMS
* $2.00 per 100,000 notification deliveries over Email


## Exam Tips

What did we learn?

* SNS vs SQS
  * Both are AWS messaging services
  * SNS - Push
  * SQS - Polls (Pulls) 
* The date format of SNS is JSON
    
         
### Review Questions

1.  What is SNS?
2.  What is the difference between SQS and SNS?
3.  What type of messages can be sent? (4)
4.  What devices are supported by SNS? (5)
5.  How do you send notifications to android devices in China? 
6.  What is an SNS Topic?
7.  What are recipients you can group together using an SNS Topic?
8.  How are SNS and SQS similar?
9.  What is the data format of SNS?
10. How is the pricing model of SNS broken down? (4)


### Answers

1.  Simple Notification Service. Push mechanism.
2.  SQS is used when you a pull mechanism; SNS is used when you need push mechanism.
3.  text; email; SQS; HTTP endpoint
4.  Apple; Google; Fire OS; Windows; Android
5.  Baidu Cloud Push
6.  Access point, allowing recipients to dynamically subscribe for identical copies of the same notification
7.  iOS, Android, and SMS recipients
8.  Both are AWS messaging services
9.  JSON
10. request; HTTP deliveries, SMS, email

 
## 

**[Previous Lab/Lecture](apps-swf-101.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](apps-sns-101.md)**








