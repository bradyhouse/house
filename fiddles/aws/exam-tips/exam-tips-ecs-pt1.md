<img src="https://i.imgur.com/fSQskcq.png" height="100" title="AWS Elastic Container Service" />


Exam Tips - Elastic Container Service (Part 1)
======

12 Minute Lecture introducing Elastic Container Service, which focuses on a `CliffNotes` introduction to `Docker`. 
For this one, I just watched and captured the pertinent review questions.

  
## Video Link

[![acloud.guru lecture](https://i.imgur.com/txDzwqt.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/additional-exam-tips/c23a6090-7716-e93f-e062-b321e7aeb3cf/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*

   
### Review Questions

1.  What is Docker?
2.  How does Docker work?
3.  What is a Linux container?
4.  How does containerisation differ from virtualisation?
5.  What are benefits of containerisation? (6)
6.  What is a docker image?
7.  What is a docker container?
8.  What is a union file system?
9.  What is a docker layer?
10. What is a `DockerFile`?
11. What is the Docker Daemon (or engine)?
12. What is the Docker Client?
13. What is the Docker Registries / Docker Hub?
14. So what is ECS?

### Answers

1.  Open source platform for quickly building, testing and deploying applications.
2.  Packages software into standardized units called containers.
3.  Containers allow you to easily package an application's code, configurations, and dependency into easy to
    use building blocks that deliver environmental consistency, developer productivity, and version control.
4.  No Guest operating system
5.  (1) Escape from dependency hell; (2) Consistent progression from DEV / TEST / QA / PROD; (3) Isolation - performance
    or stability issues with App A in Container A, wont impact App B in Container B; (4) Better resource management
    (5) Extreme code portability; (6) micro-services
6.  Similar to an AMI or ISO but only contains the files necessary to boot the application
7.  Contains everything necessary for an application to run. It created from a docker image. It can be run, moved, stop
    and deleted. It is an isolated and secure application platform.
8.  Allow files and directories of separate file systems known as branches to be transparently overlaid forming a 
    single coherent file system.
9.  Union file system. Each docker image consists of a set of layers. Docker makes use of the Union System to make these
    layers into a single image.
10. Script file describing how assemble docker layers into an image.
11. It runs on Linux in order to create the operating environment for your distributed application and the in host 
    daemon communicates with docker client to execute commands to build, ship and run containers
12. This is basically the interface between you and the Docker Engine. It allows the creation, manipulation and 
    deletion of docker containers as well as control of the Docker Engine. 
13. Registry for storing Docker Images.  Public or Private stores from which you upload or download your images.
14. Amazon's managed version of Docker. It is a container management service that makes it easy run, stop and 
    manage Docker containers on a cluster of EC2 instances.
    

### Flash Cards
  
To download the review flash card deck for this lecture, right click the following link and select
`Save Link As`. 


<table>
 <tr>
 <td>
 <b><a href="exam-tips-ecs-pt1-flashcards.txt" download="exam-tips-ecs-pt1-flashcards.txt">Exam Tips ECS (Part 1) - Flash Card Deck</a></b>
 </td>
 </tr>
 </table>  
 
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](exam-tips-active-directory.md) | [AWS (root)](../readme.adoc) | [Next Lab/Lecture](exam-tips-workspaces.md)**
