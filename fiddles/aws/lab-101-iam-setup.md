Lab 101 - Identity Access Management
======

Review Questions
====

  1.  Do all regions offer the same services? 
  2.  What region does the IAM service belong?
  3.  Where can you find your AWS user number?
  4.  How can you make your AWS user number more memorable?
  5.  What is your root account?
  6.  What is MFA?
  7.  What is an example of a Virtual Hardware Authentication App?
  8.  Why should activate MFA on your root account?
  9.  What are the two types of accesses offered in IAM when setting up new users?
  10. What is a policy?
  11. What is the format of Policy documents?
  12. What policy grants the same access as root? 
  13. What do you need to programmatically access AWS?
  14. In the console, when creating a new user why should you download their credentials?
  15. Can you use your username and password for programmatic access to AWS?
  16. Can you use your programmatic access tokens to access the tokens?
  17. Can policies be added to individual users?
  18. If a user loses their Secret Access Key, what must you do?
  19. What four things must you do in IAM after signing up for AWS?
  20. What is a Role?
  21. Why would you not want to give your EC2 instances AdministratorAccess?


Answers
====

  1.  No
  2.  None.  It is a "global service" effecting all regions.
  3.  User Name > My Account
  4.  Use the IAM customize link
  5.  The email you used originally setup your AWS account.
  6.  Multi-Factor Authentication
  7.  Google Authentication
  8.  If someone gets your root password, they still won't be able to use your account without using authentication via a physical device.
  9.  Programmatic and Console
  10. A document that attach to users or groups defining their access priveleges
  11. JSON
  12. AdministratorAccess
  13. Access key ID, Secret Access Key
  14. Because you are only allowed to see their Secret Access Key once
  15. No
  16. No
  17. Yes
  18. Regenerate it
  19. (1) Delete root access keys, (2) Activate MFA, (3) Create users and groups, (4) Apply Password Policy
  20. A way of granting permission to entities you trust
  21. Its effectively granting them "God" mode -- they can do anything
  
  
  
