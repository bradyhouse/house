Exam Tips - Student Feedback
======

10 Minute lecture with additional topics not covered in previous lectures but can come up on the Solution Architect 
exam. Note, this lecture touches on Kinesis, OpsWorks, Elastic Transcoder and SWF.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/gE7y7FW.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/additional-exam-tips/student-feedback/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*
 

### What is Kinesis?

Amazon Kinesis is a fully managed service for real-time processing of streaming data at a massive scale. You can 
configure hundreds of thousands of data producers to continuously put data into an Amazon Kinesis stream. For example, 
data from website clickstreams, application logs, and social media feeds. Within less than a second, the
data will be available for your Amazon Kinesis Applications to read and process the stream.


### EC2 - EBS Backed vs Instance Store

* __EBS backed volumes are persistent__
  * EBS backed volumes continue independently throughout the life of the EC2 instance
  * EBS backed volumes can be stopped and the data will persist
  * EBS Backed = _Store Data Long Term_
* __Instance Store backed volumes are not persistent (ephemeral)__
  * You cannot detach an instance store volume and attach it to another EC2 instance 
  * Instance Store backed volumes cannot be stopped without losing data
  * Instance Store = _Store Data Short Term_


### OpsWorks
 
* Orchestration Service that uses [Chef](https://www.chef.io/)
* Chef can be used to turn infrastructure into code `recipes` inorder to maintain a consistent state. 
* Look for the term "chef" or "recipes" or "cookbooks" and think OpsWorks
 
 
### Elastic Transcoder
 
* Media Transcoder in the cloud
* Convert media files from their original source format into a different formats that will play on smartphones,
  tablets, PC's etc.
* Provides transcoding presets for popular output formats, which means that you don't need to guess about which settings
  work best on particular devices
* Pricing model is based on the minutes that you transcode and the resolution at which transcode


### SWF Actors

* `Workflow Starters` - An application that can initiate (start) a workflow. Could be your e-commerce website when 
  placing an order or a mobile app searching for bus times
* `Deciders` - Control the flow of activity tasks in a workflow execution. if something has finished in a workflow
  (or fails) a Decider decides what to do next
* `Activity Worker` - Carry out the activity task
 
 
### EC2 - Get Public IP Address

* Need to query the instances metadata
    * `curl http://169.254.169.254/latest/meta-data/`
    * `wget http://169.254.169.254/latest/meta-data/`
* Key thing to remember is that an EC2 instance's public IP is the instances METADATA and not related to the
  user in anyway

 
## Review Questions

1.  What is Amazon Kinesis?
2.  What is an example where Kinesis might make sense?
3.  How do you consume big data?
4.  How do you apply business intelligence to big data?
5.  How do you process big data?
6.  What does ephemeral mean?
7.  In what sense are EBS backed volumes persistent?
8.  In what sense are Instance store backed volumes not persistent (ephemeral)? 
9.  Technically, what are the 2 difference between EBS backed and Instance Store backed volumes?
10. How do you store data long term?
11. How do you store data short term?
12. What is OpsWorks?
13. What is Chef?
14. If a question uses terms like "chef", "recipes" or "cookbooks" think ___.
15. What is Elastic Transcoder?
16. What is the benefit of Elastic Transcoder's presets?
17. What is the price model for Elastic Transcoder? (2)
18. What are the three SWF actors and their function?
19. How do you get an EC2 instance's public IP address?
20. What type of data is an EC2 instances public IP address? Does it have anything to do with the user?


## Answers

1.  Big data consumer.
2.  Loading application logs to the cloud.
3.  Kinesis
4.  RedShift
5.  EMR
6.  Lasting for a brief time.
7.  EBS backed volumes continue independently throughout the life of the EC2 instance.
8.  You cannot detach an instance store volume and attach it to another EC2 instance.
9.  (1) EBS backed volumes can be swapped between EC2 instances. Instance Store backed volumes cannot. For a Unix user, 
    an Instance Store backed volume is the /tmp directory; an EBS backed volume is everything else. (2) EBS
    backed volumes can be stopped and the data will be persisted. Instance Store backed volumes cannot be stopped
    without the loss of data. If the unix user reboots their system the /tmp directory is wiped.
10. EBS backed volume
11. Instance Store backed volume
12. Orchestration Service that uses chef
13. Chef can be used to turn infrastructure into code `recipes` inorder to maintain a consistent state.
14. OpsWorks 
15. Media Transcoder in the cloud. Convert media files from their original source format into a different formats that 
    will play on smartphones, tablets, PC's etc.
16. You don't need to guess about which settings work best on particular devices
17. Minutes; Resolution
18. (1) Workflow Starters - An application that can initiate (start) a workflow; (2) Deciders - Control the flow of 
    activity tasks in a workflow execution. if something has finished in a workflow (or fails) a Decider decides 
    what to do next; (3) Activity Workers - Carry out the activity task
19. `curl http://169.254.169.254/latest/meta-data/`
20. Metadata; No



### Well Architected Framework Exam Tips - Student Feedback Flash Card Deck
  
To download the review flash card deck for this lecture, right click the following link and select
`Save Link As`. 

<table>
   <tr>
   <td>
   <b><a href="exam-tips-feedback-flashcards.txt" download="exam-tips-feedback-flashcards.txt">Exam Tips Student Feedback - Flash Card Deck</a></b>
   </td>
   </tr>
   </table>  

     
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](../whitepapers/whitepapers-waf-exam-tips.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](exam-tips-feedback.md)**
