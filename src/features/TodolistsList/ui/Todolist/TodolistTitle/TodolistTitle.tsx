import React, {FC} from 'react';
import {EditableSpan} from "../../../../../common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "../../../../../common/hooks";
import {TodolistDomainType, todolistsThunks} from "../../../model/todolists.reducer";

type Props = {
    todolist: TodolistDomainType;
}
export const TodolistTitle: FC<Props> = ({todolist}) => {
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks);
    const removeTodolistHandler = () => {
        removeTodolist(todolist.id);
    };

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({id: todolist.id, title: title});
    }
    return (
        <h3>
            <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
    );
};
