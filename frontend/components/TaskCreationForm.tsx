"use client";

import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { taskSchema } from "@/utils/types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "@/redux_store/hooks";
import { getTaskByUser } from "@/redux_store/slices/getTaskByUserSlice";

interface TaskCreationFormProps {
  onClose: () => void;
  taskStatus?: string;
}

const TaskCreationForm = ({ onClose, taskStatus }: TaskCreationFormProps) => {
  const createform = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      status: "",
      description: "",
      deadline: undefined,
      priority: "",
    },
  });

  const [status, setStatus] = useState(taskStatus);

  const dispatch = useAppDispatch();


  const onSubmit = async (values: z.infer<typeof taskSchema>) => {
    console.log(values);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/task/createTask`,
        values,
        {
          withCredentials: true,
        }
      );
      dispatch(getTaskByUser())
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-4 px-6 bg-white w-[670px]">
      {/* form */}
      <Form {...createform}>
        {/* task form */}

        <form onSubmit={createform.handleSubmit(onSubmit)}>
          <nav className="flex items-center justify-between mb-[27px]">
            {/* close and expand btn */}
            <div className="flex items-center gap-4">
              <button type="button" onClick={onClose}>
                <Image
                  src="/assets/icons/close.svg"
                  width={11}
                  height={11}
                  alt="close icon"
                />
              </button>
              <button type="button">
                <Image
                  src="/assets/icons/doubleArrow.svg"
                  width={11}
                  height={11}
                  alt="close icon"
                />
              </button>
            </div>

            {/* share, submit and fav btn */}
            <div className="flex items-center gap-4">
              <button className="bg-[#F4F4F4] p-2 rounded text-[#797979] flex items-center gap-[14px]">
                Share
                <Image
                  src="/assets/icons/share.svg"
                  width={24}
                  height={24}
                  alt="share icon"
                />
              </button>
              <button className="create-task-btn" type="submit">
                Create Task
              </button>
              <button className="bg-[#F4F4F4] p-2 rounded text-[#797979] flex items-center gap-[14px]">
                Favorite
                <Image
                  src="/assets/icons/favrouite.svg"
                  width={24}
                  height={24}
                  alt="share icon"
                />
              </button>
            </div>
          </nav>

          {/* task form fields */}
          <div className="space-y-8">
            {/* input title */}
            <FormField
              control={createform.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="font-semibold text-5xl placeholder:text-[#CCCCCC] px-0"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* status */}
            <FormField
              control={createform.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center gap-[60px]">
                  <FormLabel className="flex items-center gap-6 w-[150px]">
                    <Image
                      src="/assets/icons/status.svg"
                      width={24}
                      height={24}
                      alt="status icon"
                    />
                    <p className="text-[#666666]">Status</p>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={status}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-[180px] border-none">
                        <SelectValue
                          className="text-black placeholder:text-[#C1BDBD]"
                          placeholder="Not Selected"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectItem value="to-do">To do</SelectItem>
                          <SelectItem value="in-progress">
                            In progress
                          </SelectItem>
                          <SelectItem value="under-review">
                            Under review
                          </SelectItem>
                          <SelectItem value="finished">Finished</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* priority */}
            <FormField
              control={createform.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="flex items-center gap-[60px]">
                  <FormLabel className="flex items-center gap-6 w-[150px]">
                    <Image
                      src="/assets/icons/priority.svg"
                      width={24}
                      height={24}
                      alt="priority icon"
                    />
                    <p className="text-[#666666]">Priority</p>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-[180px] border-none placeholder:text-[#C1BDBD] text-black">
                        <SelectValue
                          className="text-black placeholder:text-[#C1BDBD]"
                          placeholder="Not Selected"
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup className="space-y-2">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* deadline */}
            <FormField
              control={createform.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex items-center gap-[60px]">
                  <FormLabel className="flex items-center gap-6 w-[150px]">
                    <Image
                      src="/assets/icons/calendar.svg"
                      width={24}
                      height={24}
                      alt="calendar icon"
                    />
                    <p className="text-[#666666] text-base font-normal">
                      Deadline
                    </p>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-left justify-start font-normal border-none hover:text-[#C1BDBD]",
                            !field.value && "text-[#C1BDBD]"
                          )}
                        >
                          {field.value
                            ? format(field.value, "yyyy-MM-dd")
                            : "Not Selected"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {/* description */}
            <FormField
              control={createform.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex  gap-[120px]">
                  <FormLabel className="flex items-center gap-6 w-[150px] pb-4">
                    <Image
                      src="/assets/icons/description.svg"
                      width={24}
                      height={24}
                      alt="description icon"
                    />
                    <p className="text-[#666666]">Description</p>
                  </FormLabel>
                  <FormControl>
                    <textarea
                      className="placeholder:text-[#C1BDBD] placeholder:text-sm w-full focus:outline-none"
                      placeholder="Not Selected"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* add custom property btn */}
          <button className="flex items-center w-full mt-[38px] gap-[23px]">
            <Image
              src="/assets/icons/property.svg"
              width={24}
              height={24}
              alt="add icon"
            />
            Add custom property
          </button>

          {/* sepatrator */}
          <div className="h-[1px] bg-[#DEDEDE] my-8" />

          <p className="text-[#C0BDBD]">
            Start writing, or drag your own files here.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default TaskCreationForm;
