![Route53](https://i.imgur.com/vG67Qx0.png) <img src="https://i.imgur.com/9awJmtb.png" height="100" title="AWS EC2" />  


Route 53 Failover Routing Policy Lab
======

10 minute lecture / lab introducing Route 53's Failover routing policy. For this one, I simply watched the video 
and took some exam related notes--i.e. no `step-by-step` details.


## Video Link

[![Imgur](https://i.imgur.com/yr3s34c.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/route53/0ab3a91d-11ea-c54c-4f4a-db557a09d718/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Failover Routing Policy

<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/NLj9ncB.png" height="150" title="Failover Routing Policy (Before)" /> 
    </td>
    <td>
      <img src="https://i.imgur.com/tc6cQzZ.png" height="150" title="Failover Routing Policy (After)" /> 
    </td>
  </tr>
</table>

Failover routing policies are used when you want to create an active/passive setup. For example, you may want your
primary site to be EU-WEST2 and your secondary DR Site in AP-SOUTHEAST-2.  Route 53 will monitor the health of your
primary site using a health check. 



## 

**[Previous Lab/Lecture](route53-latency-routing-policy-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](route53-failover-routing-policy-lab.md)**










