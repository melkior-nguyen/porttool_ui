import { Box } from '@mui/material'
import React, { MouseEventHandler, useState, useRef, useEffect } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { AppColors } from '../../AppColor';
import { AppText } from '../../AppText';

function AppTooltip({ widthIcon, iconColor, position, message }: any) {
  const [activeTooltip, setActiveTooltip] = useState<boolean>(false)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({ opacity: 0, transform: 'translate(-50%, 0)' });
  const [tooltipTransform, setTooltipTransform] = useState<string[]>([])
  const [arrowPosition, setArrowPosition] = useState<string>('')
  const iconRef = useRef<HTMLDivElement>(null);


  const handleClickOutside = (event: MouseEvent) => {
    if (
      iconRef.current &&
      !iconRef.current.contains(event.target as Node)
    ) {
      setActiveTooltip(false);
    }
  };

  useEffect(() => {
    // Thêm sự kiện click lắng nghe trên document khi component được mount
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup sự kiện khi component bị unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (position === 'left') {
      setTooltipTransform(['translate(-25%, 0)', '-50% 100%'])
      setArrowPosition('25%')
    } else if (position === 'right') {
      setTooltipTransform(['translate(-75%, 0)', '50% 100%'])
      setArrowPosition('75%')
    } else {
      setTooltipTransform(['translate(-50%, 0)', '0% 100%'])
      setArrowPosition('50%')
    }
  }, [position]);

  useEffect(() => {
    // Update style when activeTooltip changes
    setTooltipStyle({
      opacity: activeTooltip ? 1 : 0,
      scale: activeTooltip ? '100%' : '10%',
      transform: tooltipTransform[0],
      transformOrigin: tooltipTransform[1],
      transition: 'all 0.2s ease'
    });
  }, [activeTooltip]);



  return (
    <>
      <Box sx={{
        width: widthIcon, aspectRatio: '1', position: 'relative',
        "& svg": {
          width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', color: iconColor,
          cursor: 'pointer',
        }
      }} ref={iconRef} onClick={() => setActiveTooltip(!activeTooltip)} >
        <AiOutlineQuestionCircle />
        {activeTooltip &&
          <Box sx={{
            position: 'absolute', bottom: 'calc(100% + 12px)', left: '0px', border: `1px solid ${AppColors.main.primary}`,
            maxWidth: '400px', width: 'max-content', backgroundColor: AppColors.sidebar.background, borderRadius: '4px',
            padding: '6px', wordWrap: 'break-word', ...tooltipStyle, ...AppText.Caption,
            "&::after": {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: arrowPosition,
              borderTop: `10px solid ${AppColors.main.primary}`,
              borderBottom: '0px solid red',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
            }
          }}>
            {message}
          </Box>
        }
      </Box>
    </>
  )
}

export default AppTooltip
