---
layout: post
published: false   # hidden for now; change to true to publish this post
title: "Tutorial: the per-unit system"
description: Why power engineers normalise quantities, and how to change base.
tags: [tutorial, power-systems, math]
---

Power systems span several voltage levels, so raw ohms and amperes are awkward to compare. The **per-unit (p.u.) system** divides every quantity by a chosen *base* value.

$$
\text{quantity in p.u.} = \frac{\text{actual quantity}}{\text{base value of that quantity}}
$$

## Choosing bases

Pick two bases, a three-phase power base $$S_{\text{base}}$$ and a line-to-line voltage base $$V_{\text{base}}$$. The others follow:

$$
I_{\text{base}} = \frac{S_{\text{base}}}{\sqrt{3}\,V_{\text{base}}}, \qquad
Z_{\text{base}} = \frac{V_{\text{base}}^2}{S_{\text{base}}}
$$

## Example

A line has an impedance of $$Z = 4.84\ \Omega$$ at $$V_{\text{base}} = 22\ \text{kV}$$ with $$S_{\text{base}} = 100\ \text{MVA}$$.

$$
Z_{\text{base}} = \frac{(22\times10^{3})^2}{100\times10^{6}} = 4.84\ \Omega
\quad\Rightarrow\quad
Z_{\text{p.u.}} = \frac{4.84}{4.84} = 1.0\ \text{p.u.}
$$

## Changing base

Equipment ratings are given on their own bases. To refer an impedance to a new base:

$$
Z_{\text{p.u.}}^{\text{new}} = Z_{\text{p.u.}}^{\text{old}}
\left(\frac{V_{\text{base}}^{\text{old}}}{V_{\text{base}}^{\text{new}}}\right)^{2}
\frac{S_{\text{base}}^{\text{new}}}{S_{\text{base}}^{\text{old}}}
$$

A transformer's p.u. impedance is the same on both sides when each side uses its own voltage base, which is the main reason this system is used.
