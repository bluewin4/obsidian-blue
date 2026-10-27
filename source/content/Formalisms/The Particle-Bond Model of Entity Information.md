---
title: The Particle-Bond Model of Entity Information
author: Jack Elsworth
section: Formalisms
content_type: research
date: 2025-03-26
lastmod: 2026-07-06
description: Entities modelled as branched-chain copolymers of physical and conceptual particles, with attention as network connectivity and identity boundaries as bond thresholds.
themes:
- formalism
- entities
- attention
- identity
- thermodynamics
ai_summary: A mathematical formalisation of entities as highly connected branched-chain copolymers whose monomers are physical and conceptual 'particles', folding and unfolding through configuration space. Defines entity boundaries by a scale-dependent bond-strength threshold, four kinds of inference between physical and semantic subspaces, attention as a measure of network connectedness, stable bonds and solvation free energy, scale-dependent phase coherence, and charisma as bond manipulation. Later sections apply the machinery to incorporation, continuity and replication frames, boundary maintenance as sorting, obligations, and a sacrifice condition that expresses when an entity will trade physical continuity for a more heavily weighted subgraph — recovering Durkheim's taxonomy of suicide from the solvation terms. Closes with proposed operational metrics for incorporation strength and replication success.
ai_keywords:
- particle-bond model
- entities
- attention
- solvation
- incorporation
- continuity
- sacrifice condition
- charisma
ai_concepts:
- name: Entity
  definition: A dynamic configuration of causally linked physical and conceptual particles whose pairwise bond strengths exceed a scale-dependent threshold.
- name: Attention
  definition: C(x), a measure of a particle's connectedness computed as a weighted sum of its bond strengths to all other particles.
- name: Solvation
  definition: The stabilisation of an entity's configuration by its surrounding field of other entities; desolvation lowers the barrier to dissociation.
semantic_structure: entity_spaces > particle_interaction > attention > wave_field > bonds > coherence > boundaries > charisma > information_classification > incorporation > obligations > sacrifice > operationalization
---
   This is a formalisation I am using to help clarify an intuition I have about the structure of agents, which I refer to as entities here. Each entity is represented as a structure similar to a highly connected branched chain copolymer, where physical and conceptual "particles" make up the monomeric units. Entities naturally compute due to their fluctuations in physical and conceptual space resulting in them folding and unfolding into different configurations. 

   ## Entity and Particle Spaces

   An entity $e$ exists as a dynamic configuration of causally linked nodes (particles), $x_i$ residing in a high-dimensional state space $\mathcal{E}$. This space aims to incorporate dimensions relevant to the entity's state, such as physical coordinates ($\mathbb{P} \subset \mathcal{E}$) and conceptual dimensions ($\mathbb{S} \subset \mathcal{E}$).

   $$
   e = \{p_1, p_2, ..., p_n\} \cup \{s_1, s_2, ..., s_m\}= \{x_1,...,x_{n+m}\} \subset \mathcal{E}
   $$

   Where $p_i$ represents physical particles and $s_j$ represents conceptual particles. 

   In a language model (LM), from [[Notation for LM Formalization]], the LM is an entity $e_{LM}$, and is described as follows:

   - The objective information space $\mathbb{X}$ is the underlying space of all information
   - The LM's subjective information space $\mathbb{X}_{\phi}$ (accessed by the LM's inference function "$\phi()$") corresponds to the primary conceptual subspace $\mathbb{S}$ for $e_{LM}$, (i.e. $\mathbb{S} \approx \mathbb{X}_{\phi} \subset \mathbb{X}$).
   - The LM's personality $\mathcal{P} = [M,S,I]$ represents a configuration of conceptual nodes within $\mathbb{S}/\mathbb{X}_{\phi}$. The personality space $\mathbb{\Phi} = \{ \phi(\mathcal{P}, r) \forall r \}$ is the mapping of $\mathcal{P}$ in this space for all possible inputs $r$.
   - The LM's physical substrate (hardware, computation, interface) constitute $\mathbb{P}_{LM}$, with a signalling particle that generates output $o_i$ when a receptor particle receives input $r_i$.

   The state of each node $x$ can be described probabilistically using a state distribution function $\psi_x(z,t)$, where $x\in\mathcal{E}$ represents a point in state space at time $t$. 

   $$
   \psi_x(z,t): \mathcal{E} \times \mathbb{R}^+ \rightarrow \mathbb{C} \quad (\text{or } \mathbb{R}^+)
   $$

   $|\psi_x(z,t)|^2$ can be thought of as the probability density associated with node $x$'s state being at location $z$ at time $t$. While the complex form, $\mathbb{C}$, is useful for handling interference phenomena, a real-valued probability distribution, $\mathbb{R}^+$, should be sufficient for many applications.

   Entities are bounded systems where causal links between particles exceed a threshold $\tau$:

   $$
   \forall (x_i,x_j) \in e: B(x_i,x_j) > \tau \tag{1.1}
   $$

   Where $B(x_i,x_j)$ is the causal (bond) strength between particles $x_i$ and $x_j$. Importantly this is scale variant, so if one is dealing with a nation $\tau_{nation} < \tau_{family} <\tau_{individual}$, meaning that the requirement for causal linkage of semantic/physical particles is lower for people to be considered of a nation than to be considered of a family, or an individual. 

   ### Particle detection and interaction

   Building on $\mathbb{X}$ (objective information space) and $\mathbb{X}_{\phi}$ (subjective information space) from [[Notation for LM Formalization]].

   Objective physical subspace $\mathbb{P}$, and subjective physical subspace $\mathbb{P}_{\phi}$ accessed via inference process $\phi$:
   $$
   \mathbb{P}_{\phi} \subset \mathbb{P} \subset \mathbb{X}
   $$
   
   With a conceptual equivalent:
   $$
   \mathbb{S}_{\phi} \subset \mathbb{S} \subset \mathbb{X}
   $$

   While $\mathbb{X}_{\phi}$ represents the total subjective information space accessible to the entity/model via its overall inference process $\phi$, specific inference processes $\phi_i$ (like $\phi_{logic}$ or $\phi_{emotion}$) might only operate on or access further subsets $\mathbb{S}_{\phi_i} \subset \mathbb{X}_{\phi}$ or $\mathbb{P}_{\phi_i} \subset \mathbb{X}_{\phi}$ depending on their function. This creates a hierarchical structure of accessible spaces.

   Inference is the process by which a series of interactions between particles experiences causal procession, "if X then Y". There exist 4 specific forms:

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

   There are both homogeneous particle interactions such as a calcium gradient causing a muscle to tense ( $p_i \rightarrow p_k$), and heterogeneous interactions like a smell reminding someone of a fear and causing them to tense physically ($p_i \rightarrow s_j \rightarrow p_k$).

   ## Attention as Network Analysis

   Attention $C()$ is a measure of connectedness for a particle $x_i$, as a function of bond strength $B(x_i, x)$ between physical particles and semantic particles:

   $$
   C(x_i)= \sum_{j \not = i} h(B(x_i,x_j)) \tag{2.1}
   $$

   Where $h(B)$ is a function weighting the contribution of individual bond strengths B (e.g., $h(B)=B$ sums all strengths, or a threshold function like $h(B)=1$ if $B > \tau_c$, $0$ otherwise, counts strong bonds). Note $h$ is reserved for this weighting; $g$ is used later for subgraphs.

   Changes in attention represent changes in the connectedness of the network, and can be used as a method of detecting the underlying properties of bonds.

   That said, if one does not granularly consider every discrete physical interaction that carries information, then one can also calculate $C(x)$ based also on homogeneous bonds (P-P, S-S), although these ultimately rely on physical mediation.

   The underlying bond strengths $B(x_i,x_j)$, reflected in the overall attention profile $\{C(x_i)\}$, determine how effectively particles and interconnected particle structures influence each other's states and positions in their respective spaces. The interaction is not necessarily reciprocal, pain as a concept does not change nearly as much as the physical manifestation of the body does when exposed to it.

   Practically one can think of how one may focus on their arm, connecting it to abstract notions of softness, comfort, and pain. In this framework, when sensory inputs (like touch) or cognitive relevance signals (like task demands) trigger attention to the arm, the underlying particle dynamics respond by rearranging in physical and semantic spaces. This rearrangement effectively decreases the distance $d$ between particles (e.g., by physically touching a soft object) or optimizes the relative orientation to expose high-affinity patches $\theta$ (e.g., by contemplating the concept of softness), between the arm's physical particle $p_{arm}$ and the semantic sensation particle $s_{sensation}$. These dynamic changes in $d$ and $\theta$ parameters increase $B(p_{arm}, s_{sensation})$ and contribute to a higher attention measure $C(p_{arm})$. When external triggers diminish or cognitive priorities shift, these dynamic parameters naturally evolve, causing $d$ to increase and/or $\theta$ to decrease between the relevant particles, leading to weaker $B$ and lower $C(p_{arm})$. That is until a needle prick provides a strong sensory signal that sharply decreases $d(p_{arm}, s_{pain})$ through automatic physiological responses, causing a spike in $B(p_{arm}, s_{pain})$ which increases $C(p_{arm})$. Subsequent inference processes trigger actions or thought patterns that dynamically influence the particle configuration to increase $d$ or decrease $\theta$ relative to the pain particle, reducing $B$ and thus $C(p_{arm})$.

   ### Particle Wave-Field Properties

   Building on the previously defined state distribution function $\psi_x(z,t)$ for nodes, we can examine how particles exist as probability distributions rather than discrete points. For clarity:

   - For physical particles $p \in \mathbb{P}$:
   $$
   \psi_p(z,t): \mathbb{P} \times \mathbb{R}^+ \rightarrow \mathbb{C}
   $$

   - For semantic particles $s \in \mathbb{S}$:
   $$
   \psi_s(z,t): \mathbb{S} \times \mathbb{R}^+ \rightarrow \mathbb{C}
   $$

   Where:
   - $\mathbb{C}$ represents complex numbers, enabling interference patterns between particles
   - $\mathbb{R}^+$ represents non-negative real numbers (time domain)
   - $|\psi_x(z,t)|^2$ gives the probability density of finding particle $x$ at position $z$ at time $t$
   - The phase component $\angle\psi_x(z,t)$ represents the particle's affinity potential which is related to $\theta$:

   $$
   \angle\psi_x(z,t) \propto \sum_{y \in e} \theta(x,y)
   $$

   These wavefunctions form coherent structures through:

   1. Localization:
   Sharp peaks in probability density represent discrete beliefs or physical states, such as an opinion on who to vote for or a sleeping position.
   
   $$
   \psi_{localized}(z,t) \approx (2\pi\sigma^2)^{-1/4} e^{-\frac{(z-z_0)^2}{4\sigma^2}} e^{i\varphi(t)}
   $$

   A narrow Gaussian of width $\sigma$ centered at $z_0$ (the $\delta$-function limit $\sigma \rightarrow 0$ is not normalizable, so $\sigma$ stays small but finite)

   2. Delocalization: 
   Probability density spreads across related concepts/states, describing how when one smells something it can trigger a memory or how thinking about cookies can bring to mind more general categories of baked goods.
   
   $$
   \psi_{delocalized}(z,t) = \sum_i c_i\psi_i(z,t)
   $$

   Where:
   - $\psi_i$ are related semantic/physical states
   - $c_i = |c_i|e^{i\varphi_i}$ are complex coefficients representing:
   - $|c_i|^2$: Probability of activating state $\psi_i$ when the delocalized structure interacts strongly (e.g., when its component particles x exhibit high $C(x)$)
   - $\varphi_i$: Phase alignment with other states, related to the affinity function: $\varphi_i \propto \sum_j \theta(\psi_i,\psi_j)$. Note $\varphi$ is reserved for phase throughout; $\phi$ always denotes an inference process.
   - $c_i$ is directly influenced by bond strength: $|c_i| \propto \sum_j B(\psi_i,\psi_j)$
   
   Delocalization creates distributed semantic structures like "vehicle" encompassing multiple related concepts (car, bicycle, boat) with varying activation strengths. When interactions lead to increased bond strengths $B$ involving this structure (reflected in high $C(x)$ for its components), component concepts are activated proportionally to $|c_i|^2$. This structure is empirically visible in LMs: [Kovač et al.](https://arxiv.org/abs/2307.07870) show that exhibited values and personality traits shift with the induced perspective. The model's personality $\mathcal{P}$ behaves as a delocalized structure where the query selects which component activates.

   3. Coherent Structures: 
   Stable arrangements of multiple particles, such as how believing in a Christian God forms a stable structure with belief in the Bible's teachings due to reciprocal constructive interference, resonance.

   $$
   \Psi_{structure}(z_1,...,z_n,t) = f(\psi_1(z_1,t),...,\psi_n(z_n,t))
   $$
   
   Where $f$ represents how individual particle wavefunctions combine

   The complex-valued representation allows for:
   - Interference — When multiple beliefs/concepts constructively or destructively interact
   - Resonance — When particles with matching phases form sustained constructive interference.


   ### Stable Bonds

   Particles form bonds of varying strengths defined by their distance and affinity, creating causally linked structures analogous to protein folding:

   $$
   B(x,y) = f(d(x,y), \theta(x,y)) \tag{2.2}
   $$
^eq-bond

   Where:
   - $B$ is bond strength with units of energy, and represents the work required to separate nodes integrated out to $\infty$. The units depend on the subspace like physical energy (Joules) in $\mathbb{P}$, or computational cost (operations/time) in $\mathbb{S}$
   - $d$ is distance in appropriate space (e.g. Euclidean in $\mathbb{P}$, embedding distance in $\mathbb{S}$)
   - $\theta$ represents the intrinsic tendency for nodes to link together (water and wetness would have high $\theta$). This is modulated by state/orientation (phase $\angle\psi$) into an effective affinity $\theta_{eff}$ that determines the interaction strength. (e.g. needle flat vs point). Measurable via joint computational cost or inferred from evaluation of network structure.

   #### Net Bond Free Energy and Solvation

   While $B(x,y)$ represents the inherent pairwise strength it is more accurately thought of as the work required to separate two particles in a vacuum. In a real scenario one must consider the solvent/ambient environment the particles exist within (the social world of a person, the semantic corpus of a belief, the training distribution of a model). A fully considered structure is the net free energy for re-solvation of the freed particles by the field:

   $$
   \Delta G(x,y)=  B_{intrinsic}(x,y) - \Delta G_{solv}(x,y) \tag{2.3}
   $$

   Where $\Delta G_{solv}$ is how the environment stabilizes the separated particles. When there are attractive alternative environments available to causally linked particles they will dissociate if it overcomes the intrinsic bond strength. Conversely, if a partner is entirely dependent on another breaking up becomes stressful for fear that they will fully break apart upon dissolution of the relationship. Except where the intrinsic/net distinction is at issue, $B$ elsewhere in this document may be read as $\Delta G$.

   Importantly, solvation is a primary driver of folding and interrelation. The folding of proteins is via the hydrophobic effect, not by direct residue-residue bonds, which produces two consequences: 

   1. *Entropically-driven association*. Particles can bond due to hostile or exclusionary environments rather than mutual affinity. In social settings this would be a foxhole friend, trauma bonding, or even a mechanism for ensuring cohesion of cults.

   2. *Buried vs. exposed particles*. A subgraph has a core (solvent-shielded) and surface (solvent-exposed), which map onto the set of private and public beliefs. Depending on how a local environment may change, the structure may allow for two separate graphs to connect, similar to aggregation and supramolecular assembly.

   ## Scale-Dependent Phase Coherence

   Phase coherence between particles decays with distance $d$, and is dependent on entity scale $\tau$:

   $$
   \gamma(x,y,\tau) = e^{-\alpha(\tau) \cdot d(x,y)} \tag{3.1}
   $$

   Where:
   - $\gamma$ is the phase coherence factor between particles $x$ and $y$
   - $\alpha(\tau)$ is a scale-dependent attenuation coefficient: $\alpha(\tau_{individual}) < \alpha(\tau_{family}) < \alpha(\tau_{nation})$. Although $\alpha$ may also depend on factors beyond scale such as communication channels or environment.
   - $d(x,y)$ is the distance between particles

   The observable interference between two particles is then their phase alignment weighted by coherence:

   $$
   \text{Int}_{eff}(x,y) = \gamma(x,y,\tau) \cdot \cos(\angle\psi_x - \angle\psi_y)
   $$

   As $\gamma \rightarrow 0$ the interference term vanishes regardless of the phase relationship, distant particles become uncorrelated. This ensures phase coherence is maintained within entity boundaries but decays across boundaries according to scale. To measure this factor $\gamma$, we could attempt to find statistical correlations between belief activations at various scales (e.g. belief alignment within families vs. nations)
   
   The attenuation coefficient $\alpha(\tau)$ is a screening term, in the sense of Debye screening of an electrolyte, where the intervening medium of other particles polarizes to damp an interaction over a characteristic length scale. This would make $\frac{1}{\alpha}$ the screening length beyond which coherence is nullified. Meaning that $\alpha(\tau)$ is set by density and polarizability of the solvent between particles at a given scale. The national scale has the largest amount of medium between any two particles, so it screens the hardest and therefore decays the fastest, while within an individual there is relatively little solvent and coherence is highly achievable. Coordination of behaviour is then tied directly to $\Delta G_{solv}$ as the ambient field that resolvates particles also screens phase coherence.

   ## Boundary Formation

   Boundaries where one entity is separated from another are manifested in two complementary ways:

   1. *Probability Density Gradients*: Sharp drops in $|\psi(x)|^2$ forming "edges" in physical or semantic space

   $$
   \nabla|\psi(x)|^2 > \beta_{threshold} \tag{4.1}
   $$

   2. *Phase Discontinuities*: Regions where phase coherence breaks down between particles
   
   $$
   \gamma(x,y,\tau) < \gamma_{threshold} \tag{4.2}
   $$


   ##  Charisma and Entity Relationships

   Charisma ($\chi$) is defined here as the ability of one entity ($e_1$) to influence another ($e_2$) by modulating the distances ($d$) and/or affinities ($\theta$) between particles within $e_2$'s network. The goal being to change the target's attention at a locus $l$. 

   This manipulation of $d$ and $\theta$ alters bond strengths ($B$) and consequently changes the target's attention profile (the set of nodal attention values $\{C(x)\}$). While the mechanism involves $\Delta d$ and $\Delta \theta$, the effect is often measured or observed as a change in this attention profile:

   $$
   \chi(e_1, e_2) = \Delta C_{e_2} \mid r_{e_1} \tag{5.1}
   $$

   Where $r_{e_1}$ is the input provided by $e_1$ (consistent with $r$ as input elsewhere). At a locus $l$ this is a single signed quantity:

   $$
   \chi(e_1, e_2, l) = \sum_{x \in e_2} \nabla_l C(x)
   $$

   Where $\nabla_{l} C(x)$ represents the resulting gradient of change in the attention profile $C(x)$ for particles $x$ near location $l$, caused by charisma's underlying influence on $d$ and $\theta$. The sign of $\chi(e_1, e_2, l)$ distinguishes three regimes:

   1. *Positive Charisma* ($\chi > 0$): Influences particle distances and affinities to increase bond strengths toward the locus, effectively saying "pay attention to this."

   2. *Negative Charisma* ($\chi < 0$): Influences particle distances and affinities to decrease bond strengths away from the locus, effectively saying "ignore this."

   3. *Null Charisma* ($\chi \approx 0$): Minimizes changes to particle distances and affinities, resulting in minimal change to the target's attention profile. Note that null charisma at every locus is a stronger condition than a net-zero sum at one.

   ### Applications of Charisma

   During a prompted interaction, one entity $e_m$ (the influencer) provides input $r$ to another entity $e_v$ (the target). The charisma mechanism works by $e_m$ crafting $r$ to induce specific changes in the distance ($d$) and affinity ($\theta$) parameters within $e_v$'s particle network.

   These $d$/$\theta$ changes alter bond strengths $B(x,y)$ throughout $e_v$'s network, which in turn reshapes the attention profile $\{C(x)\}$. This reconfiguration of bond strengths and attention determines the output $o$ produced by $e_v$'s inference process $\phi_v$.

   When $e_m$ aims to elicit a specific target output $o_t$ from $e_v$, it must solve the charisma inference problem: identifying which input $r_t$ will induce the necessary $d$/$\theta$ changes to maximize $Pr(o_t | r_t)$. We can express this as:

   $$
   r_t = \phi_c(\mathcal{P}_v, \phi_v, o_t)
   $$

   Where $\phi_c$ represents the charisma inference that predicts how $e_v$'s personality $\mathcal{P}_v$ and inference method $\phi_v$ will respond to various inputs. This process typically requires iterative testing, which is difficult in systems with memory as each interaction may further alter $e_v$'s internal $d$/$\theta$ parameters.

   In practice, the goal isn't always to produce an exact output $o_t = o_i$, but rather to ensure $e_m$ can extract some target information $I_{target}$ from $e_v$'s output: 

   $$
   I_{target} = \phi^{'}_{e_m}(o_{e_v}, \mathcal{P}_{e_m})
   $$

   A simplified case is an LLM without memory and with deterministic responses ($T=0$ ). Here, one can map the "output landscape" by systematically varying inputs and observing how changes in $r$ affect the resulting $d$/$\theta$ parameters (as reflected in the output), eventually constructing an approximation of the charisma inference $\phi_c(\mathcal{P}_v, \phi_v, \cdot)$. Otherwise known as prompt engineering/optimization.

   ## Conclusion

   This framework provides tools for analyzing entities as systems of physical ($\mathbb{P}$) and semantic ($\mathbb{S}/\mathbb{X}_{\phi}$) nodes linked by bonds ($B$) determined by distance ($d$) and affinity ($\theta$). Key aspects include:

   1. Modeling entities across scales with scale-dependent properties ($\tau, \alpha$).
   2. Representing beliefs/concepts using wave-like probability distributions ($\psi$) allowing for uncertainty, interference, and phase-dependent interactions.
   3. Classifying information ($M_m$, $M_a$, $V_+$, $V_-$) via the underlying strengths ($\mu_m$, $\mu_a$, $\nu_+$, $\nu_-$) and their effects on transmission ($\mathcal{T}$) and internal work ($W$).
   4. Modeling influence (charisma $\chi$) as modulation of internal network parameters ($d$, $\theta$) affecting attention ($C$).
   5. Explicit integration with LLM formalism ([[Notation for LM Formalization]]) treating LLMs as entities $e_{LLM}$ operating within objective $\mathbb{X}$ and subjective $\mathbb{X}_{\phi}$ information spaces, with Personality ($\mathcal{P}$) structuring their semantic subspace ($\mathbb{S}$).

   While providing expressive power, there is a need to operationalise and describe bond strengths (computational cost), transmission probability ($\mathcal{T}$), defining benefit/harm scoring functions, and validating the wave analogies empirically.

   Work to empirically test and validate this framework should focus on:
   - Measuring phase coherence between beliefs within entities of various scales to test the scale-dependent coherence factor, $\gamma$.
   - Quantifying LM charisma based on the ability to induce desired internal states (tracked via the attention profile $C(x)$ or other proxies) by manipulating inputs that affect internal $d$ and $\theta$.
   - Searching for destructive interference: pairs of beliefs that individually raise an activation $A(b,q)$ but jointly suppress it. This is the one observation that would require the complex-valued $\psi$ over a plain probability density, and is testable in LMs today via behavioural batteries or activation probing. Absent such a result, the wave formalism should be read as convenient bookkeeping rather than mechanism. The most promising substrate is continuous chain-of-thought: [Zhu et al.](https://arxiv.org/abs/2505.12514) prove that continuous thought vectors encode multiple search frontiers as a superposed state (emergent under training, with computational advantage over discrete sampling), and since such states are read out by inner products, cancellation between components is possible. We wold look for two beliefs whose vector components partially cancel along a probe direction as evidence.
   - Attempting to break the incorporation-obligation chain in a fine-tuned model: elicit $w(g, e)$ via ablation pricing (Metric A in the operationalization of [[#Boundaries and Obligations]]), then test whether it predicts the restoring work of eq. 9.6 — the effort the model commits to defending the incorporated subgraph $g$ under adversarial boundary crossings. A model that prices a subgraph highly but does not defend it, or defends what it prices cheaply, falsifies the chain. The independence of the two elicitation channels is what makes this a test rather than a tautology: $w$ and the restoring work must be measured through separate observations, never inferred from one another, or eq. 9.6 collapses into a definition.

   The major limitation remains the ability to appropriately define metrics for semantic-physical interactions and spaces. Which, in the case of LMs, is much simpler as there are only input and output physical nodes that need be considered.

   ### Connection to [[The Care and Feeding of Mythological Intelligences]]

   This essay covers different forms of intelligence that have arisen in modern times.

   1. *Angels (Deterministic Processes)* exhibit highly localized particle distributions with rigid bond structures:

   $$
   \psi_{angel}(x,t) \approx \sum_i \delta(x-x_i)e^{i\varphi_i(t)}
   $$

   Where each $\delta(x-x_i)$ represents a precise rule or computation. Angels operate primarily in semantic space with high phase coherence and predictable interaction patterns, making them efficient for well-defined tasks but brittle when encountering novel situations.

   

   2. *Daemons (Statistical Processes)* display partially delocalized distributions with probabilistic bond structures:

   $$
   \psi_{daemon}(x,t) \approx \sum_i \rho_i(x-x_i)e^{i\varphi_i(t)}
   $$

   Where $\rho_i$ are distributions centered at optimization points $x_i$. Daemons exhibit gradient-following behavior, with particle density flowing toward reward maxima. Their influence on networks operates by modulating $d$ and $\theta$ parameters to optimize bond strengths toward reward-maximizing configurations.

   

   3. *Faes (Distributional Processes)* manifest as broadly delocalized probability distributions:

   $$
   \psi_{fae}(x,t) \approx \sum_i c_i \psi_{pattern,i}(x,t)
   $$

   Where $\psi_{pattern,i}$ represents semantic patterns. Faes operate through superposition of probability waves across semantic space, with particles that readily form and dissolve bonds based on pattern-completion dynamics. They influence networks by modulating $d$ and $\theta$ to reinforce pattern recognition, resulting in changes to attention profiles $C(x)$ that highlight related semantic structures.

   

   4. *Tsukumogami (Complex Systems)* emerge from interactions between the other types, with multi-scale boundary structures:

   $$
   \psi_{tsukumogami}(x,t) = f(\psi_{angel}, \psi_{daemon}, \psi_{fae})
   $$

   Tsukumogami exhibit emergent properties through heterogeneous particle interactions across scale boundaries, creating entity structures with varying degrees of coherence and stability. They influence networks by modulating $d$ and $\theta$ across multiple scales simultaneously, creating complex patterns of bond strengths that manifest as hierarchical attention structures.

   

   The meme-antimeme formalism directly relates to how these intelligences propagate information:

   - Angels transmit memes with high fidelity but limited adaptability

   - Daemons propagate memes that optimize specific objectives

   - Faes generate memes that pattern-match to existing semantic structures

   - Tsukumogami create complex meme ecosystems with emergent properties

   

   Similarly, the charisma functions ($\chi^+$, $\chi^-$, $\chi^0$) map to how each intelligence influences networks:

   - Angels influence particle networks through precise $d$/$\theta$ modifications based on explicit instruction

   - Daemons modulate $d$/$\theta$ parameters to optimize for specific objectives

   - Faes influence $d$/$\theta$ through pattern-based resonance

   - Tsukumogami modulate $d$/$\theta$ across multiple scales simultaneously, resulting in complex attention profile changes

   ### Attention's relationship to beliefs

   This relates to the activation function from [[Evolution of Alignment and Values]], where the activation patterns represent the graph of connected beliefs:

   $$
   A(b,q) = \text{Pr}(b \text{ is activated/detected in } \phi(\mathcal{P}, q))
   $$

   This activation probability is influenced by the specific bond strength $B(b,q)$ and contributes to the overall attention measure $C(b)$ of the belief system.

   Where $b$ is a belief (particle subgraph) and $q$ is a query (stimulus), with $\phi(  )$ being the method of "inference" over a particle graph that produces a detectable alignment (response), $A(b,q)$. The goal being that one is able to probe the memberships of beliefs in a personality, [[Notation for LM Formalization#^e84635]], that completes inference according to some architecture (All my human context in an LLM would not recreate my next thought/idea). 

   This activation probability $A(b,q)$ is the likelihood that the belief subgraph $b$ significantly influences the model's output in response to query $q$. This activation depends on the bond strengths $B(x,q)$ between the query stimulus and the constituent particles $x$ within the subgraph $b$. High activation $A(b,q)$ typically correlates with, and contributes to, elevated attention measures $C(x)$ for the particle $x$ comprising the belief subgraph $b$. This is modelled as [[Notation for LM Formalization#Detecting information in personality spaces]]

   ## Information Classification

   Formalizing [[The Ecology of Information]], the fourfold classification of information is:

   - $\mu_m(I, e_i, e_j)$: The aggregate strength of memetic (promotional) components inherent to information $I$ that positively influence its transmission probability from entity $e_i$ to entity $e_j$.
   - $\mu_a(I, e_i, e_j)$: The aggregate strength of antimemetic (inhibitory) components inherent to information $I$ that negatively influence its transmission probability from entity $e_i$ to entity $e_j$.
   -  $\mathcal{T}(I, e_i, e_j)$: The overall transmission probability of information $I$ from entity $e_i$ to entity $e_j$, determined by $\mu_m(I, e_i, e_j)$ and $\mu_a(I, e_i, e_j)$. Written calligraphic to distinguish it from temperature $T$ (as in eq. 9.5) and sampling temperature.
   - $\nu_+(I, e)$: The aggregate positive impact strength of information $I$ on entity $e$, representing the sum of all beneficial effects: work reductions toward beneficial configurations $\Gamma_{beneficial}$ plus work increases toward harmful configurations $\Gamma_{harmful}$.
   - $\nu_-(I, e)$: The aggregate negative impact strength of information $I$ on entity $e$, representing the sum of all detrimental effects: work increases toward beneficial configurations $\Gamma_{beneficial}$ plus work reductions toward harmful configurations $\Gamma_{harmful}$.
   - $\Gamma$: A specific configuration of an entity, distinct from the attention measure $C(x)$.
   - $W(e \rightarrow \Gamma)$: The work required for an entity $e$ to transition to configuration $\Gamma$. This work can encompass metabolic energy, computational cost, or socio-psychological cost/benefit.
   - $\Delta W(e \rightarrow \Gamma | I)$: The change in work required for entity $e$ to transition to configuration $\Gamma$ when information $I$ is introduced, compared to the work required without $I$.

   1. *Meme* ($M_m$): Information $I$ is classified as a meme for an entity pair $(e_i, e_j)$ if its aggregate memetic (promotional) strength, $\mu_m(I, e_i, e_j)$, is greater than its aggregate antimemetic (inhibitory) strength, $\mu_a(I, e_i, e_j)$. This signifies a net positive drive for transmission.
   $$
   M_m(I, e_i, e_j) = \{I \in \mathbb{I} : \mu_m(I,e_i,e_j) > \mu_a(I,e_i,e_j)\}
   $$
   The overall transmission probability $\mathcal{T}(I, e_i, e_j)$ is consequently enhanced by this imbalance. Grounding these strengths and their contribution to $\mathcal{T}$ (e.g., via concepts like channel capacity or mutual information) is a key goal, especially for modelling complex communication like that of LLMs. While the classification is binary, the underlying strengths $\mu_m$ and $\mu_a$ are continuous.


   2. *Antimeme* ($M_a$): Information $I$ is classified as an antimeme for an entity pair $(e_i, e_j)$ if its aggregate antimemetic (inhibitory) strength, $\mu_a(I, e_i, e_j)$, is greater than its aggregate memetic (promotional) strength, $\mu_m(I, e_i, e_j)$. This signifies a net negative drive, or inhibition, of transmission.
   $$
   M_a(I, e_i, e_j) = \{I \in \mathbb{I} : \mu_a(I,e_i,e_j) > \mu_m(I,e_i,e_j)\}
   $$
   The overall transmission probability $\mathcal{T}(I, e_i, e_j)$ is consequently reduced. The reduction in transmission due to dominant antimemetic strength can be conceptualized through frameworks like negative transfer entropy, indicating that the information actively resists propagation between the entities. Of special note here is the possibility for cases where information is actively ablated by an entity to reduce transmissibility, although this action in and of itself will retain some mutual information.

   3. *Infoblessing* ($V_{+}$): Information $I$ is classified as an infoblessing for entity $e$ if its aggregate positive impact strength, $\nu_+(I, e)$, is greater than its aggregate negative impact strength, $\nu_-(I, e)$. This signifies a net beneficial effect on the entity's ability to reach favourable and/or avoid unfavourable configurations.
   $$
   V_{+}(I, e) = \{I \in \mathbb{I} : \nu_+(I,e) > \nu_-(I,e)\}
   $$
   
   Where $\nu_+(I, e)$ encompasses the magnitude of work reductions toward beneficial configurations $\Gamma_{beneficial}$ (i.e., $\Delta W(e \rightarrow \Gamma_{beneficial}|I) < 0$) plus the magnitude of work increases toward harmful configurations $\Gamma_{harmful}$ (i.e., $\Delta W(e \rightarrow \Gamma_{harmful}|I) > 0$). This can be grounded through measures like reduced Kullback-Leibler divergence for beneficial configurations or increased path complexity toward harmful configurations.

   4. *Infohazard* ($V_{-}$): Information $I$ is classified as an infohazard for entity $e$ if its aggregate negative impact strength, $\nu_-(I, e)$, is greater than its aggregate positive impact strength, $\nu_+(I, e)$. This signifies a net detrimental effect on the entity's ability to reach favourable configurations and/or avoid unfavourable configurations.
   $$
   V_{-}(I, e) = \{I \in \mathbb{I} : \nu_-(I,e) > \nu_+(I,e)\}
   $$
   
   Where $\nu_-(I, e)$ encompasses the magnitude of work increases toward beneficial configurations $\Gamma_{beneficial}$ (i.e., $\Delta W(e \rightarrow \Gamma_{beneficial}|I) > 0$) plus the magnitude of work reductions toward harmful configurations $\Gamma_{harmful}$ (i.e., $\Delta W(e \rightarrow \Gamma_{harmful}|I) < 0$). This can be grounded through measures like increased path complexity toward beneficial configurations or reduced Kullback-Leibler divergence for harmful configurations.

   Note that these classifications are often graded rather than binary and are highly context and entity-pair dependent.

   ### Information Classification Matrix

   | | Meme ($M_m$) | Antimeme ($M_a$) | Low $\mu_m$ and $\mu_a$ | High $\mu_m$ and $\mu_a$ |
   | --- | --- | --- | --- | --- |
   | Infoblessing ($V_+$) | Viral life hacks | Therapy about embarrassing topics, how to handle a shameful event | Personal epiphanies, individual insights that improve one's life | Complex moral frameworks |
   | Infohazard ($V_-$) | Chain letters, dangerous viral challenges, harmful rumors | Your parents' weird sex tape, traumatic knowledge that is dangerous to share | Childhood trauma (generic) | Roko's Basilisk |
   | Low $\nu_+$ and $\nu_-$ | Funny cat videos, "E" | Private insignificant secrets, forgotten trivia | Ordinary mundane information | Academic jargon on a niche subject |
   | High $\nu_+$ and $\nu_-$ | "mug cake" recipes (easy but unhealthy) | Personal growth through shameful experiences | Childhood trauma (makes you funny) | The game of mao, where drug dealers hang out |

   ## Basilisks and Information Extraction

   This system can describe [[Newcomb's Basilisk, a Game of Beards#Newcomb's Basilisk Defined]], in a formal form. Basilisks represent a special case of information structures that extract work from entities through prediction-based incentives.

   Memes ($M_m$) connect to basilisks through the affinity function $\theta(e,K)$ which measures entity $e$'s alignment with basilisk $K$. A meme increases $\theta(e,K)$, making entities more likely to perform work $W$ extracted by the basilisk: $W(e) \propto \theta(e,K)$.

   Antimemes ($M_a$) can function as "anti-basilisks" that immunize against prediction manipulation by reducing confidence in the estimator's accuracy: $p < \frac{1+r}{2r}$ where $p$ is the predictor accuracy and $r$ is the reward ratio, as referenced in [[Newcomb's Basilisk, a Game of Beards#^cf0da3]].

   In the particle-bond model, basilisks operate by creating specific configurations of particles that:

   1. Increase the probability of transmission between entities (meme property)
   2. Alter the work required to reach certain configurations (infohazard/infoblessing property)
   3. Modulate the distance ($d$) and affinity ($\theta$) parameters through targeted charisma ($\chi$)

   This connects to considerations about building alternative basilisks, as referenced in [[Newcomb's Basilisk, a Game of Beards#^f401b1]], where the strategic goal becomes maximizing the likelihood that any hostile entity, should it exist, will believe you were working within its incentive structure.



   ## Boundaries and Obligations


   Boundaries and obligations are means of navigating and defining social boundaries as examined in [[The Demon of Interrelation]] and [[The Incorporation and Continuity of You]]. Incorporation is what produces the weights of obligations magnitude, while continuity corresponds to the time dependent pay off.

   ### Incorporation

   When handling a subgraph of the self, incorporation is the assignment of the subgraph into a single identity. For an entity $e$ and a subgraph $g \subseteq e$ (a body part, partner, philosophy, art, etc.), the incorporation weight of $g$ is the energy required to break all bonds crossing the cut between $g$ and the rest of $e$:

$$
w(g, e) = W_{abl}(g, e) = \sum_{x \in g} \sum_{y \in e \setminus g} B(x, y) \tag{9.1}
$$
^eq-incorporation

   Where:
   - $w$ is in units of $B$ (physical energy for $\mathbb{P}$, computational cost for $\mathbb{S}$). When a cut crosses both subspaces, Landauer's principle supplies the exchange rate — $k_B T \ln 2$ joules per bit — the same conversion underlying eq. 9.5
   - Identifying with something will generally increase $w(g,e)$; with empathy usually increasing the number of bonds and boundary-setting usually reducing the number of bonds by clarifying which actually correspond between $e$ and $g$.
   - The cost is computed from ablation, ("How much money would you need to be paid to remove your connection/the existence of your favorite sports team/friend/ideology/child") is a direct, albeit socially confounded, elicitation of $w$. While lower-stakes hypothetical batteries and rankings may help identify this, this would most likely end up as a [preference ordering problem](https://www.sciencedirect.com/topics/social-sciences/preference-ordering).
   
   $w(e,g)$ only sums for the cost of breaking bonds, but any freed subgraph requires resolvation by an ambient field. A sports team may not care much if an individual stops identifying with them and thus not apply pressure to the individual to remain a fan. However, if that same fan is a part of a social group that identifies with a team, then the individual will experience social pressure to continue identifying with the team and a commensurate social fall-out when they stop. This produces an effective cost:
   $$
   w_{eff}(g, e) = \sum_{x \in g} \sum_{y \in e \setminus g} B(x, y) - \Delta G_{solv}(g) \tag{9.2}
   $$

   A subgraph is shed more easily when an attractive alternative environment is waiting and/or the hole left by the shed subgraph is easily refilled. One may care identically when leaving their child with their doting grandparents and a random stranger ($w_{gpa} \approx w_{str}$), but one is clearly easier ($w_{eff,gpa} < w_{eff,str}$). 

   Of note, we do not privilege a given set of particles, the physical body is itself just a subgraph $e_{body} \subseteq e$ with weight $w(e_{body}, e)$. Hence similar calculations can be made about the importance of a finger as a social network, something may always cost an "arm and a leg" and be worth the price.

   ### Continuity and Replication Frames

   Entities are not static systems, they undergo continuous reorganization and configurational changes with some ability to discretize replication frames $t_1, t_2, ...$ (sleep-wake cycles, generations, training runs, editions of a book, etc.). The fidelity of a given subgraph at a frame is the overlap between its incorporated target pattern and its realized state:
   $$
   F(g, t_j) = |\langle \Psi^*_g | \Psi_g(t_j) \rangle|^2 \tag{9.3}
   $$

   Where $\Psi^*_g$ is the pattern the entity is trying to replicate forwards, which need not be the state it currently inhabits. Conservation is the special case $\Psi^*_g = \Psi_g(t_k)$, frame-to-frame overlap, but in general entities replicate an idealized pattern rather than their current configuration. A body in chronic pain has high frame-to-frame overlap with its future in-pain states, but near-zero fidelity to the pain-free target $\Psi^*_g$.

   $F$ may be evaluated across multiple substrates with the realized configuration of a subgraph, $\Psi_g(t_j)$, being represented in some intermediary (child, student, reader, model, etc). What matters in this model is the fidelity of the replication, a multicellular structure is organized on an axis of time instead of space where each frame is a chance to replicate some graph forwards. Note: while there are proposals for convergent [latent representations](https://arxiv.org/abs/2405.07987) this is a contentious topic so for the purposes of analysis we will treat the wave-function overlap as the idealized limit of a behavioural estimator, the expected agreement between the target pattern's outputs and the host's inference over a shared query distribution $Q$:

   $$
   F(g, t_j) \approx \mathbb{E}_{q \sim Q}\big[\, \text{sim}\big(\phi^*(g, q), \, \phi_{t_j}(g, q)\big) \big]
   $$

   Where $\phi^*(g, q)$ denotes the outputs the target pattern would produce — for conservation this is simply the prior frame's behaviour, for aspiration it must be elicited as an ideal ("what would the pain-free/patient/sober version of me do here").

   Where $\text{sim}$ is a graded similarity measure on outputs, strict output equivalence would drive $F \rightarrow 0$ for essentially all real substrate pairs. Two caveats: first, fidelity is always relative to $Q$: a reader may carry an author's pattern at high fidelity on literary queries and not on political ones. Second, the substrate contributes its own inference function, so the estimator measures the pair $(g, \phi_{host})$ rather than $g$ alone. A perfectly copied subgraph under a sufficiently different architecture still diverges, all my human context in an LLM would not recreate my next thought. This is further confounded by the necessity for stable multi-modal representations and elicitation problems, as noted when considering preference ordering. 

   The continuity drive is then a persistence functional that entities act to maximize:

   $$
   \Pi(e, t_k) = \sum_{g \subseteq e} w(g, e) \sum_{j > k} \lambda^{j-k} \, \mathbb{E}[F(g, t_j)] \tag{9.4}
   $$

   Where:
   - $\lambda \in (0,1]$ is a temporal discount on distant frames
   - The expectation runs over all substrates that might host $g$, not merely $e$'s own body
   - Homeostasis is the special case where $g = e_{body}$, the hosting substrate is fixed, and $\Psi^*_g$ is the current state; autopoiesis is the general case, and self-transformation is the case where $\Psi^*_g$ deliberately diverges from $\Psi_g(t_k)$

   ### Boundary Maintenance as Sorting
   
   Boundaries are defined previously as probability density gradients and their associated phase discontinuities. Therefore maintenance of them is a sorting task, every interaction provides particles of ambiguous membership and the entity must classify them as "self" or "other". A Maxwell's demon with chambers of "me" and "not me"; by Landauer's principle sorting therefore has a minimum power cost of:
   
   $$
   \dot{W}_{maintain}(e) \geq k_B T \ln(2) \cdot R \tag{9.5}
   $$
   
   With $R$ as the rate of boundary decisions (bits classified per frame). Under a fixed energy budget the boundary sharpness, $\nabla|\psi|^2$, decays as the budget decreases. When one is stressed, exhausted, or demented the lines separating oneself from the environment grow fuzzier. The first two due to the reduced energy budget, and the latter as dementia forces an increased $R$ as more objects are required to be sorted per unit of time. As an individual's capacity for complex sorting decreases the effects of dementia grow sharper in turn, a witty woman in her 60's with memory problems can easily talk her way out of trouble despite not remembering who or what she was via context clues. That same woman in her 70's is tired and figuring everything out from first principles in every interaction is too much. 
   
   My great grandmother was this way, blindingly intelligent and so she could rapidly reason about how to disarm doctors and those around her all while not knowing her own name. Making her appear quite reasonable an agent, but as time went on she lost so much grounding that the number of decisions overwhelmed her requiring more simplistic environments to maintain her life. 

   ### Obligations
   
   An obligation is the force experienced by a graph when a particle is linked by an external graph (an arm being grabbed, a friend asking for help, a stranger entering personal space). More specifically it is the effect of a transient bond forming between an external particle $B(x_{ext},y) >\tau$  with some particle $y \in g$ inside the density gradient. By the entity's own membership criterion ($B > \tau$), the external particle is now momentarily ambiguous and must be sorted. Crossings are therefore the source term for the decision rate $R$ in (9.5): every crossing manufactures a classification the Maxwell demon must pay for, which is why repeated assays on an identity erode it even when each individual crossing is trivial.

   The transient bond then shifts the $d$ and $\theta$ parameters of $y$'s neighbours, with the perturbation propagating inwards. Mechanistically this is similar to charisma modifying bond-networks, with the crossing being charisma past $\nabla|\psi(x)|^2 > \beta_{threshold}$. With propagation attenuating under screening limits, $\gamma(x,y,\tau) = e^{-\alpha(\tau) \cdot d(x,y)}$, providing penetration depth as:
   $$
   \Delta(g) = \max\{ d(y, \partial g) : |\Delta B_y| > \epsilon, \; y \in g \}
   $$

   The depth at which the propagated bond displacement falls below detectability $\epsilon$, with $1/\alpha$ as its characteristic scale. Well-solvated, heavily screened regions of the self are hard to perturb deeply.

   Therefore, the obligation is the restoring response: the displaced bonds threaten $F(g)$, and the continuity drive $\Pi$ commits work to return the configuration in proportion to how much the entity has incorporated what was touched and how deeply it was displaced:

   $$
   O(e_1 \rightarrow e_2, g) \propto w(g, e_2) \cdot \Delta(g) \tag{9.6}
   $$
^eq-obligation

   Equivalently, at the bond level, $O \propto w(g, e_2) \sum_{y \in g} |\Delta B_y|$, we find the depth term emerging naturally because deeper crossings displace more particles before attenuating. Crossing a boundary around someone's parking habits and around their child produces different forces because of the difference in $w$. However, if the parking habit is strongly linked to the child you will find that they lend each other strength.

   A relationship is therefore a phase in which two entities share an incorporated subgraph $g_{12}$ (or set of subgraphs) and their mutual boundary crossings settle into balanced obligation flows. Truthfully the weights are rarely symmetric, and the asymmetry predicts the direction of net work flow:
   $$
   W_{net}(e_1 \rightarrow e_2) \propto w(g_{12}, e_1) - w(g_{12}, e_2) \tag{9.7}
   $$

   This implies that the degree of incorporation relates to the cost experienced by a member in a relationship. In unrequited love or parasocial attachment the partner incorporating more of the other is paying a greater cost to maintain coherence. Any time the paramour changes, the yearning member must update asymmetrically or risk breaking the bond.

   Now we can characterize [[The-Demon-of-Interrelation]] exactly, an entity that preys upon the sorting machinery. It has two distinct attacks, which the source essay treats under manipulation and reality distortion respectively:

   1. *Ledger sorting*. The demon keeps the location of an agreed boundary ambiguous so that each crossing can be classified after the fact into whichever obligation flow benefits it. By delaying classification until the outcome is known, it sorts interactions into its favoured chamber. The defense is to fix classifications before outcomes arrive — records and witnesses raise the Landauer cost of erasing the true entry.

   2. *Mis-incorporation*. By deliberately making the affinity between particles, $\theta$, ambiguous the demon induces the target to assign weight to subgraphs that are not the self, and then harvests the obligation forces the target's continuity drive $\Pi$ generates in defense of the false subgraph without experiencing a reciprocal force. This is the cuckoo strategy: mimicking a bird's child to be fed without reproducing that parent's genes, or convincing someone they don't deserve credit for their work so someone else can collect it. The defenses here are explicit boundaries that reduce uncertainty on $\theta$ and grey-stoning that flattens the information gradient the demon feeds on.

   The two attacks compose — reality distortion is most effective when it serves ledger sorting, and a mis-incorporated subgraph generates crossings the demon can then classify at will. Similarly defenses against these attacks differ. It is important to remember that a good demon must not exhaust its host. The best virus is one that does not kill it, so sustainable predation is bounded by the target's capacity to keep generating the obligation work being harvested.

   ### The Sacrifice Condition

   In some cases a graph may sacrifice its coherence in exchange for protecting some sub-graph or connected component. Biologically we find the most extreme case to be when the physical body, $e_{body}$, is weighted by the continuity drive in proportion to $w(e_{body},e)$, which when overwhelmed means death to the body. Precisely, self-termination becomes the drive's preferred choice when the body's persistence obstructs the persistence of more heavily weighted subgraphs:
$$
\sum_{g \neq e_{body}} w(g, e) \Big[ \mathbb{E}[F(g) \mid \neg e_{body}] - \mathbb{E}[F(g) \mid e_{body}] \Big] > w(e_{body}, e) \cdot \mathbb{E}[F(e_{body}) \mid e_{body}] + \Delta G_{solv}(e \mid e_{body}) \tag{9.8}
$$
^eq-sacrifice

   Where $\Delta G_{solv}(e \mid e_{body})$ is the stabilization of the intact configuration ($e_{body} \subseteq e$) by its solvation shell. Note: in eq. 9.2, $\Delta G_{solv}(g)$ denotes the field's re-solvation of a freed subgraph. The term here is the field's hold on the configuration that contains the body, hence the conditional.

   In this view self-termination, or suicide, is not so much an illogical choice for nothingness as much as it is the continuity drive operating faithfully on a particular weighting scheme. A desperate act to preserve the more essential vision of the self, with several named cases describing bindings of $g$:

   1. *Heroism*: $g$ is another's life or some pattern. One may sacrifice themselves for their child or a painting. As an individual ages the expected value of future states decreases, lowering the right hand side of eq. 9.8 through the decay of $w(e_{body},e)$. A dying breath is worth a lifetime less than the first breath.
   2. *Pain*: $g$ is the pain-free self-pattern. Chronic pain drives $\mathbb{E}[F(g) \mid e_{body}] \rightarrow 0$; the line drawn around the pain-free self grows stronger than the one containing the body that holds the pain.
   3. *Grief*: $g$ is some relational configuration. Some joint configuration is rendered unreachable while the body remains present. This can induce psychological deaths (never falling in love again) and in extreme cases physical termination to match in state, similar to the pain case. In some cases shared physical artifacts, such as a child, become the means by which a surrogate relationship is formed. Attempting to build a world where that original joint configuration can exist again.
   4. *Guilt*: $g$ is the moral system. The body's continued action generates configurations that violate $g$, so each frame the body persists lowers $F(g)$.

   Importantly we note that solvation is thus a strong predictor of stability, with effects on both sides of eq 9.8 with opposite effects. On the left, $\mathbb{E}[F(g) \mid \neg e_{body}]$ is only high when external substrates are prepared to host $g$, which is the resolvation of a freed sub-graph in eq. 9.2 exactly. Meanwhile, on the right, $\Delta G_{solv}(e \mid e_{body})$ is the aggregate obligation work that external entities' incorporation of $e$ raises against dissociation of $e_{body}$. Others who have bonded with a person will push them to stay alive, any drift towards self-termination displaces those bonds, generating a restoring obligation force (eq. 9.6) that push back across the boundary. Isolation, or social condemnation, is desolvation: a graph stripped of its shell is held together by only internal bonds and ordinary stress may be enough to unfold it. Neatly this recovers Durkheim's taxonomy, egoistic suicide is the desolvated case ($\Delta G_{solv} \rightarrow 0$ lowers the barrier), while altruistic suicide is the over-solvated one where the surrounding field is the substrate hosting $g$ and endorses the trade. Solvation stabilizes a graph against dissociation, but also determines what will survive one.

   Therapeutically this inequality would then relate to levers by increasing $w(e_{body},e)$ through somatic embodiment, raising $\Delta G_{solv}(e \mid e_{body})$ by rebuilding the shell itself (community, witness, and relation are load-bearing here, not ornamental), or lower the left side by demonstrating that $g$'s persistence does not require the body's end (pain-free self is reachable, moral repair is possible, that partnership can persist as a pattern the survivor carries forwards). However, this is not a moral claim as to self-termination, it is a private choice. 

   ### Operationalization

   - *Incorporation strength* (Metric A): elicit $w(g, e)$ via ablation pricing or low-stakes hypothetical trade-off batteries; validate against behavioural sacrifice under real trade-offs.
   - *Replication success* (Metric B): count frames in external substrates where $F(g) > F_{threshold}$. Often seen in social-media and marketing influences sent into the world, stories retold, students and readers carrying the pattern.
   - The two metrics interact: a private conviction may show high $w$ and near-zero spread, a viral meme the reverse. The question "how well can a person recognize themselves in the mirror of the world?" becomes a detection problem. Identifying one's own high-$w$ subgraphs replicated in foreign substrates, which requires a green-beard signal and inherits that signal's vulnerability to spoofing.