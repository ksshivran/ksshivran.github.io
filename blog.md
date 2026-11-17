---
layout: default
title: Blog
published: false   # hidden for now; change to true to show the Blog page
---

# Blog and tutorials

Notes and tutorials on power systems, cyber-physical security and the mathematics behind them.

<ul class="post-list">
{% for post in site.posts %}
  <li>
    <a class="post-title" href="{{ post.url }}">{{ post.title }}</a>
    <div class="meta">{{ post.date | date: "%-d %B %Y" }}{% for t in post.tags %} <span class="tag">{{ t }}</span>{% endfor %}</div>
    {% if post.description %}<div>{{ post.description }}</div>{% endif %}
  </li>
{% endfor %}
</ul>
