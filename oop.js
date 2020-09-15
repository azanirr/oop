const input = document.getElementById('input'),
      buttonadd = document.getElementById('add'),
      list = document.getElementById('lists');

class Task {
    constructor(text) {
        this.text = text;
        this.date = new Date();
        this.completed = false;
    }
}


class Todo {
    constructor(){
        this.tasks = JSON.parse(window.localStorage.getItem('todo'));
        this.data = this.tasks ? this.tasks : [];
        if(this.data.length){
            this.show();
        }
    }


    show(){
        list.innerHTML = '';
        for (let i = 0; i < this.data.length; i++) {
            this.data[i].completed = true;
            const {text, date, completed} = this.data[i];
            list.innerHTML += `<li onclick="todo.changed(${i})">${i + 1}. ${text} | ${date} | ${completed}<button onclick=todo.edit(${i})>edit</button> <button onclick=todo.remove(${i}) >Delete</button></li>`;
        }
    }

    changed(i){
        console.log('bisa dipencet');
        if(this.data[i].completed === false){
            list.children[i].classList.add('completed');
            console.log(list.children[i]);
            this.data[i].completed = true;
            this.saveTaskInLocalStorage();
        } else{
            list.children[i].classList.remove('completed');
            this.data[i].completed = false;
            this.saveTaskInLocalStorage();
    }
}

    setTodo(value){
        this.data.push(new Task(value));
        console.log(this.data);
        this.saveTaskInLocalStorage();
        this.show();
        input.value = '';
    }

    edit(index){
        console.log('bisa dipencet');
        list.innerHTML = '';
        for(let i = 0; i < this.data.length; i++){
            const {text, date, completed} = this.data[i];
            if(i === index) {
                list.innerHTML += `<li onclick="todo.changed(${i})"><input type="text" id="edit-input" value="${text}"></li>`;
                }  else{
                list.innerHTML += `<li>${i + 1}. ${text} | ${date} | ${completed}</li><button onclick=todo.edit(${i})>edit</button> <button onclick=todo.remove(${i}) >Delete</button>`;
            }
        }
        const editInput = document.getElementById('edit-input');
        editInput.addEventListener('keyup', (e) => {
            console.log("bisa DIPENCETG");
            if(e.keyCode == 13){
                let editValue = editInput.value;
                this.data[index].text = editValue;
                this.saveTaskInLocalStorage();
                this.show();
            }
        });
    }
    remove(i) {
        console.log('sq');
        this.data.splice(i, 1);
        this.saveTaskInLocalStorage();
        this.show();
    }

     saveTaskInLocalStorage() {
        window.localStorage.setItem('todo', JSON.stringify(this.data));
    }

}

let todo = new Todo;

buttonadd.addEventListener('click', () => todo.setTodo(input.value));