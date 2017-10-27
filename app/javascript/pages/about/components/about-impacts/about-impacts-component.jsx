import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import { lory } from 'lory.js';
import Script from 'react-load-script';
import Dotdotdot from 'react-dotdotdot';

import ButtonRegular from '../../../general/components/ButtonRegular';
import ButtonArrow from '../../../general/components/ButtonArrow';
import SliderDots from '../../../general/components/SliderDots';

class AboutImpacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slider: null,
      sliderPrevIsVisible: false,
      sliderNextIsVisible: true,
      sliderDotsSelected: 0,
    };
  }

  componentDidMount() {
    this.props.fetchData();
  }


  setWidget() {
    const slider = document.querySelector('.c-about-impacts .js_slider');
    this.setState({
      slider: lory(slider, {
        enableMouseEvents: true,
        slideSpeed: 500
      })
    });

    slider.addEventListener('after.lory.slide', () => {
      this.checkButtonsVisibility();
      this.checkDots();
    });
    slider.addEventListener('on.lory.resize', () => {
      this.checkButtonsVisibility();
      this.checkDots();
    });
  }

  checkButtonsVisibility () {
    const currentIndex = this.state.slider.returnIndex();
    this.setState({ sliderPrevIsVisible: currentIndex !== 0 });
    this.setState({ sliderNextIsVisible: currentIndex !== this.props.impacts.length - 2 });
  };

  checkDots () {
    const currentIndex = this.state.slider.returnIndex();
    this.setState({ sliderDotsSelected: currentIndex });
  };

  onClickPrevSlide = () => {
    this.state.slider.prev();
  };

  onClickNextSlide = () => {
    this.state.slider.next();
  };

  onClickDots = (e) => {
    this.state.slider.slideTo(parseInt(e.currentTarget.dataset.index));
  };

  render() {
    const slidePrevVisibilityClass = `c-about-impacts__arrow-button -left ${!this.state.sliderPrevIsVisible ? '-hidden' : ''} js_slide_prev`;
    const slideNextVisibilityClass = `c-about-impacts__arrow-button -right ${!this.state.sliderNextIsVisible ? '-hidden' : ''} js_slide_next`;
    const { impacts } = this.props;
    return (
      <Element name="impacts" className="c-about-impacts">
        <Script url="http://libs.cartocdn.com/cartodb.js/v3/3.15/cartodb.js" onLoad={this.handleScriptLoad.bind(this)}/>
        <div className="row">
          <div className="small-12 columns">
            <div className="c-about-impacts__title text -title-xs -color-3">IMPACTS</div>
            <div className="slider js_slider">
              <div className="frame js_frame">
                <ul className="slides js_slides">
                  {impacts.map((item, i) =>
                    <li key={i} className={`slide js_slide ${i === 0 ? 'active' : ''}`}>
                      <div className="c-about-impacts-item">
                        <div className="c-about-impacts-item__image" style={{backgroundImage: `url(${item.image})`}}>
                          <span>{item.image_credit}</span>
                        </div>
                        <div className="c-about-impacts-item__paragraph text -paragraph -color-2"><Dotdotdot clamp={3}>{item.outcome}</Dotdotdot></div>
                        <div className="c-about-impacts-item__button">
                          <ButtonRegular text="READ MORE" color="green" url={item.link} />
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
                <div className={slidePrevVisibilityClass} onClick={this.onClickPrevSlide}>
                  <ButtonArrow orientation="left" />
                </div>
                <div className={slideNextVisibilityClass} onClick={this.onClickNextSlide}>
                  <ButtonArrow orientation="right" />
                </div>
              </div>
              <div className="c-about-impacts__slider-dots js_slider_dots">
                <SliderDots
                  count={this.props.impacts.length}
                  selected={this.state.sliderDotsSelected}
                  color="green"
                  callback={this.onClickDots.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </Element>
    );
  }
}

AboutImpacts.propTypes = {
  impacts: PropTypes.array.isRequired,
}

export default AboutImpacts;
