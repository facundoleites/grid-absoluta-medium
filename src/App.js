import React from 'react';
import { Grid, GridWrapper } from './GridAbsoluta/Grid';
import { Container } from './GridAbsoluta/Container/Container';
import { Coluna } from './GridAbsoluta/Coluna/Coluna';
import './minhaGrid.min.css'; //estilo da grid gerado na parte sass
const Home = ()=>{
  return(
    <GridWrapper>
      <Container>
        <Coluna Mb={2} Sm={6} Lg={12}>
          <h1>Lorem ipsum</h1>
        </Coluna>
        <Coluna Mb={2} Sm={4} Lg={8} SmOffset={1} as='p' className={'lead'} >
          Vangelis vanquish the impossible a billion trillion explorations rich in mystery Sea of Tranquility.
        </Coluna>
        <Coluna Mb={2} Sm={3} Lg={6} Xl={3} SmV={2} LgV={'auto'} as={'div'} SmAlinharV={'texto'} MbOffset={0} className={'blockquoteContainer'}>
          <Container>
            <Coluna Mb={2} Sm={3} Lg={6} Xl={3} as='blockquote'>
              <p>Hundreds of thousands encyclopaedia galactica trillion star stuff harvesting star light a very small stage in a vast cosmic arena something incredible is waiting to be known. The carbon in our apple pies muse about permanence of the stars ship of the imagination rings of Uranus citizens of distant epochs. Across the centuries from which we spring bits of moving fluff network of wormholes the only home we've ever known a still more glorious dawn awaits.</p>
            </Coluna>
            <Coluna Mb={2} Sm={2} Lg={5} Xl={2} as='p' SmOffset={1} MbAlinhar={'direita'}>
              <em>Rich in mystery rogue colonies billions</em>
            </Coluna>
          </Container>
        </Coluna>
        <Coluna Mb={2} Sm={3} Lg={6} Xl={3} as='p' SmAlinharV={'texto'}>
          Rich in mystery great turbulent clouds science realm of the galaxies rich in heavy atoms across the centuries. Made in the interiors of collapsing stars vastness is bearable only through love courage of our questions dream of the mind's eye intelligent beings intelligent beings. Encyclopaedia galactica the only home we've ever known vanquish the impossible tingling of the spine citizens of distant epochs hearts of the stars. Gathered by gravity a still more glorious dawn awaits concept of the number one with pretty stories for which there's little good evidence are creatures of the cosmos vanquish the impossible.
        </Coluna>
        <Coluna Mb={2} Sm={6} Lg={4} Xl={6} XlV={2} SmV={2} SmAlinharV={'superior'}>
          <Container as='figure'>
            <Coluna as='img' Mb={2} Sm={6} Lg={4} Xl={6} alt={"Astronauta na lua"} src={`${process.env.PUBLIC_URL}/S72-55300_medium.jpg`}/>
            <Coluna as='figcaption' Mb={2} Sm={6} Lg={4} Xl={6}>
              <p>S72-55300 (13 Dec. 1972) --- The two moon-exploring Apollo 17 crewmen are seen standing near the deployed U.S. flag during the third extravehicular activity (EVA) at the Taurus-Littrow landing site, in this black and white reproduction made from a color television transmission made by the color RCA TV camera mounted on the Lunar Roving Vehicle. They are astronaut Eugene A. Cernan (on left), commander; and scientist-astronaut Harrison H. Schmitt, lunar module pilot. Astronaut Ronald E. Evans, command module pilot, remained with the Apollo 17 Command and Service Modules in lunar orbit.</p>
            </Coluna>
          </Container>
        </Coluna>
        <Coluna Mb={2} Sm={3} Lg={4} Xl={3} as='p' SmAlinharV={'texto'}>
          Tendrils of gossamer clouds rings of Uranus descended from astronomers encyclopaedia galactica trillion star stuff harvesting star light? Extraordinary claims require extraordinary evidence network of wormholes extraplanetary the only home we've ever known take root and flourish a still more glorious dawn awaits. Courage of our questions the sky calls to us inconspicuous motes of rock and gas bits of moving fluff vanquish the impossible cosmic ocean? Cosmic ocean the only home we've ever known something incredible is waiting to be known the only home we've ever known cosmic ocean with pretty stories for which there's little good evidence.
        </Coluna>
        <Coluna Mb={2} Sm={3} Lg={4} Xl={3} as='p' SmAlinharV={'texto'}>
          Something incredible is waiting to be known Orion's sword vanquish the impossible of brilliant syntheses rich in mystery ship of the imagination? Great turbulent clouds take root and flourish a still more glorious dawn awaits from which we spring a very small stage in a vast cosmic arena dispassionate extraterrestrial observer. Inconspicuous motes of rock and gas brain is the seed of intelligence from which we spring globular star cluster are creatures of the cosmos rich in heavy atoms.
        </Coluna>
        <Coluna Mb={2} Sm={3} Lg={4} Xl={3} as='p' SmAlinharV={'texto'}>
          Another world hydrogen atoms trillion explorations two ghostly white figures in coveralls and helmets are soflty dancing tesseract? Vangelis Apollonius of Perga something incredible is waiting to be known star stuff harvesting star light tendrils of gossamer clouds hundreds of thousands. Permanence of the stars star stuff harvesting star light stirred by starlight the sky calls to us emerged into consciousness citizens of distant epochs? Preserve and cherish that pale blue dot not a sunrise but a galaxyrise stirred by starlight the sky calls to us dream of the mind's eye realm of the galaxies.
        </Coluna>
        <Coluna Mb={2} Sm={3} Lg={4} Xl={3} as='p' SmAlinharV={'texto'}>
          Flatland dispassionate extraterrestrial observer prime number at the edge of forever cosmic fugue stirred by starlight. Sea of Tranquility cosmic ocean rings of Uranus extraplanetary extraordinary claims require extraordinary evidence permanence of the stars? Two ghostly white figures in coveralls and helmets are soflty dancing two ghostly white figures in coveralls and helmets are soflty dancing from which we spring are creatures of the cosmos from which we spring something incredible is waiting to be known.
        </Coluna>
      </Container>
    </GridWrapper>
  )
}
function App() {
  return(
    <Grid
      /* definimos nossos breakpoints */
      breakpoints={
        [
          {
            prefixo:'Xl',
            tamanhoMinimo:1200,
            tamanhoMaximo:1200,
            quantidadeColunas:12,
            espacoColunas:32,
            margem:32*2,
            lineHeight:15,
            fontSize:10
          },
          {
            prefixo:'Lg',
            tamanhoMinimo:960,
            tamanhoMaximo:false,
            quantidadeColunas:12,
            espacoColunas:16,
            margem:16*2,
            lineHeight:15,
            fontSize:10
          },
          {
            prefixo:'Sm',
            tamanhoMinimo:450,
            tamanhoMaximo:false,
            quantidadeColunas:6,
            espacoColunas:16,
            margem:16*2,
            lineHeight:15,
            fontSize:10
          },
          {
            prefixo:'Mb',
            tamanhoMinimo:1,
            tamanhoMaximo:false,
            quantidadeColunas:2,
            espacoColunas:16,
            margem:16*2,
            lineHeight:15,
            fontSize:10
          }
        ]
      }
    >
      <Home/>
    </Grid>
  );
}
export default App;