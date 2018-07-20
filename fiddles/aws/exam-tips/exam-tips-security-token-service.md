<img src="https://i.imgur.com/ksNyYy8.png" height="100" title="AWS STS" />


Exam Tips - Security Token Service
======

8 Minute Lecture detailing what you need to know about Security Token Service for the exam. For this one, I just 
watched and captured the pertinent review questions.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/P9B7kYk.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/additional-exam-tips/f834534f-ec5e-ba45-0235-ca126222ef86/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*

   
### Review Questions

1.  What is STS?
2.  What are the 3 sources of STS identities?
3.  What is the source for STS federated users typically?
4.  What are the characteristics of STS federated sourced users? (3)
5.  What is the source for STS Mobile App federated users typically? What are some examples?
6.  What is STS cross account access?
7.  In the context of STS, what is the technical definition of Federation?
8.  In the context of STS, what is the technical definition of an Identity Broker?
9.  In the context of STS, what is the technical definition of an Identity Store?
10. In the context of STS, what is the technical definition of Identities?
11. Is Identity Broker software something you can typically by from a vendor or is it developed in-house?
12. Ugly Scenario Question: "You are hosting a company website on some EC2 web servers in your VPC. Users of the 
    website must log into the site which then authenticates against the companies active directory servers which
    are based on site at the companies head quarters. Your VPC is connected to your company's HQ via secure
    IPSEC VPN. Once logged in the user can only have access to their own S3 bucket. How do you set this up?" What
    is the gory detail solution? (9)
13. Ugly Scenario Question: "You are hosting a company website on some EC2 web servers in your VPC. Users of the 
    website must log into the site which then authenticates against the companies active directory servers which
    are based on site at the companies head quarters. Your VPC is connected to your company's HQ via secure
    IPSEC VPN. Once logged in the user can only have access to their own S3 bucket." What is the `broad strokes` 
    solution? (3)
14. Ugly Scenario Question: "You are hosting a company website on some EC2 web servers in your VPC. Users of the 
    website must log into the site which then authenticates against the companies active directory servers which
    are based on site at the companies head quarters. Your VPC is connected to your company's HQ via secure
    IPSEC VPN. Once logged in the user has access to S3 based on their LDAP defined IAM role." What is the `broad strokes` 
    solution? (3)
 
 
### Answers

1.  Security Token Service - grants users limited and temporary access to AWS resources.
2.  (1) Federation (typically Active Directory); (2) Federation with Mobile Apps; (3) Cross Account Access
3.  Active Directory
4.  (1) Uses SAML; (2) Grants temporary access based off users Active Directory credentials. You do not need to be an
    IAM user; (3) Single sign on allows users to log into the AWS Console without assigning IAM credentials
5.  OpenID provider; Facebook, Google, Amazon
6.  Allows users from one AWS account access resources in another
7.  Combining or joining a list of users in one domain (such as IAM) with a list of users in another domain (such
    as Active Directory, Facebook, etc)
8.  A service that allows you take an identity from point A and join it (federate it) to point B
9.  Services like Active Directory, Facebook, Google etc
10. A user of a service like Facebook etc
11. In-house
12. (1) Employee enters their username / password; (2) The application calls an Identity Broker, which captures the
    username and password; (3) The identity broker uses the organization's LDAP directory to validate the employee's
    identity; (4) The Identity Broker calls the new `GetFederationToken` function using IAM credentials. The call
    must include an IAM policy and duration (1 to 36 hours), along with a policy that specifies the permissions
    to be granted to the temporary security credentials; (5) The STS confirms the policy of the IAM user making the
    call to `GetFederationToken` gives permission to create new tokens and then returns four values to the 
    application: (a) Access Key, (b) Secret Key, (c) Token, and (d) Duration (Token's lifetime); (6) The identity
    Broker returns the temporary security credentials to the reporting application; (7) The data storage application
    uses the temporary security credentials (including the token) to make requests to Amazon S3; (8) Amazon
    S3 uses IAM to verify that the credentials allow the requested operation on the given S3 bucket and key; 
    (9) IAM provides S3 with the go-ahead to perform the requested operation.
13. (1) Develop an Identity Broker to communicate with LDAP and AWS; (2) Identity Broker always authenticates with
    LDAP first THEN with AWS STS; (3) Application then gets temporary access to AWS resources
14. (1) Develop an Identity Broker to communicate with LDAP and AWS STS; (2) Identity Broker always authenticates
    with LDAP first, gets an IAM role associated with a user; (3) Application then authenticates with STS and assumes
    that IAM role; (4) The application uses that IAM role to interact with S3

### Flash Cards
  
To download the review flash card deck for this lecture, right click the following link and select
`Save Link As`. 


<table>
 <tr>
 <td>
 <b><a href="exam-tips-security-token-service-flashcards.txt" download="exam-tips-security-token-service-flashcards.txt">Exam Tips Security Token Service - Flash Card Deck</a></b>
 </td>
 </tr>
 </table>  
 
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/blob/master/fiddles/aws/readme.adoc#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](exam-tips-direct-connect.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](exam-tips-active-directory.md)**
