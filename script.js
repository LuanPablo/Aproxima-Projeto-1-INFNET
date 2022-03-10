const fetchClasses = () => {
    fetch('/classes.json')
        .then(res => res.json())
        .then(data => {
            const groupsRootEl = document.querySelector('#groups-root')
            data.classes.forEach((classe) => {
                const groupArticleEl = getArticleElement(classe)
                groupsRootEl.appendChild(groupArticleEl)
            })
        })
    .catch(() => {
        console.log('Não foi possível carregar conteúdo')
    })
}

const getArticleElement = (classe) => {
    const articleEl = document.createElement('article')
    articleEl.classList.add('article_turma')

    const cardWrapInfo = document.createElement('div')
    cardWrapInfo.classList.add('cardWrapInfo')
    articleEl.appendChild(cardWrapInfo)

    const cardWrapSends = document.createElement('div')
    cardWrapSends.classList.add('cardWrapSends')
    articleEl.appendChild(cardWrapSends)

    cardWrapInfo.innerHTML = `
        <h3>Turma ${classe.turma}</h3>
        <p>Disciplina: ${classe.disciplina} </p>
        <p>Professor: ${classe.professor}</p>
        <i class="fa-solid fa-clock">${classe.horario}</i>
        `
    cardWrapSends.innerHTML = `
        <hr class="hr2">
        <h4>Enviar mensagem:</h4>
        <div class="btn1_posicao">
            <a href="turma.html">Para todos</a>
            <a href="aluno.html">Por aluno</a>
        `
    return articleEl
}


fetchClasses()