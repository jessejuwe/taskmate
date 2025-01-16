import React, { useRef, useState } from "react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { ClientOnly, Skeleton } from "@chakra-ui/react";

import { Button } from "@/components/ui/button";
import { ColorModeButton } from "@/components/ui/color-mode";
import { DialogBody, DialogContent, DialogCloseTrigger } from "@/components/ui/dialog"; // prettier-ignore
import { DialogHeader, DialogRoot } from "@/components/ui/dialog";
import { DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from "@/components/containers/tasks/task-form";
import logo from "@/public/assets/images/logo.png";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const contentRef = useRef<HTMLElement | any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="w-[60px] h-auto flex items-center justify-start gap-1">
        <Image src={logo} alt="Logo" priority />
        <h1 className="text-xl font-semibold text-foreground">
          Task<span className="text-green-600 dark:text-green-300">mate</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ColorModeButton />

        <ClientOnly fallback={<Skeleton height="8" width="100px" />}>
          <DialogRoot
            initialFocusEl={() => inputRef.current}
            lazyMount
            motionPreset="slide-in-bottom"
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            scrollBehavior="inside"
            size={{ base: "sm", lg: "md" }}
          >
            <DialogTrigger asChild>
              <Button
                bg="colorPalette.500"
                className="btn hover:bg-green-600/90"
                colorPalette="green"
                variant="solid"
              >
                <PlusCircle size={16} />
                Add Task
              </Button>
            </DialogTrigger>

            <DialogContent ref={contentRef}>
              <DialogCloseTrigger />

              <DialogHeader>
                <DialogTitle fontSize="xl" fontWeight="bold">
                  Create New Task
                </DialogTitle>
              </DialogHeader>

              <DialogBody>
                <TaskForm
                  contentRef={contentRef}
                  inputRef={inputRef}
                  onSubmit={() => setOpen(false)}
                />
              </DialogBody>
            </DialogContent>
          </DialogRoot>
        </ClientOnly>
      </div>
    </div>
  );
}
