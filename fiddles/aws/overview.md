
Global Infrastructure
===

### Region

	geographical area consisting of 2 or more availability zones.

### Availability Zone

	one or more data centers, each with redundant power, networking and connectivity, housed in seperate facilities.

### Edge Location

	endpoints for AWS which are used for caching content. Typically this consists of CloudFront, Amazon's Content Delivery Network 
	(CDN). There are many more edge Locations than Regions. Currently there are over 96 edge locations vs 16 regions consisting of 44 availability zones.

Compute
===

### EC2

	Elastic Compute Cloud.

### EC2 Container Service

	Elastic Compute Cloud Container Service. Allows you to run and provision docker containers at scale.

### Elastic Beanstalk

	service intended for developers who don't understand AWS. This service can be used to upload code. The service will then
	handle the provisioning of EC2 resources like auto scaling groups or load balancers.

### Lambda

	service providing cloud based functions. Essentially you upload code to the cloud and then you control when
	it executes. There are no operating system or virtual machines.

### LightSail

	amazon's Virtual Private Server service (VPS). Intended for users who don't want to learn anything about AWS and want
	a private server to use. It will provision you with a server and a fixed IP address. It provides RDP access
	for windows and ssh access for linux. It also provides a management console for the server. Essentially
	it's a watered down version of the EC2 service.

### Batch

	cloud based batch computing service. Currently, this service is not covered in any certification exam.
 

Storage
===
	
### S3

	Simple Storage Service (S3). Amazon's object (file) based storage service. 

### EFS

    Elastic File System (EFS). Network attached storage service. Using this service you can upload files to volumes which 
    then can be mounted and accessed by virtual machines (aka EC2 instances).

### Glacier

	Data archive service.

### Snowball

	Service that can be used to upload large amounts of data to AWS via physical disk.

### Storage Gateway

	Virtual appliances (machines) that you install in your data center (local environment) which then
	replicate data back to S3. There are 4 different types of gateways.
	


 
	
