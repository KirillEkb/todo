export default [
  { id: 'Task', className: 'new-todo', placeholder: 'Task', required: true, autoFocus: true },
  { id: 'Min', className: 'new-todo-form__timer', placeholder: 'Min', pattern: '^[0-9]*$' },
  { id: 'Sec', className: 'new-todo-form__timer', placeholder: 'Sec', pattern: '^([0-9]|[1-5][0-9]|5[0-9])?$' },
];
