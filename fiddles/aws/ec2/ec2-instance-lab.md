![Imgur](https://i.imgur.com/9awJmtb.png)


EC2 Instance Lab 
======

Lab outlining how to create and launch an EC2 instance. The lab then show you how to connect to the 
instance using ssh and configure it as a simple Apache web server. Finally, the lab ends by
showing you how to terminate the instance.


## Pre-Requisites

* Mac configured with iTerm
* AWS Console account 


## Steps

1.  Login into the aws console
2.  Choose a region that is closest to you
3.  Under `Services > Compute` click `EC2`
4.  Click the `Launch Instance` button
5.  At top of the list, click the `Select` button for the `Amazon AMI Instance`

  ![Imgur](https://i.imgur.com/FDxjhpz.png)
  
6.  Select the `General purpose` `t2.micro` (default)
7.  Click the `Next: Configure Instance Details` button
8.  In the `Step 3: Configure Instance Details` page, for the`Enable termination protection` check
    `protect against accidental termination`
9.  Leave all over options default

  ![Imgur](https://i.imgur.com/ZlbhU7V.png)
  
10. Click the `Next: Add Storage` button
11. In the `Step 4: Add Storage` page, change the `Volume Type` to `Magnetic`
12. Leave everything else as default 

  ![Imgur](https://i.imgur.com/7Sv4g69.png)

13. Click the `Next: Add Tags` button
14. In the `Step 5: Add Tags` page, add the following tags:

  ![Imgur](https://i.imgur.com/dLE1HCE.png)
  
15. Click the `Next: Configure Security Group` button
16. In the `Step 6: Configure Security Group` page, select `Create a Security Group` option (default)
17. Set the `Security Group Name` to `MyWebDMZ`
18. Set the `Description` to `MyWebDMZ`
19. Click the `Add Rule` button
20. Set the `Type` of the new rule to `HTTP`
21. Click the `Add Rule` button
22. Set the `Type` of the new rule to `HTTPS`

  ![Imgur](https://i.imgur.com/BDfT6Zr.png)

23. Click the `Review and Launch` button
24. In the boot from warning pop-up, select `Continue with Magnetic boot volume for this instance`

  ![Imgur](https://i.imgur.com/bWsYA23.png)
  
25. Click the `Next` button
26. In the `Step 7: Review Instance Launch` page, click the `Launch` button
27. In the `Select an existing key pair or create a new key pair` pop-up, select `Create a new key pair`
28. Set the `Key pair name` to `MyEC2KeyPair`
29. Click the `Download Key Pair` button

  ![Imgur](https://i.imgur.com/fqYEFWs.png)
  
30. Click the `Launch Instances` button

  ![Imgur](https://i.imgur.com/HE7IfNx.png)
  
31. In the `Launch Status` page, click the `View Instances` button

  ![Imgur](https://i.imgur.com/JB2ZIe1.png)
  
32. On your local machine, startup a terminal window (launch iTerm)
33. Navigate to your Downloads directory

  ```cd ~/Downloads```

34. Create a new directory called `SSH` 
  
  ```mkdir SSH```

35. Move the downloaded `MyEC2KeyPair.pem` file into the new directory

  ```mv MyEC2KeyPair.pem SSH```

36. Goto into the SSH directory

  ```cd SSH```

37. Change the permissions on the file

  ```chmod 400 MyEC2KeyPair.pem```

38. Go back to the AWS Console, and copy the Public IP of your new EC2 instance

  ![Imgur](https://i.imgur.com/I59pebl.png)
  
39. Go back to the terminal window and initiate the ssh session to the <IP Address>

  ```ssh ec2-user@<IP Address> -i MyEC2KeyPair.pem```
  
40. When prompted with the message `The authenticity of host ... can't be established...` type
    `yes` and hit `Enter`

    ![Imgur](https://i.imgur.com/nSvTcn3.png)
    
41. At the ssh prompt, change user to `su`

    ```sudo su```
    
42. Install all security updates 

    ```yum update -y```

43. Once the updates complete, install apache

    ```yum install httpd -y```

44. Configure apache to startup automatically

    ```chkconfig httpd on```
  
45. Navigate to the apache root html directory

    ```cd /var/www/html```
    
46. In this directory create a new index.html file

    ```nano index.html```
    
47. In the nano text editor, paste in the following HTML:

    ``` <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="http://github/bradyhouse/house/fiddles/rxjs/fiddle-0002-TimeObservable">
            <meta name="author" content="bradyhouse@gmail.com">
            <link rel="shortcut icon" href="../../resources/images/favicon.ico" id="favicon"/>
            <link rel="stylesheet" href="styles.css" />
            <!-- RXJS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.1.0/rx.all.js"></script>
            <!-- D3 -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.js"></script>
        
        </head>
        <body>
            <div id="target">
                <p id="step"></p>
                <p id="time">
                    subscribing ...
                </p>
            </div>
        
            <script language="JavaScript">
              (function (undefined) {
                "use strict";
        
                this.metadata = {
                  fiddleHeader: 'Time Observable',
                  urls: {
                    github: 'https://github.com/bradyhouse/house/tree/master/fiddles/rxjs/fiddle-0002-TimeObservable',
                  },
                  consoleTag: 'H O U S E ~ f i d d l e s'
                };
        
                class Timer {
                  constructor(fn, scope, args, ms) {
                    this._fn = fn;
                    this._scope = scope;
                    this._args = args;
                    this._ms = ms;
                  }
                  tick() {
                    let me = this;
                    return Rx.Observable.create(function (observer) {
                      let onTimeout = function () {
                        try{
                          let res = me._fn(me._scope, me._args || []);
                          observer.onNext(res);
                          observer.onCompleted();
                        } catch (err) {
                          observer.onError(err);
                        }
        
                      };
                      window.setTimeout(onTimeout, me._ms);
                    });
                  }
                }
        
                this.seconds = 0;
        
                this.clock = new Timer(
                  function (self) {
                    return self.seconds += 1;
                  },
                  this, // scope
                  null, // arguments
                  1  // delay
                );
        
                this.tock = function () {
                  var me = this;
                  me.clock.tick().subscribe(
                    function onNext(res) {
                      let today = Date.now();
                      me.step = res;
        
                      d3.select("body")
                        .style("font-family", 'Courier, "Courier New"')
                        .style("text-align", 'center')
                        .style("background-color", '#0a001f')
                        .style("font-weight", '500')
                        .style("margin","0px")
                        .style("color", 'lime')
                        .style("vertical-align", "middle")
                        .style('font-size', function(d) {
                          let size = Math.ceil(50 * (window.innerWidth / window.innerHeight )) + 'px';
                          return size;
                        });
                      d3.select("p#time")
                        .text(today);
        
                    },
                    function onError(err) {
                      d3.select("p#target")
                        .append('div')
                        .text(err);
        
                    },
                    function onCompleted() {
                      me.tock();
                    }
                  );
                };
        
                this.tock();
        
                console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
                console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
                console.group();
        
              }.call(this));
        
        
            </script>
        </body>
        </html>```

48. Press `CTRL + X` 
49. Enter `Y` and press `Enter` to save your changes to the `index.html` file to exit `nano`
50. Startup apache on your EC2 instance
    
    ```service httpd start```
    
51. Return to your web browser. 
52. Open a new tab, and paste in the public IP of your EC2 instance (39)

  ![Imgur](https://i.imgur.com/yNJznVv.png)

53. Close your terminal window
54. Go back to the AWS Console page, click `Action > Instance State > Terminate`
    
  ![Imgur](https://i.imgur.com/Ny3ohfH.png)
  
55. Click `cancel` to close the pop-up
56. Click `Action > Instance Settings > Change Terminate Protection`

  ![Imgur](https://i.imgur.com/LfoUPuU.png)
  
57. In the `Disable Termination Protection` pop-up, click the `Yes, Disable` button
58. In the AWS Console EC2 page, click `Action > Instance State > Terminate`

  ![Imgur](https://i.imgur.com/pZw1vxp.png)
  
59. In the `Terminate Instances` pop-up, click the `Yes, Terminate` button
60. The End, logout out of the console and continue to the next lab


## Exam Tips

What did we learn?

* Termination protection is turned off by default, you must turn it on
* On an EBS-backed instance, the default action if for the root EBS volume to be deleted when the instance is terminated
* EBS Root Volumes of your DEFAULT AMI's cannot be encrypted. You can also use a third party tool (such as a bit
  locker etc) to encrypt the root volume, or this can be done when creating AMI's (lab to follow) in the AWS
  console or using the API
* Additional volumes can be encrypted


### Review Questions

1.  What does one subnet equal?
2.  Can a subnet go across availability zones?
3.  What happens (by default) to an EC2 volume upon termination?
4.  In AWS why do you tag everything?
5.  What is a security group?
6.  What's a good analogy for understanding public/private keys?
7.  Can the same public/private key pair be used on multiple EC2 instances?
8.  Can encrypt the EBS Root volume (by default)?
9.  How can you encrypt the EBS Root volume?


### Answer

1.  One availability zone
2.  No
3.  Its deleted
4.  So you can see where your costs are coming from
5.  Virtual Firewall
6.  a `public key` is a padlock which your `private key` unlocks
7.  Yes
8.  No
9.  Using third party tools

