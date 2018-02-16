import React from 'react';
import ButtonPrice from './buttons/ButtonPrice';
import Header from './global/Header';

const Help = () => {
  document.title = 'Marvin - Help';
  return (
    <div className="page-home">
      <Header>
        <ButtonPrice />
        <span className="btn btn-default-select">Help</span>
      </Header>
      <h1 className="title">Help</h1>
      <h2>What it is Marvin?</h2>
      Marvin is a ÐApp for universities, teachers and students.
      <h2>What software do I need to use Marvin?</h2>
      You need:
      <ul>
        <li>A computer with <a href="https://www.google.com/intl/en/chrome/">Chrome</a> or <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a> browser install;</li>
        <li>A MetaMask digital wallet.</li>
      </ul>
      <h2>How do I install MetaMask?</h2>
      <ul>
        <li>If you use Chrome, go <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">here</a> and click &quot;Add to Chrome&quot;. Or, if you use Firefox go <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/">here</a> and click &quot;Add to Firefox&quot;;</li>
        <li>Click &quot;Add Extension&quot; on the pop-up;</li>
        <li>Accept the Privacy Policy and agree to the TOS;</li>
        <li>Set up your MetaMask account;</li>
        <li>Copy the 12 seed words and file them away somewhere safe (this helps to secure your account).</li>
      </ul>
      <p>Note: for security purposes, MetaMask browser extensions will periodically request that you log back in to your account.</p>
    </div>
  );
};

export default Help;
