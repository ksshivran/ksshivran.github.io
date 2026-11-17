---
layout: post
published: false   # hidden for now; change to true to publish this post
title: "How to write maths in a post"
description: A cheat sheet for equations, code and tables on this site. Copy this file to start a new post.
tags: [howto, math]
---

This post is also a template. To write a new post, copy this file in `_posts/`, rename it `YYYY-MM-DD-your-title.md`, and change the lines between the `---` marks at the top.

## Equations

Put an expression between double dollar signs. In the middle of a sentence it is inline: the energy of a mass is $$E = mc^2$$.

On its own line it becomes a display equation:

$$
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$

Matrices and multi-line equations work too:

$$
\begin{aligned}
\mathbf{y} &= A\mathbf{x} + \mathbf{b} \\
\|\mathbf{y}\|_2 &\le \|A\|\,\|\mathbf{x}\|_2 + \|\mathbf{b}\|_2
\end{aligned}
$$

## Code

```python
import numpy as np
x = np.linspace(0, 1, 5)
print(np.sin(2 * np.pi * x))
```

## Tables

| Quantity | Symbol | Unit |
|----------|--------|------|
| Voltage  | $$V$$  | volt |
| Current  | $$I$$  | ampere |
