![Imgur](https://i.imgur.com/so3NXVC.png)

Snowball
======

The story of Snowball begins with the `AWS Import/Export Disk` service. This service, which preceded Snowball, was 
intended to accelerate moving large amounts of data into the cloud using portable storage media. Essentially, 
you sent Amazon an external hard drive.  They then copied its contents directly to the cloud using 
their internal network. The benefit of this approach was that the customer's internet bandwidth was
no longer a factor in putting large amounts of data into the cloud.

The problem was, lots of people with all different types of external hard drives (media) started using
the service. This became a nightmare for Amazon to manage. And so at the 2015 Reinvent conference, they announced
`Snowballs`.  There are (now) three different types:

  * Snowball
  * Snowball Edge (announced at Reinvent in 2016)
  * Snowmobile (announced at Reinvent in 2016 as well)
  

## Snowball

`So what is a snowball???` It is a box:

![Imgur](https://i.imgur.com/14EPlnc.png)
  

Because it is hardware, it obfuscates the common challenges with large scale data transfer-- aka network costs, transfer
time, and (of course) security. Transferring data using a Snowball is simple, fast, secure and cheap. 

Using Snowball, customers can upload as much as 80 TB of data in all regions. The device uses multiple layers of 
security designed to protect your data including tamper-resistant enclosures, 256-bit encryption, and an industry-standard 
Trusted Platform Module (TPM) designed to ensure both security and full chain-of-custody of your data. Once the data is 
transfer job has been processed and verified, AWS performs a software erasure of the Snowball appliance.


### Snowball Edge

![Imgur](https://i.imgur.com/14EPlnc.png)


It looks like a regular Snowball, but it is packaged with on board `compute` capabilities. It is essentially and 
AWS data center in a box. As a result it can be used to move large of amounts of data into the cloud or to 
support local workloads in remote or offline locations. For example lambda functions can be run locally 
using a Snowball edge.

The device connects to your existing applications and infrastructure using standard storage interfaces, streamlining the
data transfer process and minimizing setup and integration. Snowball Edge can be clustered together to form a local 
storage tier and process your data on-premises, helping ensure your applications continue to run even when they are not 
able to access the cloud. 


### Snowmobile

![Imgur](https://i.imgur.com/Wd0uTcv.png)


Snowmobile is a Exabyte-scale data transfer service used to move extremely large amounts of data to the cloud. Customers
can transfer up to 100 PB per snowmobile, a 45-foot long ruggedized shipping container, pulled by a semi-trailer 
truck. Snowmobile makes it easy to move massive volumes of data to the cloud, including video libraries, image
repositories, or even a complete data center migration. Transferring data with Snowmobile is secure, fast and cost
effective.


## Review Questions

Here is what you should know for the exam.

1.  What is a Snowball?
2.  What is th Import/Export service?
3.  What can Snowball do?


## Answers

1.  Service that can be used to upload large amounts of data to AWS via physical device.
2.  This service preceded Snowball and is still available although inaccessible via the console. The service 
    was intended to accelerate moving large amounts of data into the cloud using portable storage media. 
    Lots of people with all different types of external hard drives (media) started using
    the service. This became a nightmare for Amazon to manage, which led to Snowball.
3.  Import data to S3, Export from S3



