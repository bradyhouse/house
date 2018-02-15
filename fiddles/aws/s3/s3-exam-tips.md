![Imgur](https://i.imgur.com/M32RGmj.png)


S3 Summary Exam Tips
======

* Remember that S3 is `Object` based-- You can upload files
* Files can be from 0 to 5 TB
* There is unlimited storage
* Files are stored in `Buckets`
* S3 is a universal namespace-- Names must be unique globally
* S3 bucket names must be all lower case
* S3 names always look like this `s3-eu-west-1.amazonaws.com/bradyhouse`


## The Consistency Model

* Read after Write consistency for PUTS of new Objects

    ``` Translation:  As soon as you put a new object on S3 you will able to read that object```
    
* Eventual Consistency for overwrite PUTS and DELETES (can take some time to propagate)
    
    ```Translation: If you update or delete an object on S3, and then immediately try to read that object, ```
    ```you may get the old object.```
    

## Storage Classes/Tiers

* S3 (durable, immediately available, frequently accessed)
  * Most durable (`11 9's`)
  * Lowest latency
* S3-IA (durable, immediately available, infrequently accessed)
  * Just as durable as S3 (`11 9's`)
  * Millisecond latency
* S3 - Reduced Redundancy Storage (data that is easily reproducible, such as thumb nails etc)
  * durability of 99.99%
  * Object that you can afford to lose
  * Lower cost than S3
* Glacier - Archived data
  * 3-5 hour wait before accessing
  * Cheapest of all the storage classes
  

## Core Fundamentals

* `Key` - name
* `Value` - data
* `Version ID` - See [S3 Versioning Notes](s3-versioning.md)
* `Metadata` - data about data
* `Access Control Lists`
* Object based storage only (for files)
* __Not suitable to install an operating system__


## Versioning

* Stores all versions of an object
  * This includes all writes even if you delete an object
  * When versioning is turned on deletion simply creates a marker. 
    It does not remove the actual object
  * And you pay for each version of an object
    
    ```Translation: Given a 1 GB file that you update 10 times. You will be charged for 10 GBs.```
      
* Great backup tool
* Once enabled, versioning cannot be disabled only suspended
* It integrates with life cycle rules -- See [S3 LifeCycle Notes](s3-lifecycle.md)
* MFA Delete capability
  
  ```Translation: multi-factor authentication is required before an object can be deleted```

* Cross Region Replication, requires versioning enabled on the source bucket as well as the destination bucket


## LifeCycle Management

* Can be used in conjunction with versioning
* Can be applied to current and previous versions
* Following `class transition` actions can be configured:
  
  * Transition from Standard to S3-IA Storage Class (128 KB min / 30 days after creation)
  * Transition from Standard to Glacier Storage Class (128 KB min / 1 day after creation) 
  * Transition from S3-IA to Glacier Storage Class (128 KB min / 30 days after transition to S3-IA)
  * Permanently delete objects


## CloudFront

See [CloudFront Exam Tips](../cloudfront/cloudfront-exam-tips.md)


## Bucket Security

* By default all newly created buckets are PRIVATE
* You can setup access control to your buckets using:
  *  Bucket Policies
  *  Access Control Lists
* S3 buckets can be configured to create access logs 
  * This can be configured to written to a secondary bucket belong to same of different account
  
  
## Encryption

* In Transit
  * SSL/TLS (aka HTTPS)
* At Rest (4 types)
  * Server Side Encryption
    * `SSE-S3` - S3 Managed Keys 
    * `SSE-KMS` - AWS Key Management Service, Managed Keys
    * `SSE-C` - Server Side Encryption with Customer Provided Key
  * Client Side Encryption - You manage the encryption 
    * upload encrypted files 
    * download encrypted files and decrypt


## Storage Gateway

See [Storage Gateway Exam Tips](../storage-gateway/storage-gateway-exam-tips.md)


## Snowball

See [Snowball Exam Tips](../snowball/snowball-exam-tips.md)


## Transfer Acceleration

* It can be used to speed up transfers to S3
* Costs Extra and has the greatest impact on people who are in far away locations
* Essential people are uploading files to an Edge Location which is then being written to your S3 Bucket


## Static Websites

* S3 can be used to host static websites
* It is serverless
* Very cheap
* Scales automatically
* Static only -- cannot host dynamic sites 
  * No PHP or ASP.NET
  
  
## Finally ...

* Write to S3 - HTTP 200 Code is returned upon success
* You can load files to S3 much faster by enabling multipart upload
* **Read the [S3 FAQ](https://aws.amazon.com/s3/faqs/) before taking the exam -- IT COMES UP A LOT!**


## Additional Reading

* [AWS Storage Update – New Lower Cost S3 Storage Option & Glacier Price Reduction](https://aws.amazon.com/blogs/aws/aws-storage-update-new-lower-cost-s3-storage-option-glacier-price-reduction/)
* [Storage Classes](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html) 

  

  
  
  







  
