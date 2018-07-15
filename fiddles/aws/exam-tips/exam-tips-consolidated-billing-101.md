<img src="https://i.imgur.com/m0yIGS0.png" height="100" title="AWS Organizations" />


Exam Tips - Consolidated Billing 101
======

8 Minute lecture introducing Consolidated billing as well as the new AWS Organizations service.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/yf4Im3g.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/additional-exam-tips/consolidated-billing/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*
 

### What is AWS Organizations?

AWS Organizations is an account management service that enables you to consolidate multiple AWS accounts into an 
organization that create and centrally manage. It is available in two feature sets:

  1.  Consolidated Billing
  2.  All Features
  
  
#### Big Picture: How AWS Organizations Works

<table>
<tr>
<td>
 <img src="https://i.imgur.com/2jThOqD.png" width="300" title="AWS Organization Big Picture" />
</td>
</tr>
</table>

* `OU` - Organization Unit
* Policies can be applied to an `OU` or to a specific AWS Account


### Big Picture: How Consolidated Billing Works

<table>
<tr>
<td>
 <img src="https://i.imgur.com/GVBNhEc.png" width="300" title="Consolidated Big Picture" />
</td>
</tr>
</table>

* The `Paying account` is independent and cannot access resources of other accounts
* `Linked Accounts` are independent as well
* Currently, there is a limit of 20 linked accounts for consolidated billing


### Advantages of Consolidated Billing

There are three advantages to using `Consolidated Billing`:

1.  One bill per Paying AWS account
2.  Very easy to track charges and allocate costs
3.  Volume pricing discount


### Consolidated Billing S3 Example

* Our Test/Dev account uses 600 GB, Production uses 900 GB, and BackOffice uses 500 GB
* Without `Consolidated Billing`:
  * 600 x $.03          = $18
  * 900 x $.03          = $27
  * 500 x $.03          = $15
  * Total Bill          = $60 (2 TB of storage)
* Using `Consolidated Billing`:
  * 1TB x $.03          = $30
  * Next 1TB x $0.0295  = $29.50
  * Total Bill          = $59.50


### Best Practices

There are three best practices to follow when setting up `Consolidated Billing`:

1.  Always enable multi-factor authentication on the root account
2.  Always use a strong and complex password on root account
3.  Paying account should be used for billing purposes only. Do not deploy resources in the paying account


### Other Things to Note

* Linked Accounts
  * 20 linked accounts only
  * To add more, you must contact AWS support
* Billing Alerts
  * When monitoring is enabled on the paying account the billing data for all linked accounts is 
    included
  * You can still create billing alerts per individual account
* CloudTrail
  * Is enabled per AWS Account and is enabled per region. If you want to use CloudTrail for 
    auditing purposes, you must it enable per account and region
  * Can consolidate logs using an S3 bucket:
    1.  Turn on CloudTrail in the paying account
    2.  Create a bucket policy that allows cross account access
    3.  Turn on CloudTrail in the other accounts and use the bucket in the paying account
 

## Exam Tips

* Consolidated billing allows you to get volume discounts on all your accounts
* Unused reserved instances for EC2 are applied across the group
* CloudTrail is on a per account and per region basis can be aggregated into a single bucket
  in the paying account 
  
 
### Review Questions

1.  What is the AWS Organization Services?
2.  What are the two AWS Organization feature sets?
3.  Why would you (or rather an organization) have multiple AWS accounts?
4.  What is an `OU`?
5.  Using AWS Organizations, what can policies be applied to? (2)
6.  What are the `Consolidated Billing` actors? (2)
7.  What is the common characteristic of both Paying and Linked Accounts? Technically speaking
    what does this mean?
8.  How many accounts are you currently allowed to link? 
9.  What are the advantages ouf using `Consolidated Billing`? (3)
10. What are the `Consolidated Billing` 3 best practices?
11. When monitoring is enabled on the paying account is the billing data for all linked accounts 
    included?
12. Can billing alerts be setup on linked accounts?
13. How is CloudTrail enabled? (2) Why is this important to remember?
14. You can consolidate logs using a ___ ___.
15. How do you consolidate linked account logs using the paying account? (3)
16. Why does `Consolidated Billing` make sense for organization using EC2? S3? 


### Answers

1.  AWS Organizations is an account management service that enables you to consolidate multiple AWS accounts into an 
    organization that create and centrally manage.
2.  (1) Consolidated Billing; (2) All Features
3.  Within an organization, each team may have its own AWS user account.
4.  Organizational Unit associated with a specific set of AWS user accounts.
5.  OU's; AWS Accounts
6.  Paying Account; Linked Accounts
7.  Independent; Account cannot access the resources of other accounts
8.  20
9.  (1) One bill per AWS Paying account; (2) Very easy to track charges and allocate costs;
    (3) Volume pricing discount
10. (1) Always enable multi-factor authentication on the root account; (2) Always use a strong and complex 
    password on root account; (3) Paying account should be used for billing purposes only. Do not deploy 
    resources in the paying account
11. Yes
12. Yes
13. Per account; per region; If you want to use CloudTrail for auditing purposes, you must it 
    enable per account and region
14. S3 Bucket
15. (1) Turn on CloudTrail in the paying account; (2) Create a bucket policy that allows cross account 
    access; (3) Turn on CloudTrail in the other accounts and use the bucket in the paying account
16. Unused reserved instances for EC2 are applied across all linked accounts; S3 pricing get cheaper as the
    amount of TB's consumed increases. Total storage (or TB's consumed) is calculated based on
    all linked account usage.


### Exam Tips - Consolidated Billing 101 Flash Card Deck
  
To download the review flash card deck for this lecture, right click the following link and select
`Save Link As`. 

<table>
 <tr>
 <td>
 <b><a href="exam-tips-consolidated-billing-101-flashcards.txt" download="exam-tips-consolidated-billing-101-flashcards.txt">Consolidated Billing 101 - Flash Card Deck</a></b>
 </td>
 </tr>
 </table>  

  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](exam-tips-feedback.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](exam-tips-consolidated-billing-lab.md)**
