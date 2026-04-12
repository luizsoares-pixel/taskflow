const { addTask, filterByPriority } = require('../src/logic');

test('adiciona tarefa com título válido', () => {
  const task = addTask('Estudar cálculo', 'alta');
  expect(task.title).toBe('Estudar cálculo');
  expect(task.priority).toBe('alta');
  expect(task.status).toBe('pendente');
});

test('rejeita tarefa com título vazio', () => {
  expect(() => addTask('')).toThrow('Título obrigatório');
});

test('filtra tarefas por prioridade alta', () => {
  const tasks = [
    { title: 'A', priority: 'alta' },
    { title: 'B', priority: 'baixa' },
    { title: 'C', priority: 'alta' },
  ];
  const result = filterByPriority(tasks, 'alta');
  expect(result).toHaveLength(2);
});