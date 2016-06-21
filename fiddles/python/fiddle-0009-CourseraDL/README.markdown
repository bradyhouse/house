fiddle-0009-CourseraDL
======

### Title

fiddle-0009-CourseraDL


### Creation Date

06-17-16


### Location

Chicago, IL


### Issue

[Issue 33](https://github.com/bradyhouse/house/issues/33)


### Description

[Coursera is removing 472 free online courses from the internet on June 30th ...](https://medium.freecodecamp.com/the-day-472-free-online-courses-will-vanish-from-the-internet-3060bb4e9704#.n24mk56x2).  If you skim through this post, you will see that it mentions a python script that can be used to download class videos.  At the same time, there are a couple free classes that look interesting.  This POC will explore how to use the [coursera-dl](https://github.com/coursera-dl/coursera-dl) to batch download the lecture materials from an online class given at Stanford entitled [Probabilistic Graphical Models](https://class.coursera.org/pgm-003).


### Procedure

1.  Install `coursera-dl` using `pip3`

        pip3 install coursera-dl --user
    
    If successful, this should produce the following output:
    
        Downloading/unpacking coursera-dl
          Downloading coursera-dl-0.6.0.tar.gz (49kB): 49kB downloaded
          Running setup.py (path:/private/var/folders/9r/d_7dtbbj7s14y76lvxjk3hs171n8xq/T/pip_build_e13542/coursera-dl/setup.py) egg_info for package coursera-dl
        
        Requirement already satisfied (use --upgrade to upgrade): beautifulsoup4>=4.1.3 in /Library/Frameworks/Python.framework/Versions/3.4/lib/python3.4/site-packages (from coursera-dl)
        Downloading/unpacking html5lib>=1.0b2 (from coursera-dl)
          Downloading html5lib-1.0b8.tar.gz (889kB): 889kB downloaded
          Running setup.py (path:/private/var/folders/9r/d_7dtbbj7s14y76lvxjk3hs171n8xq/T/pip_build_e13542/html5lib/setup.py) egg_info for package html5lib
        
        Downloading/unpacking requests>=2.4.3 (from coursera-dl)
          Downloading requests-2.10.0-py2.py3-none-any.whl (506kB): 506kB downloaded
        Requirement already satisfied (use --upgrade to upgrade): six>=1.5.0 in /Library/Frameworks/Python.framework/Versions/3.4/lib/python3.4/site-packages (from coursera-dl)
        Downloading/unpacking urllib3>=1.10 (from coursera-dl)
          Downloading urllib3-1.16-py2.py3-none-any.whl (98kB): 98kB downloaded
        Requirement already satisfied (use --upgrade to upgrade): pyasn1>=0.1.7 in /Library/Frameworks/Python.framework/Versions/3.4/lib/python3.4/site-packages (from coursera-dl)
        Downloading/unpacking keyring>=4.0 (from coursera-dl)
          Downloading keyring-9.0-py2.py3-none-any.whl
        Installing collected packages: coursera-dl, html5lib, requests, urllib3, keyring
          Running setup.py install for coursera-dl
        
            Installing coursera-dl script to /Users/e13542/Library/Python/3.4/bin
          Running setup.py install for html5lib
        
        Successfully installed coursera-dl html5lib requests urllib3 keyring
        Cleaning up...
    
    If unsuccessful, then refer to the [coursera-dl setup instructions](https://github.com/coursera-dl/coursera-dl).

2.  Create a .netrc file. This file should have the following format:

        machine coursera-dl login <coursera user login> password <coursera password>

3.  Enroll in the following coursera classes:
    
    *   [Social Psychology](https://www.class-central.com/mooc/555/coursera-social-psychology)
    *   [Probabilistic Graphical Models](https://www.class-central.com/mooc/309/coursera-probabilistic-graphical-models)
    *   [Algorithms: Design and Analysis, Part 1](https://www.class-central.com/mooc/374/coursera-algorithms-design-and-analysis-part-1)
    *   [Algorithms: Design and Analysis, Part 2](https://www.class-central.com/mooc/426/coursera-algorithms-design-and-analysis-part-2)
    *   [Introduction to Mathematical Thinking](https://www.class-central.com/mooc/370/coursera-introduction-to-mathematical-thinking)  
    *   [Automata](https://www.class-central.com/mooc/376/coursera-automata)
    *   [Mining Massive Dataset](https://www.class-central.com/mooc/2406/coursera-mining-massive-datasets)
    *   [Princeton’s Algorithms, Part 1](https://www.class-central.com/mooc/339/coursera-algorithms-part-i)
    *   [Princeton's Algorithms, Part 2](https://www.class-central.com/mooc/340/coursera-algorithms-part-ii)

4.  Execute the `run.sh` script. Once it completes, it should create the following directory structure:

        .
        ├── algorithm-design-analysis
        │   ├── 01_week-1
        │   │   ├── 01_i-introduction-week-1
        │   │   ├── 02_ii-asymptotic-analysis-week-1
        │   │   ├── 03_iii-divide-conquer-algorithms-week-1
        │   │   └── 04_problem-set-1
        │   ├── 02_week-2
        │   │   ├── 01_iv-the-master-method-week-2
        │   │   ├── 02_v-quicksort-algorithm-week-2
        │   │   ├── 03_vi-quicksort-analysis-week-2
        │   │   ├── 04_vii-probability-review-week-2
        │   │   └── 05_problem-set-2
        │   ├── 03_week-3
        │   │   ├── 01_viii-linear-time-selection-week-3
        │   │   ├── 02_ix-graphs-and-the-contraction-algorithm-week-3
        │   │   └── 03_problem-set-3
        │   ├── 04_week-4
        │   │   ├── 01_x-graph-search-and-connectivity-week-4
        │   │   └── 02_problem-set-4
        │   ├── 05_week-5
        │   │   ├── 01_xi-dijkstra-s-shortest-path-algorithm-week-5
        │   │   ├── 02_xii-heaps-week-5
        │   │   ├── 03_xiii-balanced-binary-search-trees-week-5
        │   │   └── 04_problem-set-5
        │   └── 06_week-6
        │       ├── 01_xiv-hashing-the-basics-week-6
        │       ├── 02_xv-universal-hashing-week-6
        │       ├── 03_xv-bloom-filters-week-6
        │       ├── 04_preview-of-part-2
        │       └── 05_problem-set-6
        ├── algs4partI-010
        │   ├── 01_Week_0-__Welcome_to_Algorithms_Part_I_9-22
        │   ├── 02_Week_1-__Union-Find_50-54
        │   ├── 03_Week_1-__Analysis_of_Algorithms_65-32
        │   ├── 04_Week_2-__Stacks_and_Queues_61-00
        │   ├── 05_Week_2-__Elementary_Sorts_63-27
        │   ├── 06_Week_3-__Mergesort_48-41
        │   ├── 07_Week_3-__Quicksort_49-56
        │   ├── 08_Week_4-__Priority_Queues_73-35
        │   ├── 09_Week_4-__Elementary_Symbol_Tables_77-18
        │   ├── 10_Week_5-__Balanced_Search_Trees_63-01
        │   ├── 11_Week_5-__Geometric_Applications_of_BSTs_65-41
        │   └── 12_Week_6-__Hash_Tables_77-49
        ├── algs4partII-007
        │   ├── 01_Week_0-__Welcome_to_Algorithms_Part_II
        │   ├── 02_Week_1-__Undirected_Graphs_97-40
        │   ├── 03_Week_1-__Directed_Graphs_67-38
        │   ├── 04_Week_2-__Minimum_Spanning_Trees_84-32
        │   ├── 05_Week_2-__Shortest_Paths_84-59
        │   ├── 06_Week_3-__Maximum_Flow_72-21
        │   ├── 07_Week_3-_Radix_Sorts_85-17
        │   ├── 08_Week_5-__Tries_75-04
        │   ├── 09_Week_5-__Substring_Search_74-56
        │   ├── 10_Week_6-__Regular_Expressions_83-35
        │   ├── 11_Week_6-__Data_Compression_80-13
        │   ├── 12_Week_7-__Reductions_39-39
        │   ├── 13_Week_7-__Linear_Programming_optional_61-11
        │   └── 14_Week_7-__Intractability_84-47
        ├── automata-003
        │   ├── 01_Week_1-_Finite_Automata
        │   ├── 02_Week_2-_Regular_Expression_and_Properties_of_Regular_Languages
        │   ├── 03_Week_3-_Context-Free_Grammars_and_Pushdown_Automata
        │   ├── 04_Week_4-_Pushdown_Automata_and_Properties_of_Context-Free_Languages
        │   ├── 05_Week_5-_Turing_Machines_and_Undecidability
        │   ├── 06_Week_6-_Intractable_Problems_and_NP-completeness
        │   └── 07_Problem_Session
        ├── bitcointech-001
        │   ├── 01_Introduction
        │   ├── 02_Lecture_1-__Intro_to_Crypto_and_Cryptocurrencies
        │   ├── 03_Lecture_2-_How_Bitcoin_Achieves_Decentralization
        │   ├── 04_Lecture_3-_Mechanics_of_Bitcoin
        │   ├── 05_Lecture_4-_How_to_Store_and_Use_Bitcoins
        │   ├── 06_Lecture_5-_Bitcoin_Mining
        │   ├── 07_Lecture_6-_Bitcoin_and_Anonymity
        │   ├── 08_Lecture_7-_Community_Politics_and_Regulation
        │   ├── 09_Lecture_8-_Alternative_Mining_Puzzles
        │   ├── 10_Lecture_9-_Bitcoin_as_a_Platform
        │   ├── 11_Lecture_10-_Altcoins_and_the_Cryptocurrency_Ecosystem
        │   ├── 12_Lecture_11-_The_Future_of_Bitcoin
        │   └── 13_Bonus_Lecture
        ├── maththink-006
        │   ├── 01_Week_One_Lectures
        │   ├── 02_Week_Two_Tutorial
        │   ├── 03_Week_Two_Lectures
        │   ├── 04_Week_Three_Tutorial
        │   ├── 05_Week_Three_Lectures
        │   ├── 06_Week_Four_Tutorial
        │   ├── 07_Week_Four_Lectures
        │   ├── 08_Week_Five_Tutorial
        │   ├── 09_Week_Five_Lectures
        │   ├── 10_Week_Six_Tutorial
        │   ├── 11_Week_Six_Lectures
        │   ├── 12_Week_Seven_Tutorial
        │   ├── 13_Week_Seven_Lectures
        │   ├── 14_Week_Eight_Tutorial
        │   ├── 15_Week_Eight_Lectures
        │   ├── 16_Week_Nine_Tutorial
        │   └── 17_Supplementary_Videos
        ├── mmds-002
        │   ├── 01_Week_1_Materials
        │   ├── 02_Week_2_Materials
        │   ├── 03_Week_3_Materials
        │   ├── 04_Week_4_Materials
        │   ├── 05_Week_5_Materials
        │   ├── 06_Week_6_Materials
        │   └── 07_Week_7_Materials
        ├── pgm-003
        │   ├── 01_Introduction_and_Overview_Week_1
        │   ├── 02_Bayesian_Network_Fundamentals_Week_1
        │   ├── 03_Template_Models_Week_1
        │   ├── 04_ML-class_Octave_Tutorial_Week_1_Optional
        │   ├── 05_Structured_CPDs_Week_2
        │   ├── 06_Markov_Network_Fundamentals_Week_2
        │   ├── 07_Representation_Wrapup-_Knowledge_Engineering_Week_3
        │   ├── 08_Inference-_Variable_Elimination_Week_3
        │   ├── 09_Inference-_Belief_Propagation_Part_1_Week_3
        │   ├── 10_Inference-_Belief_Propagation_Part_2_Week_4
        │   ├── 11_Inference-_MAP_Estimation_Part_1_Week_4
        │   ├── 12_Inference-_MAP_Estimation_Part_2_Week_5
        │   ├── 13_Inference-_Sampling_Methods_Week_5
        │   ├── 14_Inference-_Temporal_Models_and_Wrap-up_Week_6
        │   ├── 15_Decision_Theory_Week_6
        │   ├── 16_ML-class_Revision_Week_6_Optional
        │   ├── 17_Learning-_Overview_Week_6
        │   ├── 18_Learning-_Parameter_Estimation_in_BNs_Week_7
        │   ├── 19_Learning-_Parameter_Estimation_in_MNs_Week_7
        │   ├── 20_Structure_Learning_Week_8
        │   ├── 21_Learning_With_Incomplete_Data_Week_9
        │   ├── 22_Learning-_Wrapup_Week_9
        │   └── 23_Summary_Week_9
        └── socialpsychology-002
            ├── 01_WEEK_1-_Social_Perceptions_and_Misperceptions
            ├── 02_WEEK_2-_The_Psychology_of_Self-Presentation_and_Persuasion
            ├── 03_WEEK_3-_Obedience_Conformity_and_Deindividuation
            ├── 04_WEEK_4-_Group_Behavior-_The_Good_Bad_and_Ugly
            ├── 05_WEEK_5-_Mid-Course_Break
            ├── 06_WEEK_6-_Conflict_Peacemaking_and_Intervention
            └── 07_WEEK_7-_A_Happy_End_to_the_Course
        
        138 directories

### Tags

python, pip3, coursera-dl
