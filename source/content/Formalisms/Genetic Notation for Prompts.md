---
tags:
  - biology
  - LLM
---

## Definition
An input $\mathcal{r}$ is composed of a set of information $\mathbb{I}_{r}$ that is represented by a token sequence $\mathbf{x}=\{ x_{1},\dots,x_{n} \}$ where $n$ is equal to the token length of $\mathcal{r}$.

$$r(\mathbb{I}_{r},\mathbf{x})$$

## Gene
A "gene", $g$, can be considered some subset  $g_{i}\subseteq \mathbf{x}$ such that:

$$(\phi^`(g_{i}) = I_{g,i}) \subset \mathbb{I}_{r}$$


Which in plain English means that we are able to use some set of tokens $g$ present in $\mathbf{x}$ to derive a piece of information $I_{g,i}$ . ^b70465

### Genotype
A genotype for a prompt is the exact content of the prompt $r_{i}$ itself. This is to say $\mathbf{x}$
### Phenotype
Phenotype is the outcome obtained from some prompt. This would be determined to be the $o_{i}$ that is observed. Now we can have different levels of stringency here, same in biology. As there may be a set $\mathbb{o}_{i}$ which denotes the outputs that when decoded produce some target information. 
For:

$$o_{i} \in \mathbb{o}, \hspace{0.1 cm} \phi^`(o_{i})=I_{target}$$

## Mutation notation
A mutation is a perturbation of an input $r \to r_{m}$ where the token sequence $\mathbf{x} \to \mathbf{x}_{m}$. This means that the information accessible by the prompt is changed, $\mathbb{I}_{r} \to \mathbb{I}_{r,m}$ .
