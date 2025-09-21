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

>[!info] We always reach steady state
>A system will reach steady state at  t → ∞ if currently rate of arrival is > rate of service

### Transient State:
In this state, the operation characteristic of system are dependent on time.

### Explosive state:
Here arrival rate >> service rate. Theoretically, queue length will increase with time and can also tend to ∞.

---

## Designation of Queue

M / M / 1 : N / FCFS
A / B / S : ( d / f )

A: Arrival pattern of units
B: The probability distribution of service time of individual actually being served.
S: Number of service channels

d: Capacity of system
f: The system discipline

so M / M / 1: N / FCFS means:
Markovi
