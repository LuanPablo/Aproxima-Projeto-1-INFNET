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
        .then(() => {
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
        .then(() => {
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

const handleNavigateToForm = (studentId) => {

    window.localStorage.setItem('selectStudentId', String(studentId))
    window.location.pathname = 'form_student.html'
}

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
                                <button class="btn_acessar" onclick="handleNavigateToForm(${student.id})">Acessar</button>
                            </div>
                    `

                sectionEl.appendChild(articleStudents)
            })
        })
        .catch(() => {
            console.log('Não foi possível carregar conteúdo')
        })
}

fetchStudents()

//Script da página de formulário

const avaliations = [];
const lostDays = [];
let observation = '';
let studentSelected;

const fetchFormTop = () => {
    fetch('/classes.json')
        .then(res => res.json())
        .then(() => {
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

const fetchFormStudent = () => {
    fetch('/classes.json')
        .then(res => res.json())
        .then(data => {
            const studentId = window.localStorage.getItem('selectStudentId')
            const savedClass = window.localStorage.getItem('savedClass')
            const groupsRootEl = document.getElementById('groups-form-student')
            const asideEl = document.createElement('aside')
            asideEl.id = 'info-relatives'

            const selectClass = data.classes.find((classe) => classe.turma === Number(savedClass))

            studentSelected = selectClass.students.find((student) => student.id === Number(studentId))

            asideEl.innerHTML = `
                <img src="${studentSelected.image}" alt="">
                <div class="profile-info">
                    <label>Nome do reponsável:</label>
                    <p> ${studentSelected.relatives}</p>
                    <br/>
                    <label>Contato</label>
                    <p> ${studentSelected.phone}</p>
                </div>
            `;

            groupsRootEl.appendChild(asideEl)
        })
        .catch(() => {
            console.log('Não foi possível carregar conteúdo')
        })
}

fetchFormStudent()

const addAvaliationInput = () => {
    const avaliationNumber = avaliations.length + 1;
    const formRootEl = document.querySelector('#avaliable-form');
    const avaliableDivForm = document.createElement('div');
    avaliableDivForm.classList.add('avaliation');
    avaliableDivForm.id = `avaliation - ${avaliationNumber} `
    avaliableDivForm.innerHTML = `
                    <label label class="label-avaliation" for= "input-${avaliationNumber}" > Avaliação ${avaliationNumber}</label >
                        <div class="row">
                            <input type="number" min="0" max="10" onchange="onChangeInputAvaliation(this, ${avaliationNumber})" id="input-${avaliationNumber}" />
                            <button type="button" class="button-remove" onclick='removeAvaliationInput(this)'>
                                <i class="icon-trash fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                `;
    formRootEl.appendChild(avaliableDivForm)
    avaliations.push({
        id: avaliationNumber,
        value: 0
    })
}

const toggleMissingDayToWeek = (element) => {
    let button = element.id;
    button = document.getElementById(button);

    if (button.className.includes('button-danger')) {

        button.classList.remove('button-danger');
        const index = lostDays.findIndex(day => day === element.id)
        lostDays.splice(index, 1);
    } else {

        button.classList.add('button-danger');
        lostDays.push(element.id)
    }

    return false;
}

const removeAvaliationInput = (element) => {
    let input = element.parentNode.parentNode.id;
    const id = Number(input.replace(/avaliation-/g, ''))

    if (id !== 1) {

        input = document.getElementById(input);
        input.parentNode.removeChild(input);

        const index = avaliations.findIndex(avalitaion => avalitaion.id === id)
        avaliations.splice(index, 1);

        updateLabelTotal()
    }

    return false;
}

const onChangeText = (element) => {

    observation = element.value;
}

const updateLabelTotal = () => {
    const labelRootEl = document.querySelector('#media');

    const total = avaliations.reduce((acc, cur) => (
        acc + cur.value
    ), 0) / avaliations.length;

    labelRootEl.innerHTML = String(total.toFixed(1)).replace(/[.]/g, ',');
}

const onChangeInputAvaliation = (element, avaliationNumber) => {

    const index = avaliations.findIndex(avalitaion => avalitaion.id === avaliationNumber)
    avaliations[index].value = parseFloat(element.value);

    updateLabelTotal();
    return false;
}

const sendToWhatsapp = () => {


    const classe = window.localStorage.getItem('savedClass')
    const message = `*Relatório semanal* %0D%0A %0D%0A

    Aluno: ${studentSelected.name}%0D%0A
    Turma: ${classe}%0D%0A %0D%0A

    Notas: %0D%0A${avaliations.map(avaliation => `*- Avaliação ${avaliation.id}*: ${avaliation.value}%0D%0A`).join('')}%0D%0A

${lostDays.length ? (`Faltas na semana: ${lostDays.map(day => String(day).toUpperCase()).join(', ')}%0D%0A%0D%0A`): ''}

${observation ? (`Advertências: ${observation}`) : ''} `;

    window.open(`https://wa.me/${studentSelected.phone}?text=${message}`)

    return false;
}

addAvaliationInput()