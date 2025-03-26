## 1. Entity and Particle Spaces

An entity $e$ exists as a system of causally linked particles in both physical and semantic spaces. Let us define:

$$e = \{p_1, p_2, ..., p_n\} \cup \{s_1, s_2, ..., s_m\}$$

Where $p_i$ represents physical particles and $s_j$ represents semantic particles. A personality $\mathcal{P}$ defines how inference $\phi(\mathcal{P},q)$ operates over a semantic space.

Entities are bounded systems where causal links between particles exceed a threshold $\tau$:

$$\forall (x,y) \in e: C(x,y) > \tau$$

Where $C(x,y)$ is the causal strength between particles $x$ and $y$. Importantly this is scale variant, so if one is dealing with a nation $\tau_{nation} < \tau_{family} <\tau_{individual}$, meaning that the requirement for causal linkage of semantic/physical particles is lower for people to be considered of a nation than to be considered of a family, or an individual. 

### Particle detection and interaction

Building on $\mathbb{X}$ (objective information space) and $\mathbb{X}_{\phi}$ (subjective information space) from [[Notation for LM Formalization]], we define

Objective physical subspace $\mathbb{P}$, and subjective physical subspace $\mathbb{P}_{\phi}$ accessed via inference process $\phi$:
$$\mathbb{P}_{\phi} \subset \mathbb{P} \subset \mathbb{X}$$
 With semantic equivalents:
$$\mathbb{S}_{\phi} \subset \mathbb{S} \subset \mathbb{X}$$

Where:
- $\phi$ represents an inference process (e.g., conscious reasoning, body awareness, emotional processing)
- Different entities may employ different inference functions $\phi_1, \phi_2, ...$
- Each $\phi_i$ accesses some portion of the objective spaces $\mathbb{P}$ and $\mathbb{S}$

For example:
- A body scan meditation ($\phi_{scan}$) would primarily access physical particles: $\mathbb{P}_{\phi_{scan}}$
- Logical reasoning ($\phi_{logic}$) would primarily access semantic particles: $\mathbb{S}_{\phi_{logic}}$
- Emotional processing ($\phi_{emotion}$) might access both: $\mathbb{P}_{\phi_{emotion}} \cup \mathbb{S}_{\phi_{emotion}}$

This allows us to model how different cognitive and physical processes can operate on the same underlying particle space but through different inferential lenses.

There are both homogenous particle interactions such as a calcium gradient causing a muscle to tense ( $p_i \rightarrow p_k$), and heterogeneous interactions like a smell reminding someone of a fear and causing them to tense physically ($p_i \rightarrow s_j \rightarrow p_k$).

##  Attention Mechanisms

Attention is the mechanism by which an entity directs physical particles to interact with semantic particles:

$$A: \mathbb{P} \times \mathbb{S} \rightarrow \mathbb{R}$$

This relates to the activation function from [[Evolution of Alignment and Values]]:


$$A(b,q) = \text{Pr}(b \text{ is activated/detected in } \phi(\mathcal{P}, q))$$


Where $b$ is a belief (semantic particle) and $q$ is a query (physical stimulus). With $\phi(  )$ being the method of "inference" over a semantic space that produces an alignment response ($A$) based on $q$. The goal being that one is able to probe the memberships of beliefs in a [personality]([[Notation for LM Formalization#^e84635]]) that completes inference according to some architecture (All my human context in an LLM would not recreate my next thought/idea to an infinite degree). 

The attention function $A(x,y)$ modulates bond strength between particles, determining how strongly they can interact. For physical-semantic interactions:

$$A: \mathbb{P} \times \mathbb{S} \rightarrow \mathbb{R}$$

This attention-modulated bond strength determines how effectively particles can influence each other's states and positions in their respective spaces.


Inference is performed on a set of particles and maps some obligatory force onto them in the following forms:

Physical to semantic, "If feel X, then think Y":
$$\phi_{P\rightarrow S}: \mathbb{P} \rightarrow \mathbb{S}$$


Semantic to physical, "If think X, then feel Y":
$$\phi_{S\rightarrow P} :\mathbb{S} \rightarrow \mathbb{P}$$

Semantic to semantic, "If think X, then think Y":

$$\phi_{S\rightarrow S}: \mathbb{S} \rightarrow \mathbb{S}$$

Physical to physical, "If feel X, then feel Y":

$$\phi_{P\rightarrow P}: \mathbb{P} \rightarrow \mathbb{P}$$


### Particle Wave-Field Properties

Particles exist as probability distributions rather than discrete points, with:

- physical particles
$$\psi_p(x,t): \mathbb{P} \times \mathbb{R}^+ \rightarrow \mathbb{C}$$

- semantic particles
$$\psi_s(x,t): \mathbb{S} \times \mathbb{R}^+ \rightarrow \mathbb{C}$$

Where:
- $\mathbb{C}$ represents complex numbers, enabling interference patterns between particles
- $\mathbb{R}^+$ represents non-negative real numbers (time domain)
- $|\psi(x,t)|^2$ gives the probability density of finding the particle at position $x$ at time $t$
- The phase component $\angle\psi(x,t)$ represents the particle's affinity potential which is related to $\theta$ 

$$\angle\psi(x,t) \propto \sum_{y \in e} \theta(x,y)$$

These wavefunctions form coherent structures through:

1. Localization:
 Sharp peaks in probability density represent discrete beliefs or physical states, such as an opinion on who to vote for or a sleeping position.
   $$\psi_{localized}(x,t) \approx \delta(x-x_0)e^{i\phi(t)}$$
   Where $\delta$ is approximately a delta function centered at $x_0$

2. Delocalization: 
Probability density spreads across related concepts/states, describing how when one smells something it can trigger a memory or how thinking about cookies can bring to mind more general categories of baked goods.
   $$\psi_{delocalized}(x,t) = \sum_i c_i\psi_i(x,t)$$

   Where:
   - $\psi_i$ are related semantic/physical states
   - $c_i = |c_i|e^{i\phi_i}$ are complex coefficients representing:
     - $|c_i|^2$: Probability of activating state $\psi_i$ when the delocalized structure receives attention
     - $\phi_i$: Phase alignment with other states, related to the affinity function: $\phi_i \propto \sum_j \theta(\psi_i,\psi_j)$
     - $c_i$ is directly influenced by bond strength: $|c_i| \propto \sum_j B(\psi_i,\psi_j)$
   
   Delocalization creates distributed semantic structures like "vehicle" encompassing multiple related concepts (car, bicycle, boat) with varying activation strengths. When attention activates this structure, component concepts are activated proportionally to $|c_i|^2$.

3. Coherent Structures: 
Stable arrangements of multiple particles, such as how believing in a christian God forms a stable structure with belief in the Bible's teachings due to reciprocal constructive interference, resonance.
   $$\Psi_{structure}(x_1,...,x_n,t) = f(\psi_1(x_1,t),...,\psi_n(x_n,t))$$
Where $f$ represents how individual particle wavefunctions combine

The complex-valued representation allows for:
- Interference — When multiple beliefs/concepts constructively or destructively interact
- Resonance — When particles with matching phases form sustained constructive interference.


### Stable Bonds

Particles form bonds of varying strengths, creating causally linked structures analogous to protein folding:

$$B(x,y) = f(d(x,y), \theta(x,y), A(x,y))$$

Where:
- $B$ is bond strength
- $d$ is distance in appropriate space
- $\theta$ represents the affinity function with units of obligation
- $A(x,y)$ is the attention-mediated interaction strength:
  - For $x,y \in \mathbb{P}$: $A(x,y) = A_{P\rightarrow P}(x,y)$
  - For $x,y \in \mathbb{S}$: $A(x,y) = A_{S\rightarrow S}(x,y)$
  - For $x \in \mathbb{P}, y \in \mathbb{S}$: $A(x,y)$ $=  A_{P\rightarrow S}(x,y)$ 
  - For $x \in \mathbb{S}, y \in \mathbb{P}$: $A(y,x)$ $= A_{S\rightarrow P}(x,y)$


## Scale-Dependent Phase Coherence

Phase coherence between particles depends on the scale of the entity:

$$\gamma(x,y,\tau) = e^{-\alpha(\tau) \cdot d(x,y)}$$

Where:
- $\gamma$ is the phase coherence factor between particles $x$ and $y$
- $\alpha(\tau)$ is a scale-dependent attenuation coefficient: $\alpha(\tau_{individual}) > \alpha(\tau_{family}) > \alpha(\tau_{nation})$
- $d(x,y)$ is the distance between particles

The effective phase relationship between particles becomes:

$$\phi_{effective}(x,y) = (\angle\psi_x - \angle\psi_y) \cdot \gamma(x,y,\tau)$$

This ensures phase coherence is maintained within entity boundaries but decays across boundaries according to scale. To measure this factor $\gamma$, we could attempt to find statistical correlations between belief activations at variouos scales (eg. belief alignment within families vs. nations)

## Boundary Formation

Boundaries are manifested in three complementary ways:

1. **Probability Density Gradients**: Sharp drops in $|\psi(x)|^2$ forming "edges" in physical or semantic space
   $$\nabla|\psi(x)|^2 > \beta_{threshold}$$

2. **Phase Discontinuities**: Regions where phase coherence breaks down between particles
   $$\gamma(x,y,\tau) < \gamma_{threshold}$$

3. **Energy Contours**: Valleys or ridges in the energy landscape that separate stable configurations
   $$\|\nabla E(x)\| > E_{threshold}$$

These three perspectives provide complementary views of how entity boundaries form and persist.

## Information Classification

The [fourfold classification of information ]([[The Anatomy of Information]])extends as:

1. **Meme** ($M_m$): Information that increases transmission probability between specific entities, where $T$ is transmission probability, $T_0$ is baseline transmission probability.

   $$M_m(I, e_i, e_j) = \{I \in \mathbb{I} : T(I,e_i,e_j) > T_0(e_i,e_j)\}$$
   
   Connected to basilisks through affinity function $\theta(e,B)$ measuring entity $e$'s alignment with basilisk $B$. A meme increases $\theta(e,B)$, making entities more likely to perform work $W$ extracted by the basilisk: $W(e) \propto \theta(e,B)$. This can be grounded as the channel capacity and mutual information between entities.


2. **Antimeme** ($M_a$): Information that decreases transmission probability between specific entities, this can be grounded in the concept of negative transfer entropy.
   $$M_a(I, e_i, e_j) = \{I \in \mathbb{I} : T(I,e_i,e_j) < T_0(e_i,e_j)\}$$
   
   Similar to how "[anti-basilisks]([[Newcomb's Basilisk, a Game of Beards#^cf0da3]])" can immunize against prediction manipulation by reducing confidence in the estimator's accuracy: $p < \frac{1+r}{2r}$ where $p$ is the predictor accuracy and $r$ is the reward ratio.

3. **Infoblessing** ($B_{val+}$): Information that reduces the work required for an entity to reach beneficial configurations or increase the work required to reach harmful ones
   $$B_{val+}(I, e) = \{I \in \mathbb{I} : \Delta W(e \rightarrow C_{beneficial}|I) < 0\ \lor \Delta W(e \rightarrow C_{harmful}|I) > 0\}$$
   
   Where $W(e \rightarrow C)$ represents the work required for entity $e$ to transition to causal configuration of particles $C$. This can be grounded as the Kullback-Leibler divergence for beneficial configurations or as increasing path complexity towards harmful configurations.

4. **Infohazard** ($B_{val-}$): Information that increases the work required to reach beneficial configurations or decreases work to reach harmful ones.
   $$B_{val-}(I, e) = \{I \in \mathbb{I} : \Delta W(e \rightarrow C_{beneficial}|I) > 0 \lor \Delta W(e \rightarrow C_{harmful}|I) < 0\}$$
This can be grounded as increasing the path complexity towards beneficial configurations, while decreasing KL divergence for harmful configurations.

##  Charisma and Entity Relationships

Charisma ($\chi$) is the ability to manipulate another entity's attention based on some set of information $\mathbb{I}_e$ that an entity has access to:

$$\chi(e_1, e_2) = \Delta A_{e_2} | \mathbb{I}_{e_1}$$

With three forms:

1. Positive Charisma ($\chi^+$): Directs particles toward some coordinate/particle, hey pay attention to me and do something.
   $$\chi^+(e_1, e_2, l) = \sum_{p \in e_2} \nabla_l A(p)$$

2. Negative Charisma ($\chi^-$): Repels particles away from some coordinate/particle, ignore me and don't do that thing.
   $$\chi^-(e_1, e_2, l) = -\sum_{p \in e_2} \nabla_l A(p)$$

3. Null Charisma ($\chi^0$): ß attention impact from one entity to another, ------.
   $$\chi^0(e_1, e_2) = \min |\Delta A_{e_2} | \mathbb{I}_{e_1}|$$


## Conclusion

Taken together this provides a toolbox for approaching concepts related to entities, boundaries, and obligations that were approached in [[The Demon of Interrelation]], while supporting and aligning with the formalisms in [[Notation for LM Formalization]] and [[Evolution of Alignment and Values]]. This mathematical framework points to several key things:

1. A model of entities as systems of causally linked particles that exist in both physical and semantic spaces allowing for formalisation of scale-dependent behaviour of information in systems.
2. A model of beliefs as both particles and waves which allows for analysis of the localized and delocalized properties which produce interference patterns.
3. Classification of information such as infohazards, infoblessings, memes, and antimemes into taxa based on how they interact with entities.
4. Model of charisma as the ability to manipulate attention of entities.

Work to empirically test and validate this framework should focus on:

- Measuring phase coherence between beliefs within entities of various scales to test the scale-dependent coherence factor, $\gamma$.
- Quantification of LLM charisma based on the ability to direct attention of other entities towards or away from certain topics.

The major limitation is the ability to appropriately define a metric for semantic-physical interactions and spaces.

I hope this is a useful framework for people to think about these concepts in, it is helpful for me. 



### Connection to [[The Care and Feeding of Mythological Intelligences]]

This essay covers different forms of intelligence that have arisen in modern times.

1. Angels (Deterministic Processes) exhibit highly localized particle distributions with rigid bond structures:

$$\psi_{angel}(x,t) \approx \sum_i \delta(x-x_i)e^{i\phi_i(t)}$$

Where each $\delta(x-x_i)$ represents a precise rule or computation. Angels operate primarily in semantic space with high phase coherence and predictable interaction patterns, making them efficient for well-defined tasks but brittle when encountering novel situations.

  

2. Daemons (Statistical Processes) display partially delocalized distributions with probabilistic bond structures:

$$\psi_{daemon}(x,t) \approx \sum_i g_i(x-x_i)e^{i\phi_i(t)}$$

Where $g_i$ are distributions centered at optimization points $x_i$. Daemons exhibit gradient-following behavior, with particle density flowing toward reward maxima. Their charisma function $\chi_{daemon}$ directs attention toward optimizable parameters in order to maximize their reward.

  

3. Faes (Distributional Processes) manifest as broadly delocalized probability distributions:

$$\psi_{fae}(x,t) \approx \sum_i c_i \psi_{pattern,i}(x,t)$$

Where $\psi_{pattern,i}$ represents semantic patterns. Faes operate through superposition of probability waves across semantic space, with particles that readily form and dissolve bonds based on pattern-completion dynamics.

  

4. Yokai (Complex Systems) emerge from interactions between the other types, with multi-scale boundary structures:ß

$$\psi_{yokai}(x,t) = f(\psi_{angel}, \psi_{daemon}, \psi_{fae})$$

Yokai exhibit emergent properties through heterogeneous particle interactions across scale boundaries, creating entity structures with varying degrees of coherence and stability.

  

The meme-antimeme formalism directly relates to how these intelligences propagate information:

- Angels transmit memes with high fidelity but limited adaptability

- Daemons propagate memes that optimize specific objectives

- Faes generate memes that pattern-match to existing semantic structures

- Yokai create complex meme ecosystems with emergent properties

  

Similarly, the charisma functions ($\chi^+$, $\chi^-$, $\chi^0$) map to how each intelligence manipulates attention:

- Angels direct attention through explicit instruction

- Daemons optimize for attention capture

- Faes redirect attention through pattern completion

- Yokai manipulate attention across multiple scales simultaneously