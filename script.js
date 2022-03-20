
// Script página home
const fetchClasses = () => {
    fetch('/classes.json')
        .then(res => res.json())
        .then(data => {
            const groupsRootEl = document.querySelector('#groups-root')
            data.classes.forEach((classe) => {
                const groupArticleEl = getArticleHome(classe)
                groupsRootEl.appendChild(groupArticleEl)
            })
        })
        .catch(() => {
            console.log('Não foi possível carregar conteúdo')
        })
}

const getArticleHome = (classe) => {
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
            <button class="btnSelectClass">Para todos</button>
            <button class="btnSelectStudent">Por Aluno</button>
        </div>
        `

    const btnSelecClass = cardWrapSends.querySelector('.btnSelectClass')
    btnSelecClass.addEventListener('click', () => {

        window.localStorage.setItem('savedClass', String(classe.turma))
        window.location.pathname = '/turma.html'
        console.log(btnSelecClass)
    })
    const btnSelectStudents = cardWrapSends.querySelector('.btnSelectStudent')
    btnSelectStudents.addEventListener('click', () => {

        window.localStorage.setItem('savedClass', String(classe.turma))
        window.location.pathname = '/aluno.html'
        console.log(btnSelectStudents)
    })

    return articleEl
}

fetchClasses()

//Página turma
const fetchClassesTop = () => {
    fetch('/classes.json')
        .then(res => res.json())
        .then(data => {
            const groupsRootEl = document.querySelector('#groups-classe-top')
            const groupDivClasseTop = document.createElement('div')
            groupDivClasseTop.classList.add('info_top')

            const savedClass = window.localStorage.getItem('savedClass')
            groupDivClasseTop.innerHTML = `
                <h2>Alunos</h2>
                <h3>Turma: ${savedClass}</h3>
            `
            groupsRootEl.appendChild(groupDivClasseTop)

        })
        .catch(() => {
            console.log('Não foi possível carregar conteúdo')
        })
}

fetchClassesTop()
//Script da página de Alunos

const fetchStudentsTop = () => {
    fetch('/classes.json')
        .then(res => res.json())
        .then(data => {
            const groupsRootEl = document.querySelector('#groups-students-top')
            const groupDivStudentTop = document.createElement('div')
            groupDivStudentTop.classList.add('info_top')

            const savedClass = window.localStorage.getItem('savedClass')
            groupDivStudentTop.innerHTML = `
                <h2>Alunos</h2>
                <h3>Turma: ${savedClass}</h3>
            `
            groupsRootEl.appendChild(groupDivStudentTop)

        })
        .catch(() => {
            console.log('Não foi possível carregar conteúdo')
        })
}

fetchStudentsTop()

const fetchStudents = () => {
    fetch('/classes.json')
        .then(res => res.json())
        .then(data => {
            const groupsRootEl = document.querySelector('#groups-students')
            const sectionEl = document.createElement('section')

            sectionEl.classList.add('section_alunos')
            groupsRootEl.appendChild(sectionEl)

            const savedClass = window.localStorage.getItem('savedClass')
            const selectClass = data.classes.find((classe) => {
                if (classe.turma == savedClass) {
                    return true
                }
                return false
            })

            selectClass.students.forEach((student) => {
                const articleStudents = document.createElement('article')
                articleStudents.classList.add('container_aluno')
                articleStudents.innerHTML = `
                            <div class="info_aluno">
                            <div class="img_aluno">
                                <img src="${student.image}" alt="">
                            </div>
                            <div class="text_aluno">
                                <label for="">Nome:</label><br>
                                <label for="">${student.name}</label>
                                <br><br>
                                <label for="">Matricula:</label><br>
                                <label for="">${student.enroll}</label>
                            </div>
                            </div>
                            <div class="btn2_posicao">
                                <button class="btn_acessar">Acessar</button>
                            </div>
                  
                    `

                sectionEl.appendChild(articleStudents)
            })
            const acessStudentForm = document.querySelector('.btn_acessar')
            acessStudentForm.addEventListener('click', () => {
                window.localStorage.setItem('acessForm', String(student.id))
                window.location.pathname = 'form_student.html'
            })

        })
        .catch(() => {
            console.log('Não foi possível carregar conteúdo')
        })
}

fetchStudents()


const fetchFormTop = () => {
    fetch('/classes.json')
        .then(res => res.json())
        .then(data => {
            const groupsRootEl = document.querySelector('#groups-form-top')
            const groupDivFormTop = document.createElement('div')
            groupDivFormTop.classList.add('info_top')

            const savedClass = window.localStorage.getItem('savedClass')
            groupDivFormTop.innerHTML = `
                <h2>Aluno</h2>
                <h3>Turma: ${savedClass}</h3>
            `
            groupsRootEl.appendChild(groupDivFormTop)

        })
        .catch(() => {
            console.log('Não foi possível carregar conteúdo')
        })
}

fetchFormTop()

// const fetchForm(){
    
// }