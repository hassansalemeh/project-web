
import { Carousel } from 'antd';
import image1 from './IMAGE2.jpg'
import image2 from './IMAGE1.webp'
import image3 from './IMAGE3.jpg'

const divGeneralStyle = {
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh',
  with:'100%',
  display: 'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  border: '1px solid black',
};

const image11 ={backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),url(${image1})`,}
const image22 ={backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),url(${image2})`,}
const image33 ={backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),url(${image3})`,}


const slide1 = { ...divGeneralStyle, ...image11 };
const slide2 = { ...divGeneralStyle, ...image22 };
const slide3 = { ...divGeneralStyle, ...image33 };


const typo ={
  h1:{color:'#57c1ff',fontFamily:'Montserrat'},
  h2:{color:'#fafafa',fontFamily:'Montserrat'},
  divider:{
    width: '40%',
    backgroundColor: '#FFFF',
    height: '4px',
    margin: '8px 0',
    transition: 'width 0.3s ease',
  },
}



const App = () => (
  <Carousel autoplay>
    <div>
      <div style={slide1}>
        <h1 style={typo.h1}>LITHIUM POWER</h1>
        <div style={typo.divider}></div>
        <h2 style={typo.h2}>Your Energy Solutions</h2>
      </div>
    </div>

    <div>
      <div style={slide2}>
        <h1 style={typo.h1}>LITHIUM POWER</h1>
        <div style={typo.divider}></div>
        <h2 style={typo.h2}>Your Energy Solutions</h2>
      </div>
    </div>

    <div>
      <div style={slide3}>
        <h1 style={typo.h1}>LITHIUM POWER</h1>
        <div style={typo.divider}></div>
        <h2 style={typo.h2}>Your Energy Solutions</h2>
      </div>
    </div>

  </Carousel>
);

export default App;
