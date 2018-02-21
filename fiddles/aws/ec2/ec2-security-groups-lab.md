![Imgur](https://i.imgur.com/9awJmtb.png)


EC2 Security Groups Lab
======

This lab builds on the [EC2 Instance Lab](ec2-instance-lab.md) demonstrating how to associate multiple security
groups with a single EC2 instance.


## Intro: What is a Security Group

A security group is a virtual firewall. It controls traffic to an EC2 instance. A single instance can have 
multiple security groups. It is your first line of defense against hackers.


## Steps

1.  Repeat steps 1-53 of the [EC2 Instance Lab](ec2-instance-lab.md)
2.  In the AWS Console EC2 page, click `Security Groups` in the left sidebar
3.  Select the `MyWebDMZ`
4.  In the details pane, click the `Inbound` tab
5.  Click the `Edit` button
6.  In the `Edit inbound Rules` pop-up, delete to the `HTTP` Rule and click the `Save` button
7.  In the web browser tab you opened to the public IP address (step 52 of the [EC2 Instance Lab](ec2-instance-lab.md)),
    click `Refresh`
8.  Connection should timeout
9.  Return back to the AWS Console page, and restore the inbound HTTP rule to the `MyWebDMZ` security group
10. Go to the `Outbound` tab and click the `Edit` button
11. In the `Edit outbound rules` pop-up, delete the `All traffic` Rule and click `Save` button
12. In the web browser tab you opened to the public IP address (step 52 of the [EC2 Instance Lab](ec2-instance-lab.md)),
    click `Refresh`
13. The page still works 

    ```Exam Tip: As soon as you add an Inbound rule, Outbound rules are added automatically. This means 
      security group rules are STATEFUL```

14. Go to the `Outbound` tab and click the `Edit` button and restore the `All Traffic` rule

    ![Imgur](https://i.imgur.com/2AevHPF.png)
    
15. Select the `default` security group
16. In the details pane, click the `Inbound` tab
17. Click the `Edit` button
18. In the `Edit inbound Rules` pop-up, add `RDP`, `MYSQL/Aurora` 

    ![Imgur](https://i.imgur.com/KZVkuDv.png)
    
19. Click the `Save` button
20. Click the `Instances` link in the left sidebar
21. Select `MyWebServer`
22. Click `Actions > Networking > Change Security Groups`

    ![Imgur](https://i.imgur.com/wxWOwKb.png)
    
23. Add the `Default` security group and click the `Assign Security Groups` button
24. The End.  Continue to the [next lecture/lab](ec2-ebs-volumes-lab.md)


## Exam Tips

What did we learn?

* All inbound traffic is Blocked by default
* All outbound traffic is allowed by default
* Changes to Security Groups take effect immediately
* You can have any number of EC2 instances within a security group
* You can have multiple security groups attached to an EC2 instance
* Security Groups are **STATEFUL**
  * If you create an inbound rule allowing traffic in, that traffic is automatically allowed back out again
* You cannot block specific IP addresses using Security Groups, instead use Network Access Control Lists
* You can specify allow rules, but not deny rules


## Review Questions

1.  How long does it take for a security group rule change to take effect?
2.  Are Security Group rules stateful?
3.  Can you specifically deny traffic over a port using a security group?
4.  How do you block specific IP addresses?


## Answers

1.  Instantaneous -- aka `immediate`
2.  Yes
3.  No
4.  Network Control Lists


## 

**[Previous Lab/Lecture](ec2-instance-lab.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-ebs-volumes-lab.md)**
