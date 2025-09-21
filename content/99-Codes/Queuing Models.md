---
title: Queuing Models
draft: false
date: 2025-09-21
ObsidianUIMode: preview
tags:
- OptimisationTechniques
---

**The most important information required to solve a waiting line problem is the nature and probability distribution of arrivals and service pattern.**

1. *Queue Length*: Number of person in system at anytime.
2. *Waiting Time*: Probablity distribution of waiting time of customers. It depends on following factors.
	1. Number of units already in systems.
	2. Number of service stations.
	3. Schedule in which units are selected for service.
	4. Nature and magnitude of service being given.
3. *Average idle time*: Average time for which system is ideal. One customer arrive, as he is being serviced, more arrive, system will keep servicing all customers until no customers are left.
4. *System Discipline*: The order in which customer are served; FCFS, LIFO, SIRO, Priority based.

## States of System
### Steady State: 
when rate of arrival < rate of service but both are constant. *A steady state system is also independent of time.* Probability of finding a particular length of queue is same!

>[!note] We always reach steady state
>