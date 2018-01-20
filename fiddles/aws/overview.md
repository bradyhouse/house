
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

