<img src="https://i.imgur.com/O74efH0.png" height="100" title="WordPress" />

WordPress Cloud Formation Lab
======

  
   
## Video Link

[![acloud.guru lecture](https://i.imgur.com/aqPoAZv.jpg)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/wordpress/444ffee2-9bff-aeab-ba9e-cd3385693884/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   AWS Console free-tier account
*   Mac configured with iTerm
*   Complete the [WordPress EC2 Setup Lab](wp-setup-lab.md)
*   Complete the [WordPress CloudFront Lab](wp-cloudfront-lab.md)
*   Complete the [WordPress AMI Lab](wp-ami-lab.md)
*   Complete the [WordPress AutoScaling Lab](wp-autoscaling-lab.md)

 
## Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/ytDNe6P.png" width="300" title="Big Picture" />
</td>
</tr>
</table>


## Tear Down Your Environment

1.  Log into the AWS Console
2.  Delete the AutoScaling Groups
3.  Delete your Elastic Load Balancers
4.  Delete the RDS instance
5.  Delete the two AMI's
6.  Delete the two S3 buckets


## Cloud Formation: Create a Stack

1.  Log into the AWS Console
2.  Under `Management Tools` click the `CloudFormation` link
3.  On the CloudFormation intro page, click the `Create new stack` button
4.  On the `Select Template` page, select the `WordPress blog` template
5.  Click the `Next` button
6.  On the `Specify Details` page, customize the settings as follows:

    * Stack name:   `<DOMAIN NAME>`
    * DBClass:      `db.t2.micro`
    * DBPassword:   `<DOMAIN NAME>123`
    * DBUser:       `<DOMAIN NAME>`
    * InstanceType: `t2.micro`
    * KeyName:      `Select Existing`
    * Subnets:      `Select all available`
    * VpcId:        `Select your default VPC`
    
7.  Click the `Next` button
8.  Click the `Next` button    
9.  Wait for the process to complete
  
  
<table>
<tr>
<td>
 <img src="https://i.imgur.com/lzuBm4n.png" width="300" title="cloud formation - stack creation complete" />
</td>
</tr>
</table>


## Security Groups: Enable HTTP Access

1.  Log into the AWS Console
2.  Under `Networking & Content Delivery` click the `VPC` link
3.  In the VPC sidebar under `Security`, click the `Security Groups` link
4.  Select the `<DOMAIN NAME>-WebServerSecurityGroup-*` security group
5.  In the `Inbound Rules` tab, click the `Edit` button
6.  Set the `HTTP` source to `0.0.0.0/0` and click the `Save` button


## CloudFormation: Test the Output Link

1.  Log into the AWS Console
2.  Under `Management Tools` click the `CloudFormation` link
3.  In the `Stacks` dashboard, select `<DOMAIN NAME>` stack
4.  In the `Outputs` tab, click the `WebsiteURL` link
5.  Verify that the WordPress install page loads
6.  Complete the setup

 
<table>
<tr>
<td>
 <img src="https://i.imgur.com/275T8xB.png" width="300" title="wp site - cloud formation stack" />
</td>
</tr>
</table>


## CloudFormation: Tear it all down

1.  Log into the AWS Console
2.  Under `Management Tools` click the `CloudFormation` link
3.  In the `Stacks` dashboard, select `<DOMAIN NAME>` stack
4.  Click `Actions > Delete Stack`
5.  In the `Delete Stack` pop-up, click the `Yes, delete`

    
## Exam Tips

What did we learn?

* Using the CloudFormation to create a word press blog is easier. However, it still doesn't explain how to enable
  plugins or themes....

    
### Review Questions

1.  Are Load Balancers free?
2.  What do actual cloud architects specialize in? Why?



### Answers

1.  NO!
2.  CloudFormation scripts.  It allows you to automate deployment across services from a single file or point of entry.


## 

**[Previous Lab/Lecture](wp-autoscaling-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](../whitepapers/whitepapers-101.md)**
