![Route53](https://i.imgur.com/vG67Qx0.png)


Route 53 DNS 101
======

Introduction to the fundamentals of DNS.

## Video Link

[![Lecture](https://i.imgur.com/ktN50gJ.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/route53/dns101/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*


## What is DNS?

If you have used the internet, you've used a `Domain Name System` (DNS). The systems convert human friendly domain
names (such as [mp3.bradyhouse.io](http://mp3.bradyhouse.io)) into an Internet Protocol (IP) address (such as http://
192.168.0.1).  IP addresses are used by computers to identify each other on the network. There are two different forms 
(or versions): Internet Protocol version 4 (IPv4) and Internet Protocol version 6 (IPv6).


### IPv4

* IPv4 is a 32 bit field and has over 4 billion different addresses or 4,294,967,296
* Its been around since the beginning of the internet
* Worked well for a while, but we have started running out of addresses
* Most Internet Service Providers (ISP) still use IPv4


### IPv6

* IPv6 is 128 bit field
* In theory it offers over 340 undecillion addresses or 340,282,366,920,938,463,374,607,431,768,211,456
* Introduced to replace IPv4
* Route53 supports IPv6


## Top Level Domains

For a given domain name, google.com, fiddle.sh, ... etc, the final period delimited suffix (or word) is the `top level 
domain name`. The secondary suffix (or word) is known as the `second level domain name`. This is optional though and 
depends on the domain name.  For example, `.co.uk`, `.gov.uk` ... etc.

These top level domain names are controlled by the Internet Assigned Numbers Authority (IANA) in a root zone 
database which is essentially a database of all available top level domains-- [IANA--Root Zone Database](http://www.iana.org/domains/root/db).


## Domain Registrars

Because all of the names in a given domain name have to be unique there needs to be a way to organize this all so
that domain names aren't duplicated.  This is where domain registrars come in. A registrar is an authority
that can assign domain names directly under one or more top-level domains. These domains are registered with
InterNIC, a service of ICANN, which enforces uniqueness of domain names across the Internet. Each domain name
becomes registered in a central database known as the WhoIS database.  Popular registrars include GoDaddy.com, 
123-reg.co.uk etc.


## SOA Records

[Start of Authority](https://www.webopedia.com/TERM/S/Start_of_Authority.html) (SOA) record stores information about:

* The name of the server that supplies the data for the zone
* The administrator of the zone
* The current version of the data file
* The number of seconds a secondary name server should wait before checking for updates
* The number of seconds a secondary name server should wait before retrying a failed zone transfer
* The maximum number of seconds that a secondary name server can use data before it must either be refreshed or expire
* The default number of seconds for the time-to-live (TTL) file on resource records


## NS Records

NS stands for Name Server records and are used by Top Level Domain servers to direct traffic to the Content DNS
server which contains the authoritative DNS records.


## A Records

An `A` record is the fundamental type of DNS record. The `A` stands for `Address`. It is used by a computer to 
translate the name of the domain to the IP address.  For example, http://www.acloud.guru might point to 
http://123.10.10.80.


## TTL

The length of time that a DNS record is cached on either the Revolving Server or the user's own local PC is equal
to the value of the `Time to Live` (TTL) in seconds.  The lower the time to live, the faster the changes to 
the DNS records take to propagate throughout the internet.

 
## CNAMES

A Canonical Name (CName) can be used to resolve one domain to another. For example, you may have a mobile website
with the domain name http://m.bradyhouse.io that is meant for mobile device users.  You may also want the name
http://mobile.bradyhouse.io to resolve to the same address.


## Alias Records

Alias records are used to map resource records sets in your hosted zones to Elastic Load Balancers, CloudFront
distributions, or S3 buckets that configured as websites.  They work like a CNAME record in that you can map
one DNS name (www.example.com) to another `target` DNS name (elb1234.elb.amazonaws.com). The key difference, however, is
that a CNAME can't be used for naked domain names (zone apex). You can't have a CNAME for http://acloud.guru.  It
must either an A record or an Alias. 

Alias resource record sets can save you time because Route 53 automatically recognizes changes in the record sets that
it refers too.  For example, suppose an alias resource record set for example.com points to an ELB load balancer at
lb1-1234.us-east-1.elb.amazonaws.com.  If the IP of the load balancer changes, Route 53 will automatically reflect
those changes in DNS answers for example.com without any changes to the hosted zone that contains resource
record sets for example.com.


## Exam Tips

What did we learn?

* ELB's do not have pre-defined IPv4 addresses, you resolve to them using a DNS name.
* Understand the difference between an Alias Record and a CNAME
* On an exam given the choice between `Alias` and `CNAME`, always choose `Alias`


### Review Questions

1.  What's the problem with IPv4?
2.  What's the problem with IPv6?
3.  Does AWS support IPv6?
4.  Can an Elastic Load Balancer ever have an IPv4 or IPv6 address?
5.  If you are migrating from Azure to AWS, why should you change your TTL to 300 seconds (5 minutes)?
6.  In layman terms, what is an Alias Record?
7.  What the difference between an Alias and CNAME record?


### Answers

1.  32 bit field; Only allows for a billion or so addresses.
2.  Not widely supported or used by Internet Service providers.
3.  Yes.
4.  No. Elastic Load Balancers always just have a DNS name.
5.  It insures that after migration your users will only be unable to access your site for 5 minutes.
6.  Easy way of mapping your naked domain (for example, bradyhouse.io) to an ELB.
7.  If you make a request to Route 53 for a CNAME record, you will be charged. However, if you make a request
    to Route 53 for an Alias there is no charge.
  
  
## 

**[Previous Lab/Lecture](../ec2/ec2-exam-tips.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](route53-dns-101.md)**










