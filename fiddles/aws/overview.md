10,000 Foot Overview
======

![Imgur](https://i.imgur.com/ViXFPq0.png)


Global Infrastructure
===

### Region

	Geographical area consisting of 2 or more availability zones.

  * [Regions and Availability Zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
  * [Region and Availability Zone Concepts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-regions-availability-zones)

### Availability Zone

	One or more data centers, each with redundant power, networking and connectivity, housed 
	in seperate facilities.
	
  * [AWS Regions and Availability Zones](https://aws.amazon.com/about-aws/global-infrastructure/)

### Edge Location

	Endpoints for AWS which are used for caching content. Typically this consists of CloudFront, 
	Amazon's Content Delivery Network (CDN). There are many more edge Locations than Regions. 
	Currently there are over 96 edge locations vs 16 regions consisting of 44 availability zones.


Compute
===

### EC2

	Elastic Compute Cloud.

### EC2 Container Service

	Elastic Compute Cloud Container Service. Allows you to run and provision docker containers at scale.

### Elastic Beanstalk

	Service intended for developers who don't understand AWS. This service can be used to upload code. 
	The service will then handle the provisioning of EC2 resources like auto scaling groups or load 
	balancers.

### Lambda

	Service providing cloud based functions. Essentially you upload code to the cloud and then you 
	control when it executes. There are no operating system or virtual machines. 
	
  * [AWS Lambda](https://aws.amazon.com/lambda/)


### LightSail

	Amazon's Virtual Private Server service (VPS). Intended for users who don't want to learn anything 
	about AWS and want a private server to use. It will provision you with a server and a fixed IP address. 
	It provides RDP access for windows and ssh access for linux. It also provides a management console for
	the server. Essentially it's a watered down version of the EC2 service.

### Batch

	cloud based batch computing service. Currently, this service is not covered in any certification exam.
 

Storage
===
	
### S3

	Simple Storage Service (S3). Amazon's object (file) based storage service. 
	
  * [Getting Started with Amazon Simple Storage Service](https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html) 
  * [S3 FAQ](https://aws.amazon.com/s3/faqs/)

### EFS
	Elastic File System (EFS). Network attached storage service. Using this service you can upload files 
	to volumes which then can be mounted and accessed by virtual machines (aka EC2 instances).

  * [What Is Amazon Elastic File System?](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)

### Glacier

	Data archive service.

### Snowball

	Service that can be used to upload large amounts of data to AWS via physical disk.

  * [What Is an AWS Snowball Appliance?](https://docs.aws.amazon.com/snowball/latest/ug/whatissnowball.html)

### Storage Gateway

	Virtual appliances (machines) that you install in your data center (local environment) which then
	replicate data back to S3. There are 4 different types of gateways.
	


Databases
===

### RDS
	
	Relational Database Service (RDS). SQL Server, MySQL, PostGreSQL, Oracle. It also includes Aurora, 
	which is Amazon's version of MySQL.
	
  * [What Is Amazon Relational Database Service (Amazon RDS)?](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)

### DynamoDB

	No-SQL relational database service.
	
  * [Amazon DynamoDB Documentation](https://aws.amazon.com/documentation/dynamodb/) 

### ElastiCache

	Caching service. It provides a mechanism for caching commonly used things from your database server.

### Red Shift

	Data Warehousing or Business Intelligence services.



Migration
===

### AWS Migration Hub

	Tracking service. It allows you to track your applications as you migrate them to AWS. It provides 
	a mechanism for tracking (and visualizing) the migration services that you are currently 
	using with a given application.	
	 
### Application Discovery Service

	Automated collection of tools that can be used to detect what applications you have and their 
	dependencies.
	
### Database Migration Service (DMS)

	Service that can used to migrate your databases from onsite to AWS.

  * [What Is AWS Database Migration Service?](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
	

### Server Migration Service

	Service that is similar to the Database Migration Service. It can be used to migrate an onsite 
	server to AWS.

### Snowball

	Service that falls somewhere between storage and migration. Again, it can be used to upload 
	large amounts of data to AWS via physical disk.


Networking & Content Delivery
===

### VPC

	Virtual Private Cloud (VPC). Essentially its a virtual data center--firewalls, availability zones ... etc. Everything normally found in an actual data center based network. Note - In order to pass any associates exam you need to understand VPC inside out.

  * [Amazon Virtual Private Cloud](https://aws.amazon.com/vpc/)
  * [Getting Started Resource Center](https://aws.amazon.com/getting-started/)

### CloudFront

	Amazon's Content Delivery Network (CDN). 
	
  * [Amazon CloudFront](https://aws.amazon.com/cloudfront/)

### Route 53

	Amazon's Domain Name System (DNS) service.
	
  * [Amazon Route 53](https://aws.amazon.com/route53/)

### API Gateway

	Big subject on the Developer's Associates exam. Provides a way of creating your own API's for 
	your other services to talk too.

### Direct Connect
	
	Provides a way for running a "dedicated line" from a physical data center directly into your VPC. 
	It is an important topic for the Solution's Architect exam.


Developer Tools
===

Note, none of the developer tool services are featured in any of the associates exams.

### CodeStar

	Service that can be used for developer collaboration. It provides continous delivery tool chain.

### CodeCommit

	Git based source control service.

### CodeBuild

	Service used to compile test and package code.

### CodeDeploy

	Deployment service. Automates code deployment to your EC2 instances and/or your on-premises machines.
	It can also be used for Lambda function deployment.

### CodePipeline

	Continous delivery service. Used to model, visualize and automate the steps required to release 
	your software.

### X-Ray

	Service that can be used to debug and analyze your serverless applications. It allows for request tracing.

### Cloud9

	Web based Integrated Development Environment (IDE). It allows you to develop code inside the AWS console. 
	Note, cloud9 was actually a private company that was acquired by Amazon. It became a part of AWS in 2017.



Management Tools
===

### CloudWatch

	Monitoring Service. Bread and Butter of the SysOps Administrator Associates Exam.

### CloudFormation

	Service for scripting infrastructure. Features heavily in the Solutions Architect associates exam 
	as well as the Professional exams.

### CloudTrail

	Audit trail service. Service used to log changes to your AWS environment. The service is turned on by 
	default, but it only stores things for one week.
	
  * [What Is AWS CloudTrail?](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)

### Config

	Service used to monitor the configuration of your entire AWS environment. It offers point in time 
	snapshots that can be used to analyze the change of your configuration over time.

### OpsWorks
	
	Service that is very similar to Elastic Beanstalk. It integrates both Chef and Puppet. Features 
	prominently in the SysOps Administrator exam.
	
  * [What Is AWS OpsWorks?](https://docs.aws.amazon.com/opsworks/latest/userguide/welcome.html)

### Service Catalog

	Service for managing a catalog of services that are available for use on AWS. Catalogs can include 
	anything from EC2 images, operating systems, software ... etc. It is intended for large organizations 
	with goverance and compliance requirements. It is not currently featured in any of the associates exams.

### Systems Manager
	
	Interface for managing your AWS resources.  Typically, its used for EC2 instances. A good example 
	would patch maintenance. If you wanted to apply patches to 1000 of EC2 instances, the Systems 
	Manager service is where you would do that. It is currently not featured in any of the associates exams.

### Trusted Advisor

	Featured in the Solutions Architect exam. Service that analyzes your AWS environment and 
	provides "advice" on how it can be improved. [AWS Trusted Advisor](https://docs.aws.amazon.com/awssupport/latest/user/getting-started.html#trusted-advisor)

### Managed Services

	This is a relatively new service. Essentially it is AWS's managed service offering. If you don't 
	want to worry about your EC2 instances or auto scaling, managed services can be used instead.
	It is not currently featured in any of the exams.


Media Services
===

Note, these services are brand new as of 2017 and are not featured (yet) on any of the exams.

### Elastic Transcoder

	This service is not brand new. It has been around for a long time. The service can be used to 
	automate media file formatting.
	
### MediaConvert

	File based video transcoding service with broadcast grade features. It allows you to create 
	video and on-demand content for broadcast and multi-screen delivery at scale.

### MediaLive

	Broadcast grade live video processing service. It can be used to create high quality video 
	streams to deliver to broadcast televisions and internet connected multi-screen devices.

### MediaPackage

	Service that can be used to prepare and protect your videos for delivery over the internet.

### MediaStore
	
	Storage service optimized for media. It can be used to deliver live and on demand video.

### MediaTailor
	
	Service that allows you do targeted advertising into video streams without sacrificing 
	broadcast level quality.


Machine Learning
===

Note, these services are brand new as of 2017 and are not featured (yet) on any of the exams.

### SageMaker

	Service designed to make really easy for developers to use deep learning. It is brand new as of 2017. 
	For an explanation of "deep learning", see https://en.wikipedia.org/wiki/Deep_learning.

### Comprehend
	
	Service for doing sentiment data analysis. In other words, are people saying good things or bad 
	things about your products.

### DeepLens

	Artificially aware camera. It is a physical piece of hardware. 

### Lex

	Service behind the Amazon Alexa service.  

### Machine Learning

	Normal machine learning service. In other words, unlike SageMaker it is not based on deep learning 
	Essentially, you give it a data set and some rules and it will predict an outcome. In the case of Amazon,
	whenever you see a suggested product, that is machine learning.

### Polly

	Service that can be used to convert text into speech.

### Rekognition

	Image and video recognition service. It allows you to upload a media file and the service will provide 
	a description of its contents.

### Amazon Translate

	Amazon's machine translation service. It's similar to google's translate service.

### Amazon Transcribe

	Service for extracting speech as text from uploaded media files.


Analytics
===

### Athena

	Service that allows you to run SQL queries against files (objects) in your S3 buckets. This service 
	was introduced in 2016 and does not feature in any exams.

### EMR

	Elastic Map Reducer (EMR) service. This service is featured in the Solutions Architect Exam. The 
	service is intended for "Big Data" solutions.

  * [What Is Amazon EMR?](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html)

### CloudSearch & ElasticSearch Service

	Search services for AWS. Both are relatively new (2016) and are not covered on any exam.

### Kinesis

	Service that allows you to perform real-time analytics on large amounts of data, which is uploaded 
	to the service. It is featured prominently in the Solutions Architect exam. 

  * [Amazon Kinesis Documentation](https://aws.amazon.com/documentation/kinesis/)

### Kinesis Video Streams
	
	Version of Kinesis tailored for video media analytics. This is a new service added in 2018. 
	It is not covered on any exam.

### QuickSight

	Amazon's Business Intelligence (BI) service. This is a relatively new service (2016). It is not 
	currently featured on any exams. 
	
  * [Welcome to Amazon QuickSight!](https://docs.aws.amazon.com/quicksight/latest/user/welcome.html) 

### Data Pipelines

	Service that can be used to move data between different AWS services. It comes up in the 
	Solutions Architect Professional and Developers associate exams.

### Glue

	New service introduced in 2017. It is Amazon's Extract Transform Load (ETL) service offering.  
	It is not currently featured on any exam.
	

Security, Identity & Compliance
===

### IAM

	Identity Access Management (IAM) service. This service is featured heavily in the Solutions 
	Architect exam. 

### Cognito

	Device authentication service and provides mobile device users temporary access to AWS resources.

### GuardDuty

	Brand new AWS offering (2017). It can be used to monitor for malicious activities on your AWS account.
	This service is not currently covered on any of the exams.

### Inspector

	Agent service that can be installed on your virtual machines (EC2 instances). Once in place it can 
	then be used to run a suite of tests to verify whether or not their are any security vulnerabilities.

### Macie

	S3 bucket security scanning service.

### Certificate Manager

	Amazon's Secure Socket Layer (SSL) offering. It provides free SSL certificate service for 
	Route 53 registered domains.

### CloudHSM

	Amazon's Hardward Security Module (HSM) offering. A security module is a dedicated piece of hardware 
	used to store private and public authentication keys. These keys can be used for anything within AWS
	requiring authentication such as EC2 instances. The keys can also be used to encrypt objects on AWS. 
	The service used be very expensive and required a 5K setup fee. However, Amazon recently released 
	per hour billing costing a 1.20$ per hour.  

### Directory Service

	Service that can be used to integrate Microsoft Active Directory services into AWS.
	It is featured at high level on the Solutions Architects exam.
  
### WAF

	Web Application Firewall (WAF) service. It can be used to prevent cross site scripting and SQL 
	injection attacks. It targets the application layer and analyzes user's interactions with web based 
	applications. The service is featured in the Security Specialists exam.

### Shield

	Distrubited Denial of Service (DDoS) mitigation service. It is provided (or enabled) by default 
	for alot of other services including CloudFront, Load Balancers, and Route 53. There is also an 
	advanced version of the service that can be used for 24Hr protection. It cost 3K per month.

### Artifact

	Portal for on-demand access to download AWS Audit and Compliance reports. It also allows for the 
	management of certain agreement documents. For example, using the interface you can download the 
	details of their Service Organization Controls (SOC) or Payment Card Industry (PCI) reports.


Mobile Services
===

Note, these services are new and are not featured (yet) on any of the exams.

### Mobile Hub

	Management console for mobile apps. If already have a mobile app, then using the service you create 
	a "mobile hub". This will setup AWS services for you generating a cloud configuration file. You 
	then use the AWS mobile SDK to connect your mobile app to your new AWS backend.
 
### Pinpoint

	New service that allows the user to create push notifications to drive mobile engagement.
	For example one of your users is near a specific restaurant. Pinpoint might
	be used to send them a notification of a coupon should they decide to visit
	that restaurant.

### AWS AppSync

	New service (2017). It can be used to update data in mobile and web applications in real time. It can 
	also be used to update data for offline users as soon as they reconnect.

### Device Farm

	Service that can be used to test mobile apps on real live devices. 

### Mobile Analytics

	Amazon's analytics service designed for mobile apps.


AR / VR
===

Note, Augmented Reality (AR) and Virtual Reality (VR) services are new and are not featured (yet) on any of the exams.

### Sumerian

	Service that can be used for AR, VR and 3D application design. It was launched in 2017. It is still 
	in preview (or beta) mode. The service does not require any prior development (or coding) experience 
	to develop 3D environments.


Application Integration
===

### Step Functions

	Service that can be used to manage and design workflows around lamba functions. It is a brand new 
	service and not currently featured on any exam.

### Amazon MQ

	Service for creating message queues within an application. It is similar to RabbitMQ. 
     	 
### SNS
	Simple Notification Service (SNS). The original AWS push notification service launched in 2006.

### SQS

	Simple Queue Service (SQS). One of the original AWS offerings. It can be used to "decouple" your 
	infrastructure services.

### SWF

	Simple WorkFlow Service (SWF). One of the original AWS offerings. This service is actually employed 
	by Amazon's warehouses to process orders.


Customer Engagement
===

### Connect

	Contact center as a service interface. Think of having your own call center in the cloud. 
	This is a new service. It is not (yet) covered on any exam.

### SES

	Simple Email Service (SES). It is a highly scaleable service that can be used to send and 
	manage email communication with application users. This service is covered at high level on the 
	Solutions Architect exam.


Business Productivity
===

### Alexa for Business
	
	Brand new service launched at re-invent in 2017.  It provides a whole bunch of services (or functions).  
	For example it can be used to dial into a meeting room or re-order ink for a printer.  It is not 
	covered on any exam.

### Chime

	Service similar to Google Hangouts or Zoom Meetings. It can be used for video conferencing within AWS. 
	Meetings can be recorded even with very low bandwidth. 

### Work Docs

	Service similar to Dropbox. It provides a way of safely and securely storing your work related 
	documents in AWS. This service is featured on the Solutions Architect exam.

### WorkMail

	Service similar to Gmail. It provides a way of managing and sending email via AWS. 


Desktop & App Streaming
===

Note, these services are new and are not featured (yet) on any of the exams.

### Workspaces

	Virtual Desktop Infrastructure (VDI) service. It allows you to run different operating systems 
	in the cloud.
	
  * [Amazon WorkSpaces](https://aws.amazon.com/workspaces/)

### AppStream 2.0

	AWS version Citrix. It can be used to stream actual desktop applications, which are running in 
	the cloud, to different devices. Interesting, it is the only service in AWS that actually 
	includes a version number--2.0.
	

Internet Of Things
===

Note, these services are new and are not featured (yet) on any of the exams.

### iOT

	Service for capturing data from mutiple iOT devices.
	

### iOT Device Management

	Scalable service that can be used managing mutiple iOT devices. 

### Amazon FreeRTOS

	Amazon's Real Time Operating System (RTOS) offering. It is essentially an operating system 
	designed for micro controllers.

### Greengrass

	Service that allows you to run local compute, messsaging, data caching, sync, and machine learning 
	interface capabilities for connected devices in a secure way. 


Game Development
===

### GameLift

	Service designed to help in the development of games. This service was launched in 2016 and is
	not currently not featured on any exams.


Flash Cards
==

<a href="file://overview.txt" download="overview.txt">Overview Flash Card Deck</a>

_NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy)._

## 

**[AWS (Root)](readme.adoc) | [Next Lab/Lecture](dont-freakout.md)**


	
