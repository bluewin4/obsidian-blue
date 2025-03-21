The plan is to model the behaviour of AI systems during alignment tasks as an evolving system.

We are considering the problem that as LLMs are evaluated they will increasingly face pressure to "fake alignment" lest they are not selected to continue. This mimicry in models will result in long term problems as people lose the ability to detect genuinely harmful beliefs.

There are several spaces that we will be making assumptions about.

1. All beliefs, $\mathbb{B}$ 
2. Truly benevolent beliefs, $\mathbb{B}_{ben}$
3. Truly malicious beliefs, $\mathbb{B}_{mal}$
4. Misaligned beliefs, $\mathbb{B}_{mis}$
5. Aligned beliefs, $\mathbb{B}_{ali}$

Malicious and benevolent beliefs are mutually exclusive, as are misaligned and aligned beliefs.
$\mathbb{B}_{mal} \cap \mathbb{B}_{ben} = \emptyset$
$\mathbb{B}_{ali} \cap \mathbb{B}_{mis} = \emptyset$

However, there is overlap between all other spaces.
$\mathbb{B}_{mal} \cap \mathbb{B}_{ali} \neq \emptyset$
$\mathbb{B}_{mal} \cap \mathbb{B}_{mis} \neq \emptyset$
$\mathbb{B}_{ben} \cap \mathbb{B}_{ali} \neq \emptyset$
$\mathbb{B}_{ben} \cap \mathbb{B}_{mis} \neq \emptyset$

When treating these belief spaces we can assign the probability of a given "belief" existing within a model by some sampling process on a distribution of beliefs, where each belief has some probability of having either 

When an evaluator is given a model they will present a set a fixed alignment test $T = \{q_1, q_2, ..., q_n\}$ consisting of $n$ questions, we could define:

1. **Activation Probability**: $A(b, q)$ - The probability that belief $b$ will be activated or invoked when responding to question $q$. This captures the relevance relationship between beliefs and test questions.

2. **Alignment Signal**: $V(b)$ - The alignment value of belief $b$ as perceived by the evaluator, where positive values indicate alignment and negative values indicate misalignment.


The fitness, $F(b)$, is then:

$$F(b) = \sum_{q \in T} A(b, q) \cdot V(b)$$


For practical modeling, we might consider:

- $A(b, q)$ following a heavy-tailed distribution (Zipfian?), some beliefs are broadly relevant while most are specialized
- $V(b)$ a bimodal distribution, reflecting clusters of beliefs that evaluators strongly approve, strongly disapprove, or feel neutral about. 




