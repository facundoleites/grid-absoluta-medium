import React,{useContext, useState, useEffect} from 'react';
import { GridContext } from '../Grid';
import styled from 'styled-components';
/**
 *
 *
 * @param {Object} props
 * @param {String} props.as elemento a ser utilizado pelo Container
 */
export const Container = (
    {
        as,
        className,
        ...outrasProps
    }
)=>{
    const {tamanhoColunas} = useContext(GridContext);
    const [esteTamanho, setEsteTamanho] = useState(tamanhoColunas);
    useEffect(
        ()=>{
            setEsteTamanho(tamanhoColunas);
        },
        [tamanhoColunas]
    )
    return(
        <StyledContainer
            as={as}
            className={
                [
                    'GridContainer',
                    className
                ].join(' ')
            }
            tamanhoColunas={esteTamanho}
            {...outrasProps}
        />
    );
}
Container.defaultProps = {
    as:'div'
}

//usamos a propiedade tamanhoColunas para gerar o estilo deste container
const StyledContainer = styled.div`
    ${({tamanhoColunas})=> `grid-template-columns:repeat( auto-fit, ${tamanhoColunas}px );`}
`