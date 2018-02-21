![Imgur](https://i.imgur.com/9awJmtb.png)


EC2 Encrypted Root Volume Lab
======

This lab builds on the EC2 instance lab outlining how to encrypt the EBS root volume and then create a snapshot.


## Pre-Requisites

Complete the [EC2 Instance Lab](ec2-instance-lab.md).


## Steps

1.  Log into the AWS Console and note your region -- Example `US East (N. Virginia)`
2.  Click `Services > Storage > EC2`
3.  Select the `MyWebServer` instance
4.  Click `Actions > Instance State > Stop`
5.  Wait for the instance to stop
6.  In the EC2 Left Sidebar, click `ELASTIC BLOCK STORE > Volumes`
7.  Select the `MyWebServer` Volume
8.  Click `Actions > Create Snapshot`
9.  In the `Create Snapshot` pop-up set the name and description to `MyRootDeviceVolume` and click the `create` button

  ![Imgur](https://i.imgur.com/lqTcsye.png)
  
10. In the EC2 Left Sidebar, click `ELASTIC BLOCK STORE > Snapshots`
11. Select the `MyRootDeviceVolume` snapshot
12. Click `Action > Copy`
13. In the `Copy Snapshot` pop-up, change the `Destination Region` to a different region - Example `US West (Oregon)`
14. Click the `Encrypt this snapshot` flag and click the `Copy` button followed by the `Close` button
15. Change your region to the region you selected (13)
16. Click `Actions > Create Image`
17. In the `Create Image from EBS Snapshot`, set the Name and Description to `MyEncryptedAMI` and click the `Create`
    button followed by the `Close` button
   
   ![Imgur](https://i.imgur.com/KZ5vcAh.png) 

18. In the EC2 left sidebar, click `IMAGES > AMIs`
19. Select the `MyEncryptedAMI` image
20. Wait for the status to change to `available`
21. From here, you could click Launch and create a new EC2 instance but this will incur cost
  * **You cannot use an encrypted AMI with the free tier EC2 families**

### Cleanup Steps

22. Click `Actions > Deregister` and then in the pop-up click the `Continue` button
23. In the EC2 Left Sidebar, click `ELASTIC BLOCK STORE > Snapshots`
24. Click `Actions > Delete` and then in the pop-up click the `Yes, Delete` button
25. Change your region back to your initial region (1) - Example `US East (N. Virginia)` 
26. The End


## Exam Tips

What did we learn?

* To create a snapshot for EBS root volumes, you should first stop the running EC2 instance
* Snapshots of encrypted volumes are encrypted automatically
* Volumes restored from encrypted snapshots are encrypted automatically
* You can share snapshots, but only if they are unencrypted
  * These snapshots can be shared with other AWS accounts or made public
 

##$ Review Questions

1.  Why should you stop an EC2 instance before making a snapshot?
2.  Can an encrypted AMI's be made public? Why not?
3.  Can an encrypted root AMI be used with a free tier machine family?
4.  Why is knowing how to create snapshots and images useful?


### Answers

1.  Best practise; Prevents any inconsistencies in the snapshot
2.  No, they are always private; because the encryption key is private
3.  No
4.  Can save on machine provisioning time


## 

**[Previous Lab/Lecture](ec2-ebs-volumes-lab.md) | [AWS (Root)](../readme.adoc)
