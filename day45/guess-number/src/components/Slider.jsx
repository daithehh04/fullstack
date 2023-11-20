import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from '@chakra-ui/react'
import {useState } from 'react'
import { useSelector } from '../core/useSelector'
import { getLocalStorage } from '../utils/localStorage'

export default function SliderThumbWithTooltip() {
  let RANGE_NUMBER = getLocalStorage('RANGE_NUMBER')
  if(Array.isArray(RANGE_NUMBER) && !RANGE_NUMBER.length ) {
    RANGE_NUMBER = 100
  }
  const [sliderValue, setSliderValue] = useState(RANGE_NUMBER)
  const [showTooltip, setShowTooltip] = useState(false)
  const {dispatch} = useSelector()
  const handleChangeSlider = (v) => {
    dispatch({
      type: 'SET_NUMBER',
      payload: v
    })
    setSliderValue(v)
  }
  return (
    <Slider
      mt={4}
      id='slider'
      defaultValue={sliderValue}
      min={0}
      max={2048}
      colorScheme='teal'
      onChangeEnd={(v) => handleChangeSlider(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={100} mt='1' ml={-2.5} fontSize='sm'>
        100
      </SliderMark>
      <SliderMark value={512} mt='1' ml={-2.5} fontSize='sm'>
        512
      </SliderMark>
      <SliderMark value={1024} mt='1' ml={-2.5} fontSize='sm'>
        1024
      </SliderMark>
      <SliderMark value={1536} mt='1' ml={-2.5} fontSize='sm'>
        1536
      </SliderMark>
      <SliderMark value={2048} mt='1' ml={-30} fontSize='sm'>
        2048
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg='teal.500'
        color='white'
        placement='top'
        isOpen={showTooltip}
        label={sliderValue}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  )
}