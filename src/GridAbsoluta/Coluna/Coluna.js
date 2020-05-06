import React, { useContext, useState } from 'react';
import { AparelhoContext,BreakpointsContext } from '../Grid';
import useDeepCompareEffect from 'use-deep-compare-effect';
import styled from 'styled-components';
import { removerPropsDoObjeto, converterParaInicialMaiusculo } from '../helpers/helpers';

/**
 * Geramos as propriedades padrão do breakpoint escolhido
 *
 * @param {Breakpoint} breakpoint
 * @returns {Object}
 */
const gerarPropriedadesPadrao = (breakpoint)=>{
    const sufixos = {
        '': 1,
        'Offset':'auto',
        'Alinhar':'padrao',
        'V':'auto',
        'OffsetV':'auto',
        'AlinharV':'padrao'
    }
    let propsPadrao = {};
    Object.keys(sufixos).forEach(
        (esteSufixo)=>{
            propsPadrao[`${breakpoint.prefixo}${esteSufixo}`] = sufixos[esteSufixo];
        }
    )
    return propsPadrao;
}

/**
 * Verificar se o valor é texto ou numero, caso seja texto transforma ele para deixar a primera letra em maiusculo
 * 
 * @param {any} valor 
 * @returns {any}
 */
const transformarSeforTexto = (valor)=>{
    if(typeof valor === 'string'){
        return converterParaInicialMaiusculo(valor);
    }else{
        return valor;
    }
}

/**
 * Classe auxiliar da columna utilizando styled-components para utilizar os estilos verticais
 *
 * @param {Object} props
 * @param {String} props.configs string com os estilos css a serem incorporados na coluna
 */
const StyledColuna = styled.div`
    ${({configs})=> configs}
`;

/**
 *
 *
 * @param {Object} props
 * @param {String} props.as elemento a ser utilizado pela coluna
 */
export const Coluna = (
    {
        as,
        className,
        children,
        ...props
    }
)=>{
    const aparelhoAtual = useContext(AparelhoContext);
    const {
        breakpoint:breakpointsAtual,
        breakpointsProps
    } = useContext(BreakpointsContext);

    let propsDaColuna = {};
    breakpointsProps.forEach(
        (esteBreakpointProp)=>{
            propsDaColuna[esteBreakpointProp] = props[esteBreakpointProp];
        }
    )

    let outrasProps = removerPropsDoObjeto(props,Object.keys(propsDaColuna));

    const [configs,setConfigs] = useState({});
    const [styledConfigs,setStyledConfigs] = useState(null);

    useDeepCompareEffect(
        ()=>{
            if(aparelhoAtual && breakpointsAtual){
                let configs = {};
                let styledConfigs = {};
                let propsPadrao = gerarPropriedadesPadrao(breakpointsAtual[0]); // Geramos as propriedades do menor breakpoint como padrão
                const novasProps = {};
                Object.assign(novasProps,propsDaColuna);
                Object.keys(propsPadrao).forEach(
                    (estaChave)=>{
                        novasProps[estaChave] = propsDaColuna[estaChave] === undefined? propsPadrao[estaChave] : propsDaColuna[estaChave];
                    }
                )
                breakpointsAtual.forEach(
                    (esteBreakpoint)=>{
                        let prefixo = esteBreakpoint.prefixo;
                        //horizontal
                        configs[`${prefixo}Tamanho`] = transformarSeforTexto(novasProps[prefixo]);
                        configs[`${prefixo}Offset`] = transformarSeforTexto(novasProps[`${prefixo}Offset`]);
                        configs[`${prefixo}Alinhar`] = transformarSeforTexto(novasProps[`${prefixo}Alinhar`]);

                        //vertical
                        styledConfigs[`${prefixo}TamanhoV`] = transformarSeforTexto(novasProps[`${prefixo}V`]);
                        styledConfigs[`${prefixo}OffsetV`] = transformarSeforTexto(novasProps[`${prefixo}OffsetV`]);
                        configs[`${prefixo}AlinharV`] = transformarSeforTexto(novasProps[`${prefixo}AlinharV`]);
                    }
                )
                //definimos as media queries para as propriedades verticais da coluna
                const medias = breakpointsAtual.map(
                    (esteBreakpoint)=>{
                        let offsetVChave = `${esteBreakpoint.prefixo}OffsetV`;
                        let tamanhoVChave = `${esteBreakpoint.prefixo}TamanhoV`;
                        let offsetV = styledConfigs[offsetVChave];
                        let tamanhoV = styledConfigs[tamanhoVChave] > 0 ? 'span '+ styledConfigs[tamanhoVChave] : styledConfigs[tamanhoVChave];  
                        if(transformarSeforTexto(offsetV) === 'Auto' && transformarSeforTexto(tamanhoV) === 'Auto'){
                            return null;
                        }else if(offsetV === undefined && tamanhoV === undefined){
                            return null;
                        }else{
                            let estasProps = '';
                                estasProps +=`@media screen and (min-width:${esteBreakpoint.tamanhoMinimo}px){`;
                                    if(offsetV !== undefined){
                                        estasProps +=`grid-row-start: ${offsetV};`;
                                    }
                                    if(tamanhoV !== undefined){
                                        estasProps +=`grid-row-end: ${tamanhoV};`;
                                    }
                                estasProps +=`}`;
                            return estasProps;
                        }
                    }
                )
                setStyledConfigs(medias.join('\n'));
                setConfigs(configs);
            }

        },
        [breakpointsAtual,setConfigs,propsDaColuna]
    )

    let classesFinaisAtual = [];
    Object.keys(configs).forEach(
        (estaChave)=>{
            let esteValor = configs[estaChave];
            if(esteValor !== undefined){
                classesFinaisAtual.push(`GridColuna${estaChave}${esteValor}`);
            }
        }
    )
    return(
        <StyledColuna
            as={as}
            configs={styledConfigs}
            breakpoints={breakpointsAtual}
            className={
                [
                    'GridColuna',
                    ...classesFinaisAtual,
                    className
                ].join(' ')
            }
            {...outrasProps}
        >
            {children}
        </StyledColuna>
    );
}
Coluna.defaultProps = {
    as:'div'
}