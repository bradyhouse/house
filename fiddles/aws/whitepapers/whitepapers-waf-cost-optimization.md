Well Architected Framework (Cost Optimization)
======

14 minute lecture  on the Cost Optimization section of the [AWS Well Architected Framework (68 Pages)](https://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf) White Paper.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/G4ZK8es.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/223c8538-772d-867a-a3c9-52f71df9e637/3559e34f-ec6a-fc29-c58e-3ff21d8859b7/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## The Cost Optimization Pillar

Use the Cost Optimization pillar to reduce your costs to a minimum and use those savings for other parts of your
business. A cost-optimized system allows you to pay the lowest price possible while still achieving your 
business objectives.


### Design Principles

`Cost Optimization` consists of 5 areas:

* Transparently attribute expenditure
* Use managed services to reduce cost of ownership
* Trade capital expense for operating expense
* Benefit from economies of scale
* Stop spending money on data center operations


### Definition

Cost optimization in the cloud consists of 4 areas:

* Matched supply and demand
* Cost-effective resources
* Expenditure awareness
* Optimizing over time


#### Matched Supply and Demand

Try to optimally align supply with demand. Don't over provision or under provision, instead as demand grows, so should
your supply of compute resources. Think of things like Autoscaling which scale with demand. Similarly in a server-less
context, use services such as Lambda that only execute (or respond) when a request (demand) comes in. Services such 
as CloudWatch can also help you keep track as to what your demand is.


##### Questions

As an architect, you should ask the following questions when evaluating `matched supply and demand cost optimization`:

* How do you make sure your capacity matches but does not substantially exceed what you need?
* How are you optimizing your usage of AWS services?


#### Cost-Effective Resources

Using the correct instance type can be key to cost savings. For example, you might have a reporting process that is
running on a t2-Micro and it takes 7 hours to complete. That same process could be run on an m4.2xlarge in a manner
of minutes. The result remains the same but the t2.micro is more expensive because it ran for longer. A well
architected system will use the most cost efficient resources to reach the end business goal.


##### Questions

As an architect, you should ask the following questions when evaluating `resource cost optimization`:

* Have you selected the appropriate resource types to meet your cost targets?
* Have you selected the appropriate pricing model to meet your cost targets?
* Are there managed services (higher-level services than Amazon EC2, Amazon EBS, and Amazon S3) that you can use to
  improve your ROI?


#### Expenditure Awareness

With cloud you no longer have to go out and get quotes on physical servers, choose a supplier, have those resources
delivered, installed, made available etc. You can provision things within seconds, however this comes with its own
issues. Many organisations have different teams, each with their own AWS accounts. Being aware of what each team is
spending and where is crucial to any well architected system. You can use cost allocation tags to track this billing
alerts as well as consolidated billing.


##### Questions

As an architect, you should ask the following questions when evaluating `expenditure awareness optimization`:

* What access controls and procedures do you have in place to govern AWS costs?
* How are you monitoring usage and spending?
* How do you decommission resources that you no longer need, or stop resources that are temporarily not needed?
* How do you consider data-transfer charges when designing your architecture?


#### Optimizing Over Time

AWS moves FAST. There are hundreds of new services (and potentially 1000 new services this year). A service that you
chose yesterday may not be the best service to be using today. For example consider MySQL RDS. Aurora was launched at 
re:invent 2014 and is now out of preview. Aurora may be a better option now for your business because of its 
performance and redundancy. You should keep track of the changes made to AWS and constantly re-evaluate your existing
architecture. You can do this by subscribing to the AWS blog and by using services such as Trusted Advisor. 


### Key AWS Services

* `Matched supply and demand` - Autoscaling
* `Cost-effective resources` - EC2 (reserved instance), AWS Trusted Advisor
* `Expenditure awareness` - CloudWatch Alarms, SNS
* `Optimizing over time` - AWS Blog, AWS Trusted Advisor


##### Questions

As an architect, you should ask the following question when evaluating `optimization over time`:

* How do you manage and/or consider the adoption of new services?


## Exam Tips

Know the 4 areas of cost optimization and the questions associated with each.

 
### Review Questions

1.  What is the `Cost Optimization` pillar?
2.  What are the five design principles of `Cost Optimization`?
3.  What 4 areas define `Cost Optimization` in the cloud?
4.  How do you match supply to demand to optimize cost?
5.  As an architect, what 2 questions should you ask when evaluating the `cost optimization of supply and demand`?
6.  Why is selecting the correct instance type key to cost savings?
7.  As an architect, what 3 questions should you ask when evaluating `resource cost optimization`?
8.  Why is expenditure awareness crucial to `cost optimization`? 
9.  What 3 features can you use to track expenditures?
10. As an architect, what 4 questions should you ask when evaluating `expenditure awareness optimization`?
11. What are two ways to keep up with changes to AWS?
12. As an architect, what 1 question should you ask when evaluating `optimization overtime`?
13. What service feature is used to optimize supply and demands?
14. What service is used for resource cost optimization?
15. What service is used for expenditure awareness optimization? 
16. What tools are used for optimization overtime?

 
### Answers

1.  Use the Cost Optimization pillar to reduce your costs to a minimum and use those savings for other parts of your
    business. A cost-optimized system allows you to pay the lowest price possible while still achieving your 
    business objectives.
2.  (1) Transparently attribute expenditure; (2) Use managed services to reduce cost of ownership; (3) Trade capital 
    expense for operating expense; (4) Benefit from economies of scale; (5) Stop spending money on data center 
    operations
3.  (1) Matched supply and demand; (2) Cost-effecive resources; (3) Expenditure awareness; (4) Optimizing over time
4.  Try to optimally align supply with demand. Don't over provision or under provision, instead as demand grows, so should
    your supply of compute resources. Think of things like Autoscaling which scale with demand. Similarly in a server-less
    context, use services such as Lambda that only execute (or respond) when a request (demand) comes in. Services such 
    as CloudWatch can also help you keep track as to what your demand is.
5.  (1) How do you make sure your capacity matches but does not substantially exceed what you need? (2) How are you 
    optimizing your usage of AWS services?
6.  You might have a reporting process that is running on a t2-Micro and it takes 7 hours to complete. That same process
    could be run on an m4.2xlarge in a manner of minutes. The result remains the same but the t2.micro is more expensive
    because it ran for longer. A well architected system will use the most cost efficient resources to reach the end 
    business goal.
7.  (1) Have you selected the appropriate resource types to meet your cost targets? (2) Have you selected the 
    appropriate pricing model to meet your cost targets? (3) Are there managed services (higher-level services than 
    Amazon EC2, Amazon EBS, and Amazon S3) that you can use to improve your ROI?
8.  Many organisations have different teams, each with their own AWS accounts. Being aware of what each team is
    spending and where is crucial to any well architected system. You can use cost allocation tags to track this billing
    alerts as well as consolidated billing.
9.  Cost allocation tags; Billing alarms; Consolidated billing
10. (1) What access controls and procedures do you have in place to govern AWS costs? (2) How are you monitoring usage 
    and spending? (3) How do you decommission resources that you no longer need, or stop resources that are temporarily 
    not needed? (4) How do you consider data-transfer charges when designing your architecture?
11. Subscribe to the AWS blog; Using Trusted Advisor
12. How do you manage and/or consider the adoption of new services?
13. Autoscaling
14. EC2 (reserved instance), AWS Trusted Advisor
15. CloudWatch Alarms, SNS
16. AWS Blog, AWS Trusted Advisor
 

### Well Architected Framework Cost Optimization Flash Card Deck
  
 To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  
   <table>
   <tr>
   <td>
   <b><a href="whitepapers-waf-cost-optimization-flashcards.txt" download="whitepapers-waf-cost-optimization-flashcards.txt">Well Architected Framework Cost Optimization - Flash Card Deck</a></b>
   </td>
   </tr>
   </table>
     
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](whitepapers-waf-perf-efficiency.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](whitepapers-waf-cost-optimization.md)**
