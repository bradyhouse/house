![Route53](https://i.imgur.com/vG67Qx0.png) <img src="https://i.imgur.com/9awJmtb.png" height="100" title="AWS EC2" />  


Route 53 Failover Routing Policy Lab
======

10 minute lecture / lab introducing Route 53's Failover routing policy as well as Route 53 based Health Checks.


## Video Link

[![Imgur](https://i.imgur.com/yr3s34c.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/route53/0ab3a91d-11ea-c54c-4f4a-db557a09d718/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Failover Routing Policy

Failover routing policies are used when you want to create an active/passive setup. For example, you may want your
primary site to be EU-WEST2 and your secondary DR Site in AP-SOUTHEAST-2.  Route 53 will monitor the health of your
primary site using a health check. 

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

In the above example, Route 53 sends the traffic to AP-SOUTHEAST-2 because it detected a failure in EU-WEST-2.


## Prerequisites

* AWS Console free-tier account
* Complete [Route 53 Setup EC2 Instances Lab](route53-setup-ec2-instances-lab.md)


## Steps

### Route 53: Create an ELB Health Check


1.  Log into the AWS Console 
2.  Verify that you are in the region used as your `closest region` in the [Route 53 Setup EC2 Instances Lab](route53-setup-ec2-instances-lab.md)
2.  Under `Services > Cloud Computing`, click `EC2`
3.  In the EC2 sidebar under `LOAD BALANCING`, click `Load Balancers`
4.  Copy the DNS name for your ELB
5.  Under `Services > Network & Content Delivery`, click `Route 53`
6.  In the Route 53 sidebar, click the `Health checks` links
7.  On the `Welcome to Route 53 health checks` page, click the `Create health check` button
8.  Set the name to `My<Region>HealthCheck` -- for example `MyUsEast1HealthCheck`
9.  Set `Specify endpoint by` to `Domain name`
10. Set the `Domain` to the DNS Name of your ELB (4)
11. Expand the `Advanced` section
12. For the `Request Interval` select `Fast(10 seconds)`
13. Set the `Failure Threshold` to 1
14. Click the `Next` button
15. On the `Get notified when health check fails` page, set the `Create alarm` option to `No` (default)
16. Click the `Create health check` button


<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/WW7EDSW.png" height="150" title="ELB Health Check" /> 
    </td>
  </tr>
</table>


### Route 53: Create an A Record Health Check

17. Under `Services > Network & Content Delivery`, click `Route 53`
18. In the Route 53 sidebar, click the `Health checks` links
19. On the `Health check` dashboard, click the `Create health check` button
20. On the `Configure health check` page, set the `Name` to `MyProductionSite`
21. Set `Specify endpoint by` to `Domain name`
22. Set the `Domain` to your `naked domain name` -- for example `bradyhouse.ninja`
23. Set the `Path` to `index.html`
24. Expand the `Advanced` section
25. For the `Request Interval` select `Fast(10 seconds)`
26. Set the `Failure Threshold` to 1
27. Click the `Next` button
28. On the `Get notified when health check fails` page, set the `Create alarm` option to `Yes`
29. Set the `Send notification to` to `New SNS topic`
30. Set the `Topic name` to `MyWebsiteIsDown`
31. Set the `Recipient email addresses` to your personal email address
32. Click the `Create health check` button


<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/brAqWD3.png" height="150" title="SOA Health Check" /> 
    </td>
  </tr>
</table>


### Route 53: Create a Primary Record Set

33. Under `Services > Network & Content Delivery`, click `Route 53`
34. In the Route 53 sidebar, click the `Hosted zones` links
35. Click the `<username>.ninja` domain -- for example, `bradyhouse.ninja`
36. Click the `Create Record Set` button
37. Leave the `Name` field blank
38. Check `Yes` for the Alias option
39. Set the `Alias` target to the ELB Alias setup in the region closest to you, which you configured as part of the
    [Route 53 Setup EC2 Instances Lab](route53-setup-ec2-instances-lab.md)
40. Set the `Routing Policy` to `Failover`
41. Set `Failover Record Type` to `Primary`
42. Set `Evaluate Target Health` to `Yes`
43. Set `Associate with Health Check` to `Yes`
44. Set `Health Check to Associate` to your ELB Health Check -- for example `MyUsEast1HealthCheck`

<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/Fyi7waC.png" width="150" title="Create a Primary Record Set" /> 
    </td>
  </tr>
</table>

45. Click the `Create` button


### Route 53: Create a Secondary Record Set

46. Under `Services > Network & Content Delivery`, click `Route 53`
47. In the Route 53 sidebar, click the `Hosted zones` links
48. Click the `<username>.ninja` domain -- for example, `bradyhouse.ninja`
49. Click the `Create Record Set` button
50. Leave the `Name` field blank
51. Check `Yes` for the Alias option
52. Set the `Alias` target to the ELB Alias setup in the region farthest from you, which you configured as part of the
    [Route 53 Setup EC2 Instances Lab](route53-setup-ec2-instances-lab.md)
53. Set the `Routing Policy` to `Failover`
54. Set `Failover Record Type` to `Secondary`
55. Set `Evaluate Target Health` to `No` (default)
56. Set `Associate with Health Check` to `No` (default)

<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/1tvA7W5.png" width="150" title="Create Secondary Record Set" /> 
    </td>
  </tr>
</table>

57. Click the `Create` button


### EC2: Simulate Failure

58. Under `Services > Compute`, click `EC2`
59. In the EC2 sidebar under `INSTANCES`, click `Instances`
60. Select both instances running instances
67. Click `Actions > Instance State > Stop`
68. In the `Stop Instances` pop-up, click the `Yes, Stop` button
69. Open a new browser tab and navigate to `<username>.ninja` -- for example, `bradyhouse.ninja`

<table>
  <tr>
    <td>
      <img src="https://i.imgur.com/1tvA7W5.png" width="150" title="Create Secondary Record Set" /> 
    </td>
  </tr>
</table>
 
70. It should still be up via your secondary record set (46-57) 


### Clean Up

71. If you are not going onto the next lab, stop all EC2 Instances
72. Delete the two `A` record sets added in Route 53
73. Delete the two `Healh checks` added in Route 53


## 

**[Previous Lab/Lecture](route53-latency-routing-policy-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](route53-geolocation-routing-policy-lab.md)**










