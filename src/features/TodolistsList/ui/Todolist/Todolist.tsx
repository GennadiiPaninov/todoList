import React, {FC, useCallback, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {Task} from "./Task/Task";
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions,
    todolistsThunks
} from "features/TodolistsList/model/todolists.reducer";
import {tasksThunks} from "features/TodolistsList/model/tasks.reducer";
import {TaskType} from "features/TodolistsList/api/todolists.api";
import {TaskStatuses} from "common/enums";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {FilterTasksButton} from "./FilterTasksButton/FilterTasksButton";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist: FC<Props> = React.memo(function ({todolist, tasks}) {
    const {fetchTasks, addTask} = useActions(tasksThunks);



    useEffect(() => {
        fetchTasks(todolist.id);
    }, []);
    // const addTask = useCallback(function (title: string, todolistId: string) {
    //
    // }, []);

    const addTaskCallback = (title: string) => {
       return  addTask({title, todolistId: todolist.id}).unwrap()

    }





    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"}/>
            <Tasks todolist={todolist} tasks={tasks}/>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButton todolist={todolist}/>
            </div>
        </div>
    );
});
