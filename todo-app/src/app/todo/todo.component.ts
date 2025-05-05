import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [CommonModule, FormsModule],
})
export class TodoComponent {
  tasks: { title: string; isCompleted: boolean; isEditing: boolean }[] = [];
  newTask: string = '';
  totalTasks: number = 0;
  completedTasks: number = 0;

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ title: this.newTask, isCompleted: false, isEditing: false });
      this.newTask = '';
      this.updateTaskCounts();
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.updateTaskCounts();
  }

  markAsComplete(index: number) {
    this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
    this.updateTaskCounts();
  }

  startEditing(index: number) {
    this.tasks[index].isEditing = true;
  }

  saveTask(index: number, updatedTitle: string) {
    if (updatedTitle.trim()) {
      this.tasks[index].title = updatedTitle;
      this.tasks[index].isEditing = false;
    } else {
      alert('Task title cannot be empty!');
    }
  }

  cancelEditing(index: number) {
    this.tasks[index].isEditing = false;
  }

  updateTaskCounts() {
    this.totalTasks = this.tasks.length;
    this.completedTasks = this.tasks.filter(task => task.isCompleted).length;
  }
}