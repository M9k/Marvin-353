import React from 'react';
import { Image } from 'react-bootstrap';
import Header from './global/Header';

const Help = () => {
  document.title = 'Help - Marvin';
  return (
    <div className="page-help">
      <Header />
      <h1 className="title">Help</h1>
      <h2>What it is Marvin?</h2>
      Marvin is a ÐApp for universities, teachers and students.
      <h2>What software do I need to use Marvin?</h2>
      You need:
      <ul>
        <li>A computer with <a href="https://www.google.com/intl/en/chrome/">Chrome</a> or <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a> browser installe;</li>
        <li>A MetaMask digital wallet</li>
      </ul>
      <h2>How do I install MetaMask?</h2>
      <ul>
        <li>If you use Chrome, go <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">here</a> and click &quot;Add to Chrome&quot;. Or, if you use Firefox go <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/">here</a> and click &quot;Add to Firefox&quot;<br />
          <Image alt="" src="/media/help/MetamaskAddToFirefox1.jpg" rounded responsive />
        </li>
        <li>Click &quot;Add Extension&quot; on the pop-up<br />
          <Image alt="" src="/media/help/MetamaskAddToFirefox2.jpg" rounded responsive />
        </li>
        <li>Accept the Privacy Policy and agree to the TOS</li>
        <li>Set up your MetaMask account clicked on the plug-in icon</li>
        <li>Set up a new password, it will be required to unlock the account<br />
          <Image alt="" src="/media/help/MetamaskAddToFirefox3.jpg" rounded responsive />
        </li>
        <li>
          Copy the 12 seed words and file them away somewhere safe
          (this helps to secure your account)<br />
          <Image alt="" src="/media/help/MetamaskAddToFirefox4.jpg" rounded responsive />
        </li>
      </ul>
      <p>
        Note: for security purposes, MetaMask browser extensions will periodically request
        that you log back in to your account.
      </p>
      <h2>How do I unlock MetaMask</h2>
      <p>
        Click on the MetaMask plug-in icon and inset the password.
        Then, press &#39;Unlock&#39;.<br />
        <Image alt="" src="/media/help/MetamaskAddToFirefoxUnlock.jpg" rounded responsive />
      </p>
      <h2>How can I logout from Marvin?</h2>
      <p>To logout from Marvin, you have to logout from MetaMask:
        <ul>
          <li>Click on MetaMask plug-in icon</li>
          <li>Click on the menu button in the top right corner</li>
          <li>Click &#39;Log Out&#39;</li>
        </ul>
        <Image alt="" src="/media/help/MetamaskAddToFirefoxLock.jpg" rounded responsive />
      </p>
    </div>
  );
};

export default Help;
