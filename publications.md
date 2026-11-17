---
layout: default
title: Publications
---

# Publications

{% assign groups = "Journal,Conference,Patent" | split: "," %}
{% assign headings = "Journals,Conference Proceedings,Patents" | split: "," %}
{% for g in groups %}
## {{ headings[forloop.index0] }}

<ul class="pubs">
{% for p in site.data.publications %}{% if p.type == g %}
  {% include publication.html p=p %}
{% endif %}{% endfor %}
</ul>
{% endfor %}
