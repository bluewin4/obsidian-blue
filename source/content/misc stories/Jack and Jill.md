---
title: Jack and Jill
author: Jack Elsworth
section: misc stories
content_type: story
date: 2025-12-09
description: The nursery rhyme rendered line by line in formal notation — the clearest available introduction to the Formalisms project.
themes:
- notation
- nursery rhyme
- formalism
- humour
ai_summary: 'Renders the nursery rhyme Jack and Jill line by line in the author''s own formal notation, each line given a table of symbolic components above the original text and a LaTeX statement beneath: set membership for the two children, a positive derivative of height for going up the hill, a state transition for filling the pail, a sharply negative derivative for Jack''s fall, and a partition of the crown into disjoint pieces for its breaking. Functions as a joke and simultaneously as the most legible on-ramp to the Formalisms section, since it applies the notation to something the reader already knows.'
ai_keywords:
- notation
- nursery rhyme
- formalism
- Jack and Jill
- pedagogy
- humour
semantic_structure: line_by_line_notation
---

| $J_a \cap J_i$  | $\frac{dh}{dt} > 0$ | $(h_{base} \to h_{well}) \in \mathbb{X}_{hill}$ |
| :-------------: | :-----------------: | :---------------------------------------------: |
| *Jack and Jill* |      *went up*      |                   *the hill,*                   |

$$J_{a}, J_{i} \in \{\text{kids(h, p, c)}\}; \space \frac{dh}{dt} > 0$$

---

| $(x_{i}, \emptyset) \to (x_{j}, \mathbb{1}) \to (x_{i},\mathbb{1})$ | $p \ni w$ | $= p_{full}$ |
|:--:|:--:|:--:|
| *To fetch* | *a pail of* | *water.* |

$$(p_{full} \cap h_{well}) \to (p_{full} \cap h_{base})$$

---

| $J_a$ | $\frac{dh_{J_{a}}}{dt} \bigg\|_{t=t_1} \ll 0$ |
|:--:|:--:|
| *Jack* | *fell down,* |

$$\exists t_1 \text{ s.t. } \frac{dh_{J_{a}}}{dt} \bigg|_{t=t_1} \ll 0$$

---

| $c\{c_{1}\} \to c\{\bigcup_{i=1}^{n>1} c_i\}$ | $c_{J_{a}}$ |
|:--:|:--:|
| *And broke* | *his crown.* |

$$c_{1} \to \bigcup_{i=1}^{n} c_i \quad (n \ge 2, \quad C_i \cap C_j = \emptyset \text{ for } i \neq j)$$

---

| $J_{i}$ | $\frac{dh_{J_{i}}}{dt} \bigg\|_{t=t_2} \ll 0$ | $\exists t_2 > t_1$ |
|:--:|:--:|:--:|
| *And Jill* | *came tumbling* | *after.* |

$$\exists t_2 > t_1 \text{ s.t. } \frac{dh_{J_{i}}}{dt} \bigg|_{t=t_2} \ll 0$$
