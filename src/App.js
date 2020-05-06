import React from 'react';
import { Grid, GridWrapper } from './GridAbsoluta/Grid';
import { Container } from './GridAbsoluta/Container/Container';
import { Coluna } from './GridAbsoluta/Coluna/Coluna';
import './minhaGrid.min.css'; //estilo da grid gerado na parte sass
const Home = ()=>{
  return(
    <GridWrapper>
      <Container>
        <Coluna Mb={1} Sm={3} Lg={6}>
          Mb={1} Sm={3} Lg={6}
        </Coluna>
        <Coluna Mb={1} Sm={3} Lg={6} MbOffset={1} SmOffset={3} LgOffset={6} MbV={2} MbAlinharV={'Auto'}>
          Mb={1} Sm={3} Lg={6} MbOffset={1} SmOffset={3} LgOffset={6} MbV={2} MbAlinharV={'Auto'}
        </Coluna>
        <Coluna Mb={1} Sm={3} Lg={6}>
          <Container>
            <Coluna Mb={1} Sm={3} Lg={6}>
              Mb={1} Sm={3} Lg={6} / container / Mb={1} Sm={3} Lg={6}
            </Coluna>
            <Coluna Mb={1} Sm={3} Lg={6}>
              Mb={1} Sm={3} Lg={6} / container / Mb={1} Sm={3} Lg={6}
            </Coluna>
          </Container>
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