import React from 'react';

const Html = (props) => (
<html lang="en">
<head>
  <title>Marvin</title>

  <meta charSet='utf-8' />
  <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="/main.css"/>
</head>
<body>
<div id="app"></div>
<script src="/bundle.js"></script>
</body>
</html>
);
export default Html;