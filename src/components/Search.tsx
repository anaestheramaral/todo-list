import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Search.module.css";

interface InputProps {
  addTodo: CallableFunction;
  onInputChange: (value: string) => void;
}

export const Input = ({ addTodo, onInputChange }: InputProps) => {
  const [text, setText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    onInputChange(event.target.value);
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

      <button className={styles.createBtn} type="submit" >
        <span>
          Criar

          <PlusCircle size={16} weight="bold" />
        </span>

      </button>
    </form>
  )
}