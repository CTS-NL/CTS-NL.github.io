---
layout: page
sidebar: left
title: "Join Slack"
header:
    image:  "logo.png"
    pattern:  "header-texture.png"
meta_title: "Join our slack channel"
permalink: "/slack/"
---
You are invited to join the conversations on the [CTS-NL Slack](https://ctsnl.slack.com). To start we will need your
email address so we can send you an invite.

<div id="slack-loading">
  Loading Slack invite form, this may take a few minutes.
  <div class="loader">Loading...</div>
</div>

<div id="slack-invite-wrapper">
  <iframe
    id="slack-invite"
    src="https://slackin-rlkechfnaa.now.sh/"
    height="1000"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
  >
    Loading Form...
  </iframe>
</div>

<script type="text/javascript">
  $(function() {
    $("#slack-invite").load(function() {
      $("#slack-loading").hide();
      $("#slack-invite").show();
    });
  });
</script>
