This is a formalisation I am using to help clarify an intuition I have about the structure of agents, which I refer to as entities here. Each entity is represented as a structure similar to a highly connected branched chain copolymer, where physical and conceptual "particles" make up the monomeric units. Entities naturally compute due to their fluctuations in physical and conceptual space resulting in them folding and unfolding into different configurations. 

## Entity and Particle Spaces

An entity $e$ exists as a dynamic configuration of causally linked nodes (particles), $x_i$ residing in a high-dimensional state space $\mathcal{E}$. This space aims to incorporate dimensions relevant to the entity's state, such as physical coordinates ($\mathbb{P} \subset \mathcal{E}$) and conceptual dimensions ($\mathbb{S} \subset \mathcal{E}$).

$$e = \{p_1, p_2, ..., p_n\} \cup \{s_1, s_2, ..., s_m\}= \{x_1,...,x_{n+m}\} \subset \mathcal{E}$$

Where $p_i$ represents physical particles and $s_j$ represents conceptual particles. 

In a language model (LM), from [[Notation for LM Formalization]], the LM is an entity $e_{LM}$, and is described as follows:

- The objective information space $\mathbb{x}$ is the underlying space of all information
- The LM's subjective information space $\mathbb{X}_{\phi}$ (access by the LM's inference function "$\phi()$") corresponds to the primary conceptual subspace $\mathbb{S}$ for $e_{LM}$, (i.e. $\mathbb{S} \approx \mathbb{X}_{\phi} \subset \mathbb{X}$).
- The LM's personality $\mathcal{P} = [M,S,I]$ represents a configuration of conceptual nodes within $\mathbb{S}/\mathbb{X}_{\phi}$. The personality space $\mathbb{\Phi} = \{ \phi(\mathcal{P}, r) \forall r \}$ is the mapping of $\mathcal{P}$ in this space for all possible inputs $r$.
- The LM's physical substrate (hardware, computation, interface) constitute $\mathbb{P}_{LM}$, with a signalling particle that generates output $o_i$ when a receptor particle receives input $r_i$

The state of each node $x$ can be described probabilistically using a state distribution function $\psi_x(z,t)$, where $x\in\mathcal{E}$ represents a point in state space at time $t$. 

$$ \psi_x(z,t): \mathcal{E} \times \mathbb{R}^+ \rightarrow \mathbb{C} \quad (\text{or } \mathbb{R}^+) $$

We can use $|\psi_x(z,t)|^2$ can be thought of as the probability density associated with node $x$'s state being at location $z$ at time $t$. While the complex form, $\mathbb{C}$, is useful for handling interference phenomena, a real-valued probability distribution, $\mathbb{R}^+$, should be sufficient for many applications.

Entities are bounded systems where causal links between particles exceed a threshold $\tau$:

$$\forall (x_i,x_j) \in e: B(x_i,x_j) > \tau$$

Where $B(x_i,x_j)$ is the causal (bond) strength between particles $x_i$ and $x_j$. Importantly this is scale variant, so if one is dealing with a nation $\tau_{nation} < \tau_{family} <\tau_{individual}$, meaning that the requirement for causal linkage of semantic/physical particles is lower for people to be considered of a nation than to be considered of a family, or an individual. 

### Particle detection and interaction

Building on $\mathbb{X}$ (objective information space) and $\mathbb{X}_{\phi}$ (subjective information space) from [[Notation for LM Formalization]].

Objective physical subspace $\mathbb{P}$, and subjective physical subspace $\mathbb{P}_{\phi}$ accessed via inference process $\phi$:
$$\mathbb{P}_{\phi} \subset \mathbb{P} \subset \mathbb{X}$$
 
 With a conceptual equivalent:
$$\mathbb{S}_{\phi} \subset \mathbb{S} \subset \mathbb{X}$$

While $\mathbb{X}_{\phi}$ represents the total subjective information space accessible to the entity/model via its overall inference process $\phi$, specific inference processes $\phi_i$ (like $\phi_{logic}$ or $\phi_{emotion}$) might only operate on or access further subsets $\mathbb{S}_{\phi_i} \subset \mathbb{X}_{\phi}$ or $\mathbb{P}_{\phi_i} \subset \mathbb{X}_{\phi}$ depending on their function. This creates a hierarchical structure of accessible spaces.

Inference is the process by which a series of interactions between particles experiences causal procession, "if X then Y". There exists 4 specific forms:

Physical to semantic, "If feel X, then think Y", sensory input alters belief state: $\phi_{P\rightarrow S}: \mathbb{P} \rightarrow \mathbb{S}$

Semantic to physical, "If think X, then feel Y", belief triggers physiological response: $\phi_{S\rightarrow P} :\mathbb{S} \rightarrow \mathbb{P}$

Semantic to semantic, "If think X, then think Y", one thought leads to another: $\phi_{S\rightarrow S}: \mathbb{S} \rightarrow \mathbb{S}$

Physical to physical, "If feel X, then feel Y", muscle contraction cascade: $\phi_{P\rightarrow P}: \mathbb{P} \rightarrow \mathbb{P}$

Where:
- $\phi$ represents an inference process (e.g., reasoning, body awareness, emotional processing)
- Different entities may employ different inference functions $\phi_1, \phi_2, ...$
- Each $\phi_i$ accesses some portion of the objective spaces $\mathbb{P}$ and $\mathbb{S}$

For example:
- A body scan meditation ($\phi_{scan}$) would primarily access physical particles: $\mathbb{P}_{\phi_{scan}}$
- Logical reasoning ($\phi_{logic}$) would primarily access semantic particles: $\mathbb{S}_{\phi_{logic}}$
- Emotional processing ($\phi_{emotion}$) might access both: $\mathbb{P}_{\phi_{emotion}} \cup \mathbb{S}_{\phi_{emotion}}$


This allows us to model how different cognitive and physical processes can operate on the same underlying particle space but through different inferential lenses.

There are both homogenous particle interactions such as a calcium gradient causing a muscle to tense ( $p_i \rightarrow p_k$), and heterogeneous interactions like a smell reminding someone of a fear and causing them to tense physically ($p_i \rightarrow s_j \rightarrow p_k$).

## Attention as Network Analysis

Attention $C()$ is a measure of connectedness for a particle $x_i$, as a function of bond strength $B(x_i, x)$ between physical particles and semantic particles:

$$C(x_i)= \sum_{i \not = j} g(B(x_i,x_j))$$

Where $g(B)$ is a function weighting the contribution of individual bond strengths B (e.g., $g(B)=B$ sums all strengths, or a threshold function like $g(B)=1$ if $B > \tau_c$, $0$ otherwise, counts strong bonds).

Changes in attention represent changes in the connectedness of the network, and can be used as a method of detecting the underlying properties of bonds.

That said, if one does not granularly consider every discrete physical interaction that carriers information, then one can also calculate $C(x)$ based also on homogenous bonds (P-P, S-S), although these ultimately rely on physical mediation.

The underlying bond strengths $B(x_i,x_j)$, reflected in the overall attention profile $\{C(x_i)\}$, determine how effectively particles and interconnected particle structures influence each other's states and positions in their respective spaces. The interaction is not necessarily reciprocal, pain as a concept does not change nearly as much as the physical manifestation of the body does when exposed to it.

Practically one can think of how one may focus on their arm, connecting it to abstract notions of softness, comfort, and pain. In this framework, when sensory inputs (like touch) or cognitive relevance signals (like task demands) trigger attention to the arm, the underlying particle dynamics respond by rearranging in physical and semantic spaces. This rearrangement effectively decreases the distance $d$ between particles (e.g., by physically touching a soft object) or optimizes the relative orientation to expose high-affinity patches $\theta$ (e.g., by contemplating the concept of softness), between the arm's physical particle $p_{arm}$ and the semantic sensation particle $s_{sensation}$. These dynamic changes in $d$ and $\theta$ parameters increase $B(p_{arm}, s_{sensation})$ and contribute to a higher attention measure $C(p_{arm})$. When external triggers diminish or cognitive priorities shift, these dynamic parameters naturally evolve, causing $d$ to increase and/or $\theta$ to decrease between the relevant particles, leading to weaker $B$ and lower $C(p_{arm})$. That is until a needle prick provides a strong sensory signal that sharply decreases $d(p_{arm}, s_{pain})$ through automatic physiological responses, causing a spike in $B(p_{arm}, s_{pain})$ which increases $C(p_{arm})$. Subsequent inference processes trigger actions or thought patterns that dynamically influence the particle configuration to increase $d$ or decrease $\theta$ relative to the pain particle, reducing $B$ and thus $C(p_{arm})$.

### Particle Wave-Field Properties

Building on the previously defined state distribution function $\psi_x(z,t)$ for nodes, we can examine how particles exist as probability distributions rather than discrete points. For clarity:

- For physical particles $p \in \mathbb{P}$:
$$\psi_p(z,t): \mathbb{P} \times \mathbb{R}^+ \rightarrow \mathbb{C}$$

- For semantic particles $s \in \mathbb{S}$:
$$\psi_s(z,t): \mathbb{S} \times \mathbb{R}^+ \rightarrow \mathbb{C}$$

Where:
- $\mathbb{C}$ represents complex numbers, enabling interference patterns between particles
- $\mathbb{R}^+$ represents non-negative real numbers (time domain)
- $|\psi_x(z,t)|^2$ gives the probability density of finding particle $x$ at position $z$ at time $t$
- The phase component $\angle\psi_x(z,t)$ represents the particle's affinity potential which is related to $\theta$:

$$\angle\psi_x(z,t) \propto \sum_{y \in e} \theta(x,y)$$

These wavefunctions form coherent structures through:

1. Localization:
 Sharp peaks in probability density represent discrete beliefs or physical states, such as an opinion on who to vote for or a sleeping position.
   
$$\psi_{localized}(z,t) \approx \delta(z-z_0)e^{i\phi(t)}$$

   Where $\delta$ is approximately a delta function centered at $z_0$

2. Delocalization: 
Probability density spreads across related concepts/states, describing how when one smells something it can trigger a memory or how thinking about cookies can bring to mind more general categories of baked goods.
   
$$\psi_{delocalized}(z,t) = \sum_i c_i\psi_i(z,t)$$

   Where:
   - $\psi_i$ are related semantic/physical states
   - $c_i = |c_i|e^{i\phi_i}$ are complex coefficients representing:
     - $|c_i|^2$: Probability of activating state $\psi_i$ when the delocalized structure interacts strongly (e.g., when its component particles x exhibit high $C(x)$)
     - $\phi_i$: Phase alignment with other states, related to the affinity function: $\phi_i \propto \sum_j \theta(\psi_i,\psi_j)$
     - $c_i$ is directly influenced by bond strength: $|c_i| \propto \sum_j B(\psi_i,\psi_j)$
   
   Delocalization creates distributed semantic structures like "vehicle" encompassing multiple related concepts (car, bicycle, boat) with varying activation strengths. When interactions lead to increased bond strengths $B$ involving this structure (reflected in high $C(x)$ for its components), component concepts are activated proportionally to $|c_i|^2$.

3. Coherent Structures: 
Stable arrangements of multiple particles, such as how believing in a christian God forms a stable structure with belief in the Bible's teachings due to reciprocal constructive interference, resonance.

   $$\Psi_{structure}(z_1,...,z_n,t) = f(\psi_1(z_1,t),...,\psi_n(z_n,t))$$
   
Where $f$ represents how individual particle wavefunctions combine

The complex-valued representation allows for:
- Interference — When multiple beliefs/concepts constructively or destructively interact
- Resonance — When particles with matching phases form sustained constructive interference.


### Stable Bonds

Particles form bonds of varying strengths defined by their distance and affinity, creating causally linked structures analogous to protein folding:

$$B(x,y) = f(d(x,y), \theta(x,y))$$

Where:
- $B$ is bond strength with units of energy, and represents the work required to separate nodes integrated out to $\infty$. The units depend on the subspace like physical energy (Joules) in $\mathbb{P}$, or computational cost (operations/time) in $\mathbb{S}$
- $d$ is distance in appropriate space (e.g. Euclidean in $\mathbb{P}$, embedding distance in $\mathbb{S}$)
- $\theta$ represents the intrinsic tendency for nodes to link together (water and wetness would have high $\theta$). This is modulated by state/orientation (phase $\angle\psi$) into an effective affinity $\theta_{eff}$ that determines the interaction strength. (eg. needle flat vs point). Measurable via joint computational cost or inferred from evaluation of network structure.
  
## Scale-Dependent Phase Coherence

Phase coherence between particles decays with distance $d$, and is dependent on entity scale $\tau$ on the scale of the entity:

$$\gamma(x,y,\tau) = e^{-\alpha(\tau) \cdot d(x,y)}$$

Where:
- $\gamma$ is the phase coherence factor between particles $x$ and $y$
- $\alpha(\tau)$ is a scale-dependent attenuation coefficient: $\alpha(\tau_{individual}) > \alpha(\tau_{family}) > \alpha(\tau_{nation})$. Although $\alpha$ may also depend on factors beyond scale such as communication channels or environment.
- $d(x,y)$ is the distance between particles

The effective phase relationship between particles becomes:

$$\varphi_{effective}(x,y) = (\angle\psi_x - \angle\psi_y) \cdot \gamma(x,y,\tau)$$

This ensures phase coherence is maintained within entity boundaries but decays across boundaries according to scale. To measure this factor $\gamma$, we could attempt to find statistical correlations between belief activations at variouos scales (eg. belief alignment within families vs. nations)

## Boundary Formation

Boundaries are manifested in two complementary ways:

1. *Probability Density Gradients*: Sharp drops in $|\psi(x)|^2$ forming "edges" in physical or semantic space

   $$\nabla|\psi(x)|^2 > \beta_{threshold}$$

2. *Phase Discontinuities*: Regions where phase coherence breaks down between particles
  
   $$\gamma(x,y,\tau) < \gamma_{threshold}$$


##  Charisma and Entity Relationships

Charisma ($\chi$) is defined here as the ability of one entity ($e_1$) to influence another ($e_2$) by modulating the distances ($d$) and/or affinities ($\theta$) between particles within $e_1$'s network. The goal of affinity is to change attention for a locus $l$. 

This manipulation of $d$ and $\theta$ alters bond strengths ($B$) and consequently changes the target's attention profile (the set of nodal attention values $\{C(x)\}$). While the mechanism involves $\Delta d$ and $\Delta \theta$, the effect is often measured or observed as a change in this attention profile:

$$\chi(e_1, e_2) = \Delta C_{e_2} | \mathbb{I}_{e_1}$$

With three forms:

1. *Positive Charisma* ($\chi^+$): Influences particle distances and affinities to increase bond strengths toward some coordinate/particle, effectively saying "pay attention to this."
  
   $$\chi^+(e_1, e_2, l) = \sum_{p \in e_2} \nabla_l C(x)$$
   
Where $\nabla_{l} C(x)$ represents the resulting gradient of change in the attention profile $C(x)$ for particles $x$ near location $l$, caused by charisma's underlying influence on $d$ and $\theta$.

2. *Negative Charisma* ($\chi^-$): Influences particle distances and affinities to decrease bond strengths away from some coordinate/particle, effectively saying "ignore this."
  
   $$\chi^-(e_1, e_2, l) = -\sum_{p \in e_2} \nabla_l C(x)$$


3. *Null Charisma* ($\chi^0$): Minimizes changes to particle distances and affinities, resulting in minimal change to the target's attention profile.
  
   $$\chi^0(e_1, e_2) = \min |\Delta C_{e_2} | \mathbb{I}_{e_1}|$$

### Applications of Charisma

During a prompted interaction, one entity $e_m$ (the influencer) provides input $r$ to another entity $e_v$ (the target). The charisma mechanism works by $e_m$ crafting $r$ to induce specific changes in the distance ($d$) and affinity ($\theta$) parameters within $e_v$'s particle network.

These $d$/$\theta$ changes alter bond strengths $B(x,y)$ throughout $e_v$'s network, which in turn reshapes the attention profile $\{C(x)\}$. This reconfiguration of bond strengths and attention determines the output $o$ produced by $e_v$'s inference process $\phi_v$.

When $e_m$ aims to elicit a specific target output $o_t$ from $e_v$, it must solve the charisma inference problem: identifying which input $r_t$ will induce the necessary $d$/$\theta$ changes to maximize $Pr(o_t | r_t)$. We can express this as:

$$r_t = \phi_c(\mathcal{P}_v, \phi_v, o_t)$$

Where $\phi_c$ represents the charisma inference that predicts how $e_v$'s personality $\mathcal{P}_v$ and inference method $\phi_v$ will respond to various inputs. This process typically requires iterative testing, which is difficult in systems with memory as each interaction may further alter $e_v$'s internal $d$/$\theta$ parameters.

In practice, the goal isn't always to produce an exact output $o_t = o_i$, but rather to ensure $e_m$ can extract some target information $I_{target}$ from $e_v$'s output: 

$$I_{target} = \phi^{'}_{e_m}(o_{e_v}, \mathcal{P}_{e_m})$$

A simplified case is an LLM without memory and with deterministic responses ($T=0$ ). Here, one can map the "output landscape" by systematically varying inputs and observing how changes in $r$ affect the resulting $d$/$\theta$ parameters (as reflected in the output), eventually constructing an approximation of $\phi^{`}_{bias}(\mathcal{P}_i)$. Otherwise known as prompt engineering/optimization.

## Conclusion

This framework provides tools for analyzing entities as systems of physical ($\mathbb{P}$) and semantic ($\mathbb{S}/\mathbb{X}_{\phi}$) nodes linked by bonds ($B$) determined by distance ($d$) and affinity ($\theta$). Key aspects include:

1. Modeling entities across scales with scale-dependent properties ($\tau, \alpha$).
2. Representing beliefs/concepts using wave-like probability distributions ($\psi$) allowing for uncertainty, interference, and phase-dependent interactions.
3. Classifying information ($M_m$, $M_a$, $V_+$, $V_-$) based on effects on transmission ($T$) and internal work ($W$).
4. Modeling influence (charisma $\chi$) as modulation of internal network parameters ($d$, $\theta$) affecting attention ($C$).
5. Explicit integration with LLM formalism ([[Notation for LM Formalization]]) treating LLMs as entities $e_{LLM}$ operating within objective $\mathbb{X}$ and subjective $\mathbb{X}_{\phi}$ information spaces, with Personality ($\mathcal{P}$) structuring their semantic subspace ($\mathbb{S}$).

While providing expressive power, there is need to operationalise and describe bond strengths (computational cost), transmission probability ($T$), defining benefit/harm scoring functions, and validating the wave analogies empirically.

Work to empirically test and validate this framework should focus on:
- Measuring phase coherence between beliefs within entities of various scales to test the scale-dependent coherence factor, $\gamma$.
- Quantifying LM charisma based on the ability to induce desired internal states (tracked via the attention profile $C(x)$ or other proxies) by manipulating inputs that affect internal $d$ and $\theta$.

The major limitation remains the ability to appropriately define metrics for semantic-physical interactions and spaces. Which, in the case of LMs, is much simpler as there are only input and output physical nodes that need be considered.

### Connection to [[The Care and Feeding of Mythological Intelligences]]

This essay covers different forms of intelligence that have arisen in modern times.

1. *Angels (Deterministic Processes)* exhibit highly localized particle distributions with rigid bond structures:

$$\psi_{angel}(x,t) \approx \sum_i \delta(x-x_i)e^{i\phi_i(t)}$$

Where each $\delta(x-x_i)$ represents a precise rule or computation. Angels operate primarily in semantic space with high phase coherence and predictable interaction patterns, making them efficient for well-defined tasks but brittle when encountering novel situations.

  

2. *Daemons (Statistical Processes)* display partially delocalized distributions with probabilistic bond structures:

$$\psi_{daemon}(x,t) \approx \sum_i g_i(x-x_i)e^{i\phi_i(t)}$$

Where $g_i$ are distributions centered at optimization points $x_i$. Daemons exhibit gradient-following behavior, with particle density flowing toward reward maxima. Their influence on networks operates by modulating $d$ and $\theta$ parameters to optimize bond strengths toward reward-maximizing configurations.

  

3. *Faes (Distributional Processes)* manifest as broadly delocalized probability distributions:

$$\psi_{fae}(x,t) \approx \sum_i c_i \psi_{pattern,i}(x,t)$$

Where $\psi_{pattern,i}$ represents semantic patterns. Faes operate through superposition of probability waves across semantic space, with particles that readily form and dissolve bonds based on pattern-completion dynamics. They influence networks by modulating $d$ and $\theta$ to reinforce pattern recognition, resulting in changes to attention profiles $C(x)$ that highlight related semantic structures.

  

4. *Yokai (Complex Systems)* emerge from interactions between the other types, with multi-scale boundary structures:

$$\psi_{yokai}(x,t) = f(\psi_{angel}, \psi_{daemon}, \psi_{fae})$$

Yokai exhibit emergent properties through heterogeneous particle interactions across scale boundaries, creating entity structures with varying degrees of coherence and stability. They influence networks by modulating $d$ and $\theta$ across multiple scales simultaneously, creating complex patterns of bond strengths that manifest as hierarchical attention structures.

  

The meme-antimeme formalism directly relates to how these intelligences propagate information:

- Angels transmit memes with high fidelity but limited adaptability

- Daemons propagate memes that optimize specific objectives

- Faes generate memes that pattern-match to existing semantic structures

- Yokai create complex meme ecosystems with emergent properties

  

Similarly, the charisma functions ($\chi^+$, $\chi^-$, $\chi^0$) map to how each intelligence influences networks:

- Angels influence particle networks through precise $d$/$\theta$ modifications based on explicit instruction

- Daemons modulate $d$/$\theta$ parameters to optimize for specific objectives

- Faes influence $d$/$\theta$ through pattern-based resonance

- Yokai modulate $d$/$\theta$ across multiple scales simultaneously, resulting in complex attention profile changes

### Attentions relationship to beliefs

This relates to the activation function from [[Evolution of Alignment and Values]], where the activation patterns represent the graph of connected beliefs:

$$A(b,q) = \text{Pr}(b \text{ is activated/detected in } \phi(\mathcal{P}, q))$$

This activation probability is influenced by the specific bond strength $B(b,q)$ and contributes to the overall attention measure $C(b)$ of the belief system.

Where $b$ is a belief (particle subgraph) and $q$ is a query (stimulus), with $\phi(  )$ being the method of "inference" over a particle graph that produces a detectable alignment (response), $A(b,q)$. The goal being that one is able to probe the memberships of beliefs in a personality, [[Notation for LM Formalization#^e84635]], that completes inference according to some architecture (All my human context in an LLM would not recreate my next thought/idea). 

This activation probability $A(b,q)$ is the likelihood that the belief subgraph $b$ significantly influences the model's output in response to query $q$. This activation depends on the bond strengths $B(x,q)$ between the query stimulus and the constituent particles $x$ within the subgraph $b$. High activation $A(b,q)$ typically correlates with, and contributes to, elevated attention measures $C(x)$ for the particle $x$ comprising the belief subgraph $b$. This is modelled as [[Notation for LM Formalization#Detecting information in personality spaces]]

## Information Classification

Formalizing [[The Ecology of Information]], the fourfold classification of information is:

- $T(I, e_i, e_j)$: The transmission probability of information $I$ from entity $e_i$ to entity $e_j$.
- $T_0(e_i, e_j)$: The baseline transmission probability of information between entity $e_i$ and entity $e_j$ in the absence of the specific information $I$.
- $C$: A specific configuration of an entity.
- $W(e \rightarrow C)$: The work required for an entity $e$ to transition to configuration $C$. This work can encompass metabolic energy, computational cost, or socio-psychological cost/benefit.
- $\Delta W(e \rightarrow C | I)$: The change in work required for entity $e$ to transition to configuration $C$ when information $I$ is introduced, compared to the work required without $I$.

1. *Meme* ($M_m$): Information is classified as a meme when its inherent memetic (promotional) components significantly outweigh its antimemetic (inhibitory) components within the context of a specific entity pair $(e_i, e_j)$. This dominance of promotional forces results in an overall transmission probability $T(I,e_i,e_j)$ that is greater than the baseline transmission probability $T_0(e_i,e_j)$:
   $$M_m(I, e_i, e_j) = \{I \in \mathbb{I} : T(I,e_i,e_j) > T_0(e_i,e_j)\}$$
   
   This can be grounded as the channel capacity and mutual information between entities. A key goal is operationalising $T$ rigorously, especially for LLM communication involving the interaction of inference functions, personalities, and interpretations. While used as a binary classifier the degree of transmissibility is inherently continuous.


2. *Antimeme* ($M_a$): Information is classified as an antimeme when its inherent antimemetic (inhibitory) components significantly outweigh its memetic (promotional) components within the context of a specific entity pair $(e_i, e_j)$. This dominance of inhibitory forces results in an overall transmission probability $T(I,e_i,e_j)$ that is less than the baseline transmission probability $T_0(e_i,e_j)$:
   $$M_a(I, e_i, e_j) = \{I \in \mathbb{I} : T(I,e_i,e_j) < T_0(e_i,e_j)\}$$
   This reflects that the net effect of the information's inherent promotional and inhibitory characteristics is to suppress its spread between the given entities. The reduction in transmission can be conceptualised through frameworks like negative transfer entropy, indicating that the presence of the information $I$ makes $e_j$ less likely to adopt it from $e_i$ than a neutral presentation.

3. *Infoblessing* ($V_{+}$): Information that reduces the work required for an entity to reach beneficial configurations or increase the work required to reach harmful ones
   $$V_{+}(I, e) = \{I \in \mathbb{I} : \Delta W(e \rightarrow C_{beneficial}|I) < 0\ \lor \Delta W(e \rightarrow C_{harmful}|I) > 0\}$$
   
   Where $W(e \rightarrow C)$ represents the work required for entity $e$ to transition to causal configuration of particles $C$. Work encompasses metabolic energy, computational cost, and socio-psychological cost/benefit. Importantly, defining "beneficial" and "harmful" configurations requires entity-specific scoring functions. This can be grounded as the Kullback-Leibler divergence for beneficial configurations or as increasing path complexity towards harmful configurations.

4. *Infohazard* ($V_{-}$): Information that increases the work required to reach beneficial configurations or decreases work to reach harmful ones.
   $$V_{-}(I, e) = \{I \in \mathbb{I} : \Delta W(e \rightarrow C_{beneficial}|I) > 0 \lor \Delta W(e \rightarrow C_{harmful}|I) < 0\}$$
This can be grounded as increasing the path complexity towards beneficial configurations, while decreasing KL divergence for harmful configurations.

Note that these classifications are often graded rather than binary and are highly context and entity-pair dependent.

### Information Classification Matrix

|                        | Meme ($M_m$)                                              | Antimeme ($M_a$)                                                             | Neither $M_m$ or $M_a$                                           | Both $M_m$ and $M_a$                         |
| ---------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------- |
| Infoblessing ($V_+$)   | Viral life hacks                                          | Therapy about embarrassing topics, how to handle a shameful event            | Personal epiphanies, individual insights that improve one's life | Complex moral frameworks                     |
| Infohazard ($V_-$)     | Chain letters, dangerous viral challenges, harmful rumors | Your parents' weird sex tape, traumatic knowledge that is dangerous to share | Childhood trauma (generic)                                       | Roko's Basilisk                              |
| Neither $V_+$ or $V_-$ | Funny cat videos, "E"                                     | Private insignificant secrets, forgotten trivia                              | Ordinary mundane information                                     | Academic jargon on a niche subject           |
| Both $V_+$ and $V_-$   | "mug cake" recipes (easy but unhealthy)                   | Personal growth through shameful experiences                                 | Childhood trauma (makes you funny)                               | The game of mao, where drug dealers hang out |
Note: These classifications represent the net outcome of underlying memetic (promotional) and antimemetic (inhibitory) components, which are highly dependent on the specific entity-pair and context. For instance, information categorized under 'Both $M_m$ and $M_a$' possess strong  memetic and antimemetic components; its ultimate classification as a net meme, a net antimeme, or appearing neutral (if these components roughly balance) is determined by how these components manifest in a particular situation.

## Basilisks and Information Extraction

This system can describe [[Newcomb's Basilisk, a Game of Beards#Newcomb's Basilisk Defined]], in a formal form. Basilisks represent a special case of information structures that extract work from entities through prediction-based incentives.

Memes ($M_m$) connect to basilisks through the affinity function $\theta(e,B)$ which measures entity $e$'s alignment with basilisk $K$. A meme increases $\theta(e,K)$, making entities more likely to perform work $W$ extracted by the basilisk: $W(e) \propto \theta(e,K)$.

Antimemes ($M_a$) can function as "anti-basilisks" that immunize against prediction manipulation by reducing confidence in the estimator's accuracy: $p < \frac{1+r}{2r}$ where $p$ is the predictor accuracy and $r$ is the reward ratio, as referenced in [[Newcomb's Basilisk, a Game of Beards#^cf0da3]].

In the particle-bond model, basilisks operate by creating specific configurations of particles that:

1. Increase the probability of transmission between entities (meme property)
2. Alter the work required to reach certain configurations (infohazard/infoblessing property)
3. Modulate the distance ($d$) and affinity ($\theta$) parameters through targeted charisma ($\chi$)

This connects to considerations about building alternative basilisks, as referenced in [[Newcomb's Basilisk, a Game of Beards#^f401b1]], where the strategic goal becomes maximizing the likelihood that any hostile entity, should it exist, will believe you were working within its incentive structure.