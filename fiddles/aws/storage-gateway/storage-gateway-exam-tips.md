![Imgur](https://i.imgur.com/8J9RMdt.png)


Storage Gateway
=====

* `File Gateway` - For flat files, stored directly on S3
* `Volume Gateway` - For Block Storage
  * `Stored Volumes` - Entire Dataset is stored on site and is asynchronously backed up to S3
  * `Cached Volumes` - Entire Dataset is stored on S3 and the most frequently accessed data
    is cached on site
  * `Gateway Virtual Tape Library (VTL)` - Used for backup and supports popular backup applications
    like NetBackup, Backup Exec, Veeam etc.
   
