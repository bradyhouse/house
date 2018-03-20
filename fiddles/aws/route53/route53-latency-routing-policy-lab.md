![Route53](https://i.imgur.com/vG67Qx0.png) <img src="https://i.imgur.com/9awJmtb.png" height="100" title="AWS EC2" />  


Route 53 Latency Routing Policy Lab
======

6 minute lecture / lab introducing Route 53's Latency routing policy. For this one, I simply watched the video 
and took some exam related notes--i.e. no `step-by-step` details.


## Video Link

[![acloud.guru lecture link](https://i.imgur.com/fB1JCZ0.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/route53/1b1c993c-7f3b-da21-7c24-5f6c65165094/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Latency Routing Policy


<img src="https://i.imgur.com/NLj9ncB.png" height="150" title="Latency Routing Policy" /> 


This type of routing is tied to latency.  Specifically, it allows you to route traffic based on the lowest network
latency for your end user. Stated another way, the region that will return the fastest response time is targeted by
Route 53. 

To use this type of routing you create a  latency resource record set for the Amazon EC2 (or ELB) 
resource in each region that hosts your website. When Route 53 receives a request for your site, it selects the
latency resource record set for the region that gives the user the lowest latency. It then returns the associated
EC2 (or ELB) resource.  


## 

**[Previous Lab/Lecture](route53-weighted-routing-policy-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](route53-failover-routing-policy-lab.md)**










