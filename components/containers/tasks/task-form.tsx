"use client";

import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { createListCollection, Input, Stack, Textarea } from "@chakra-ui/react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import { PopoverArrow, PopoverBody } from "@/components/ui/popover";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "@/components/ui/popover"; // prettier-ignore
import { SelectContent, SelectItem, SelectRoot } from "@/components/ui/select";
import { SelectTrigger, SelectValueText } from "@/components/ui/select";
import { useTaskContext } from "@/contexts/task-context";
import { cn } from "@/utils/utils";
import { Task } from "@/types/task.types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.array(z.enum(["low", "medium", "high"])).nonempty("Priority is required"), // prettier-ignore
  category: z.array(z.enum(["work", "personal", "urgent"])).nonempty("Category is required"), // prettier-ignore
  dueDate: z.date(),
});

type TaskFormProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  contentRef: React.RefObject<HTMLElement | any>;
  onSubmit: () => void;
  [key: string]: any;
};

export default function TaskForm({
  contentRef,
  inputRef,
  ...props
}: TaskFormProps) {
  const taskId = useId();

  const { tasks, addTask } = useTaskContext();

  const categories = createListCollection({
    items: [
      { label: "Work", value: "work" },
      { label: "Personal", value: "personal" },
      { label: "Urgent", value: "urgent" },
    ],
  });

  const priorities = createListCollection({
    items: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: [],
      category: [],
      dueDate: undefined,
    },
  });

  const submitHandler = (values: z.infer<typeof formSchema>) => {
    const newTask: Task = {
      ...values,
      id: `${taskId}-${Math.random().toString(36).substring(7)}`,
      status: "todo",
      order: tasks.length,
      priority: values.priority[0],
      category: values.category[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: values.dueDate.toISOString(),
    };
    addTask(newTask);
    props.onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack colorPalette="green" gap={6} width="full">
        <Field
          label="Title"
          invalid={!!errors.title}
          errorText={errors.title?.message}
          width="full"
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                className="input"
                placeholder="Task title"
                {...field}
                ref={inputRef}
              />
            )}
          />
        </Field>

        <Field
          label="Description"
          invalid={!!errors.description}
          errorText={errors.description?.message}
          width="full"
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                className="textarea"
                placeholder="Task description"
                size="xl"
                {...field}
              />
            )}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Priority"
            invalid={!!errors.priority}
            errorText={errors.priority?.message}
          >
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={priorities}
                  className="select"
                >
                  <SelectTrigger>
                    <SelectValueText pl={3} placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent portalRef={contentRef}>
                    {priorities.items.map((priority) => (
                      <SelectItem item={priority} key={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>

          <Field
            label="Category"
            invalid={!!errors.category}
            errorText={errors.category?.message}
          >
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={categories}
                  className="select"
                >
                  <SelectTrigger>
                    <SelectValueText pl={3} placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent portalRef={contentRef}>
                    {categories.items.map((category) => (
                      <SelectItem item={category} key={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>
        </div>

        <Field
          label="Due Date"
          invalid={!!errors.dueDate}
          errorText={errors.dueDate?.message}
        >
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <PopoverRoot>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "calendar w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 items" alignItems="start">
                  <PopoverArrow />
                  <PopoverBody>
                    <Calendar
                      autoFocus
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} // prettier-ignore
                    />
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            )}
          />
        </Field>

        <Button
          bg="colorPalette.500"
          className="btn w-full"
          colorPalette="green"
          variant="solid"
          type="submit"
        >
          Create Task
        </Button>
      </Stack>
    </form>
  );
}
