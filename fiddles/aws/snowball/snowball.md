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

1.  What is Snowball?
2.  What are the three types?
3.  What is the Import/Export service?
4.  What is a standard Snowball?
5.  What is a Snowball Edge?
6.  What is a Use Case for Snowball Edge?
7.  What is a Snowmobile? What is a fun facts about it?
8.  Why is Snowball considered both a Storage and Migration Service?

## Answers

1.  Service that can be used to upload large amounts of data to AWS via physical device.
2.  Snowball, Snowball Edge, Snowmobile
3.  This service preceded Snowball and is still available although inaccessible via the console. The service 
    was intended to accelerate moving large amounts of data into the cloud using portable storage media. 
    Lots of people with all different types of external hard drives (media) started using
    the service. This became a nightmare for Amazon to manage, which led to Snowball.
4.  Pure storage device. Comes in different sizes starting at 50 TB in the US; 80 TB outside the US
5.  storage + compute functionality-- mini AWS data center. lambda functions can be run locally.
6.  Airline that needs to collect data while their planes are in flight
7.  45 foot container arriving by truck. (1) Offers a 100 Petabytes of storage; (2) Can come with security guards; 
    (3) Currently only available in the continental United States; (4) Price available upon application
8.  Because it can be used for a one time migration of data to AWS or as a temporary air gaped gateway.


### Snowball Flash Cards
  
  To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  
  <table>
  <tr>
  <td>
  <b><a href="snowball.txt" download="snowball.txt">Snowball 101 Flash Card Deck</a></b>
  </td>
  </tr>
  </table>
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/blob/master/fiddles/aws/readme.adoc#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](../storage-gateway/storage-gateway-exam-tips.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](snowball-exam-tips.md)**

