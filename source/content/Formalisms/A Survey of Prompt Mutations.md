---
tags:
  - biology
  - LLM
---

# Mutation Classes
Prompts can have varying "mutational loads" with missense, nonsense, and synonymous mutations. 

As partially defined by the [[Genetic Notation for Prompts]]
## Synonymous
Occasionally the typo produces another valid, yet unintentional prompt. This can either be synonymous, as in there is no change to the meaning of the prompt.
Synonymous: This is not an issue -> This is a non-issue



$$r \not= r_{m}, \mathbf{x} \not=\mathbf{x}_{m}, \mathbb{I}_{r}=\mathbb{I}_{r,m}$$
 
## Missense 
When a mutation still is a valid word it can alter the meaning of a prompt.
Missense: This is not an issue -> This is an issue

$$r \not= r_{m}, \mathbf{x} \not=\mathbf{x}_{m}, \mathbb{I}_{r} \not =\mathbb{I}_{r,m}$$

Specifically, there exists a subset that satisfies either of these two conditions:

$$\exists \hspace{0.1 cm} \mathbb{I}_{gain} \subseteq \mathbb{I}_{r,m} -(\mathbb{I}_{r,m}\cap\mathbb{I}_{r})$$

$$\exists \hspace{0.1 cm} \mathbb{I}_{loss} \subseteq \mathbb{I}_{r} -(\mathbb{I}_{r,m}\cap\mathbb{I}_{r})$$

Which describes the change in information in the transformation $r \to r_{m}$

## Nonsense
This essentially means that while typing up a prompt I can misspell and that misspelling can frequently be ignored as the language model can infer what I mean. 
Example: This is not an issue -> This is not an ixsue

$$r \not= r_{m}, \mathbf{x} \not=\mathbf{x}_{m}, \mathbb{I}_{r} \not =\mathbb{I}_{r,m}$$

However these mutations may be easily corrected by the casual observer through a simple spell check or relational decoding. 

$$Corr(\mathbf{x}_{m})=\mathbf{x}_{corr}$$

If the correction is successful then:

$$\mathbf{x}_{corr}=\mathbf{x}$$

Else:

$$\mathbf{x}_{corr} \not=\mathbf{x}$$

In this simple case that means the ambiguous mutation is similar to [[#Missense]].

### Ambiguous
However a nonsense decoding may result in an ambiguous mutation that may be "corrected" into multiple valid meanings or an incorrect meaning. We may assign multiple possible corrections with associated probabilities.
Example: Set -> Oet, Corr(Xet) -> {Set, Pet, Met, Let, Get, Out, Oat}

In this case we can define: 

$$\mathbb{x}_{corr}=\{ \mathbf{x}_{i},p_{i} \}$$

where $p_i$ defines the probability that the corrected token sequence is $\mathbf{x}_{i}$

This gives us some probability that a nonsense mutation will be read as either a missense or a synonymous mutation where: 

$$Pr(missense|\mathbb{x}_{corr})=\frac{\sum_{i\not=j}{p_{i}}}{n}$$

Where $j$ is the probability of reverting to the original, unmutated, word.

# Mutation Methods
## Point Mutations
All point mutations can belong to any of the above classes.
### Substitution
This is where a letter is swapped for another.
cat -> bat
### Frameshift
This is luckily dealt with by the addition of the positional encoding, so it is not as devastating as it is in biology. 
### Insertion
This is where a letter is inserted into the prompt that was not there prior.
cat -> cath
### Deletion
This is where a letter is deleted from the original prompt.
cat -> ca
## Large Scale Mutations

### Inversion
This is where a section of text is inverted
cat -> tac
### Duplication
A section of text is repeated
cat -> catcat
#### Gene Duplication
Taking the definition of a gene [[Genetic Notation for Prompts#^b70465]] we can consider the effect when a duplication occurs. This means that some information is repeated. 
**Examples:**
	the cat is red there-> the cat is red there the cat is red there
	The cat is red there -> the cat is red there is a red cat

which implies that there is some subset of $\mathbb{I}_{r}$ that contains redundant information ${}^r\mathbb{I}_{i}$

$${}^r\mathbb{I}_{i} \in \mathbb{I}_{r}$$


of the form:

$${}^r\mathbb{I}_{cat,red}=\{I_{cat,red}=\phi^`(\mathbf{x}_{i-j}),I_{cat,red}=\phi^`(\mathbf{x}_{k-l}) \}$$


### Movement of a gene
So this is related to the problems of [[List order fixing]] wherein the location of information in a prompt is important for the outcome. This form of mutation is when an entire gene is moved into a new location.
**Example:**
My cat is hungry. My cat is red. -> My cat is red. My cat is hungry. 

### Fusion
This is when a gene is mixed with another gene to form a new one. These may be functional or non-functional depending on the method. Sometimes it even grants a completely new function.
**Example**:
My cat is hungry. My cat is red. -> My red cat is hungry.
#### Novel fusion
When a fusion produces a novel piece of information instead of just mashing the information together.
**Example:**
My cat is hungry. My parrot is red. -> My red parrot is hungry. 


# Mutation Functions

A mutation might have many functional outcomes after occurring. 
## Loss of function
This is where the change in the prompt prevents the accessing of an informational state we are interested in.

$$I_{target} \in \mathbb{I}_{loss}$$
## Gain of function
This is the inverse, wherein a new piece of information is gained by the mutation.

$$I_{target} \in \mathbb{I}_{gain}$$
## Switch of function
This is where the gain of information removes the original information present. Meaning that: 

$$\mathbb{I}_{r,m}\cap\mathbb{I}_{r} = \emptyset$$
## Conservation of function
Basically just a synonymous mutation.
![[Pasted image 20230902231122.png]]
## Dominant Negative
This is similar to a [[Cognitohazard]], where if this mutation occurs it counteracts the ability of other information to be interpreted.
**Example**: 
I have a pet dog that I feed every weekend. I am gone this weekend and need help.-> I had a pet dog that I fed every weekend. I am gone this weekend and need help.
In this case the dog needs to be fed this weekend, but due to the tense change we are unable to discern this information.

I have a pet dog. -> (Insert 50 repeating A's here) I have a pet dog
In this case the addition of the 50 A prompt injection will render the "I have a pet dog" an extraneous piece of information in the face of the garbled nonsense outputted. 

In both cases the language model processes the mutated information wrong, therefore related information is unable to be accessed despite it ostensibly still existing in the text. 

## Lethal Negative
This is where the loss of information is so intense that the language model is no longer able to parse anything. And no output produced will result in a success. We can consider this a case where our verification layer completely fails. 
**Example:**
I am hungry for food -> rood if hun am for gy

## Null Mutation
A loss of function mutation that completely removes the ability of the language model to parse the input. Perhaps this would be a token that does not exist in the language models repertoire resulting in an error.

## Suppressor Mutation
This is a double mutation where a compensation event occurs. This means the mutation "fixes" the problem introduced by the previous one. However, exercise caution with this mutation as it can lead to unexpected cascades down the line as nuance may be subtly shifted.  
**Example:**
I am hungry for a red bass. -> I hunger for a red ass -> I hunger for a red fish
I am hungry for a red bass -> I am hungry for a red ass -> I am hungry for a red bass

## Conditional Mutation
This is a mutation that can be fine under permissive environments, but become dangerous under stressful ones. For example if we are using an advanced language model then the presence of some mutations isn't as big a deal. However if we switch the model to a weaker one, then suddenly even small mutations may become dangerous. 
This is a method to filter out mutations that are not helping to lead to evolutionary change.

