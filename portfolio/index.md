---
layout: page
title: Portfolio
---

<ul class="portfolio pure-g">
{% for file in site.data.portfolio reversed %}
  <li class="cube pure-u-1-2 pure-u-sm-1-3">
  <div class="card-wrap">
  	<div class="flip">
  		<img src="{{ file.img-thumb }}" alt="{{ file.caption }}" />
  	</div>
  	<div class="flop">
  		<h2>{{ file.caption }}</h2>
    	{% if file.description %}<p>{{ file.description }}</p>{% endif %}
  	</div>
  </div>
  </li>
{% endfor %}
</ul>