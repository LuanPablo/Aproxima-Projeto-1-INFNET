const fetchClasses = () =>{
    fetch('http://127.0.0.1:5500/classes.json')
        .then(res => res.json())
        .then(data=>{
            const groupsRootEl = document.querySelector('#groups-root')
            console.log('Json', data.groups)
            for(let contador =0;contador < data.groups.length;contador++){
                console.log(data.groups[contador])
                const articleEl = document.createElement('article')
                articleEl.classList.add('article_turma')
                const articleTitleEl = document.createElement('h3')
                articleTitleEl.textContent = data.groups[contador].Turma
                articleEl.appendChild(articleTitleEl)
                groupsRootEl.appendChild(articleEl)
            }
        })
}
fetchClasses()