import React from 'react';
import githublogo from '../github.png'
import './header.css';

export default class Header extends React.Component {
  render() {
    return <>
      <div className="header">
        <a className="logo" href="/">Itgo</a>
        <a className="description" href="https://github.com/weboutin">
          <img src={githublogo} className="github-icon" alt={"git"} />
        </a>
      </div>
      <div className="headerEmpty"></div>
    </>
  }
}
