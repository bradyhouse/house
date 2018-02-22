![Imgur](https://i.imgur.com/9awJmtb.png)


EC2 Elastic Load Balancer Lab
======



## Video Link

[![Imgur](https://i.imgur.com/Q2esGHV.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/load-balancers-health-checks/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

*   Mac configured with iTerm
*   AWS Console free-tier account
*   *Complete the [EC2 Instance Lab](ec2-instance-lab.md)*


## Steps

1.  Log into the AWS Console and note your region -- Example `US East (N. Virginia)`
2.  Click `Services > Storage > EC2`
3.  In the EC2 sidebar, click `INSTANCES > Instances`
4.  Select the `MyWebServer` instance
5.  If it is not running, then click `Actions > Instance State > Start` and in the `Start Instance` pop-up click
    the `Yes, Start` button   
6.  Once the instance's status changes to `running`, copy the Public IP of your running EC2 instance
    
      ![Imgur](https://i.imgur.com/I59pebl.png)
      
7.  Launch iTerm
8.  Navigate to your Downloads directory

  ```cd ~/Downloads```

9. Goto into the SSH directory (created in steps 33-37 of the [EC2 Instance Lab](ec2-instance-lab.md))

  ```cd SSH```
  
10. Go back to the terminal window and initiate the ssh session to the <IP Address>

  ```ssh ec2-user@<IP Address> -i MyEC2KeyPair.pem```
  
11. When prompted with the message `The authenticity of host ... can't be established...` type
    `yes` and hit `Enter`

    ![Imgur](https://i.imgur.com/nSvTcn3.png)  

12. At the ssh prompt, upgrade your privileges by changing user to `su`

    ```sudo su```

13. Verify that httpd services are running 

    ```service httpd status```
    ```httpd (pid  2568) is running...```

  * If the service is stopped, then start it
  
    ```service httpd start```
    ```Starting httpd:                                            [  OK  ]```
    
14. Navigate to the apache root html directory

    ```cd /var/www/html```
    
15. In this directory create a new healthcheck.html file

    ```nano healthcheck.html```

16. In the nano text editor, paste in the following HTML:

    ```aidl 
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://unpkg.com/jquery@3.1.0/dist/jquery.min.js"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/paper/bootstrap.min.css"/>
      <script>
        function load() {
          $(".time").text(new Date());
          $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function (data) {
            $(".json").text(JSON.stringify(data, null, 2));
          });
        }
    
      </script>
    </head>
    <body style="padding: 1em; background-color: #484848;" onload="load()">
    <div style="padding: 1em;" class="jumbotron">
      <h1 class="display-3">Health Check!</h1>
      <p class="lead"> The time is:&nbsp;&nbsp;<span class="time"></span></p>
      <p class="lead"><a href="http://gd.geobytes.com/GetCityDetails" target="_blank">gd.geobytes.com Get City Details</a>
        says:</p> $
      <pre class="json"></pre>
    </div>
    </body>
    </html>```

17. Press `CTRL + X` 
18. Enter `Y` and press `Enter` to save your changes to the `index.html` file to exit `nano`
19. Go back to the AWS Console
20. In the EC2 left sidebar, click `LOAD BALANCING > Load Balancers`
21. Click the `Create Load Balancer` button
22. Under `Classic Load Balancer` click the `Create` button

  ![Imgur](https://i.imgur.com/DPPaXYV.png)  

23. On the `Step 1 ...` page set the `Load Balancer Name` to `MyClassicELB`
24. Leave all other options as default

  ![Imgur](https://i.imgur.com/g8BDqe6.png)

25. Click the `Next: Assign Security Groups` button
26. On the `Step 2 ...` page, select the `MyWebDMZ` security group

  ![Imgur](https://i.imgur.com/jP5Z0sy.png)
  
  __Note - This security group was created as part of the [EC2 Instance Lab](ec2-instance-lab.md) lab__
  
27. Click the `Next: Configure Security Settings` button
28. Ignore the warning message, and click the `Next: Configure Health Check` button
29. On the `Step 4 ...` page, set the `Ping Path` to `/healthcheck.html`
30. Set `Response Timeout` to 2 (lowest possible value)
31. Set `Interval` to 5 (lowest possible value)
32. Set `Unhealthy threshold` to 2 (default)
33. Set `Healthy threshold` to 3

  ![Imgur](https://i.imgur.com/r2pukkV.png)

34. Click the `Next: Add EC2 Instances` button
35. On the `Step 5 ...` page, select the `MyWebServer` instance
36. Click the `Next: Add Tags` button
37. In the `Step 6 ...` page, add the following key:

  ![Imgur](https://i.imgur.com/lo3Bf2r.png)  

38. Click the `Review and Create` button
39. In the `Step 7: Review` page, click the `Create` button

  ![Imgur](https://i.imgur.com/lxzEoaS.png)

40. In the `Load Balancer Creation Status` page, click the `Close` button
41. Copy the `DNS name` field value for the new `MyClassicELB` load balancer  
42. Open a new tab in your web browser and paste in the DNS Name (41)

  ![Imgur](https://i.imgur.com/BDeFvpj.png)

43. Open a new tab in your web browser and paste in the DNS Name followed by `healthcheck.html`
    For example - `MyClassicELB-1040264148.us-east-1.elb.amazonaws.com/healthcheck.html`

  ![Imgur](https://i.imgur.com/T8fGQ3N.png)
  
44. The End

  * Note - Since its not covered on the exam, I skipped the `Application Load Balancer` section of the lab.*

### Clean Up

45. Go into EC2 instances and stop `MyWebServer`


### Exam Tips

What did we learn?

* Instances monitored by ELB are reported as `InService` or `OutofService`
  * This depends on the configured `healthy threshold,` `unhealthy threshold` and `interval`
* Health Checks check instance health by talking to it
  * This done over HTTP or HTTPS by looking for a configured file
* Elastic Load balancers have their own DNS name. Although AWS manages the IP, the console
  does not provide you with the physical address--ie Unknown IP.
* Read the [ELB FAQ for Classic Load Balancers](https://aws.amazon.com/elasticloadbalancing/faqs/)


##

**[Previous Lab/Lecture](ec2-ami-types.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-elastic-load-balancer-lab.md)** 
