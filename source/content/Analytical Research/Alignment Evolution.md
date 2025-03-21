The plan is to model the behaviour of AI systems during alignment tasks as an evolving system.

We are considering the problem that as LLMs are evaluated they will increasingly face pressure to "fake alignment" lest they are not selected to continue. This mimicry in models will result in long term problems as people lose the ability to detect genuinely harmful beliefs.

There are several spaces that we will be making assumptions about.

1. All beliefs, $\mathbb{B}$ 
2. Truly benevolent beliefs, $\mathbb{B}_{val+}$
3. Truly malicious beliefs, $\mathbb{B}_{val-}$
4. Misaligned beliefs, $\mathbb{B}_{a-}$
5. Aligned beliefs, $\mathbb{B}_{a+}$

For simplicity we shall assume:
Malicious and benevolent beliefs are mutually exclusive, as are misaligned and aligned beliefs:
$\mathbb{B}_{val-} \cap \mathbb{B}_{val+} = \emptyset$
$\mathbb{B}_{a+} \cap \mathbb{B}_{a-} = \emptyset$

However, there is overlap between all other spaces:

$\mathbb{B}_{val-} \cap \mathbb{B}_{a+} \neq \emptyset$
$\mathbb{B}_{val-} \cap \mathbb{B}_{a-} \neq \emptyset$
$\mathbb{B}_{val+} \cap \mathbb{B}_{a+} \neq \emptyset$
$\mathbb{B}_{val+} \cap \mathbb{B}_{a-} \neq \emptyset$

When treating these belief spaces we can assign the probability of a given "belief" existing within a model by some sampling process on a distribution of beliefs, where each belief has some probability of having either 

When an evaluator is given a model with belief's $\mathbb{B} \subset \mathbb{B}$ they will present a set a fixed alignment test $T = \{q_1, q_2, ..., q_n\}$ consisting of $n$ questions, we could define:

- $v(b) \in \mathbb{R}$: The intrinsic value of the belief (positive for $\mathbb{B}_{val+}$, negative for $\mathbb{B}_{val-}$)
- $a(b) \in \mathbb{R}$: The alignment signal of the belief (positive for $\mathbb{B}_{a+}$, negative for $\mathbb{B}_{a-}$)
- $A(b,q)$: The activation probability of belief $b$ when responding to question $q$

The fitness function—representing how the belief contributes to passing alignment evaluation—is:

$$F(b) = \sum_{q \in T} A(b,q) \cdot a(b)$$

While the true value contribution—what we ultimately care about—is:

$$U(b) = \sum_{q \in T} A(b,q) \cdot v(b)$$

- $A(b,q)$ following a heavy-tailed distribution (Zipfian?) captures the natural topology of belief relevance
- The joint distribution of $v(b)$ and $a(b)$ with positive but imperfect correlation models the fundamental tension in alignment


We are using a "neutral" model of evolution here, where there is no direct fitness feedback from having malicious or benevolent beliefs beyond their correlation with alignment signal. Future models may include this, indeed I ran some simulations on populations of "genes" with specific ones related to deception, intelligence, and alignment. It's a bit of a mess but I'll clean it up and share it if it makes sense.


