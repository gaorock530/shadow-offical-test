import React from 'react';
// import easeInOutCubic from 'helper/ease';
import anime from 'animejs';

const DIFF = 50;  
const HEIGHT = 200;
const DELAY = 50;

export default class Header extends React.PureComponent {
  constructor (props) {
    super(props);
    this.prevScrollY = window.scrollY || 0;
    this.headerShow = true;
    this.scrollYDiff = 0;
    this.timer = null;
    this.init = true;
    this.open = false;
    this.body = document.querySelector('html');
    this.bodyTop = 0;
    this.navTop = 0;
  }

  

  get isMobile () {
    return !window;
  }

  componentDidMount () {
    if (this.isMobile) return;
    this.HEIGHT = this.header.offsetHeight || HEIGHT;
    window.addEventListener('scroll', this.pageScroll);
  }

  componentWillUnmount () {
    if (this.isMobile) return;
    window.removeEventListener('scroll', this.pageScroll);
  }

  pageScroll = (e) => {
    if (this.isMobile) return;
    this.scrollYDiff += Math.abs(window.scrollY - this.prevScrollY);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.pageLogic, DELAY);
  }

  pageLogic = () => {
    if ((window.scrollY > this.prevScrollY && this.scrollYDiff >= DIFF) && window.scrollY >= this.HEIGHT && this.headerShow) {
      if (this.init) this.init = false;
      else  this.hideHeader();//requestAnimationFrame(this.handleNav.bind(this, 'hide'));
    } else if (window.scrollY < this.prevScrollY && (this.scrollYDiff >= DIFF || window.scrollY <= this.HEIGHT || window.scrollY === 0) && !this.headerShow) {
       this.showHeader(); //requestAnimationFrame(this.handleNav.bind(this, 'show'));
    }
    this.timer = null;
    this.prevScrollY = window.scrollY;
  }

  // handleNav = (state, timestamp) => {
  //   if (!this.count) this.count = timestamp;
  //   const progress = timestamp - this.count;
  //   if (state === 'hide' && this.navTop > -95) {
  //     this.navTop = easeInOutCubic(progress, 0, -95, 500);
  //     this.headerShow = false;
  //   } else if (state === 'show' && this.navTop < 0) {
  //     this.navTop = easeInOutCubic(progress, -95, 95, 500);
  //     this.headerShow = true;
  //   } else {
  //     this.count = null;
  //     this.timer = null;
  //     return cancelAnimationFrame(this.handleNav);
  //   }
  //   this.header.style.transform = `translateY(${this.navTop}px)`;
  //   requestAnimationFrame(this.handleNav.bind(this, state));

  // }

  hideHeader = () => {
    this.headerShow = false;
    anime({
      targets: [this.header],
      translateY: -95,
      duration: 300,
      easing: 'easeInCubic',
    })
  }
  showHeader = () => {
    this.headerShow = true;
    anime({
      targets: [this.header],
      translateY: 0,
      duration: 300,
      easing: 'easeOutCubic',
    })
  }


  /**
   * 
   */
  clickBar = (e) => {
    this.open = !this.open;
    if (this.open) {
      e.target.classList.add('close');
      this.nav.classList.add('open');
      this.bodyTop = window.scrollY;
      this.body.classList.add('frozen');
    } else {
      e.target.classList.remove('close');
      this.nav.classList.remove('open');
      this.body.removeAttribute('class');
      window.scrollTo({top: this.bodyTop})
    }
  }

  render () {
    return (
      <header ref={el => this.header = el}>
        <div className="header_wrapper">
          <div className="header-item header-logo">ShadowStrike</div>
          <div className="header-item header-nav" ref={el => this.nav = el}>
            <a href="/">技术</a>
            <a href="/" className="soon">服务</a>
            <a href="/">产品</a>
            <a href="/" className="soon">APIs</a>
            <a href="/" className="active">Play Ground</a>
          </div>
          <div className="minibar" onClick={this.clickBar}></div>
        </div>
      </header>
    )
  }
}