import React,{createContext,useState,useEffect,useMemo} from 'react';
import { ordernarBreakpoints, calcularColunas, calcularAparelho } from './helpers/helpers';

/* criamos e exportamos nossos contextos */
// BreakpointsContext possui as informaçoes dos breakpoints so é alterado quando um novo array de breakpoints é passado para o componente Grid
export const BreakpointsContext = createContext(
    {
        breakpointsProps:[],
        breakpoint:[]
    }
);
// AparelhoContext possui o prefixo do aparelho ativo atualmente. É alterado quando o tamanho da janela atravessa algum breakpoint
export const AparelhoContext = createContext();
// GridContext possui as informações das colunas: quantidade, tamanho, margens, espacamentos, etc
export const GridContext = createContext();

const GridOrdenado = (
    {
        breakpointsOrdenados,
        resizeTimeout,
        ...props
    }
) => {
    const [tamanhoJanela,setTamanhoJanela] = useState([window.innerWidth,window.innerHeight]);
    const [maxWidth,setMaxWidth] = useState(tamanhoJanela[0]);
    const inicial = calcularColunas(
        {
            breakpointsOrdenados:breakpointsOrdenados,
            maxWidth:maxWidth
        }
    )
    const [containerWidth,setContainerWidth] = useState(inicial.containerWidth);
    const [quantidadeColunas,setQuantidadeColunas] = useState(inicial.quantidadeColunas);
    const [tamanhoColunas,setTamanhoColunas] = useState(inicial.tamanhoColunas);
    const [espacoColunas,setEspacoColunas] = useState(inicial.espacoColunas);
    const [margens,setMargens] = useState(inicial.margens);
    const [aparelho,setAparelho] = useState(inicial.aparelho);
    useEffect(
        ()=>{
            /**
             * Executa efetivamente a acão que processa as informações do novo tamanho de janela
             * @returns {void}
             */
            const aplicar_mudancas = ()=>{
                let novoTamanhoJanela = [window.innerWidth,window.innerHeight];
                setTamanhoJanela(novoTamanhoJanela);
                setMaxWidth(novoTamanhoJanela[0]);
            }
            if(resizeTimeout > 0){
                //Se for definido um valor de timeout esperamos antes de disparar os calculos com o novo tamnho da janela
                //Está configuração existe se quisermos evitar multiplos disparos do evento de redimensionamento
                let rtime;
                let timeout = false;
                const controlar_mudancas = () =>{
                    if (new Date() - rtime < resizeTimeout) {
                        setTimeout(controlar_mudancas, resizeTimeout);
                    } else {
                        timeout = false;
                        aplicar_mudancas();
                    }    
                }
                const controlar_mudancas_timeout = () => {
                    rtime = new Date();
                    if(timeout === false){
                        timeout = true;
                        setTimeout(controlar_mudancas, resizeTimeout);
                    }
                }
                window.addEventListener('resize',controlar_mudancas_timeout);
                return(
                    ()=>{
                        window.removeEventListener('resize',controlar_mudancas_timeout);
                    }
                )
            }else{
                window.addEventListener('resize',aplicar_mudancas);
                return(
                    ()=>{
                        window.removeEventListener('resize',aplicar_mudancas);
                    }
                )
            }
        },
        [setTamanhoJanela,setMaxWidth,resizeTimeout]
    )
    useEffect(
        ()=>{
            //cada vez que uma mudança de tamanho de janela for informada pelo setWidth verificamos qual é o aparelho ativo
            let novoAparelho = calcularAparelho(
                {
                    breakpointsOrdenados:breakpointsOrdenados,
                    maxWidth:maxWidth
                }
            )
            //cada vez que uma mudança de tamanho de janela for informada pelo setWidth calculamos os tamanhos das colunas
            const novoCalculoColunas = calcularColunas(
                {
                    breakpointsOrdenados:breakpointsOrdenados,
                    maxWidth:maxWidth
                }
            )
            setAparelho(novoAparelho); 
            setContainerWidth(novoCalculoColunas.containerWidth);
            setTamanhoColunas(novoCalculoColunas.tamanhoColunas);
            setEspacoColunas(novoCalculoColunas.espacoColunas);
            setQuantidadeColunas(novoCalculoColunas.quantidadeColunas);
            setMargens(novoCalculoColunas.margem);
        },
        [setAparelho,breakpointsOrdenados,maxWidth,
            setTamanhoColunas,
            setEspacoColunas,
            setQuantidadeColunas,
            setMargens,
            setContainerWidth
        ]
    );
    let breakpointsProps = useMemo(
        ()=>{
            let respostas = [];
            breakpointsOrdenados.forEach(
                (esteBreakpoint)=>{
                    let sufixos = [
                        '',
                        'V',
                        'Offset',
                        'OffsetV',
                        'Alinhar',
                        'AlinharV'
                    ];
                    respostas.push(
                        ...sufixos.map(
                            (esteSufixo)=>{
                                return esteBreakpoint.prefixo+esteSufixo;
                            }
                        )
                    ) 
                }
            );
            return respostas;
        },
        [breakpointsOrdenados]
    )
    return (
        <BreakpointsContext.Provider
            value={
                {
                    breakpointsProps:breakpointsProps,
                    breakpoint:breakpointsOrdenados
                }
            }
        >
            <AparelhoContext.Provider
                value={aparelho}
            >
                <GridContext.Provider
                    value={
                        {
                            maxWidth,
                            containerWidth,
                            quantidadeColunas,
                            tamanhoColunas,
                            espacoColunas,
                            margens,
                            tamanhoJanela
                        }
                    }
                    {...props}
                />
            </AparelhoContext.Provider>
        </BreakpointsContext.Provider>
  );
}

/**
 * @typedef {Object} GridProps
 * @property {Array<Breakpoint>} breakpoints prefixo do aparelho
 * @property {Number?} resizeTimeout tempo de espera entre evento de redimensionamento e o calculo das novas colunas em ms
 */
/**
 *
 * @param {GridProps} props
 */
export const Grid = (
    {
        breakpoints,
        ...props
    }
) => {
    return <GridOrdenado breakpointsOrdenados={ordernarBreakpoints(breakpoints)} {...props}/>;
};
Grid.defaultProps = {
    resizeTimeout: 0
}

/**
 *
 *
 * @param {Object} props
 * @param {String} props.as elemento a ser utilizado pelo Grid wrapper
 */
export const GridWrapper = ({as,...props}) =>{
    let Elemento = as;
    return <Elemento className={'Grid'} {...props}/>;
}
GridWrapper.defaultProps = {
    as:'div'
}