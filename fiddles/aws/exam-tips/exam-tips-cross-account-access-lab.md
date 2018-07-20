<img src="https://i.imgur.com/m0yIGS0.png" height="100" title="AWS Organizations" />


Additional Exam Tips - Cross Account Access Lab
======

14 Minute Lab exploring Cross Account Access.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/CnXs5FH.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/additional-exam-tips/de037783-bfaa-2120-1e22-3a6513b622ee/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*
 

### Pre-Requisites

* Two AWS Console account 
* **Complete the [Exam Tips - Consolidated Billing Lab](exam-tips-consolidated-billing-lab.md)** 


### Intro

#### What is Cross Account Access?

Many AWS customers use separate AWS accounts for their development and production resources.  This separation allows
them to cleanly separate different types of resources and can also provide some security benefits.

Cross account access makes it easier for you to work productively within a multi-account (or multi-role) AWS
environment by making it easy for you to switch roles within the AWS Management Console. You can now sign into the
console using your IAM user name and then switch the console to manage another account without having to 
enter (or remember) another user name and password.


### Steps (In Summary)

1.  Identify our account numbers for both production and development
2.  Create a `development` group in IAM
3.  Create a user in IAM for development-- `John Doe`
4.  Log into the `production` account
5.  Create the `read-write-app-bucket` policy
6.  Create the `UpdateApp` Cross Account Role
7.  Apply the new policy (5) to the role (6)
8.  Log into the Development account (3)
9.  Create a new inline policy
10. Apply it to the Developer group
11. Login as `John Doe`
12. Switch Accounts from `Developer` to `Production`


### IAM: Create a Group

1.  Log into the AWS Console using your `Developer` account
2.  Create a new IAM group called `development`
3.  Assign `AdministratorAccess` to the group


### IAM: Create a Development User

1.  Log into the AWS Console using your `Developer` account
2.  Create a new IAM User:
    
    * User Name:                `johndoe`
    * Access Type:              Console only
    * Password:                 Custom         
    * Require Password Reset:   N
    * Group:                    Development                   


### S3: Create a Shared Bucket

1.  Log into the AWS Console using your `Production` account
2.  Create a new S3 bucket:

    * Name:                     `<production accountname>-shared-bucket`


### IAM: Create a Policy

1.  Log into the AWS Console using your `Production` account
2.  Create a new IAM Policy:

    * Name:                     `read-write-app-bucket`
    * Description:              `This allows developers to write to a specific bucket within the production account`
    * Policy Document:
    
        `{
           "Version": "2012-10-17",
           "Statement": [
             {
               "Effect": "Allow",
               "Action": "s3:ListAllMyBuckets",
               "Resource": "arn:aws:s3:::*"
             },
             {
               "Effect": "Allow",
               "Action": [
                 "s3:ListBucket",
                 "s3:GetBucketLocation"
                ],
               "Resource": "arn:aws:s3:::<prod accountname>-prod"
             },
             {
               "Effect": "Allow",
               "Action": [
                 "s3:GetObject",
                 "s3:PutObject",
                 "s3:DeleteObject"
               ],
               "Resource": "arn:aws:s3:::<prod accountname>-prod/*"
             }
           ]
         }`
    

### IAM: Create a Role

1.  Log into the AWS Console using your `Production` account
2.  Create a new IAM Role:

    * Name:                     `CrossAccountS3BucketAccess`
    * Type of Trusted Entity:   Another AWS account
    * Account ID:               `<Developement AWS Account ID>`
    * Policy:                   `read-write-app-bucket`          


### IAM: Create an Inline Policy

1.  Log into the AWS Console using your `Developer` account
2.  In IAM, open the `development` account
3.  Under `Permissions`, expand the `Inline Policies` section and click the create link
4.  Create a new Inline Policy:

    * Name:                   `DeveloperCrossAccountS3BucketAccess`
    * Policy Document:
    
    
          {
            "Version": "2012-10-17",
            "Statement": {
              "Effect": "Allow",
              "Action": "sts:AssumeRole",
              "Resource": "arn:aws:iam::<Production AWS Account ID>:role/CrossAccountS3BucketAccess"
            }
          }


### S3: Upload a File to Prod Bucket using Developer Account

1.  Logout of the console
2.  Navigate to `https://<Developer AWS Account ID>.signin.aws.amazon.com/console`
3.  Login using `johndoe` and the custom password defined earlier
4.  From the Account drop-down, select `Switch role`
5.  In the `Switch Role` screen, enter:

    * Account:                `<Production Account ID>`
    * Role:                   `CrossAccountS3BucketAccess`
6.  In S3, goto the `<production accountname>-shared-bucket` bucket, and upload a file
7.  The End

 
## Exam Tips

    N/A
  
 
### Review Questions

1.  Why would a developer setup multiple AWS accounts?
2.  What does `Cross Account Access` simplify?
3.  What type of policy is required to enable cross account access?



### Answers

1.  They establish a dedicated account for `production` resources and a separate dedicated account for `non-production` 
    resources.
2.  Cross account access makes it easier for you to work productively within a multi-account (or multi-role) AWS
    environment by making it easy for you to switch roles within the AWS Management Console. You can now sign into the
    console using your IAM user name and then switch the console to manage another account without having to 
    enter (or remember) another user name and password.
3.  Inline Policy


### Exam Tips - Cross Account Access Flash Cards
  
To download the review flash card deck for this lecture, right click the following link and select
`Save Link As`. 

<table>
 <tr>
 <td>
 <b><a href="exam-tips-cross-account-access-flashcards.txt" download="exam-tips-cross-account-access-flashcards.txt">Cross Account Access - Flash Card Deck</a></b>
 </td>
 </tr>
 </table> 
 
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/blob/master/fiddles/aws/readme.adoc#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](exam-tips-consolidated-billing-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](exam-tips-cross-account-access-lab.md)**
