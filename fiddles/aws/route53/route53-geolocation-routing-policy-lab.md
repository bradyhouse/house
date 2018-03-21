![Route53](https://i.imgur.com/vG67Qx0.png) <img src="https://i.imgur.com/9awJmtb.png" height="100" title="AWS EC2" />  


Route 53 Geolocation Routing Policy Lab
======

5 minute lecture / lab introducing Route 53's Geolocation routing policy. For this one, I simply watched the video 
and took some exam related notes--i.e. no `step-by-step` details.


## Video Link

[![acloud.guru lecture link](https://i.imgur.com/a2TIIpp.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/route53/6bc50e82-a30f-d101-958e-97e5fa35b071/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Geolocation Routing Policy

This type of routing allows you direct traffic based on the geographic location of the originating DNS query. For 
example, you might want all queries from Europe to be routed to a fleet of EC2 instances that are specifically 
configured for European customers. These servers may use the local languages of your customers or present product
pricing using Euros.


<img src="https://i.imgur.com/WYDwObl.png" height="150" title="Geolocation Routing Policy" /> 


In the above example, Route 53 sends European users to a server in the EU-WEST-1 region. It routes US users to one
in US-EAST-1.


## Exam Tips

What did we learn?


### Review Questions

1. How is the `Default` geolocation used?
2. Can you create a Geolocation routing policy that is specific to Chicago users?


### Answers

1.  Say you setup one Record set to route European customers to a specific server.  You would then set up a second using
    the `Default` geolocation to route all other customers to a second server.
2.  No, geolocation is not city specific. It can be specified by continent or country.
    


## 

**[Previous Lab/Lecture](route53-failover-routing-policy-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](route53-exam-tips.md)**










