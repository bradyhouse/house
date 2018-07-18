<img src="https://i.imgur.com/fSQskcq.png" height="100" title="AWS Elastic Container Service" />


Exam Tips - Elastic Container Service (Part 2)
======

Second 12 Minute Lecture focused on Elastic Container Service. For this one, I just watched and captured the pertinent 
review questions.


## Video Link

[![acloud.guru lecture](https://i.imgur.com/4GcyFwU.png)](https://acloud.guru/course/aws-certified-solutions-architect-associate/learn/additional-exam-tips/4f2e6681-13d2-4f3e-9cb6-886fe0793e18/watch)

*Note - You will need an [acloud.guru](acloud.guru) account.*

   
### Review Questions

1.  What are 3 use cases for ECS?
2.  What is a DockerFile?
3.  What is ECR? Where is it located in the console?
4.  How can you secure ECR repositories?
5.  What is an ECS Task Definition?
6.  What are some parameters that can be specified in an ECS Task Definition? (3)
7.  How is ECS similar to Auto Scaling for EC2?
8.  What happens if an ECS task fails or stops?
9.  What is an ECS Cluster?
10. Can you create multiple clusters in a single account?
11. Can a cluster contain multiple different instances types?
12. Are clusters region specific?
13. Can a container belong to more than one cluster at a time?
14. Can IAM policies be applied to specific clusters?
15. What is the ECS Service Scheduler? (2)
16. What is an ECS Custom Scheduler? (2)
17. What is the relationship between the ECS Scheduler and ECS API?
18. What is the ECS Container Agent? Where does it run? 
19. How can IAM Roles be leveraged with ECS? (2)
20. At what level do security groups attach (or apply)?
21. Can you access and configure the OS of the EC2 instances in your ECS cluster?
22. What are the ECS Soft Limits? (3)
23. What are the ECS Hard Limits? (4)
24. Services are like ___ for ECS.


### Answers

1.  (1) Deployment; (2) ETL workloads; (3) Micro-services
2.  Cloud Formation template for Docker
3.  Amazon EC2 Container Registry-- Amazon's version of Docker Hub; Accessible via the ECS dashboard
4.  Using IAM policies
5.  JSON file describing one or more containers that form your application. Task Definitions are
    required to run Docker containers on Amazon.
6.  (1) Which docker images to use with the container in your task; (2) How much CPU and memory to use with
    each container; (3) Which container are linked together in a task
7.  It allows you to run and maintain a specified number (or, the "desired count") of instances of a task 
    definition simultaneously in an ECS cluster
8.  The ECS service scheduler launches another instance of your task definition to replace it and maintain the
    desired count of tasks in the service
9.  A logical grouping of container instances that you can place tasks on
10. Yes
11. Yes
12. Yes
13. No
14. Yes
15. (1) It ensures that the specified number of tasks are constantly running and reschedules tasks when a task fails;
    (2) Can ensure tasks are registered against an ELB
16. (1) A complete custom scheduler; (2) A third party schedule-- for example Blox
17. The scheduler leverages the same cluster state information provided by the ECS API to make appropriate placement
    decisions.
18. It allows container instances to connect to your cluster; ECS Optimized AMI or any EC2 instance that supports the
    ECS specification. Its is Linux based and will not run on windows
19. (1) EC2 instances use an IAM role to access ECS; (2) ECS tasks use an IAM role to access services and resources
20. Instance level -- aka the host not the task or container
21. Yes
22. (1) Clusters per region (default = 1000); (2) Instances per Cluster (default = 1000); (3) Services per
    Cluster (default = 500)
23. (1) 1 Load Balancer per Service; (2) 1000 Tasks per service (the "desired count"); (3) Max 10 Containers per
    task definition; Max. 10 Tasks per instance (host)
24. Auto-Scaling groups 
    

### Flash Cards
  
To download the review flash card deck for this lecture, right click the following link and select
`Save Link As`. 


<table>
 <tr>
 <td>
 <b><a href="exam-tips-ecs-pt2-flashcards.txt" download="exam-tips-ecs-pt2-flashcards.txt">Exam Tips ECS (Part 2) - Flash Card Deck</a></b>
 </td>
 </tr>
 </table>  
 
  
**NOTE - For details on how to use this file with the `iFlash Card App`, see the [Flash Card Strategy](https://github.com/bradyhouse/house/tree/master/fiddles/aws#flash-card-strategy).**  


## 

**[Previous Lab/Lecture](exam-tips-ecs-pt1.md) | [AWS (root)](../readme.adoc) 
