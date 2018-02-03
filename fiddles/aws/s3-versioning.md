Simple Storage Service (S3) Versioning
======

How to configure a S3 bucket with version control.


Pre-Requisites
===

Complete the [S3](s3.md) lab.  Specifically, this lab assumes you already have created an S3 bucket.

White Papers
===

#### [Using Versioning](https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html)


Steps
===

1.  Log into the AWS Console
2.  Click "Services"
3.  Under "Storage" click "S3"
4.  In the "S3" dashboard, click the bucket you created in the last lab
5.  In the bucket overview page, click the "Properties" tab
6.  In the "Properties" page, click "Versioning" link
7.  Select the "Enable versioning" option and click "save"
8.  Using a text editor, create a simple txt file with words "Hi mom"
9.  Upload the file to your S3 bucket and grant public read access
10. Open the same file in a text editor and change the contents to "Hi dad"
11. Upload the same file to your S3 bucket again
12. Select the file in your S3 bucket and verify that it now includes "latest version" drop-down

![Imgur](https://i.imgur.com/ciw0Pok.png)



Review Questions
====

1.  Once you enable versioning on a bucket, can you disable it?
2.  What is the easiest way to go back a version on a given S3 file?
3.  When you delete a file from S3 is actually deleted?
4.  What additional step is necessary to delete a versioned file?
5.  What is a way of preventing people from inadvertently deleting files?
6.  In general when versioning is enabled, what does it store?

Answers
====

1.  No. But you "suspend" it
2.  Delete the current version
3.  No
4.  You must delete the file's versioning "delete marker"
5.  Enabling MFA Delete
6.  Stores all versioning of an object (including all writes and even if you delete the object)

  
  
     
