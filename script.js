const fetchClasses = () => {
    fetch('http://127.0.0.1:5500/classes.json')
        .then(res => res.json())
        .then(data => {
            const groupsRootEl = document.querySelector('#groups-root')
            console.log('Json', data.groups)

            for (let contador = 0; contador < data.groups.length; contador++) {
                console.log(data.groups[contador])
                const groupArticleEl = getArticleElement(data.groups[contador])
                groupsRootEl.appendChild(groupArticleEl)
            }
        })
        .catch(() => {
            console.log('404')
        })
}



const getArticleElement = (group) => {
    const articleEl = document.createElement('article')
    articleEl.classList.add('article_turma')

    const divInfoTurmas = document.createElement('div')
    divInfoTurmas.classList.add('info_turmas')

    const articleTitleEl = document.createElement('h3')
    articleTitleEl.textContent = group.turma

    const paragrafoEl1 = document.createElement('p')
    paragrafoEl1.textContent = group.disciplina

    const paragrafoEl2 = document.createElement('p')
    paragrafoEl2.textContent = group.professor

    const divTurmas = document.createElement('div')
    divTurmas.classList.add('turmas')


    divTurmas.appendChild(articleEl)
    articleEl.appendChild(divInfoTurmas)
    divInfoTurmas.appendChild(articleTitleEl)
    divInfoTurmas.appendChild(paragrafoEl1)
    divInfoTurmas.appendChild(paragrafoEl2)

    return articleEl
}
fetchClasses()