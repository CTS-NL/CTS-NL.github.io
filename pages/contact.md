---
layout: page
title: "Contact"
meta_title: "Contact CTS-NL"
teaser: ""
header:
    image: "logo.png"
    pattern: "header-texture.png"
permalink: "/contact/"
---

Want to get in touch with us? Use this convenient form below of email us directly at
[contact@ctsnl.ca](mailto:contact@ctsnl.ca).

<form id="contact-form" action="" method="POST">
	<input type="hidden" name="_next" value="{{site.url}}/contact-thankyou/">
	<input type="hidden" name="_format" value="plain" />
	<input type="text" name="_gotcha" style="display:none" />
	<input type="text" name="name" placeholder="Your Name"/>
	<input type="email" name="email" placeholder="Your Email Address"/>
	<input type="text" name="_subject" placeholder="Subject" />
	<textarea rows="10" name="message" placeholder="Message"></textarea>
	<button id="contact-form-button" type="submit" class="expanded">Send Email</button>
</form>
<div style="display: none" id="contact-form-success">{% include alert text='Thanks! We will get back to you soon!' %}</div>
<div style="display: none" id="contact-form-error">{% include alert alert='Please try again, or contact us via the email address above!' %}</div>

<script>
  window.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("contact-form");
    var button = document.getElementById("contact-form-button");
    var status_success = document.getElementById("contact-form-success");
    var status_error = document.getElementById("contact-form-error");
    
    function success() {
      form.reset();
      status_error.style = "display: none";
      button.style = "display: none ";
      status_success.style = "display: block";
    }

    function error() {
      status_success.style = "display: none";
      status_error.style = "display: block";
      status.innerHTML = "Oops! There was a problem.";
    }

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      var action = atob("aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi94cWtnbnZybg==");
      ajax(form.method, action, data, success, error);
    });
  });
  
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
</script>
