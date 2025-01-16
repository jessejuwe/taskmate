"use client";

import { useEffect, useState } from "react";
import { Move, Search } from "lucide-react";
import { DndContext, DragEndEvent, MouseSensor } from "@dnd-kit/core";
import { TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Box, Card, Center, createListCollection } from "@chakra-ui/react";
import { Flex, Input, Spinner, Stack, Text } from "@chakra-ui/react";

import TaskList from "@/components/containers/tasks/task-list";
import { InputGroup } from "@/components/ui/input-group";
import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select"; //prettier-ignore
import { toaster } from "@/components/ui/toaster";
import { useTaskContext } from "@/contexts/task-context";
import { getTasks } from "@/lib/tasks";
import { TaskStatus } from "@/types/task";
import { Tooltip } from "@/components/ui/tooltip";

export default function TaskDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string[]>(["all"]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const { loadTasks, tasks, updateStatus } = useTaskContext();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const categories = createListCollection({
    items: [
      { label: "All Categories", value: "all" },
      { label: "Work", value: "work" },
      { label: "Personal", value: "personal" },
      { label: "Urgent", value: "urgent" },
    ],
  });

  // Prevent hydration mismatch by mounting after initial render
  useEffect(() => {
    setMounted(true);
    loadTasksFromDB();
  }, []); // eslint-disable-line

  const loadTasksFromDB = async () => {
    setLoading(true);

    try {
      const loadedTasks = await getTasks();
      loadTasks(loadedTasks);
    } catch (error) {
      console.log(error);
      toaster.error({
        title: "Error",
        description: "Failed to load tasks. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If no valid drop target, exit
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    const newStatus = over.id as TaskStatus;
    if (activeTask.status !== newStatus) {
      updateStatus(activeTask.id, newStatus);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory[0] === "all" || task.category === filterCategory[0];
    return matchesSearch && matchesCategory;
  });

  const completedTasksCount = tasks.filter((task) => task.status === "completed").length; // prettier-ignore
  const progressPercentage = tasks.length > 0 ? (completedTasksCount / tasks.length) * 100 : 0; // prettier-ignore

  // Don't render theme toggle until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <Center height="80vh" width="full" className="bg-background">
        <Stack direction="column">
          <Spinner color="colorPalette.600" colorPalette="green" size="md" />
          <Text className="text-muted-foreground">Loading tasks...</Text>
        </Stack>
      </Center>
    );
  }

  const columns: TaskStatus[] = ["todo", "in-progress", "completed"];

  return (
    <Box colorPalette="green" width="full">
      <Stack direction="column" gap={4} mb={8} width="full">
        <Stack align="center" direction="row" gap={4}>
          <InputGroup flex="1" startElement={<Search size={16} />}>
            <Input
              className="w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              value={searchQuery}
              variant="subtle"
            />
          </InputGroup>

          <SelectRoot
            className="select"
            collection={categories}
            onValueChange={(e) => setFilterCategory(e.value)}
            value={filterCategory}
            variant="outline"
            width={{ base: "145px", md: "4xs" }}
          >
            <Tooltip
              content="Filter tasks by categories"
              closeDelay={100}
              interactive
              openDelay={10}
              showArrow
            >
              <SelectTrigger>
                <SelectValueText pl={3} placeholder="Filter by category" />
              </SelectTrigger>
            </Tooltip>
            <SelectContent>
              {categories.items.map((category) => (
                <SelectItem item={category} key={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Stack>

        <Stack align="center" direction="row" gap={4}>
          <ProgressRoot
            flex="1"
            size="sm"
            value={progressPercentage}
            variant="subtle"
          >
            <ProgressBar />
          </ProgressRoot>

          <Text fontSize="sm" truncate className="text-muted-foreground">
            {completedTasksCount} of {tasks.length} tasks completed
          </Text>
        </Stack>
      </Stack>

      <Stack align={{ base: "start", lg: "center" }} mb={8}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Text>
            Not ready for a task? Move it to{" "}
            <span className="font-semibold text-orange-500">TODO</span>
          </Text>
          <Text>
            Working on a task? Move it to{" "}
            <span className="font-semibold text-blue-500">IN PROGRESS</span>
          </Text>
          <Text>
            Done with a task? Move it to{" "}
            <span className="font-semibold text-green-500">COMPLETED</span>
          </Text>
        </Stack>

        <div className="flex items-center justify-start gap-1">
          Move tasks around by using
          <Move
            size={16}
            strokeWidth="2.5px"
            className="text-muted-foreground"
          />
        </div>
      </Stack>

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <Flex
          direction={{ _portrait: "column", base: "column", md: "row" }}
          gap="3"
          width="full"
        >
          {columns.map((status) => (
            <Card.Root
              key={status}
              className={`w-full bg-${status === "todo" ? "orange" : status === "in-progress" ? "blue" : "green"}-300 dark:bg-${status === "todo" ? "orange" : status === "in-progress" ? "blue" : "green"}-900`}
            >
              <Card.Header>
                <Card.Title fontSize="xl" fontWeight="bold">
                  {status.replace("-", " ").toUpperCase()}
                </Card.Title>
              </Card.Header>

              <Card.Body>
                <TaskList
                  tasks={filteredTasks.filter((task) => task.status === status)} // prettier-ignore
                  status={status}
                />
              </Card.Body>
            </Card.Root>
          ))}

          {/* {columns.map((status) => (
            <SortableContext
              key={status}
              items={tasks
                .filter((task) => task.status === status)
                .map((task) => task.id)}
            >
              <Card.Root
                className={`w-full bg-${status === "todo" ? "orange" : status === "in-progress" ? "blue" : "green"}-300 dark:bg-${status === "todo" ? "orange" : status === "in-progress" ? "blue" : "green"}-900`}
              >
                <Card.Header>
                  <Card.Title fontSize="xl" fontWeight="bold">
                    {status.replace("-", " ").toUpperCase()}
                  </Card.Title>
                </Card.Header>

                <Card.Body>
                  <TaskList
                    tasks={filteredTasks.filter((task) => task.status === status)} // prettier-ignore
                    status={status}
                  />
                </Card.Body>
              </Card.Root>
            </SortableContext>
          ))} */}

          {/* <Card.Root className="w-full bg-orange-300 dark:bg-orange-900">
            <Card.Header>
              <Card.Title fontSize="xl" fontWeight="bold">
                To Do
              </Card.Title>
            </Card.Header>

            <Card.Body>
              <TaskList
                tasks={filteredTasks.filter((task) => task.status === "todo")}
                status="todo"
              />
            </Card.Body>
          </Card.Root>

          <Card.Root className="w-full bg-blue-300 dark:bg-blue-900">
            <Card.Header>
              <Card.Title fontSize="xl" fontWeight="bold">
                In Progress
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <TaskList
                tasks={filteredTasks.filter((task) => task.status === "in-progress")} // prettier-ignore
                status="in-progress"
              />
            </Card.Body>
          </Card.Root>

          <Card.Root className="w-full bg-green-300 dark:bg-green-900">
            <Card.Header>
              <Card.Title fontSize="xl" fontWeight="bold">
                Completed
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <TaskList
                tasks={filteredTasks.filter((task) => task.status === "completed")} // prettier-ignore
                status="completed"
              />
            </Card.Body>
          </Card.Root> */}
        </Flex>
      </DndContext>
    </Box>
  );
}
