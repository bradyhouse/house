<img src="https://i.imgur.com/VHKCcse.png" height="100" title="AWS Workspaces Service" />


Exam Tips - Workspaces
======

3 Minute Lecture detailing what you need to know about the Amazon Workspaces service for the exam. For this one, I just 
watched and captured the pertinent review questions.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/lX1hr6o.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/additional-exam-tips/88db164c-bc84-1810-7d52-c86166b6eed4/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*

   
### Review Questions

1.  What is Amazon Workspaces service?
2.  What service category does Workspaces belong to?
3.  What does a Workspace bundle include? (3)
4.  How does a user connect to a Workspace? (2)
5.  Do you need an Amazon account to access Workspaces?
6.  What version of Windows does it use?
7.  Can users personalize their workspace?
8.  Can you install apps locally? Administrator rights?
9.  Are workspaces ephemeral?
10. Where can user backup their data? What is the snapshot (or backup) frequency? 


### Answers
1.  It is a VDI. A WorkSpace is cloud-based replacement for a traditional desktop allowing you to run Windows in the 
    Cloud rather than on a local hardware device -- aka desktop.
2.  Desktop and App streaming
3.  (1) Compute Resources; (2) Storage Space; (3) Software Applications 
4.  (1) They connect from any support device (PC, Mac, Chromebook, iPad, Kindle Fire, or Android Tablet) using a 
    free Amazon Workspaces client application and credentials setup by an Administrator or their existing 
    Active Directory credentials if Amazon Workspaces is integrated with an existing Active Directory domain.
5.  No
6.  Windows 7 experience, provided by Windows Server 2008 R2
7.  By default, yes. However, it can be locked down by the Administrator
8.  By default, yes and yes.  However, these rights can be locked down by the Administrator
9.  No, they are persistent
10. The "D:\" drive; every 12 hours
    

### Flash Cards
  
To download the review flash card deck for this lecture, right click the following link and select
`Save Link As`. 


<table>
 <tr>
 <td>
 <b><a href="exam-tips-workspaces-flashcards.txt" download="exam-tips-workspaces-flashcards.txt">Exam Tips Workspaces - Flash Card Deck</a></b>
 </td>
 </tr>
 </table>  
 
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](exam-tips-active-directory.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](exam-tips-workspaces.md)**
