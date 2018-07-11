Well Architected Framework (Security)
======

18 minute lecture  on the Security section of the [AWS Well Architected Framework (68 Pages)](https://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf) White Paper.


  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/i8kGeU8.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/223c8538-772d-867a-a3c9-52f71df9e637/6a3753e8-9dd5-21b3-e00b-36e40f6ce9e2/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


### Design Principles

* Apply Security at all layers
* Enable Traceability
* Automate responses to Security Events
* Focus on Securing your system
* Automate security best practices (See [Center for Internet Security](https://www.cisecurity.org/))


### Shared Responsibility Model

The share responsibility model (below) illustrates what security the customer is responsible for vs. what amazon is 
responsible for.  Note, this model comes up alot on the exam.

<table>
<tr>
<td>
 <img src="https://i.imgur.com/iRmtAfv.jpg" height="200" title="Shared Responsibility Model" />
</td>
</tr>
</table>


### Definition

* Security in the cloud consists of 4 areas:

  1.  Data Protection
  2.  Privilege Management
  3.  Infrastructure protection
  4.  Detective controls

#### Data Protection

Before you begin to architect security practices across your environment, basic data classification should be in
place. You should organise and classify your data into segments such as publicly available, available to only 
members of your organisation, available to only certain members of your organisation, available only to the 
board etc. You should also implement a least privilege access system so that people are only able to access what
they need. However, most importantly, you should encrypt everything where possible, whether it be at rest or in
transit.


##### Best Practices

When using AWS, the following practices help protect your data:

* __AWS customers maintain full control over their data__
* __AWS makes it easier for you to encrypt your data and manage keys__, including regular key rotation, which can be 
  easily automated natively by AWS or maintained by the customer
* __Detailed logging__ is available that contains important content, such as file access and changes
* AWS has designed storage systems for exceptional __resiliency__. As an example, S3 is designed for 11 nines of
  durability. (For example, if you store 10,000 objects on S3, you can on average expect to incur a loss of a
  single object once every 10,000,000 years.) 
* __Versioning__, which can be part of a larger data lifecycle-management process, can protect against accidental 
  overwrites, deletes, and similar harm.
* __AWS never initiates the movement of data between regions.__ Content placed in a region will remain in that
  region unless the customer explicitly enables a feature or leverages a service that provides this
  functionality.


##### Questions

As an architect, you should ask the following questions in relation to Data Protection:

* How are you encrypting and protecting your data at rest?
* How are you encrypting and protecting your data in transit? (SSL)


#### Privilege Management

Privilege Management ensures that only authorized and authenticated users are able to access your resources, and only in
a manner that is intended.  


##### Best Practices

Privilege Management Best Practices include:

* Access Control Lists (ACLs)
* Role based Access Controls
* Password Management (such as password rotation policies)


##### Questions

As an architect, you should ask the following questions in relation to `Privilege Management`:

* How are you protecting access to and use of the AWS root account credentials?
* How are you defining roles and responsibilities of system users to control human access to the AWS
  Management Console and APIs?
* How are you limiting automated access (such as from applications, scripts, or third-party tools or services) to
  AWS resources?
* How are you managing keys and credentials?


#### Infrastructure Protection

Outside of the cloud, this how you protect your data center.


##### Best Practices

Infrastructure Protection best practices include:

* RFID controls
* Security
* Lockable cabinets
* CCTV

__Note - Within AWS they handle this, so really infrastructure protection exists at the VPC level.__


##### Questions

As an architect, you should ask the following questions in relation to `Infrastructure Protection`:

* __How are you enforcing network and host-level boundary protection?__ _If you think of a VPC, are you just using
  security groups or are you also using NACL's? Are you using public and private subnets? And then from a host
  level, what users are you using to login in to that? Does it have multiple user accounts or is just the `EC2-user`?_
* __How are you enforcing AWS service level protection?__ _Do you have multiple users being able to login into the
  console? Do you have groups setup to give those users different privileges within AWS? Do you have MFA enabled
  for all those users? Do you have a strong password protection or rotation policy?_
* __How are you protecting the integrity of the operating systems on your EC2 instances?__ _Do you have anti-virus
  installed? If you are running a Windows IIS environment in the cloud, are you protecting that using
  anti-virus?_


#### Detective Controls

You can use detective controls to detect or identify a security breach.


##### Best Practices

Detective Controls best practices include:

* AWS CloudTrail
* Amazon CloudWatch
* AWS Config
* Amazon Simple Storage Service (S3)
* Amazon Glacier


##### Questions

As an architect, you should ask the following questions in relation to `Detective Controls`:

* __How are you capturing and analyzing AWS logs?__ _Do you have CloudTrail turned on? Do you have CloudTrail turned
  on in each region you are operating? Are you using IDS and IPS or any kind of log management service?_


### Key Amazon Services

* `Data Protection` - You can encrypt your data both in transit and at rest using: (1) ELB, (2) EBS, (3) S3, (4) RDS
* `Privilege Management` - IAM, MFA
* `Infrastructure Protection` - VPC
* `Detective Controls` - AWS Cloud Trail, AWS Config, Amazon Cloud Watch


## Exam Tips

* Security in the cloud consists of 4 areas:

  1.  Data protection
  2.  Privilege management
  3.  Infrastructure protection
  4.  Detective controls

* Questions

  * Data Protection
    
    1.  How are you encrypting and protecting data at rest?
    2.  How are you encrypting and protecting your data in transit? (SSL)  

  * Privilege Management
  
    1.  How are you protecting access to and use of the AWS root account credentials?
    2.  How are you defining roles and responsibilities of system users to control human access to AWS Management
        Console and APIs?
    3.  How are you limiting automated access (such as from applications, scripts or third party tools or services) to
        AWS resources?
    4.  How are you managing keys and credentials?
    
  * Infrastructure Protection
  
    1.  How are you enforcing network and host-level boundary protection?
    2.  How are you enforcing AWS service level protection?
    3.  How are you protecting the integrity of the operating systems on your Amazon EC2 instances?
    
  * Detective Controls
  
    1.  How are you capturing and analyzing your AWS logs?
    
 
### Review Questions

1.  What are the 5 Security Design Principles?
2.  What is the shared responsibility model?
3.  In general what security are Amazon customers responsible for in the cloud?
4.  In general what security is Amazon responsible for in the cloud?
5.  Specifically, what 6 things must customers secure in the cloud?
6.  Specifically, what 7 things must Amazon secure in the cloud?
7.  What four areas does Security in the cloud consist of?
8.  Define `Data Protection`.
9.  What is a least privelege access system?
10. How is encryption (usually) implemented for data in transit?
11. What are the 6 `Data Protection` best practices?
12. In the case of S3, what does the 11 nines guarantee mean?
13. As an architect, what two questions should you ask about `Data Protection`?
14. Define `Privilege Management`.
15. What are the 3 `Privilege Management` best practices.
16. As an architect, what 4 questions should you ask about `Privilege Management` when building a new system?
17. Define `Infrastructure Protection`.
18. What are the 4 `Infrastructure Protection` best practices.
19. As an architect, what 3 questions should you ask about `Infrastructure Protection`?
20. Define `Detective Controls`.
21. What are the 4 services that can be used to implement `Detective Controls`?
22. As an architect, what 1 question should you ask about `Detective Controls`?


### Answers

1.  (1) Apply security at all layers; (2) Enable Traceability; (3) Automate responses to Security Events; 
    (4) Focus on Securing your system; (5) Automate Security Best Practices
2.  Diagram illustrating what security the customer is responsible for vs. what amazon is responsible for.
3.  Customers are responsible for security "IN" the cloud.
4.  Amazon is responsible for security "OF" the cloud.
5.  (1) Customer Data; (2) Platform, Applications, Identity & Access management; (3) Operating Systems, Network, and
    Firewall Configuration; (4) Client-side Data Encryption & Data Integrity Authentication; (5) Server-Side Encryption
    (File Systems and/or Data); (6) Network Traffic Protection (Encryption / Integrity / Identity)
6.  (1) Compute Services; (2) Storage Services; (3) Database Services; (4) Networking Services; (5) Regions;
    (6) Availability Zones; (7) Edge Locations
7.  (1) Data Protection; (2) Privilege Management; (3) Infrastructure Protection; (4) Detective Controls
8.  Before you begin to architect security practices across your environment, basic data classification should be in
    place. You should organise and classify your data into segments such as publicly available, available to only 
    members of your organisation, available to only certain members of your organisation, available only to the 
    board etc. You should also implement a least privilege access system so that people are only able to access what
    they need. However, most importantly, you should encrypt everything where possible, whether it be at rest or in
    transit.
9.  People are only able to access what they need.
10. HTTPS
11. (1) Customers maintain full control over their data; (2) Easy encryption and key management; (3) Detailed logging;
    (4) Storage system resilency -- S3 11 nines guarantee; (5) Versioning; (6) Only customers can move data between
    regions.
12. if you store 10,000 objects on S3, you can on average expect to incur a loss of a single object once every 
    10,000,000 years.
13. (1) How are you encrypting and protecting your data at rest? (2) How are you encrypting and protecting your data in 
    transit? (SSL)
14. Privilege Management ensures that only authorized and authenticated users are able to access your resources, 
    and only in a manner that is intended. 
15. (1) Access Control Lists (ACLs); (2) Role Based Access Controls; (3) Password management (such as password) 
    rotation policies
16. (1) How are you protecting access to and use of the AWS root account credentials? (2) How are you defining roles 
    and responsibilities of system users to control human access to the AWS Management Console and APIs? (3) How are 
    you limiting automated access (such as from applications, scripts, or third-party tools or services) to AWS 
    resources? (4) How are you managing keys and credentials?
17. Outside of the cloud, this how you protect your data center.
18. (1) RFID controls; (2) Security; (3) Lockable cabinets; (4) CCTV
19. (1) How are you enforcing network and host-level boundary protection? (2) How are you enforcing AWS service level 
    protection? (3) How are you protecting the integrity of the operating systems on your EC2 instances?
20. You can use detective controls to detect or identify a security breach.
21. (1) AWS CloudTrail; (2) Amazon CloudWatch; (3) AWS Config; (4) Amazon Simple Storage Service (S3); (5) Amazon 
    Glacier
22. How are you capturing and analyzing AWS logs?
    

### Well Architected Framework Security Flash Card Deck
  
 To download the review flash card deck for this lecture, right click the following link and select
  `Save Link As`. 
  
  <table>
  <tr>
  <td>
  <b><a href="whitepapers-waf-security-flashcards.txt" download="whitepapers-waf-security-flashcards.txt">Well Architected Framework Security - Flash Card Deck</a></b>
  </td>
  </tr>
  </table>
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](whitepapers-waf-intro.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](whitepapers-waf-security.md)**
