
Global Infrastructure
===

### Region

	geographical area consisting of 2 or more availability zones.

### Availability Zone

	one or more data centers, each with redundant power, networking and connectivity, housed 
	in seperate facilities.

### Edge Location

	endpoints for AWS which are used for caching content. Typically this consists of CloudFront, 
	Amazon's Content Delivery Network (CDN). There are many more edge Locations than Regions. 
	Currently there are over 96 edge locations vs 16 regions consisting of 44 availability zones.

Compute
===

### EC2

	Elastic Compute Cloud.

### EC2 Container Service

	Elastic Compute Cloud Container Service. Allows you to run and provision docker containers at scale.

### Elastic Beanstalk

	service intended for developers who don't understand AWS. This service can be used to upload code. 
	The service will then handle the provisioning of EC2 resources like auto scaling groups or load 
	balancers.

### Lambda

	service providing cloud based functions. Essentially you upload code to the cloud and then you 
	control when it executes. There are no operating system or virtual machines.

### LightSail

	amazon's Virtual Private Server service (VPS). Intended for users who don't want to learn anything 
	about AWS and want a private server to use. It will provision you with a server and a fixed IP address. 
	It provides RDP access for windows and ssh access for linux. It also provides a management console for
	the server. Essentially it's a watered down version of the EC2 service.

### Batch

	cloud based batch computing service. Currently, this service is not covered in any certification exam.
 

Storage
===
	
### S3

	Simple Storage Service (S3). Amazon's object (file) based storage service. 

### EFS
	Elastic File System (EFS). Network attached storage service. Using this service you can upload files 
	to volumes which then can be mounted and accessed by virtual machines (aka EC2 instances).

### Glacier

	Data archive service.

### Snowball

	Service that can be used to upload large amounts of data to AWS via physical disk.

### Storage Gateway

	Virtual appliances (machines) that you install in your data center (local environment) which then
	replicate data back to S3. There are 4 different types of gateways.
	


Databases
===

### RDS
	
	Relational Database Service (RDS). SQL Server, MySQL, PostGreSQL, Oracle. It also includes Aurora, 
	which is Amazon's version of MySQL.

### DynamoDB

	No relational databases. 

### Elasticache

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
	
### Database Migration Service

	Service that can used to migrate your databases from onsite to AWS.

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

### CloudFront

	Amazon's Content Delivery Network (CDN). 

### Route53

	Amazon's Domain Name System (DNS) service.

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

### Config

	Service used to monitor the configuration of your entire AWS environment. It offers point in time 
	snapshots that can be used to analyze the change of your configuration over time.

### OpsWorks
	
	Service that is very similar to Elastic Beanstalk. It integrates both Chef and Puppet. Features 
	prominently in the SysOps Administrator exam.

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
	provides "advice" on how it can be improved.

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

### CloudSearch & ElasticSearch Service

	Search services for AWS. Both are relatively new (2016) and are not covered on any exam.

### Kinesis

	Service that allows you to perform real-time analytics on large amounts of data, which is uploaded 
	to the service. It is featured prominently in the Solutions Architect exam. 

### Kinesis Video Streams
	
	Version of Kinesis tailored for video media analytics. This is a new service added in 2018. 
	It is not covered on any exam.

### QuickSight

	Amazon's Business Intelligence (BI) service. This is a relatively new service (2016). It is not 
	currently featured on any exams.  

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

	 