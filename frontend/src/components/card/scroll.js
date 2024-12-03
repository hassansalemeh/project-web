// MainComponent.js
// import React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import CardComponent from './card';
// import cardData from './cardData.json';

// const MainComponent = () => {
//   return (
//     <List
//       sx={{
//         display: 'flex',
//         overflowX: 'auto',
//         maxWidth: '100%',
//         bgcolor: 'background.paper',
//         maxHeight: 400,
//       }}
//       subheader={<li />}
//     >
//       {cardData.map((data) => (
//         <ListItem key={data.id} style={{ minWidth: 300 }}>
//           <CardComponent cardData={data} />
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default MainComponent;

// import React, { useRef } from 'react';
// import './scroll.css'; // Import your CSS file for styling
// import CardComponent from './card';
// import cardData from './cardData.json';

// const MainComponent = () => {
//   const listRef = useRef(null);

//   const handleScroll = (direction) => {
//     const scrollAmount = 500; // Adjust as needed
//     const currentScrollPosition = listRef.current.scrollLeft;

//     if (direction === 'left') {
//       listRef.current.scrollLeft = currentScrollPosition - scrollAmount;
//     } else if (direction === 'right') {
//       listRef.current.scrollLeft = currentScrollPosition + scrollAmount;
//     }
//   };

//   return (
//     <div className="main-container">
//       <button onClick={() => handleScroll('left')}>Scroll Left</button>
//       <div className="list-container" ref={listRef}>
//         {cardData.map((data) => (
//           <div key={data.id} className="list-item">
//             <CardComponent cardData={data} />
//           </div>
//         ))}
//       </div>
//       <button onClick={() => handleScroll('right')}>Scroll Right</button>
//     </div>
//   );
// };

// export default MainComponent;

// MainComponent.js
// import React, { useRef, useEffect, useState } from 'react';
// import './scroll.css';
// import CardComponent from './card'; // Updated import
// import cardData from './cardData.json'; 
// import IconButton from '@mui/material/IconButton';
// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

// const MainComponent = () => {
//   const listRef = useRef(null);
//   const [cardWidth, setCardWidth] = useState(0);
//   const [cardsPerPage, setCardsPerPage] = useState(1);

//   useEffect(() => {
//     if (listRef.current && listRef.current.firstChild) {
//       const firstCard = listRef.current.firstChild;
//       const cardStyle = window.getComputedStyle(firstCard);
//       const margin = parseFloat(cardStyle.marginRight);
//       const cardTotalWidth = firstCard.offsetWidth + margin;
//       setCardWidth(cardTotalWidth);

//       const containerWidth = listRef.current.clientWidth;
//       const newCardsPerPage = Math.floor(containerWidth / cardTotalWidth);
//       setCardsPerPage(newCardsPerPage);
//     }
//   }, []);

//   const handleScroll = (direction) => {
//     const scrollAmount = cardsPerPage * cardWidth;
//     const currentScrollPosition = listRef.current.scrollLeft;
//     const maxScroll = listRef.current.scrollWidth - listRef.current.clientWidth;

//     if (direction === 'left') {
//       listRef.current.scrollLeft = Math.max(currentScrollPosition - scrollAmount, 0);
//     } else if (direction === 'right') {
//       listRef.current.scrollLeft = Math.min(currentScrollPosition + scrollAmount, maxScroll);
//     }
//   };

//   return (
//     <div className="main-container">
//       <IconButton size="large" onClick={() => handleScroll('left')}>
//         <ArrowCircleLeftIcon fontSize="large" style={{ color: "#FFC857" }} />
//       </IconButton>
//       <div className="list-container" ref={listRef}>
//         {cardData.map((data) => (
//           <div key={data.id} className="list-item">
//             <CardComponent cardData={data} />
//           </div>
//         ))}
//       </div>
//       <IconButton size="large" onClick={() => handleScroll('right')}>
//         <ArrowCircleRightIcon fontSize="large" style={{ color: "#FFC857" }} />
//       </IconButton>
//     </div>
//   );
// };

// export default MainComponent;

import React, { useRef, useEffect, useState } from 'react';
import './scroll.css'; // Import your CSS file for styling
import CardComponent from './card';
// import cardData from './cardData.json';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import axios from 'axios';


const MainComponent = () => {
  const listRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1); // Number of cards visible on the screen
  const [solarPanels, setSolarPanels] = useState([]);

  useEffect(() => {
    (async () => {
      // Fetch the first 10 solar panels from your API
      try {
        const response = await axios.get('http://localhost:3000/solar-panel/solar-panels/first-10');
        setSolarPanels(response.data.data);

        // Calculate the width of one card and set it in the state
        if (listRef.current && listRef.current.firstChild) {
          const firstCard = listRef.current.firstChild;
          const cardStyle = window.getComputedStyle(firstCard);
          const margin = parseFloat(cardStyle.marginRight);
          const cardTotalWidth = firstCard.offsetWidth + margin;
          setCardWidth(cardTotalWidth);

          // Calculate the number of cards visible on the screen
          const containerWidth = listRef.current.clientWidth;
          const newCardsPerPage = Math.floor(containerWidth / cardTotalWidth);
          setCardsPerPage(newCardsPerPage);
        }
      } catch (error) {
        console.error('Error litihum batteries :', error.response?.data);
      }
    })();
  }, []); 

  const handleScroll = (direction) => {
    // const scrollAmount = cardsPerPage * cardWidth; // Scroll based on the number of cards visible
    const scrollAmount = cardWidth;
    const currentScrollPosition = listRef.current.scrollLeft;
    const maxScroll = listRef.current.scrollWidth - listRef.current.clientWidth;

    if (direction === 'left') {
      listRef.current.scrollLeft = Math.max(currentScrollPosition - scrollAmount, 0);
    } else if (direction === 'right') {
      listRef.current.scrollLeft = Math.min(currentScrollPosition + scrollAmount, maxScroll);
    }
  };
  return (
    <div className="main-container">
      <IconButton size="large" onClick={() => handleScroll('left')}>
         <ArrowCircleLeftIcon fontSize="large" style={{ color: "#57c1ff" }} />
       </IconButton>
      <div className="list-container" ref={listRef}>
      {solarPanels.map((solarPanel) => (
          <div key={solarPanel._id} className="list-item">
            <CardComponent cardData={solarPanel} />
          </div>
        ))}
      </div>
      <IconButton size="large" onClick={() => handleScroll('right')}>
         <ArrowCircleRightIcon fontSize="large" style={{ color: "#57c1ff" }} />
      </IconButton>
    </div>
  );
};

export default MainComponent;




