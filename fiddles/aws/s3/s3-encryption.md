![Imgur](https://i.imgur.com/M32RGmj.png)


S3 Encryption
======

### Review Questions

1.  What are the two ways you can secure your bucket?
2.  What type of logging can be established for S3 buckets?
3.  What are two types of S3 encryption?
4.  What is in transit encryption?
5.  What are the two types of at rest encryption?
6.  What are the three types of server side encryption?
7.  What is SSE-S3?
8.  What type of encryption does Amazon use for all its managed keys?
9.  What is the most common Server Side encryption?
10. What is an envelope key?
11. What is SSE-KMS?
12. What is SSE-C?
13. What is Client Side Encryption?


### Answers

1.  policy or ACL
2.  you can create access logs which log all requests made to the bucket and configure those to be
    written to a different S3 bucket or account.
3.  in transit or at rest
4.  SSL/TLS -- aka HTTPS
5.  Server Side, Client Side
6.  S3 Managed Keys (SSE-S3), 
    AWS Key Management Service, Managed Keys (SSE-KMS), 
    Server Side Encryption with Customer Provided Keys (SSE-C)
7.  Each object is encrypted with unique key employing strong multifactor encryption. and then as an additional safe 
    guard, amazon encrypts the key itself with a master key and they regularly rotate that master key.
8.  Advanced Encryption Standard 256 bit (AES256)
9.  SSE-S3
10. a key that protects your data's encryption key.
11. Its very similar to SSE-S3 but it comes with a few additional benefits as well as some additional charges for using
    it. It offers separate permissions for use of an envelope key, which provides additional protection against 
    unauthorized access of your objects. It also provides an audit trail of when your keys were used and who was using 
    them. Finally, it also gives you the option to create and manage encryption keys yourself or you can use a default
    key that is unique to you the service you are using as well as the region you are using it in.
12. Server Side Encryption with Customer Provided Keys (SSE-C). You manage the encryption keys and Amazon manages the
    encryption as writes to disk and then the decryption as to when you access your object. 
13. You encrypt the data on your client and then you upload it to S3


## 

**[Previous Lab/Lecture](s3-lifecycle.md) | [AWS (Root)](../readme.adoc) | [Next Lab/Lecture](../storage-gateway/storage-gateway.md)**

 





    
