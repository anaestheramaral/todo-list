import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Search.module.css";

interface SearchProps {
  addTodo: CallableFunction;
  onInputChange: (value: string) => void;
}

export const Search = ({ addTodo, onInputChange }: SearchProps) => {
  const [text, setText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    onInputChange(text);
  }

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo();
    setText("");
  }

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <input
        className={styles.input}
        value={text}
        type="text"
        name="todoItem"
        placeholder="Adicione uma nova tarefa"
        onChange={handleChange}
      />

      <button className={styles['create-btn']} type="submit" >Criar</button>
    </form>
  )
}