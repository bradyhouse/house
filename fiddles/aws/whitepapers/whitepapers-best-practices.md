Best Practices
======

12 minute lecture on the 2016 [AWS Cloud Best Practices (42 Pages)](https://d0.awsstatic.com/whitepapers/AWS_Cloud_Best_Practices.pdf) White Paper.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/kONYvIl.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/223c8538-772d-867a-a3c9-52f71df9e637/architecting-best-practices/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


### Business Benefits of Cloud

* Almost zero infrastructure investment
* Just-in-time infrastructure
* More efficient resource utilization
* Usage based costing
* Reduced time to market


### Technical Benefits of the Cloud

* Automation-`Scriptable Infrastructure`
* Auto-scaling
* Proactive-scaling
* More efficient development lifecycle
* Improved testability
* Disaster Recovery and Business Continuity
* `Overflow` traffic to the cloud


### Understanding Elasticity

The following diagram illustrates why companies are moving to the cloud:

<table>
<tr>
<td>
 <img src="https://i.imgur.com/uqJXmSX.jpg" height="200" title="Cloud as Platform" />
</td>
</tr>
</table>


### Design for Failure

* Rule of Thumb: Be a pessimist when designing architectures in the cloud; assume things will fail. In other words,
  always design, implement and deploy for automated recovery from failure
* In particular, assume--
    * hardware will fail
    * outages will occur
    * some disaster will strike your application
    * that you will be slammed with more than the expected number of requests per second some day
    * that with time that your application software will fail
* By being a pessimist you end up thinking about recovery strategies during design time, which helps in
  designing an overall system better
* No one applies this principle better than the Netflix Simian Army Per the [Netflix Tech Blog](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116):
  * `Chaos Monkey` -  tool that randomly disables our production instances to make sure we can survive this common type 
     of failure without any customer impact
  * `Latency Monkey` - induces artificial delays in our RESTful client-server communication layer to simulate service 
     degradation and measures if upstream services respond appropriately
  * `Conformity Monkey`- finds instances that don’t adhere to best-practices and shuts them down
  * `Doctor Monkey` - taps into health checks that run on each instance as well as monitors other external signs of 
     health (e.g. CPU load) to detect unhealthy instances
  * `Security Monkey` - is an extension of Conformity Monkey. It finds security violations or vulnerabilities, such as 
     improperly configured AWS security groups, and terminates the offending instances
  * `Janitor Monkey` - ensures that our cloud environment is running free of clutter and waste. It searches for unused 
     resources and disposes of them
  * `10-18 Monkey` - (short for Localization-Internationalization, or l10n-i18n) detects configuration and run time 
     problems in instances serving customers in multiple geographic regions, using different languages and character sets
  * `Chaos Gorilla` - similar to Chaos Monkey, but simulates an outage of an entire Amazon availability zone
  

### Decoupling Components

* The key is to build components that do not have tight dependencies on each other, so that if one component were to 
  die (fail), sleep (not respond), or remain busy (slow to respond) for some reason, the other components in the system
  are built so to continue to work as if no failure is happening
* In essence, loose coupling isolates the various layers and components of your application so that each component
  interacts asynchronously with the others and treats them as a "black box"
* When you see the word `decouple` on the exam think `SQS`


#### Web Architecture

In the case of online (or web) architectures, use SQS isolate the the app server from the web server and from the 
database. The app server does not know about your web server and vice versa, this gives decoupling between these 
layers and there are no dependencies code-wise or from any functional perspective.


#### Batch Architecture

In the case of batch architectures, create asynchronous components that are independent of each other. These
then communicate asynchronously via SQS.


### Implement Elasticity

The cloud brings a new concept of elasticity to our applications. Elasticity can be implemented in three ways:

1.  `Proactive Cyclic Scaling` - Period scaling that occurs at fixed intervals (daily, weekly, monthly, quarterly)
2.  `Proactive Event-based Scaling` - Scaling just when you are expecting a big surge of traffic requests due to
    scheduled business events (new product launch, marketing campaigns)
3.  `Autoscaling based on demand` - By using monitoring services, your system can send triggers to take the appropriate
    actions so that it scales up or down based on metrics (utilization of servers or networks i/o ... etc.)


### Secure your Application

The following diagrams demonstrates how security groups can be leveraged to isolate different layers of an
application:

<table>
<tr>
<td>
 <img src="https://i.imgur.com/nTyrfq3.png" height="200" title="Secure your Application" />
</td>
</tr>
</table>

* `Web Servers` - Limit access to HTTP (port 80) and HTTPS (port 443)
* `APP Servers` - Limit external access to SSH (port 22); Only permit Web layer access to the API layer
* `DB Servers` - No external access; Only permit App layer access to the DB Layer
  
 
## Review Questions

1.  What is `utility billing`?
2.  Why do many start-ups get started on AWS?
3.  What are the 5 business benefits of the cloud?
4.  What are the 7 technical benefits of the cloud?
5.  Why are many companies moving to the cloud?
6.  Why should you design for failure?
7.  What is the Netflix Siam Army?
8.  What is the key to decoupling components?
9.  How does de-coupling achieve a "black box" effect?
10. When you see the word "decouple" on the exam, think ___.
11. How do you apply decoupling in a web-based architecture?
12. How do you apply decoupling in a batch-based architecture?
13. What are the three ways to implement `Elasticity`?
14. How do you secure Web Servers?
15. How do you secure App Servers?
16. How do you secure Db Servers?

    
## Answers

1.  Usage based costing
2.  Business Benefits
3.  (1) almost zero infrastructure investment; (2) just-in-time infrastructure; (3) more efficient resource utilization;
    (4) usage based costing; (5) reduced time to market
4.  (1) scriptable infrastructure; (2) auto-scaling; (3) proactive-scaling; (4) more efficient development lifecycle;
    (5) improved testability; (6) disaster recovery and business continuity; (7) overflow traffic to the cloud
5.  Infrastructure cost reduction through elasticity and autoscaling
6.  By being a pessimist you end up thinking about recovery strategies during design time, which helps in designing an 
    overall system better
7.  A set of automated tools developed by Netflix and implemented into production to simulate certain disaster recovery
    events in order to insure that their cloud infrastructure can automatically adapt.
8.  The key is to build components that do not have tight dependencies on each other, so that if one component were to 
    die (fail), sleep (not respond), or remain busy (slow to respond) for some reason, the other components in the 
    system are built so to continue to work as if no failure is happening
9.  In essence, loose coupling isolates the various layers and components of your application so that each component 
    interacts asynchronously with the others and treats them as a "black box".
10. SQS
11. In the case of online architecture, use SQS isolate the the app server from the web server and from the database. 
    The app server does not know about your web server and vice versa, this gives decoupling between these layers and 
    there are no dependencies code-wise or from any functional perspective.
12. Create asynchronous components that are independent of each other and communicate via SQS.
13. (1) `Proactive Cyclic Scaling` - Period scaling that occurs at fixed intervals (daily, weekly, monthly, quarterly); 
    (2) `Proactive Event-based Scaling` - Scaling just when you are expecting a big surge of traffic requests due to
    scheduled business events (new product launch, marketing campaigns); (3) `Autoscaling based on demand` - By using 
    monitoring services, your system can send triggers to take the appropriate actions so that it scales up or down 
    based on metrics (utilization of servers or networks i/o ... etc.)
14. Place them in a security group that limit access to HTTP (port 80) and HTTPS (port 443)
15. Limit external access to SSH (port 22); Only permit Web layer access to the API layer
16. No external access; Only permit App layer access to the DB Layer


### Best Practices Flash Cards
  
  To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  
  <table>
  <tr>
  <td>
  <b><a href="best-practices.txt" download="best-practices.txt">Best Practices Flash Card Deck</a></b>
  </td>
  </tr>
  </table>
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](whitepapers-101.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](whitepapers-waf-intro.md)**
