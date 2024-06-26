import React, {ChangeEvent, FC} from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TaskType } from "features/TodolistsList/api/todolists.api";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import {tasksThunks} from "../../../model/tasks.reducer";
import {useActions} from "../../../../../common/hooks";
import s from "./Task.module.css"
type Props = {
  task: TaskType;
  todolistId: string;

};

export const Task: FC<Props> = React.memo(({task, todolistId}) => {

  const {removeTask, updateTask} = useActions(tasksThunks)

  const removeTaskHandler = () => {
      removeTask({ taskId: task.id, todolistId: todolistId })
  }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        let newIsDoneValue = e.currentTarget.checked;
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({ taskId: task.id, domainModel: { status }, todolistId: todolistId });
    }
    const changeTitleHandler = (title: string)=>{

        updateTask({ taskId: task.id, domainModel: { title: title }, todolistId: todolistId });
    }

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
