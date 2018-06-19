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
        
10. After creating, goto the EC2 Instance dashboard, and verify that 2 instances have started 


## Auto Scaling Group: Create a Write Domain Launch Configuration

1.  Log into the AWS Console
2.  Under `Compute` click the `EC2` link
3.  In the EC2 sidebar under `AUTO SCALING`, click the `Launch Configurations` link
4.  Click the `Create launch configuration` button
5.  In the `Create Launch Configuration` page, click the `My AMIs` link
6.  Select the `WRITE-<DOMAIN NAME>-Image` Image and click the `Select` button
7.  Customize the rest of the configuration as follows:

    * Name:           `WRITE-<DOMAIN NAME>-LC`
    * IAM Role:       `MyS3AdminAccess`
    * Security Group: `WEB-DMZ`

8.  On the `Launch configuration creation status` page, click the `Create an Auto Scaling group using this launch
    configuration` button
9.  Customize the rest of the configuration as follows:
    
    * Group name:                 `WRITE-<DOMAIN NAME>-ASG`
    * Group size:                 `Start with 1 instances`
    * Subnets:                    Add all 6 us-east subnets
    * Load Balancing:             `Receive traffic from one or more load balancers` (Advanced Details)
    * Classic Load Balancers:     `<DOMAIN NAME>-WRITE-ELB`
    * Health Check Type:          `ELB`
    * Health Check Grace Period:  `10` 
    * Create Auto Scaling Group:  `Keep this group at its initial size`
    * Scale between...:           `2; 4`
    * Configure Notifications:    (Click `Add notification`)
    * Send a notifcation to:      `<DOMAIN NAME>-ScaleUpEvent(<EMAIL ADDRESS)`
    * Configure Tags:             (Click `Add Tag`)
        * Key:                    `Name`
        * Value:                  `WRITE-<DOMAIN NAME>.COM`   
        
10. After creating, goto the EC2 Instance dashboard, and verify that 3 instances are up and running


## SSH: Init Stress Test on one of the Primary Instances

1.  SSH into one of the Primary EC2 Instances
2.  Evaluate privileges -- `sudo su`
3.  Intitate a CPU stress test

    `stress --cpu 100`

4.  Start a second terminal, and ssh into the second primary instance
5.  Repeat step 2 and 3
6.  Go back to the AWS Console, and monitor the EC2 Instances for 5 minutes
7.  Verify that 2 more primary Instances start up


<table>
<tr>
<td>
 <img src="https://i.imgur.com/cHLy8sQ.png" width="300" title="load test" />
</td>
</tr>
</table>


8.  Kill both of your terminal sessions
9.  Go back to the AWS Console, and monitor the EC2 Instances for 10 minutes
7.  Verify that the 2 additional EC2 instances are now shut-down


<table>
<tr>
<td>
 <img src="https://i.imgur.com/PgWgMkU.png" width="300" title="load test 2" />
</td>
</tr>
</table>


## Clean Up

1.  Delete the Auto Scaling Groups
2.  Delete the Launch Configurations
3.  Delete the RDS Instance
4.  Delete the 2 AMIs

        
## Exam Tips

What did we learn?

    TBW
    
### Review Questions

1.  What's required first to create an AutoScaling group?
2.  Does Elastic Load Balancing incur cost? Which one, Application or Classic is more expensive?
3.  Is Multi-AZ required on an RDS database in order to use an AutoScaling group?
4.  Once you establish an Auto Scaling group, can it's state be suspended (or disabled)?
5.  What is a new feature that can be used with launch configurations?
6.  How do you test Multi-AZ fail over configuration?


### Answers

1.  AMI + ALB or ELB + Launch Configuration.
2.  Yes; Classic -- .025 vs .0225 / hr for Application
3.  No
4.  Nope
5.  Launch Configurations can now be used to create a `Launch Template`
6.  Reboot the RDS Instance -- It should initiate a new instance in a different AZ.


## 

**[Previous Lab/Lecture](wp-ami-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](wp-autoscaling-lab.md)**
