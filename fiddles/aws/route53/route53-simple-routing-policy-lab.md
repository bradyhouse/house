![Route53](https://i.imgur.com/vG67Qx0.png) <img src="https://i.imgur.com/9awJmtb.png" height="100" title="AWS EC2" />  


Route 53 Simple Routing Policy Lab
======

6 minute lecture / lab introducing Route 53 routing policies. 


## Video Link

[![acloud.guru lecture link](https://i.imgur.com/w0uHfZz.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/route53/summary/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Simple Routing Policy

<img src="https://i.imgur.com/oKNCRtl.png" height="150" title="Simple Routing Policy" /> 

This is the default routing policy when you create a new record set. This is most commonly used when you have a single
resource that performs a given function for your domain.  For example, you have a single web server that you want
traffic routed too.


## Prerequisites

* AWS Console free-tier account
* Complete [Route 53 Setup EC2 Instances Lab](route53-setup-ec2-instances-lab.md)


## Steps

1.  Log into the AWS Console
2.  Under `Services > Network & Content Delivery` click `Route 53`
3.  In the Route 53 sidebar, click `Hosted Zones`
4.  Click the `<username>.ninja` domain -- for example, `bradyhouse.ninja`
5.  Click the `Create Record Set` button
6.  Leave the `Name` field blank
7.  Check `Yes` for the Alias option
8.  Set the `Alias` target to the ELB Alias setup in the region closest to you, which you configured as part of the
    [Route 53 Setup EC2 Instances Lab](route53-setup-ec2-instances-lab.md)
9.  Set the `Evaluate Target Health` option to `No` (default)

<table><tr><td>
<img src="https://i.imgur.com/OTQQjNs.png" width="150" title="Route 53 Simple Routing Setup" /> 
</td></tr></table>

10. Click the `create` button
11. Open a secondary web browser tab, navigate to your domain name.  For example, `bradyhouse.ninja`

<table><tr><td>
<img src="https://i.imgur.com/a3Y9OVn.png" height="150" title="Server 1" /> 
</td></tr></table>

12. Refresh (Reload) the page, you see the second server load

<table><tr><td>
<img src="https://i.imgur.com/yDvfMLZ.png" height="150" title="Server 2" /> 
</td></tr></table>

13. Clean Up, **be sure and stop all your EC2 instances if you are not going onto the next lab**


## 

**[Previous Lab/Lecture](route53-register-domain-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](route53-latency-routing-policy-lab.md)**










