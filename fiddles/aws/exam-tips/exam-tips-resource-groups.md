
Resource Groups and Tags
======

8 Minute Lecture exploring Resource Groups and Tags. For this one, I just watched and captured the pertinent review
questions.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/Me5ND7C.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/additional-exam-tips/resource-groups-tagging/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*

  
 
#### Review Questions

1.  What are tags?
2.  What is Metadata?
3.  When are tags inherited? 
4.  What are examples where tags can be inherited? (3)
5.  What are resource groups?
6.  What information do Resource groups contain? (3) What does `contain` mean?
7.  Can tags be nested?
8.  Are tags applied to a resource group inherited by its resources?
9.  What is the benefit of resource groups?
10. What is tag editor used for?
11. What is the easiest way to find unused resources that you may need to delete? Why?


#### Answers

1.  Key Value Pairs attached to AWS resources.
2.  Data about data.
3.  When tag resources create other resources.
4.  (1) AutoScaling; (2) CloudFormation; (3) EBS
5.  Containers for tags. You can group resources that share one or more tags.
6.  (1) Region (2) Name (3) Health Check; The data can be dumped to CSV via the console.
7.  Yes; For example `Develper = d1, Project = fiddle.sh`
8.  No, the tags are not applied to group resources, but only the resource group itself.
9.  Its a great way of seeing who is consuming what.
10. It allows you to see all your resources and what they are tagged with. You can then add, update, or delete those 
    tags.
11. Tag Editor; Tag Editor goes across services. You do not need to access individual service dashboards to see resources.


#### Flash Cards
  
To download the review flash card deck for this lecture, right click the following link and select
`Save Link As`. 


<table>
 <tr>
 <td>
 <b><a href="exam-tips-resource-groups-flashcards.txt" download="exam-tips-resource-groups-flashcards.txt">Resource Groups and Tags - Flash Card Deck</a></b>
 </td>
 </tr>
 </table>  
 
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](exam-tips-cross-account-access-lab.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](exam-tips-resource-groups.md)**
