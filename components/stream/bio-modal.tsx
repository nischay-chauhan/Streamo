"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BioModalProps {
  intialValue: string | null;
}
import { Button } from "../ui/button";
import { Hint } from "../hint";
import { ElementRef, useRef, useTransition } from "react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

export const BioModal = ({ intialValue }: BioModalProps) => {
  const [value, setValue] = useState(intialValue || " ");
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("Bio Updated");
          closeRef.current?.click();
          
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="user bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={false}
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button
                type="button"
                variant={"ghost"}
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button variant={"primary"} type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
