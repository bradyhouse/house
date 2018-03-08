![Imgur](https://i.imgur.com/VcdZTNZ.png)


CloudFront Exam Tips
======

What did we learn?

* `Edge Location` - This is a location where content will be cached. This is separate to
  an AWS Region / Availability Zone
* `Origin` - This is the origin of all the files that the CDN will distribute. This can be either an S3 Bucket,
  an EC2 instance, an Elastic Load Balancer or Route53
* `Distribution` - This is the name given the CDN which consists of a collection of Edge Locations. There are two
  types:
    1.  `Web Distribution` - Typically used for websites
    2.  `RTMP` - Used for Media Streaming (Flash files)
* Edge Locations are not just READ only, you can write to them as well
* Objects are cached for the life of the TTL (Time to Live)
  * TTL is always configured in seconds
  * By default objects are cached for 24 hours
* You can clear cached objects but you will be charged


##

**[Previous Lab/Lecture](cloudfront-create-a-cdn.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](../s3/s3-encryption.md)** 




