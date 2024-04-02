import {Button} from "@mui/material";
import React, {FC, useCallback} from "react";
import {useActions} from "../../../../../common/hooks";
import {FilterValuesType, TodolistDomainType, todolistsActions} from "../../../model/todolists.reducer";

type Props = {
    todolist: TodolistDomainType;
}
export const FilterTasksButton: FC<Props> = ({todolist}) => {

    const {changeTodolistFilter} = useActions(todolistsActions);
    const changeTodolistFilterHandler = (filter: FilterValuesType) => {

        changeTodolistFilter({filter, id: todolist.id})

    }
    return (<>
            <Button
                variant={todolist.filter === "all" ? "outlined" : "text"}
                onClick={() => changeTodolistFilterHandler("all")}
                color={"inherit"}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === "active" ? "outlined" : "text"}
                onClick={() => changeTodolistFilterHandler("active")}
                color={"primary"}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === "completed" ? "outlined" : "text"}
                onClick={() => changeTodolistFilterHandler("completed")}
                color={"secondary"}
            >
                Completed
            </Button>
        </>
    );
};
