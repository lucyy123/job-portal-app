import { ArrowBack, ArrowForward ,MoreHoriz} from '@mui/icons-material';
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useRef, useState } from 'react';
import { carouselContent } from "../utils/constants";


const HeroCarousel = () => {
const scroolRef=useRef< HTMLDivElement | null>(null);


const [isAtStart, setIsAtStart] = useState<boolean>(true);
const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

const checkScrollPosition = () => {
  if (scroolRef.current) {
    const { scrollLeft, scrollWidth, clientWidth } = scroolRef.current;
    // if scroll left is equal to zero then it's mean it on start 
    setIsAtStart(scrollLeft === 0);
    // if scroo left + our tag width is greater or equalt othe scrool widht its mean it on end
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
  }
};

   

    const handleScroll =(direction:string)=> {
        const scrollAmount = 250;
        if (direction === "left") {
            
            scroolRef.current?.scrollBy({
                left:-scrollAmount,
                behavior:"smooth"
            })      //    scroolRef.current.scrollLeft -= scrollAmount;
            checkScrollPosition()
        } else {
            scroolRef.current?.scrollBy({
                left:scrollAmount,
                behavior:"smooth"
            })
            checkScrollPosition()
          }
    
        }


        useEffect(() => {
            checkScrollPosition(); // Perform an initial check on component mount
            
            // Add an event listener for window resize
            window.addEventListener('resize', checkScrollPosition);
          
            // Cleanup function to remove the event listener when component unmounts
            return () => {
              window.removeEventListener('resize', checkScrollPosition);
            };
          }, []); // Empty dependency array ensures this effect runs only once on mount
          
        

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}  >
      {/* ----------------- C A R O U S E L  C O N T E N T S------------------ */}
      <Stack direction={"row"} width={"60%"}>
        {/* ----------------- PREVIOUSE BUTTON------------------ */}
        <Button disabled={isAtStart
}
        onClick={()=> handleScroll("left")}>
          <ArrowBack></ArrowBack>
        </Button>
        {/* ----------------- CAROUSEL ITEMS------------------ */}

        <Stack
        ref={scroolRef}
          sx={{
            flexDirection:"row",
            overflowX: "auto",
            width:"95%",
            gap:"1rem",
            overflow:"hidden",
            whiteSpace:"nowrap",
            padding:"0.5rem 1rem",
            scrollBehavior:"smooth"
        
          }}
        > { carouselContent.map((ele) => (
            <Button key={ele}  variant="outlined" sx={{
                textTransform:"none",
                width: "250px !important",
              
                marginLeft:"1rem",
                flexShrink:0
            }}>{ele}</Button>
          ))
          }
        </Stack>

        {/* ----------------- NEXT BUTTON------------------ */}
     

        {
            isAtEnd ? (<Button><MoreHoriz></MoreHoriz></Button>) :(<Button  disabled={isAtEnd} onClick={()=> handleScroll("right")}>
            <ArrowForward></ArrowForward> 
         </Button>)
        }


      </Stack>
    </Box>
  );
};

export default HeroCarousel;
