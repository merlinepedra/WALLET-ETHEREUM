import React from 'react';
import BigNumber from 'bignumber.js/bignumber';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { config } from 'config'
import web3 from 'web3';

import 'styles/Dapp.css';

const numeral = require('numeral');

const _check404 = (image_url) => {
  try {
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status !== 404;
  } catch (e) {
    console.clear();
  }
}

const _getBalanceLabel = (quantity, decimals, format) => {
  const zeroes = (!decimals) ? 0 : Number(decimals);
  return numeral(new BigNumber(quantity).dividedBy(Math.pow(10, zeroes)).toNumber()).format(format);
}

/**
* @summary renders a post in the timeline
*/
const Token = (props) => {
  let balance;
  if (!props.noFormatting) {
    const format = props.displayDecimals ? '0,0.0000' : '0,0.[00]'
    balance = _getBalanceLabel(props.quantity, props.decimals, format);
  } else {
    balance = props.quantity
  }

  let imageExists = false;
  let image;
  if (props.publicAddress) {
    image = `${config.web.icons.replace('{{publicAddress}}', web3.utils.toChecksumAddress(props.publicAddress))}`;
    imageExists = _check404(image);
  }

  const tokenLink = (
    <Link to={`/token/${props.symbol.toLowerCase()}`} className="token-ticker" onClick={(e) => { e.stopPropagation(); }}>
      {(props.publicAddress && imageExists) ?
        <img className="token-icon" src={image} alt="" />
        :
        null
      }
      {props.symbol}
    </Link>
  );

  return (
    <div className="token">
      {(props.symbol !== 'SHARES') ?
        tokenLink
        :
        null
      }
      <div className="token-balance">
        <div className="token-score">
          {balance}
        </div>
      </div>
    </div>
  );
};

Token.propTypes = {
  quantity: PropTypes.string,
  publicAddress: PropTypes.string,
  symbol: PropTypes.string,
  decimals: PropTypes.string,
  displayDecimals: PropTypes.bool,
  noFormatting: PropTypes.bool,
};

export default Token;
export const getBalanceLabel = _getBalanceLabel;
export const check404 = _check404;