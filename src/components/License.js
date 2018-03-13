import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './global/Header';
import AccountTypes from './AccountEnum';

// Not found page component
const License = props => (
  <div className="license-page">
    <Header accountType={props.accountType !== null ? props.accountType : AccountTypes.NOTLOGGED} />
    <h1 className="title">The MIT License</h1>
    <p>Copyright 2018, <i>353</i></p>
    <p>
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software
      and associated documentation files (the &quot;Software&quot;), to deal in the Software without
      restriction, including without limitation the rights to use, copy, modify, merge, publish,
      distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom
      the Software is furnished to do so, subject to the following conditions:
    </p>
    <p>
      The above copyright notice and this permission notice shall be included in all copies or
      substantial portions of the Software.
    </p>
    <p>
      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
      INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
      PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
      ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
      ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    </p>
  </div>
);

License.propTypes = {
  accountType: PropTypes.oneOf(Object.values(AccountTypes)),
};

License.defaultProps = {
  accountType: AccountTypes.NOTLOGGED,
};

const mapStateToProps = state => ({
  accountType: state.user.role,
});

export default connect(mapStateToProps)(License);
