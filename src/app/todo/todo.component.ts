import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.interface';
import { capitalizationType, Dialogs, inputType, PromptOptions, PromptResult } from "@nativescript/core";

@Component({
  selector: 'ns-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoList: Array<Todo>;
  isEditing: boolean;
  constructor() { 
    this.todoList = new Array<Todo>();
    this.isEditing = false;    
  } 

  ngOnInit(): void {
    this.todoList.push({name:"Prueba", done:false,isEditing:false})
  }

  newTodo(){
    let options: PromptOptions = {
      title: "Nuevo Todo",
      defaultText: "",
      message: "Ingrese el titulo del nuevo todo",
      okButtonText: "OK",
      cancelButtonText: "Cancelar",      
      cancelable: true,
      inputType: inputType.text,
      capitalizationType: capitalizationType.sentences
    };
    Dialogs.prompt(options).then((result: PromptResult) => {
      if(result.result){
        this.todoList.push({
          name:result.text,
          done:false,
          isEditing:false,
        })
      }       
    });
  }
  deleteTodo(todo:Todo){
    let i = this.todoList.indexOf(todo);
    this.todoList.splice(i,1)
  }
  editTodo(todo:Todo){
    if(this.isEditing){
      this.todoList.forEach(t => t.isEditing =false);
    }
    this.isEditing = true;
    todo.isEditing= true;
  }
  doneEditing(todo:Todo){
    todo.isEditing= false;
    this.isEditing=false;
  }
}
