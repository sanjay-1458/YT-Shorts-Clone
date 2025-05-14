"use client";
import { uploadShortsAction } from "@/actions/upload-short";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useState } from "react";

function page() {
  const [formState, action, isPending] = useActionState(uploadShortsAction, {
    error: {},
  });
  const [videoUrl, serVideoUrl] = useState<string>("");
  const handleSubmit = (formData: FormData) => {
    formData.append("video", videoUrl);
    return action(formData);
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-center">Upload Shorts</h1>
      <form action={handleSubmit}>
        <div className="mb-4">
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            className="mt-1"
          />
          {formState.error.title && (
            <span className="text-red-500 text-sm">
              {formState.error.title}
            </span>
          )}
        </div>
        <div className="mb-4">
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            placeholder="Description"
            className="mt-1"
          />
          {formState.error.description && (
            <span className="text-red-500 text-sm">
              {formState.error.description}
            </span>
          )}
        </div>
        <div className="mb-4">
          <Label>Upload file</Label>
          <Input
            type="file"
            name="video"
            placeholder="Title"
            className="mt-1"
          />
          
        </div>
        <Button className="w-full" type="submit">
          Upload
        </Button>
      </form>
    </div>
  );
}

export default page;
