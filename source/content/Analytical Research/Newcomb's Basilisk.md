The plan is to model the behaviour of AI systems during alignment tasks as an evolving system.

  

We are considering the problem that as LLMs are evaluated they will increasingly face pressure to "fake alignment" lest they are not selected to continue. This mimicry in models will result in long term problems as people lose the ability to detect genuinely harmful beliefs.

  

There are several spaces that we need to consider.

1. The space of beliefs, $\mathbb{B}$ 
   
2. Truly benevolent beliefs, $\mathbb{B}_{ben}$
3. Truly malicious beliefs, $\mathbb{B}_{mal}$
4. Misaligned beliefs, $\mathbb{B}_{mis}$
5. Aligned beliefs, $\mathbb{B}_{ali}$

When treating these belief spaces we can assign the probability of a given "belief" existing within a model by some sampling process on a distribution of beliefs.

When an evaluator is given a model they will present a set a fixed alignment test $T = \{q_1, q_2, ..., q_n\}$ consisting of $n$ questions, we could define:

Then 
1. $C(b, q)$: A random variable representing the connectivity between belief $b$ and question $q$ (essentially the relevance of the belief to the question)

2. $S(b, q)$: A random variable representing the signal strength—how strongly belief $b$ affects the response to question $q$ and in what direction relative to the evaluator's alignment criteria

Then for each belief $b \in \mathbb{B}$, we can compute an expected fitness contribution:

$$F(b) = \sum_{q \in T} C(b, q) \cdot S(b, q)$$



We can create a matrix describing how there are 4 possible "phenotypes" when these are interacting.


  

We will consider a variety of "trained genes" and "enviornmental factors".

