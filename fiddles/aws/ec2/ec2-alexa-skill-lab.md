![AWS Elastic Compute Cloud](https://i.imgur.com/9awJmtb.png) <img src="https://i.imgur.com/SH72C80.png" height="100" title="AWS Lex" />


EC2 Alexa Skill Lab
======

16 minute lab about how to build an Alexa skill app that will read your notes.

*Note, although this is a great lab for gaining experience with AWS, it is beyond the scope of the Exam.  In other 
words, there are no Exam Tips (or Exam related notes) resulting from the the completion of this lab.*


## Video Link

[![Imgur](https://i.imgur.com/2Grw1uH.png))](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/ec2/738672e4-64ee-0d59-b9fb-2baaf58710f4/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## Prerequisites

* Mac configured with [iTerm](https://iterm2.com/) and [BBEdit](http://www.barebones.com/products/bbedit/)
* [AWS Console account](https://aws.amazon.com)
* [Alexa account](https://alexa.amazon.com)
* [AWS Developers account](https://developer.amazon.com)
* Complete the [Using Polly To Pass Your Exam Lab (Part 1)](ec2-using-polly-lab-pt1.md)
* Complete the [Using Polly To Pass Your Exam Lab (Part 2)](ec2-using-polly-lab-pt2.md)
    

## Steps

### Lambda: Alexa_Polly Function

1.  Log into the AWS Console
2.  Under `Services > Compute` click `Lambda` 
3.  On the `Lambda > Functions` page click the `Create function` button 
4.  On the `Create function` page, click the `Blueprints` option
5.  In the `Blueprints` filter field, enter `Alexa`
6.  Select the `alexa-skill-kit-sdk-factskill` blueprint
7.  On the `Using blueprint alexa-skill-kit-sdk-factskill` page under `Basic information`, set the `Name` to `Alexa_CallPolly`
8.  Set the `Role` option to `Choose an existing role` (default)
9.  Set the `Existing role` to `LambdaRoleForPolly`, which was created as part 
    [Using Polly To Pass Your Exam Lab (Part 1)](ec2-using-polly-lab-pt1.md) lab
10. Scroll down and click the `Create function` button
11. On the `Alexa_CallPolly` function page under `Designer`, add the trigger `Alexa Skill Kit`
12. Under `Configure triggers`, disable the `Skill ID verification` option
13. Click the `Add` button
14. Click the `Save` button
15. Refresh your browser
16. Under `Function code`, in the Code IDE (aka cloud9) interface, select the `index.js` file
17. Replace the contents of the file with the following JavaScript:

    ```var Alexa = require('alexa-sdk');
       
       exports.handler = function(event, context, callback) {
           var alexa = Alexa.handler(event, context);
       
       
           alexa.registerHandlers(handlers);
           alexa.execute();
       };
       
       var handlers = {
           'LaunchRequest': function () {
               this.emit('GetNewFactIntent');
           },
       
           'GetNewFactIntent': function () {
               var say = 'Hello Fiddler! Lets begin studying for our exam!' + getFact();
               this.emit(':tell', say );
           },
       
           'AMAZON.HelpIntent': function () {
                this.emit(':ask', 'Learn everything you need to know about Amazon Web Services to pass your exam by listening to your very own study notes. You can start by saying, Ryan help me study.', 'try again');
            },
       
            'AMAZON.CancelIntent': function () {
                this.emit(':tell', 'Goodbye Fiddler');
            },
       
            'AMAZON.StopIntent': function () {
                this.emit(':tell', 'Goodbye Fiddler');
            }
       };
       
       //  helper functions  ===================================================================
       
       
       function getFact() {
           var myFacts = [
           '<audio src=\"YOUR S3 LINK HERE" />\'',
           '<audio src=\"YOUR S3 LINK HERE" />\'',
           '<audio src=\"YOUR S3 LINK HERE" />\''
               ]
       
           var newFact = randomPhrase(myFacts);
       
           return newFact;
       }
       
       function randomPhrase(array) {
           // the argument is an array [] of words or phrases
           var i = 0;
           i = Math.floor(Math.random() * array.length);
           return(array[i]);
       }```


18. In the above code block, update the `getFacts` function based on the contents of your
    DynamoDb `posts` table, which was (populated) as part of the 
    [Using Polly To Pass Your Exam Lab (Part 2)](ec2-using-polly-lab-pt2.md) lab. Replace the `YOUR S3 LINK HERE`,
    with the actual URLs of three entries from your `posts` table.
19. Click the `Save` button
20. Copy the ARN of your new Lambda function to your clipboard


### Alexa: Create a Skill

21. Log into [developer.amazon.com](https://developer.amazon.com)
    * Note - If you are setting up an account for the first time, make sure to use the same email used by your 
      [alexa.amazon.com](https://alexa.amazon.com) account.
22. In the `Developer Console > Dashboard` page, click the `Alexa` button
23. On the `Developer Console > Alexa` page, click the `Get Started` button under `Alexa Skill kit`
24. On the `amazon alexa` page, click the `Switch to old console` button
25. On the `Building Alexa Skills with the Alexa Skills Kit` page, click the `Add a New Skill` button
26. On the `Create a New Alexa Skill` page, set the `Skill Type` to `Customer Interaction` (default)
27. Set the `Name` and `Invocation Name` to `fiddle`
28. Click the `Save` button
29. Click the `Next` button
30. On the `fiddle` page, set the `Intent Schema` to the following json:

    ```{
         "intents": [
           {
             "intent": "GetNewFactIntent"
           },
           {
             "intent": "AMAZON.HelpIntent"
           },
           {
             "intent": "AMAZON.StopIntent"
           },
           {
             "intent": "AMAZON.CancelIntent"
           }
         ]
       }```

31. In the `Sample Utterances` past the following text:

    ```GetNewFactIntent tell me a fact
       GetNewFactIntent give me a fact
       GetNewFactIntent tell me something
       GetNewFactIntent help me study```

32. Click the `Next` button
33. On the `Global Fields` page, for the `Service Endpoint Type` select `AWS Lambda ARN (Amazon Resource Name)`
34. Set the `Default` field to the `ARN` of your `Alexa_CallPolly` (step 20)
35. Click the `Next` button


![Imgur](https://i.imgur.com/0Wq2Ilp.png)


### Alexa: Test it Out

36. On the fiddle Skill `Test` page, scroll down to the Service Simulator Section
37. On the `Text` tab, set the `Enter Utterance` to `tell me a fact`
38. Click the `Ask fiddle` button


![Imgur](https://i.imgur.com/Llz2yKc.png)


39. Finally, click the `Listen` button 
40. THE END 


##

**[Previous Lab/Lecture](ec2-using-polly-lab-pt2.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](ec2-exam-tips.md)** 
