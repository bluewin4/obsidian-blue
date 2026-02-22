---
title: "Sensory Phasing"
draft: true
date: 2025-07-28
---
## Sensory Phasing: A Multi-Agent Reinforcement Learning Problem

This document outlines a multi-agent reinforcement learning (MARL) problem designed around the concept of "Sensory Phasing." The goal is to train a team of agents to intelligently select and sequence relevant "views" or "transformations" of an original 1D signal, enabling a downstream Deep Neural Network (DNN) to accurately reconstruct or infer properties of that signal. This serves as a toy problem for exploring active perception, information gathering, and co-adaptation in multi-agent systems.

**Core Components:**

1.  **Original Signal:**
    *   A 1D time-series signal (e.g., a segment of music, a synthetic waveform).
    *   The ultimate goal is for the system to reconstruct this original signal.

2.  **Sensory Paths (Channels/Transformations):**
    *   The original signal is decomposed into $M$ distinct "sensory paths."
    *   Each path represents a unique transformation or filtered view of the original signal.
    *   A concrete example: These paths could be different wavelet coefficient streams of the original signal, each capturing information at a specific scale or frequency band.

3.  **Agents (Data Curators):**
    *   There are $K$ learning agents.
    *   At each decision step, these $K$ agents **concurrently** select one sensory path each from the $M$ available options.
    *   Agent $j$ (where $j \in \{0, \dots, K-1\}$) makes its choice $s_j$ simultaneously with other agents.

4.  **Agent Observation Space:**
    *   To inform its decision, each Agent $j$ observes:
        *   A history matrix (e.g., $K \times W$) detailing the path choices made by all $K$ agents over the past $W$ decision steps. `history_matrix[agent_idx][t_ago]` stores the path chosen by `agent_idx` at `t_ago` steps in the past.
        *   Its own unique agent ID ($j$).
        *   (Optionally) The global timestep or episode number.
        *   (Optionally) Past rewards received.

5.  **Agent Action Space:**
    *   Each Agent $j$ outputs an action $a_j \in \{0, \dots, M-1\}$, which is the index of the sensory path it chooses to select for the current step.

6.  **Deep Neural Network (DNN - Reconstructor):**
    *   A **co-adaptive DNN** is used to process the information gathered by the agents.
    *   **Input to DNN:** The $K$ sensory paths selected by the agents $\{s_0, s_1, \dots, s_{K-1}\}$ are fed to the DNN. These paths are typically ordered based on the fixed agent indices (i.e., path chosen by Agent 0 is first, Agent 1 is second, etc.). Each selected path $s_j$ is itself a time-series (e.g., wavelet coefficients over a time window).
    *   **Output of DNN:** The DNN attempts to reconstruct the original 1D signal.
    *   The DNN is trained alongside the agents.

7.  **Reward Structure:**
    *   A **global reward** is calculated based on the accuracy of the DNN's reconstruction. This is typically the negative of a loss function (e.g., Mean Squared Error) between the true original signal and the DNN's reconstructed signal.
    *   This global reward signal is shared among all $K$ agents and is used to update their policies (e.g., via policy gradient methods). It is also used to train the DNN (e.g., via backpropagation).

8.  **Overall Objective & Generalization:**
    *   The primary objective is to train the agents to learn optimal, coordinated strategies for selecting sensory paths that provide the most informative data to the DNN.
    *   A key long-term goal is **generalization**: the trained agent-DNN system should be able to effectively reconstruct or infer properties of *new, unseen* 1D signals, demonstrating that the agents have learned robust data selection policies.

**Implementation Details & Training Strategy:**

1.  **Framework:**
    *   The implementation of the agents (policies), the DNN, and the training loop will primarily utilize the **PyTorch** library.

2.  **Data Source (1D Signals - Music):**
    *   The 1D signals will be sourced from musical audio.
    *   **Potential Databases/Sources:**
        *   **Simple Synthetic Music:** Initially, generate simple monophonic melodies (e.g., single notes, basic scales, simple rhythms) using Python libraries like `mingus` or by directly synthesizing sine waves. This allows for high control over complexity.
        *   **Public Domain MIDI Databases:** Collections like the "Classical Piano MIDI Database" (search for "Kunstderfuge" or "Classical Archives" for free MIDI files) can be used. MIDI files can be converted to 1D audio signals using synthesizers (e.g., `fluidsynth` along with a soundfont).
        *   **Audio Snippet Datasets:** For more complex signals, datasets like:
            *   **GTZAN Genre Collection:** (Though be mindful of copyright if using directly for published research, excerpts for experimentation might be okay). Contains varied musical genres.
            *   **Free Music Archive (FMA):** A large dataset of Creative Commons licensed music, offering various levels of complexity. `FMA-small` or `FMA-medium` could be good starting points.
            *   Consider using libraries like `librosa` for loading, analyzing, and transforming audio signals.

3.  **Training Curriculum (The "Ear" Development):**
    *   A curriculum learning approach will be adopted to gradually increase the complexity of the 1D signals presented to the agent-DNN system. This mimics how one might develop an "ear" for music:
        *   **Phase 1 (Simple Foundations):** Start with very simple, possibly synthetic, monophonic musical signals (e.g., single sustained notes, basic scales, simple rhythmic patterns). The goal is for the agents and DNN to learn the fundamental task of path selection and reconstruction in a highly constrained environment.
        *   **Phase 2 (Basic Melodies & Rhythms):** Progress to simple melodies with clear rhythmic structures, perhaps from simple folk songs or children's music (e.g., from MIDI sources).
        *   **Phase 3 (Increasing Complexity):** Introduce more complex monophonic or sparsely polyphonic music with a wider range of notes, rhythms, and basic timbral variations.
        *   **Phase 4 (Rich Signals):** Move towards more complex musical pieces, potentially including multiple instruments (polyphony) and richer timbres, sourced from datasets like FMA or GTZAN.
    *   The transition between phases can be based on achieving certain performance benchmarks on the current complexity level.

**Future Considerations (Advanced):**
*   Hierarchical agent structures: A higher-level agent guiding the selection or composition of the $K$ active agents.
*   More complex agent observations, including direct features from the paths.
*   Dynamic $K$ (number of selected paths) as part of the agent decision.

This setup provides a rich environment for studying multi-agent coordination, learnable attention/information selection, and the co-evolution of data-processing pipelines. 