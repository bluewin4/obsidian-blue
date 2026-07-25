---
title: Thermodynamics of LLM conformational space
author: Jack Elsworth
section: Formalisms
content_type: research
date: 2025-03-17
lastmod: 2025-04-14
tags:
- LLM
- thermodynamics
description: 'A working sketch: treating prompt misfolding as an equilibrium constant to measure model stability.'
themes:
- thermodynamics
- LLM
- stability
- notation
ai_summary: A short working note proposing that the stability of a language model's response be measured the way protein unfolding is. Treat the ratio of wrong to right outputs as an equilibrium constant, derive a free energy of unfolding, and use the enthalpic term — which is temperature invariant — to isolate why a given piece of information matters. Suggests denaturing a prompt with random insertions or stabilising it with relevant text, and varying sampling temperature. Explicitly unfinished; several referenced companion notes have not been written.
ai_keywords:
- thermodynamics
- equilibrium constant
- misfold
- stability
- denaturing
- enthalpy
semantic_structure: premise > equilibrium > stability > phase_separation
---
Measure the constant heat capacity, $\Delta G$, of unfolding,
This can be done either by changing the temperature, or by changing the sequence. You can measure how many times you get a "misfold". So you measure for a specific sequence and then mutate it to measure how robust the mutation is to a "misfold". This can be used to measure the "stability of a LLM".

We can use the [[Personality Conformational Space sampling]]

$K_{eq}=\frac{Wrong}{Right}$ 

This is equilibrium thermodynamics, I just run the statistics at the end.

Calculate 

$$\Delta G_{eq}= -RT\ln (K) = -RT\ln \frac{Wrong}{Right}$$

$$\Delta G_{eq}=\Delta H-T\Delta S$$

We care about $\Delta H$ because this contains all the juicy information about "why" the information we are testing matters. Because $\Delta H$ is temperature invariant.

Now the question is what is the [[kinetics of a LLM response]] . What does that mean? 


# Stability
We can add denaturing (random insertion of text)
Or 
We can add stabilizing (relevant text to problem)

We can also $\uparrow T$ (destabilize) or $\downarrow T$ (stabilize) the prompt output. 


This all for the purpose of predicting:

$$Pr\left( {}^r\mathbb{I}_{target} \cap \mathcal{o}_{i,j} \not = \emptyset \hspace{0.1 cm  } |\hspace{0.1 cm  }  \mathcal{r}_{i}, \mathcal{P}_{j}\right)$$

As we are hoping to identify what pieces of information a language model will have access too and what the easiest/shortest method would be. 



We can combine methods of [[Mutation Types For Prompts]]

# Phase Separation
[[Phase separation of personalities]]