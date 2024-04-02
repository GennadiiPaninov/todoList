import React, {FC} from "react";
import {Task} from "../Task/Task";
import {TodolistDomainType} from "../../../model/todolists.reducer";
import {TaskType} from "../../../api/todolists.api";
import {TaskStatuses} from "../../../../../common/enums";

type Props={
    todolist: TodolistDomainType;
    tasks: TaskType[];
}

export const Tasks: FC<Props> = ({ todolist, tasks}) => {
    let tasksForTodolist = tasks;

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
    return (
        <div>
            {tasksForTodolist.map((t) => (
                <Task
                    key={t.id}
                    task={t}
                    todolistId={todolist.id}

                />
            ))}
        </div>
    );
};
