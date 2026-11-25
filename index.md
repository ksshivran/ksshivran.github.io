---
layout: default
title: About
---

<!-- Top block: photo, name, links. Edit the text freely. -->
<div class="intro">
  <img src="/assets/profile.jpg" alt="Kuldeep Singh Shivran">
  <div>
    <h1>Kuldeep Singh Shivran</h1>
    <p>PhD Researcher, Department of Electrical Engineering<br>Indian Institute of Science (IISc), Bengaluru, India</p>
    <p class="links">
      <a href="mailto:{{ site.email }}">Email</a>
      <a href="https://github.com/{{ site.github_username }}">GitHub</a>
      <a href="https://linkedin.com/in/{{ site.linkedin_username }}">LinkedIn</a>
    </p>
  </div>
</div>

## About

I am a PhD researcher (M.Tech. (Res) and PhD) at IISc Bengaluru working on **cyber-physical security of electric grids**, advised by Prof. Sarasij Das. My research spans substation security, Bayesian attack graphs and grid impact analysis for cyber-physical attacks on substations, signal processing, and stability analysis.

I am seeking a **researcher role** in cyber-physical security, resilience, stability, and control of electric grids, where I can contribute to and develop my expertise in addressing current and emerging challenges in the secure and sustainable delivery of power from generation to end users.

## Research interests

Cyber-physical security of power grids · Stability and Control · Risk analysis and resilience · Load forecasting

## Education

- **M.Tech.(Res) and PhD, Electrical Engineering**, Indian Institute of Science, Bengaluru (2020 – present)
- **B.Tech, Electrical and Electronics Engineering**, NIT Meghalaya (2012 – 2016)

## News

<ul class="news">
{% for n in site.data.news limit:4 %}
  <li><span class="date">{{ n.date }}</span> {{ n.text }}</li>
{% endfor %}
</ul>

<p class="more"><a href="/publications/">Publications</a> &middot; <a href="/cv/">Full CV</a></p>
