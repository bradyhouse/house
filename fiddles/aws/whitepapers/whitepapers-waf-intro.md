Well Architected Framework (Intro)
======

6 minute lecture introducing the [AWS Well Architected Framework (68 Pages)](https://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf) White Paper.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/rZbhiKR.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/223c8538-772d-867a-a3c9-52f71df9e637/3182b3d5-11dd-e473-4c41-0a9395965f58/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


### What is a well architected framework?

This has been developed by the Solutions Architecture Team based on their experience with helping AWS customers. The well
architected framework is a set of questions that you can use to evaluate how well your architecture is aligned to AWS 
best practices.


### 5 Pillars  of the Well-Architected Framework

1.  Security
2.  Reliability
3.  Performance Efficiency
4.  Cost Optimisation
5.  Operational Excellence


### Structure of each Pillar

Within the white paper, each `Pillar` has the exact same structure (or topics):

1.  Design Principles
2.  Definition
3.  Best Practices
4.  Key AWS Services
5.  Resources


### General Design Principles

The white paper identifies a whole bunch of design principles which you eanble to design better architectures in the 
cloud.  These include:

* Stop guessing your capacity needs
* Test systems at production scale
* Automate to make architectural experimentation easier
* Allow for evolutionary architectures
* Data-Driven Architectures
* Improve through game days




## Exam Tips

Ummm, read the freaking doc => [AWS Well Architected Framework (68 Pages)](https://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf).  


### Review Questions

1.  What is a well-architected Framework?
2.  What are the 5 pillars of the well-architected framework?
3.  What are the 5 topics presented in the discussion each pillar?
4.  How do you stop guessing about capacity needs using the cloud?
5.  How does the cloud enable production scale testing?
6.  How do you make architectural experimentation easier?
7.  What is the benefit of automated architecture?
8.  The more you automate the more you can ____.
9.  How does the cloud enable architecture to evolve?
10. How does the cloud allow for data-driven architecture?
11. What are game days?


### Answers

1.  This has been developed by the Solutions Architecture Team based on their experience with helping AWS customers. The
    well architected framework is a set of questions that you can use to evaluate how well your architecture is aligned
    to AWS best practices.
2.  (1) Security; (2) Reliability; (3) Performance Efficiency; (4) Cost Optimisation; (5) Operational Excellence
3.  (1) Design Principles; (2) Definition; (3) Best Practices; (4) Key AWS Services; (5) Resources
4.  Auto Scaling
5.  In the cloud you can create a production scale test environment on demand.  This can be achieved using cloud
    formation. This allows you to complete your testing and then decommission the resources.
6.  Automation.  The more you automate the more you can experiment.  Again, cloud formation is a perfect example.  If
    you have your entire production enviroment in cloud formation, then you can add and remove resources and see what
    effect that has overall on your production environment.
7.  Automation allows you to create and replicate your systems at a low cost and avoid the expense of manual effort. You
    can track changes to your automation, audit the impact, and revert to previous parameters where necessary.  
8.  Experiment.
9.  In traditional environment architecture decisions are implemented as static one time events. You might change
    your architecture once every 3 months, or once every 6 months, or once you have had an outage.  If you think about
    your business, its going to continously change.  This is especially true in cloud. So these initial decisions could
    hinder the system to deliver changing business requirements. In the cloud the capability to automate and test on
    demand lowers the risk from a design change. This allows systems to evolve over time. So that businesses can
    take advantage of innovation as standard best practices.
10. In the cloud you can collect data on how your architecture decisions have been affecting the behaivor of your
    workload. So using services like CloudWatch can allow you to make fact based decisions about how to improve
    your workload.
11. You test how your architecture and processes perform by simulating events in production.  For example, a game
    day of a black friday sale.  You setup a copy of your production environment using the cloud formation service, 
    You load test the crap out of it in order to verify that it doesn't fall over, and then you decomission it.


### Well Architected Framework Intro Flash Card Deck
  
  To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  
  <table>
  <tr>
  <td>
  <b><a href="whitepapers-waf-intro-flashcards.txt" download="whitepapers-waf-intro-flashcards.txt">Well Architected Framework Intro - Flash Card Deck</a></b>
  </td>
  </tr>
  </table>
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/blob/master/fiddles/aws/readme.adoc#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](whitepapers-best-practices.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](whitepapers-waf-security.md)**
