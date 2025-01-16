"use client";

import React, { useId, useState } from "react";
import { Badge, Card, IconButton } from "@chakra-ui/react";
import { Editable, useEditable } from "@chakra-ui/react";
import { Calendar, Clock, Move, Trash } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";

import { Tooltip } from "@/components/ui/tooltip";
import { Task } from "@/types/task";
import { useTaskContext } from "@/contexts/task-context";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: "bg-green-500/10 text-green-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  high: "bg-red-500/10 text-red-500",
};

const categoryColors = {
  work: "bg-blue-500/10 text-blue-500",
  personal: "bg-purple-500/10 text-purple-500",
  urgent: "bg-orange-500/10 text-orange-500",
};

export default function TaskCard({ task }: TaskCardProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const titleID = useId();
  const descriptionID = useId();

  const { removeTask, updateTask } = useTaskContext();

  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
  } = useDraggable({ id: task.id });

  const titleEditable = useEditable({
    ids: { root: titleID },
    name: "title",
    activationMode: "dblclick",
    submitMode: "enter",
    value: title,
    onValueChange: (e) => setTitle(e.value),
    onValueCommit: () => handleUpdate({ title }),
  });

  const descriptionEditable = useEditable({
    ids: { root: descriptionID },
    name: "description",
    activationMode: "dblclick",
    submitMode: "enter",
    value: description,
    onValueChange: (e) => setDescription(e.value),
    onValueCommit: () => handleUpdate({ description }),
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
    zIndex: isDragging ? 999 : "auto",
    position: isDragging ? "absolute" : "relative",
    pointerEvents: isDragging ? "none" : "auto",
    width: isDragging ? "88%" : "100%",
  };

  const handleDelete = () => {
    removeTask(task.id);
  };

  const handleUpdate = (update: Partial<Task>) => {
    updateTask(task.id, update);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card.Root>
        <Card.Header className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <Tooltip
              content={`Double click to edit task title: ${title}`}
              closeDelay={100}
              ids={{ trigger: titleID }}
              openDelay={10}
              showArrow
            >
              <Editable.RootProvider
                id={titleID}
                className="text-base font-semibold"
                value={titleEditable}
              >
                <Editable.Preview id={titleID} className="truncate" />
                <Editable.Input />
                <Editable.Control>
                  <Editable.CancelTrigger asChild>
                    <IconButton
                      className="icon-btn"
                      variant="outline"
                      size="xs"
                    >
                      <LuX />
                    </IconButton>
                  </Editable.CancelTrigger>
                  <Editable.SubmitTrigger asChild>
                    <IconButton
                      className="icon-btn"
                      variant="outline"
                      size="xs"
                    >
                      <LuCheck />
                    </IconButton>
                  </Editable.SubmitTrigger>
                </Editable.Control>
              </Editable.RootProvider>
            </Tooltip>

            <div
              className="flex items-center gap-2"
              hidden={titleEditable.editing}
            >
              <Tooltip
                content="Priority"
                closeDelay={100}
                openDelay={10}
                showArrow
              >
                <Badge
                  variant="subtle"
                  className={priorityColors[task.priority]}
                >
                  {task.priority}
                </Badge>
              </Tooltip>
              <Tooltip
                content="Category"
                closeDelay={100}
                openDelay={10}
                showArrow
              >
                <Badge
                  variant="subtle"
                  className={categoryColors[task.category]}
                >
                  {task.category}
                </Badge>
              </Tooltip>
              <Tooltip
                content="Delete task"
                closeDelay={100}
                interactive
                openDelay={10}
                showArrow
              >
                <Trash
                  className="cursor-pointer"
                  onClick={handleDelete}
                  size={14}
                  strokeWidth="2.5px"
                />
              </Tooltip>
            </div>
          </div>
        </Card.Header>

        <Card.Body>
          <Tooltip
            content={`Double click to edit task description: ${description}`}
            closeDelay={100}
            ids={{ trigger: descriptionID }}
            openDelay={10}
            showArrow
          >
            <Editable.RootProvider
              id={descriptionID}
              className="text-sm text-muted-foreground mb-4"
              value={descriptionEditable}
            >
              <Editable.Preview id={descriptionID} className="truncate" />
              <Editable.Input />
              <Editable.Control>
                {/* <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger> */}
                <Editable.CancelTrigger asChild>
                  <IconButton className="icon-btn" variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton className="icon-btn" variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.RootProvider>
          </Tooltip>
          <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <Tooltip
                content="Due date"
                closeDelay={100}
                interactive
                openDelay={10}
                showArrow
              >
                <div className="flex items-center gap-1 truncate">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                </div>
              </Tooltip>

              <div className="flex items-center gap-1 truncate">
                <Clock className="h-4 w-4" />
                <span>Created {format(new Date(task.createdAt), "MMM d")}</span>
              </div>
            </div>

            <div
              ref={setActivatorNodeRef}
              {...listeners}
              {...attributes}
              className="flex items-center cursor-move"
            >
              <Tooltip
                content="Use this to drag and drop task"
                closeDelay={100}
                interactive
                openDelay={10}
                showArrow
              >
                <Move size={16} strokeWidth="2.5px" />
              </Tooltip>
            </div>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
