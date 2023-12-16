import React, { useEffect, useState, useRef, useMemo } from 'react';
import StorySlide from '../../../ResusableComponents/StoryScreens/StorySlide';

const HonestyScreen = ({route}) => {
    console.log(`I starts from here`)
    const storySlidesArray = route.params?.mainArrayData;
    const rightOptionSlidesData = route.params?.rightOptionData
    const wrongOptionSlidesData = route.params?.wrongOptionData
     
    return(
        <StorySlide storySlidesArrayData={storySlidesArray} rightOptionSlidesData={rightOptionSlidesData} wrongOptionSlidesData={wrongOptionSlidesData}></StorySlide>
    )
}
 
export default HonestyScreen;