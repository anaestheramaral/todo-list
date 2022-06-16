import { ClipboardText, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Input } from "./components/Search";
import "./global.css";

interface TodoItem {
  id: string;
  text: string;
  checked: boolean;
}

function App() {
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [newTodo, setNewTodo] = useState({} as TodoItem);
  const [todoList, setTodoList] = useState([] as TodoItem[]);

  useEffect(() => {
    const updatedCheckedItemsCount = todoList.reduce((acc, curr) => {
      if (curr.checked) {
        return acc + 1;
      }

      return acc;
    }, 0);


    setCompletedTasksCount(updatedCheckedItemsCount);

    const updatedListOrder = todoList.sort((x, y) => Number(x.checked) - Number(y.checked));
    setTodoList(updatedListOrder);
  }, [todoList])


  const addNewItem = () => {
    setTodoList([newTodo, ...todoList]);

    setNewTodo({} as TodoItem);
  }

  const onInputChange = (newItem: string) => {
    const updatedTodo = {
      id: uuid(),
      text: newItem,
      checked: false,
    }

    setNewTodo(updatedTodo);
  }

  const onCheckboxChange = (checked: boolean, id: string) => {
    const updatedList = todoList.map(listItem => {
      if (listItem.id === id) {
        return {
          ...listItem,
          checked,
        }
      }

      return listItem;
    });

    setTodoList(updatedList);
  }

  const handleDelete = (id: string) => {
    const updatedList = todoList.filter(item => item.id !== id)
    setTodoList(updatedList)
  }

  return (
    <>
      <Header />

      <main className={styles.wrapper}>
        <Input addTodo={addNewItem} onInputChange={onInputChange} />

        {/* List summary */}
        <header className={styles.tasks}>
          <div>
            <strong className={styles.created}>
              Tarefas criadas
            </strong>

            <span>
              {todoList.length}
            </span>
          </div>

          <div>
            <strong className={styles.completed}>
              Concluídas
            </strong>

            <span>
              {completedTasksCount} de {todoList.length}
            </span>
          </div>
        </header>

        {/* If empty list */}
        {todoList.length === 0 && (
          <>
            <div className={styles.divider}></div>

            <section className={styles.emptyListWrapper}>
              <ClipboardText size={56} />

              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
              </p>

              <p>Crie tarefas e organize seus itens a fazer</p>
            </section>
          </>
        )}

        {/* List Items */}
        {todoList.map((item) => {
          return (
            <div
              className={item.checked ? `${styles.task} ${styles.completedTask}` : styles.task}
              key={item.id}
            >
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id={item.id}
                  onChange={(e) => onCheckboxChange(e.target.checked, item.id)}
                />
                <label htmlFor={item.id}>{item.text}</label>
              </div>

              <div className={styles.trashWrapper}>
                <button onClick={() => handleDelete(item.id)}>
                  <Trash size={16} weight="bold" />
                </button>
              </div>
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App;
