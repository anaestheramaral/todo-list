import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import "./global.css";

interface TodoItem {
  id: string;
  text: string;
  checked: boolean;
}

function App() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [newTodo, setNewTodo] = useState({} as TodoItem);
  const [todoList, setTodoList] = useState([] as TodoItem[]);

  useEffect(() => {
    const updatedCheckedItems = todoList.reduce((acc, curr) => {
      if (curr.checked) {
        return acc + 1;
      }
      return acc;
    }, 0);


    setCompletedTasks(updatedCheckedItems);
  }, [todoList])


  const addNewItem = () => {
    setTodoList([...todoList, newTodo])
    setNewTodo({} as TodoItem)
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

  return (
    <>
      <Header />

      <main className={styles.wrapper}>
        <Search addTodo={addNewItem} onInputChange={onInputChange} />

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
              {completedTasks} de {todoList.length}
            </span>
          </div>
        </header>

        {/* If empty list */}
        {todoList.length === 0 && (
          <>
            <div className={styles.divider}></div>

            <section className={styles.emptyListWrapper}>
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
              <input
                type="checkbox"
                id={item.id}
                onChange={(e) => onCheckboxChange(e.target.checked, item.id)}
              />
              <label htmlFor={item.id}>{item.text}</label>
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App;
