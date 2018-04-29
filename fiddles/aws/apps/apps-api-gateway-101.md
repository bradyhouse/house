<img src="https://i.imgur.com/65Y0F0D.png" height="100" title="AWS API Gateway" />


API Gateway 101
======

6 Minute Lecture introducing the API Gateway Service. 
 
  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/gT980yr.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/application-services/343d938e-b248-e8a9-f6fd-6bc9c4600340/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is API Gateway?

API Gateway if a fully managed service that makes it easy for developers to publish, maintain, monitor, and secure
APIs at any scale. With a few clicks in the console, you can create an API that act as a `front door` for applications
to access data, business logic, or functionality from your back-end services, such as applications running on
Amazon Elastic Compute Cloud (EC2), code running in Lambda, or any web application.


## What is API Caching?

API Gateway provides the ability to cache an endpoint's response. With caching, you can reduce the number of calls made
to your endpoint and also improve the latency of the requests to your API. When you enable caching for a stage, API 
gateway caches responses from your endpoint for a specified `Time-To-Live` (TTL) period, in seconds. API Gateway then
responds to the request by looking up the endpoint response from the cache instead of making a request to your endpoint.


## Additional Features

* Low Cost and Efficient
* Scales Effortlessly
* You can throttle requests to prevent attacks
* Connect to Cloudwatch to log all requests


## Same Origin Policy

In computing, the same-origin policy is an important concept in the web application security model. Under the policy,
a web browser permits scripts contained in a first web page to access data in a second web page, but only if only if
both web pages have the same origin.


### Cross-Origin Resource Sharing (CORS)

CORS is one way the server at the other end (not the client code in the browser) can relax the same-origin policy.
Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page
to be requested from another domain outside the domain from which the first resource is served. 

If you see the error -`Origin policy cannot be read at the remote resource`, then you need to enable CORS on 
API Gateway.


## Exam Tips

What did we learn?

* Remember what API Gateway is at a high level
* API Gateway has caching capabilities to increase performance
* API Gateway is low cost and scales automatically
* You can throttle API Gateway to prevent attacks
* You can log results to CloudWatch
* If you are using JavaScript/AJAX that uses multiple domains with API Gateway, ensure that you have enabled CORS on
  API Gateway
    
         
### Review Questions

1.  What is API Gateway?
2.  Why would you enable caching on an endpoint?
3.  What is TTL?
4.  What is the Same Origin Policy?
5.  How do you get around the Same Origin Policy using API Gateway?
6.  How do you prevent API gateway from being overwhelmed by too many requests? 
7.  How do you log requests made to API Gateway?
    

### Answers

1.  Simple console based tool for creating Rest Service endpoints. 
2.  To reduce endpoint calls and improve latency
3.  Time-To-Live; period of time in seconds that an endpoint response is cached
4.  Client side policy that says all scripts executed by a web site (or page) must belong to the same web domain
5.  Enable Cross Origin Resource Sharing (CORS)
6.  Enable API request throttling
7.  Enable Cloudwatch logging

 
## 

**[Previous Lab/Lecture](apps-elastic-transcoder-101.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](apps-kinesis-101.md)**
