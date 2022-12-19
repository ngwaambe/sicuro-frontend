import React, { useState } from 'react';
import styles from './InfoSlider.module.css';
//import 'react-awesome-slider/dist/styles.css';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import {Trans , useTranslation} from 'next-i18next'

const items = [
    {
        src: 'img/slide-1.jpg',
        altText: 'Slide 1',
        captionLabel: 'slider1-label',
        captionText: 'slider1-text'
    },
    {
        src: 'img/slide-2.jpg',
        altText: 'Slide 2',
        captionLabel: 'slider2-label',
        captionText: 'slider2-text'
    },
    {
        src: 'img/slide-3.jpg',
        altText: 'Slide 3',
        captionLabel: 'slider3-label',
        captionText: 'slider3-text'
    },
    {
        src: 'img/slide-4.jpg',
        altText: 'Slide 4',
        captionLabel: 'slider4-label',
        captionText: 'slider4-text'
    },
    {
        src: 'img/slide-5.jpg',
        altText: 'Slide 5',
        captionLabel: 'slider5-label',
        captionText: 'slider5-text'
    }
];


const InfoSlider = () => {
    const AutoplaySlider = withAutoplay(AwesomeSlider)
    const slides = items.map((item) => {
        const { t } = useTranslation("slider");
        return (
            <div data-src={item.src} key={item.src}>
                <div className={styles.caption}>
                    <h2 className={styles.topTitle}><Trans>{t(item.captionLabel)}</Trans></h2>
                    <Trans>{t(item.captionText)}</Trans>
                </div>
            </div>
        );
    });

    return (
            <AutoplaySlider
              play={true}
              cancelOnInteraction={true}
              interval={1200}
              cssModule={styles}>
                {slides}
            </AutoplaySlider>
    );
}
export default InfoSlider;
