<img src="https://i.imgur.com/O74efH0.png" height="100" title="WordPress" />

WordPress Auto Scaling and Load Testing Lab
======

  
   
## Video Link

[![acloud.guru lecture](https://i.imgur.com/FjSdeIO.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/wordpress/18faa93e-2556-2044-5753-08722ffedc94/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   AWS Console free-tier account
*   Mac configured with iTerm
*   Complete the [WordPress EC2 Setup Lab](wp-setup-lab.md)
*   Complete the [WordPress CloudFront Lab](wp-cloudfront-lab.md)
*   Complete the [WordPress AMI Lab](wp-ami-lab.md)
 
## Big Picture

<table>
<tr>
<td>
 <img src="https://i.imgur.com/ytDNe6P.png" width="300" title="Big Picture" />
</td>
</tr>
</table>


## EC2 Instances: Terminate both

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `INSTANCES`, click the `Instances` link
4.  Terminate both instances


## Auto Scaling Group: Create a Primary Domain Launch Configuration

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `AUTO SCALING`, click the `Launch Configurations` link
4.  Click the `Create launch configuration` button
5.  In the `Create Launch Configuration` page, click the `My AMIs` link
6.  Select the `<DOMAIN NAME>-Image` Image and click the `Select` button
7.  Customize the rest of the configuration as follows:

    * Name:           `<DOMAIN NAME>-LC`
    * IAM Role:       `MyS3AdminAccess`
    * Security Group: `WEB-DMZ`

8.  On the `Launch configuration creation status` page, click the `Create an Auto Scaling group using this launch
    configuration` button
9.  Customize the rest of the configuration as follows:
    
    * Group name:                 `<DOMAIN NAME>-ASG`
    * Group size:                 `Start with 2 instances`
    * Subnets:                    Add all 6 us-east subnets
    * Load Balancing:             `Receive traffic from one or more load balancers` (Advanced Details)
    * Target Groups:              `<DOMAIN NAME>`
    * Health Check Type:          `ELB`
    * Health Check Grace Period:  `10` 
    * Create Auto Scaling Group:  `Use scaling policies to adjust the capacity of this group`
    * Scale between...:           `2; 4`
    * Increase Group Size:        `Click add new alarm`
        * Send a notification to: `<DOMAIN NAME>-ScaleUpEvent`
        * With these recipients:  `<EMAIL ADDRESS>`
        * Whenever:               `Average of CPU Utilization is >= 75 percent`
        * For at least:           `1 consecutive period(s) of 5 minutes`
        * Name of alarm:          `<DOMAIN NAME>-ASG-75-PERCENT-OVER`
        * Take the action:        `Add 2 Instances when 75 <= CPU Utilization < infinity`
    * Decrease Group Size:        `Click add new alarm`
        * Send a notification to: `<DOMAIN NAME>-ScaleUpEvent(<EMAIL ADDRESS)` (Select the Existing Notification)
        * Whenever:               `Average of CPU Utilization is <= 25 percent`
        * For at least:           `1 consecutive period(s) of 5 minutes`
        * Name of alarm:          `<DOMAIN NAME>-ASG-25-PERCENT-UNDER`
        * Take the action:        `Remove 1 Instances when 25 >= CPU Utilization > infinity`
    * Configure Notifications:    (Click `Add notification`)
        * Send a notifcation to:  `<DOMAIN NAME>-ScaleUpEvent(<EMAIL ADDRESS)`
    * Configure Tags:             (Click `Add Tag`)
        * Key:                    `Name`
        * Value:                  `<DOMAIN NAME>.COM`   
        
10. After creating, goto the EC2 Instance dashboard, and verify that 2 instances startup


## Auto Scaling Group: Create a Write Domain Launch Configuration

    TBW
         
        
## Exam Tips

What did we learn?

    TBW
    
### Review Questions

1.  What's required first to create an AutoScaling group?


### Answers

1.  Launch Configuration.


## 

**[Previous Lab/Lecture](wp-ami-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](wp-autoscaling-lab.md)**
