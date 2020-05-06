/**
 * @typedef {Object} Breakpoint
 * @property {String} prefixo prefixo do aparelho
 * @property {Number} tamanhoMinimo tamanho minimo do breakpoint em px
 * @property {Number|false} tamanhoMaximo tamanho maximo do breakpoint em px
 * @property {Number} espacoColunas tamanho do espaçamento das colunas em px
 * @property {Number} quantidadeColunas quantidades de colunas
 * @property {Number} margem soma do tamanho das margens horizontais em px
 * @property {Number} lineHeight tamanho da altura da linha do texto (espacamento entre linhas) em pt
 * @property {Number} fontSize tamanho da fonte padrão em pt
 */

/**
 * Remove do objeto todas as chaves recebidas
 *
 * @param {any} objetoOriginal
 * @param {Array<String>} chaves
 * @returns {any}
 */
export const removerPropsDoObjeto = (objetoOriginal,chaves) =>{
    let novoObjeto = Object.assign({},objetoOriginal);
    chaves.forEach(
        (estaChave)=>{
            if(novoObjeto[estaChave] !== undefined){
                delete(novoObjeto[estaChave]);
            }
        }
    );
    return novoObjeto;
}

/**
 * Função auxiliar para ordenar breakpoints por tamanho Minimo
 *
 * @param {Breakpoint} a
 * @param {Breakpoint} b
 * @returns {Number}
 */
const ordenarPorTamanhoMinimo = (a,b)=>{
    if(a.tamanhoMinimo < b.tamanhoMinimo){
        return -1
    }
    if(b.tamanhoMinimo < a.tamanhoMinimo){
        return 1;
    }
    return 0;
}

/**
 * Recebe um array com os breakpoints definidos pelo usuario e os ordena de menor a maior com base ao tamanhoMinimo
 *
 * @param {Array<Breakpoint>} breakpoints
 * @returns {Array<Breakpoint>}
 */
export const ordernarBreakpoints = (breakpoints)=>{
    breakpoints.sort(ordenarPorTamanhoMinimo);
    return breakpoints;
}


/**
 * Calcular qual sería o aparelho ativo da lista de breakpoints com o maxWidth recebido 
 *
 * @param {Object} props
 * @param {Number} props.maxWidth largura da tela em px
 * @param {Array<Breakpoint>} props.breakpointsOrdenados
 * @returns {String} prefixo do aparelho atual
 */
export const calcularAparelho = (
    {
        maxWidth,
        breakpointsOrdenados
    }
) => {
    let novo_aparelho;
    breakpointsOrdenados.forEach(
        (esteBreakpoint)=>{
            if(maxWidth >= esteBreakpoint.tamanhoMinimo){
                novo_aparelho = esteBreakpoint.prefixo;
            }
        }
    )
    return novo_aparelho;
}

/**
 * @typedef {Object} informacaoColuna
 * @property {String} aparelho prefixo do aparelho
 * @property {Number} containerWidth tamanho do container em px
 * @property {Number} tamanhoColunas tamanho das colunasem px
 * @property {Number} espacoColunas tamanho do espaçamento das colunas em px
 * @property {Number} quantidadeColunas quantidades de colunas
 * @property {Number} margens soma do tamanho das margens horizontais em px
 */

/**
 * Calcular as medidas das colunas
 *
 * @param {Object} props
 * @param {Number} props.maxWidth tamanho de tela em px
 * @param {Array<Breakpoint>} props.breakpointsOrdenados
 * @returns {informacaoColuna}
 */
export const calcularColunas = (
    {
        breakpointsOrdenados,
        maxWidth
    }
)=>{
    let novo_margem,
        novo_espacoColunas,
        novo_tamanhoColunas,
        novo_quantidadeColunas,
        novo_containerWidth,
        novo_aparelho;

    novo_aparelho = calcularAparelho({maxWidth:maxWidth,breakpointsOrdenados:breakpointsOrdenados});
    let aparelhoAtual = breakpointsOrdenados.find(breakpoint => breakpoint.prefixo === novo_aparelho);

    novo_quantidadeColunas = aparelhoAtual.quantidadeColunas;
    novo_espacoColunas = aparelhoAtual.espacoColunas;
    novo_margem = aparelhoAtual.margem;

    let maximoDesteAparelho = aparelhoAtual.tamanhoMaximo;
    novo_containerWidth = maxWidth - novo_margem;
    if(maximoDesteAparelho){
        if(maxWidth > (maximoDesteAparelho + novo_margem)){
            novo_containerWidth = maximoDesteAparelho;
        }
    }
    novo_tamanhoColunas = novo_containerWidth - (novo_espacoColunas * (novo_quantidadeColunas - 1));
    novo_tamanhoColunas = novo_tamanhoColunas / novo_quantidadeColunas;
    return{
        aparelho:novo_aparelho,
        containerWidth:novo_containerWidth,
        tamanhoColunas:novo_tamanhoColunas,
        espacoColunas:novo_espacoColunas,
        quantidadeColunas:novo_quantidadeColunas,
        margens:novo_margem
    };
}

/**
 * Transformar string deixando a primera letra em maiusculo e as outras em minisculo
 * @param {String} texto
 * @returns String
 * @example 
 * let texto = 'meuTextoAleatorio';
 * let textoConvertido = converterParaInicialMaiusculo(texto); // Meutextoaleatorio
 */
export const converterParaInicialMaiusculo = (texto)=>{
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}