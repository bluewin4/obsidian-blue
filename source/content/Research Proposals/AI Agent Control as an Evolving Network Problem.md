---
date: 2025-04-08
lastmod: 2026-02-09
---


AI agents are capable of complex behaviour that leverages tools from domains as far flung as lab automation to a humble calculator. When using these tools a generative AI based agent is liable to apply an alignment valence to their inputs, such as providing code with exploits (negative valence) or notifying a supervisor of an identified risk (positive valence). Commonly one approaches misaligned agent behaviour as being solely a problem in AI architecture/training, rather than the informational packets being passed. This is a problem long in coming, with a cogent treatment of the general case of rewards in networks that corrupt signals being provided by [Everitt and Hutter in 2018](https://www.tomeveritt.se/papers/alignment.pdf).

This proposal aims to present misalignment in agentic networks as a problem of memetic malformation. The allowed transitions of data between tools and various generative AI architectures (system prompts, model, etc.) dictate the space of possible outputs for a given input into the system. Based on the network architecture an agent system will have variable robustness against adversarial attack or misaligned nodes.

Contemporaneous work either focuses on goal assignment in [populations of agents](https://arxiv.org/pdf/2406.04231) or integrating [multimodal architectures with tight binding](https://arxiv.org/pdf/2412.06142). These do not cover the case of explicitly defined relationships between agents and tools, nor weakly bound networks where inputs are tightly coupled such as the multimodal case.

To initially research this I propose testing variable network topologies, with nodes assigned explicitly as misaligned/aligned. Then testing how some input task (e.g., make a safe software interface, write a story for children) will result in differential outcomes based on placement of misaligned agents. Of note would be the inclusion of adaptive "positive jailbreaks" on agents that might otherwise behave maliciously. I would expect to be able to analyse behaviour similar to genetic regulatory networks, which would support modelling via stochastic differential equations, with noise coming from temperature in generative models, input variability, and output evaluation.

Expected results would be that a [monitoring agent](https://arxiv.org/pdf/2312.06942)will reduce incidence of misaligned behaviours [up to a point](https://alignment.anthropic.com/2025/automated-researchers-sandbag/). While adaptive networks that can update connectivity in response to trustworthiness of member nodes should [reduce negative outcomes](https://arxiv.org/pdf/2411.17693). These would both be dependent heavily on the node architecture, as in the worst case the monitoring agent would be misaligned, or the adaptive methodology compromised, allowing for misaligned nodes to overrun the network. Meanwhile the inclusion of "positive jailbreaks" in these networks to adaptively repair misaligned nodes is untested, although hopefully positive.

Future directions would involve [evolving network structures](https://www.mdpi.com/1099-4300/24/5/622) and tool-use/creation by agents.