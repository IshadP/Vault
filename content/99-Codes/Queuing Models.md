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
Markovian (Poisson Distirbution) / Markovian / 1 service channels : fininte capacity / First come first serve

---
## Notations:

| Notations   | Meanings                                                                                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **X**       | Inter arrival time between two successive customers                                                                                                            |
| **Y**       | The service time required by any customer                                                                                                                      |
| **w**       | The waiting time for any customer before it is taken into service                                                                                              |
| **v**       | Time spent by the customer in the system                                                                                                                       |
| **n**       | Number of customers                                                                                                                                            |
| **Pn (t)**  | Probability that 'n' customers arrive in the system in time 't'                                                                                                |
| **Φn (t)**  | Probability that 'n' units are served in time 't'                                                                                                              |
| **U (T)**   | Probability distribution of inter arrival time P (t ≤ T).                                                                                                      |
| **V (T)**   | Probability distribution of servicing time P (t ≤ T).                                                                                                          |
| **F (N)**   | Probability distribution of queue length at any time P (N ≤ n)                                                                                                 |
| **En**      | Some state of the system at a time when there are 'n' units in the system                                                                                      |
| **λn**      | Average number of customers arriving per unit of time, when there are already ëní units in<br>the system.                                                      |
| **λ**       | Average number of customers arriving per unit of time.                                                                                                         |
| **µn**      | Average number of customers being served per unit of time when there are already ëní units<br>in the system.                                                   |
| **µ**       | Average number of customers being served per unit of time.                                                                                                     |
| **1 / λ**   | Inter arrival time between two arrivals.                                                                                                                       |
| **1 / µ**   | Service time between two units or customers.                                                                                                                   |
| **ρ = λ/µ** | System utility or traffic intensity. **ρ = 3 / 8, it means<br>to say that out of 8 hours the system is used for 3 hours and (8 ñ 3 = 5) 5 hours the is idle.** |

---

