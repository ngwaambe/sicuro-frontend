import React, { useState } from 'react';
import styles from './InfoSlider.module.css';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';
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
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        const { t } = useTranslation("slider");
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.altText}>
                <img className={styles.carouselItemImage} src={item.src} alt={item.altText}/>
                <div className={styles.carouselCaption}>
                    <h2 className={styles.topTitle}><Trans>{t(item.captionLabel)}</Trans></h2>

                    <Trans>{t(item.captionText)}</Trans>
                </div>
            </CarouselItem>
        );
    });

    return (
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}>
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
                <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
            </Carousel>
    );
}
export default InfoSlider;