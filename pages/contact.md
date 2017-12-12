---
layout: page
title: "Contact"
meta_title: "Contact CTS-NL"
teaser: ""
header:
    image: "logo.png"
    pattern: "header-texture.jpg"
permalink: "/contact/"
---

Want to get in touch with us? Use this convenient form below of email us directly at
[computer.tech.society.nl@gmail.com](mailto:computer.tech.society.nl@gmail.com).

<form action="https://formspree.io/computer.tech.society.nl@gmail.com" method="POST">
	<input type="hidden" name="_next" value="{{site.url}}/contact-thankyou/">
	<input type="hidden" name="_format" value="plain" />
	<input type="text" name="_gotcha" style="display:none" />
	<input type="text" name="name" placeholder="Your Name"/>
	<input type="email" name="email" placeholder="Your Email Address"/>
	<input type="text" name="_subject" placeholder="Subject" />
	<textarea rows="10" name="message" placeholder="Message"></textarea>
	<button type="submit" class="expanded">Send Email</button>
</form>
