![Imgur](https://i.imgur.com/VcdZTNZ.png)


CloudFront
======

Introductory overview of the CloudFront service and the concept of a CDN.


## Video Link

[![Imgur](https://i.imgur.com/ilIqZeq.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/storage/cloudfront-overview/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


### Review Questions

1.  What is a CDN?
2.  What is an Edge Location?
3.  What is an Origin? 
4.  What 4 services can function as an origin?
5.  What is/are the most common origin case(s)?
6.  What is a distribution?
7.  What does "TTL" stand for?
8.  Are Edge Locations any faster for the very first user?
9.  What is CloudFront optimized for?
10. Can CloudFront be used like any other non-AWS CDN?
11. What are the two types of distributions?
12. What is a "Web Distribution" used for?
13. What does RTMP stand for?
14. What is a "RTMP Distribution" used for?
15. Currently how many edge locations are there in the world?
16. Are Edge Locations read only?
17. On an Edge Location, how long are files cached?
18. Can you clear cached objects and is there a "but"?


### Answers

1.  A Content Delivery Network (CDN) is a system of distributed servers (network) that delivers webpages and other web
    content to a user based on the geographical location of the user, the origin of the web page and a content delivery 
    system.
2.  This is the location where content will be cached. This is separate to an AWS Region/AZ.
3.  This is the origin of all files that the CDN will distribute. 
4.  S3 bucket, EC2 instance, Elastic Load Balancer, Route53
5.  S3 bucket or EC2 instance
6.  This is the name given the CDN which consists of a collection of Edge Locations. When we create 
    a new CDN with AWS, this called a distribution.
7.  Time To Live (TTL)
8.  No
9.  To work with other Amazon Services
10. Yes
11. Web, RTMP
12. Websites
13. Real-Time Messaging Protocol
14. Media Streaming. In particular, is used for Adobe Flash
15. Over 50
16. No you can write too--aka put objects on them
17. For the life of the TTL
18. Yes, objects can be cleared, but you will be charged


### Cloudfront Flash Cards
  
  To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  
  <table>
  <tr>
  <td>
  <b><a href="cloudfront.txt" download="cloudfront.txt">CloudFront 101 Flash Card Deck</a></b>
  </td>
  </tr>
  </table>
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


##

**[Previous Lab/Lecture](../s3/s3-lifecycle.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](cloudfront-create-a-cdn.md)** 
    
