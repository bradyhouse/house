![Imgur](https://i.imgur.com/9awJmtb.png)


EC2 Elastic Load Balancer Theory
======

7 minute lecture introducing Elastic Load Balancers.

## Video Link

[![Imgur](https://i.imgur.com/MUsjRgt.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/8768578c-0510-e435-98ac-beffe33389ab/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


### What is a Load Balancer?

Virtual machine or appliance that balances the load received by your web applications (http / https requests) across
a collection of web servers. The idea is to prevent any one web server from becoming overwhelmed by traffic. There are
three types:

1.  Application Load Balancer
2.  Network Load Balancer
3.  Classic Load Balancer


#### Application Load Balancer

An Application Load Balancer is best suited for load balancing HTTP and HTTPS traffic. They operate at Layer 7 (aka the 
OS level) and are application-aware. They are intelligent, and you can created advanced request routing, sending 
specific requests to specific web servers. 


#### Network Load Balancer

A Network Load Balancer is best suited for load balancing of TCP traffic where extreme performance is required. 
Operating at the connection level (Layer 4), a Network Load Balancer is capable of handling millions of requests
per second, while maintaining ultra-low latencies.


#### Classic Load Balancer

A Classic Load Balancer are the legacy Elastic Load Balancer. _When you see `Elastic Load Balancer` in the Exam, this
is what is being referred too._ They can be used to load balance HTTP/HTTPS applications and use OS level specific
features, such as X-Forwarded and sticky sessions. They can also be used to for `strict layer 4 load balancing` for
applications that rely purely on TCP protocol.


##### Load Balancer Errors

If your application stops responding, the ELB (Classic Load Balancer) responds with a 504 error. This means that
the application is having issues. This could be either at the Web Server layer or at the Database Layer. Identify
where the application is failing, and scale it up or out where possible.


##### X-Forwarded-For Header

When an HTTP request is routed to a Classic Load Balancer and then forwarded to an EC2 instance, the EC2 instance 
see the IP address of the ELB.  The IP of originating requester is stored in an `X-Forwarded-For` (XFF) header. An
XFF header is, according to [Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) is
defined as follows:

    The X-Forwarded-For (XFF) header is a de-facto standard header for identifying the originating IP address of a 
    client connecting to a web server through an HTTP proxy or a load balancer. When traffic is intercepted between 
    clients and servers, server access logs contain the IP address of the proxy or load balancer only. To see the 
    original IP address of the client, the X-Forwarded-For request header is used.


### Exam Tips

What do you need to know for the Exam?

* 3 Types of load balancers:
  1.  Application Load Balancer
  2.  Network Load Balancer
  3.  Classic Load Balancer
* 504 Error means the gateway has timed out. This means that the application is not responding within the idle
  timeout period
  * Troubleshoot the application-- _Is it the Web Server or Database Server?_
* If you need IPv4 address of your end user, look for the `X-Forwarded-For` header
    

### Review Questions

1.  What is an elastic load balancer?
2.  What are the three types of elastic load balancer?
3.  What is an Application Load Balancer best suited for?
4.  At what level does an Application Load Balancer operate at? 
5.  What is a Network Load Balancer best suited for?
6.  At what level does a Network Load Balancer operate at?
7.  What load balancer is used for extreme performance?
8.  What is a Classic Load Balancer?
9.  On the Exam when you see the term `Elastic Load Balancer`, what are they referring too?
10. What is Classic Load Balancer best suited for? (2)
11. At what level does a Classic Load Balancer operate at? (2)
12. What 2 OS layer features can be used with a Classic Load Balancer?
13. What's more intelligent an Application or Classic ELB?
14. What is an HTTP 504 Error?
15. What error code is returned if a Classic ELB stops responding? How do you troubleshoot?
16. What is an X-Forwarded-For (XFF) Header?
17. How does a Classic ELB employ XFF Headers?
18. On an EC2 instance behind a Classic ELB, how to you get the external IP of source request?
19. Why would you want to know the actual source IP of a request?
    
    
### Answers

1.  Virtual machine or appliance that balances the load received by your web applications (http / https requests) across
    a collection of web servers. The idea is to prevent any one web server from becoming overwhelmed by traffic. 
2.  Application; Network; Classic
3.  An Application Load Balancer is best suited for load balancing HTTP and HTTPS traffic. They operate at the OS level 
    and are application-aware. They are intelligent, and you can created advanced request routing, sending 
    specific requests to specific web servers. 
4.  Layer 7-- OS Level
5.  A Network Load Balancer is best suited for load balancing of TCP traffic where extreme performance is required. 
    Operating at the connection level, a Network Load Balancer is capable of handling millions of requests
    per second, while maintaining ultra-low latencies.
6.  Layer 4-- Connection Level
7.  Network Load balancer
8.  A Classic Load Balancer is the legacy Elastic Load Balancer
9.  A Classic Load Balancer
10. (1) They can be used to load balance HTTP/HTTPS applications and use OS level specific features; (2) They can also 
    be used to for `strict layer 4 load balancing` for applications that rely purely on TCP protocol
11. It depends on the configuration. Layer 7-- OS Level or Layer 4-- Connections
12. (1) `X-Forwarded-For` Headers; (2) sticky sessions
13. Application
14. Gateway Timeout. The server was acting as a gateway or proxy and did not receive a timely response from the 
    upstream server.
15. If your application stops responding, the ELB (Classic Load Balancer) responds with a 504 error. This means that
    the application is having issues. This could be either at the Web Server layer or at the Database Layer. Identify
    where the application is failing, and scale it up or out where possible.
16. The X-Forwarded-For (XFF) header is a de-facto standard header for identifying the originating IP address of a 
    client connecting to a web server through an HTTP proxy or a load balancer. When traffic is intercepted between 
    clients and servers, server access logs contain the IP address of the proxy or load balancer only. To see the 
    original IP address of the client, the X-Forwarded-For request header is used.
17. When an HTTP request is routed to a Classic Load Balancer and then forwarded to an EC2 instance, the EC2 instance 
    see the IP address of the ELB.  The IP of originating requester is stored in an `X-Forwarded-For` (XFF) header
18. Look at the `X-Forwarded-For` header on the request
19. An IP address can tell you a lot -- like the source organization of the request.


### Flash Cards

<table>
<tr>
<td>
<b><a href="https://github.com/bradyhouse/house/blob/master/fiddles/aws/ec2/ec2-elastic-load-balancer-theory-flashcards.zip?raw=true" download="ec2-elastic-load-balancer-theory-flashcards.zip">EC2 Elastic-load-balancer-theory</a></b>
</td>
</tr>
</table>

**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/blob/master/fiddles/aws/readme.adoc#flash-card-strategy).**    


## 

**[Previous Lab/Lecture](ec2-ami-types.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-elastic-load-balancer-lab.md)** 
 
